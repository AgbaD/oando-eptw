import { useEffect, useState } from "react";
import Button from "../../../../../ui/button";
import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";
import { route } from "preact-router";

import useRequest from "../../../../../../hooks/use-request";
import { approveIssuingAuth } from "../../../../../../assets/api/permit";

import { toast } from "../../../../../ui/toast";
import { usePermitDetails } from "../../../../../../context/permit-details.context";

export default function Submit() {
  const { state } = useIssuingActivityContext();
  const { makeRequest } = useRequest(approveIssuingAuth);

  const [loading, setLoading] = useState(false);

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

        acc[`${camelCaseName.replace(/Doc$/i, "")}Type`] = doc.type;
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

        firefightingPrecaution:
          state.context.firefighting_equipment?.firefightingEquipment,

        documents,
        mechanicalIsolationPrecaution:
          state.context.mechanical_precaution?.mechanicalPrecaution,

        electricalIsolationPrecaution:
          state.context.electrical_precaution?.electricalPrecaution,
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
      route("/process-permits");
      toast({
        variant: "success",
        message: "Permit approved successfully",
      });
      setLoading(false);
    }

    submitForm();
  }, [state]);

  return (
    <div className="app-register__form">
      {loading ? (
        <>
          <div className="app-submit-screen">
            <div className="">
              <div className="flex center">
                <img src="/svgs/successful.svg" />
              </div>

              <div className="flex-center">
                <div className="">
                  <p>Approving Permit ....</p>
                  <span>Please be patient as we approve this permit.</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="app-submit-screen">
            <div className="">
              <div className="flex center">
                <img src="/svgs/successful.svg" />
              </div>

              <div className="flex-center">
                <div className="">
                  <p>Permit Approved</p>
                  <span>You have successfully approved this permit.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="app-submit-screen">
            <div className="app-register__form-footer">
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
        </>
      )}
    </div>
  );
}
