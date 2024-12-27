import { useEffect, useState } from "react";
import Button from "../../../../../ui/button";
import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";
import { route } from "preact-router";

import useRequest from "../../../../../../hooks/use-request";
import { approveIssuingAuth } from "../../../../../../assets/api/permit";

import { toast } from "../../../../../ui/toast";
import { usePermitDetails } from "../../../../../../context/permit-details.context";

import "../../../submit.scss";

export default function Submit() {
  const { state } = useIssuingActivityContext();
  const { makeRequest } = useRequest(approveIssuingAuth);

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const { permit } = usePermitDetails();

  useEffect(() => {
    async function submitForm() {
      setLoading(true);

      const selectedHazards = state.context.work_hazards?.hazards || {};
      const filteredHazards = {};

      Object.entries(selectedHazards).forEach(([key, value]) => {
        console.log(key, value);
        if (value !== undefined) {
          filteredHazards[key] = value;
        }
      });

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

        // Keep "Doc" in the key names
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;

        return acc;
      }, {});

      const payload = {
        permitId: permit?.id,
        hazards: {
          potentialHazardDescription:
            state.context.work_hazards?.potentialHazardDescription || "",
          ...filteredHazards,
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
      };

      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        setSuccessful(false);
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
