import { useEffect, useState } from "react";

import { route } from "preact-router";

import useRequest from "../../../../../../../hooks/use-request";
import { approveSafetyOfficer } from "../../../../../../../assets/api/permit";

import { usePerfSupervisorActivityContext } from "../../../../../../../context/perf-supervisor-activity.context";

import { useIDContext } from "../../../../../../../context/id.context";

import { toast } from "../../../../../../ui/toast";
import Button from "../../../../../../ui/button";

export default function SafetyOfficerProcessSubmit() {
  const { state } = usePerfSupervisorActivityContext();
  const { makeRequest } = useRequest(approveSafetyOfficer);

  const [loading, setLoading] = useState(false);
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

        acc[`${camelCaseName.replace(/Doc$/i, "")}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;
        return acc;
      }, {});

      const payload = {
        permitId: permitId,
        documents,
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
      route("/permit-activities");
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
