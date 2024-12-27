import { useEffect, useState } from "react";
import Button from "../../../../../ui/button";

import { route } from "preact-router";

import useRequest from "../../../../../../hooks/use-request";
import { approveAuthorizingAuth } from "../../../../../../assets/api/permit";

import { toast } from "../../../../../ui/toast";
import { useIDContext } from "../../../../../../context/id.context";

import { useAuthorizingActivityContext } from "../../../../../../context/authorizing-activity-context";

export function formatDateForBackend(fromDate, fromTime) {
  if (!fromDate || !fromTime) {
    throw new Error("Both fromDate and fromTime are required");
  }

  const timeISO = new Date(`1970-01-01T${fromTime}:00Z`).toISOString();

  return timeISO;
}

export default function AuthProcessSubmit() {
  const { state } = useAuthorizingActivityContext();
  const { makeRequest } = useRequest(approveAuthorizingAuth);

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const { valueID } = useIDContext();

  const permitId = valueID;

  useEffect(() => {
    async function submitForm() {
      setLoading(true);

      const selectedDocuments = Array.isArray(state.context.formattedDocuments)
        ? state.context.formattedDocuments
        : Object.entries(state.context.formattedDocuments || {}).map(
            ([name, value]) => ({
              name,
              type: (value as { type: string }).type || "MANUAL",
              doc: (value as { doc: string }).doc || "",
            })
          );

      const toCamelCase = (str) => {
        return str
          .replace(/\/.*|\(.*?\)/g, "") // Remove anything starting with `/` or inside brackets
          .replace(/\./g, "") // Remove all periods
          .trim() // Remove leading and trailing spaces
          .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase()
          )
          .replace(/\s+/g, ""); // Remove all spaces
      };

      const documents = selectedDocuments.reduce((acc, doc) => {
        const camelCaseName = toCamelCase(doc.name);

        if (camelCaseName === "otherCert") {
          // Special case for "Other Cert" to include `otherCertName`
          acc[`${camelCaseName}Name`] = "..."; // Add the Name field
        }

        acc[`${camelCaseName.replace(/Doc$/i, "")}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;

        return acc;
      }, {});

      const payload = {
        permitId: permitId,
        hazards: {
          potentialHazardDescription:
            state.context.work_hazards?.potentialHazardDescription || "",
          ...state.context.work_hazards?.hazards,
        },
        protectiveEquipment:
          state.context.personal_protective_equipment?.protectiveEquipment,

        firefightingPrecaution: {
          otherPrecaution:
            state.context.firefighting_precaution?.otherPrecaution || "",
          ...state.context.firefighting_precaution?.firefightingPrecaution,
        },

        documents,
        mechanicalIsolationPrecaution:
          state.context.mechanical_precaution?.mechanicalPrecaution,

        electricalIsolationPrecaution:
          state.context.electrical_precaution?.electricalPrecaution,
        fromDate: state.context.adjust_date_time?.fromDate,
        fromTime:
          formatDateForBackend(
            state.context.adjust_date_time?.fromDate,
            state.context.adjust_date_time?.fromTime
          ) || "",
        toDate: state.context.adjust_date_time?.toDate,
        toTime:
          formatDateForBackend(
            state.context.adjust_date_time?.toDate,
            state.context.adjust_date_time?.toTime
          ) || "",
        authorizingAuthorityTimeAdjustment:
          state.context.adjust_date_time?.from_date === "" ? false : true,
      };

      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message:
            error.message ?? "Failed to approve permit, please try again",
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit approved successfully",
      });
    }

    submitForm();
  }, [state]);

  return (
    <div className="app-register__form">
      {loading ? (
        <>
          <>
            <div className="submit-container">
              <div className="">
                <div className="flex-center">
                  <img src="/svgs/in-progress.svg" alt="" />
                </div>
                <p className="submit-container__title"> Approving Permit ...</p>
                <br />
                <p className="submit-container__description">
                  Please wait as we process this permit.
                </p>
              </div>
            </div>
          </>
        </>
      ) : successful ? (
        <>
          <div className="submit-container">
            <div className="">
              <div className="flex-center">
                <img src="/svgs/successful.svg" alt="" />
              </div>
              <p className="submit-container__title">Permit Approved</p>
              <br />
              <p className="submit-container__description">
                You have successfully approved this permit.{" "}
              </p>
              <br />

              <div className="submit-container__button-container">
                <Button
                  variant="tertiary"
                  type="button"
                  onClick={() => route("/process-permits")}
                >
                  Home
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => route("/process-permits")}
                >
                  View Permit
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="submit-container">
            <div className="">
              <div className="flex-center">
                <img src="/svgs/submit-failed.svg" alt="" />
              </div>
              <p className="submit-container__title">Permit Approval Failed</p>
              <br />
              <p className="submit-container__description">
                An error occurred while processing this permit.
              </p>
              <br />

              <div className="submit-container__button-container">
                <Button
                  variant="tertiary"
                  type="button"
                  onClick={() => route("/process-permits")}
                >
                  Home
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => route("/process-permits")}
                >
                  Redo Permit
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
