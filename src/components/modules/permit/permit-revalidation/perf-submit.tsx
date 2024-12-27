import { useEffect, useState } from "react";
import Button from "../../../ui/button";
import { route } from "preact-router";

import { toast } from "../../../ui/toast";
import { usePermitDetails } from "../../../../context/permit-details.context";

import useRequest from "../../../../hooks/use-request";
import {
  approveRevalidationPerfSupervisor,
  approveRevalidationSafetyOfficer,
} from "../../../../assets/api/permit";

import { usePerfRevalidationContext } from "../../../../context/perf-revalidation-context";

export default function PerfRevalidationSubmit() {
  const currentPath = window.location.pathname;

  const { state } = usePerfRevalidationContext();
  const { makeRequest } = useRequest(
    currentPath === "/revalidate-safety-officer"
      ? approveRevalidationSafetyOfficer
      : approveRevalidationPerfSupervisor
  );

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const { permit } = usePermitDetails();
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

        // Keep "Doc" in the key names
        acc[`${camelCaseName}Type`] = doc.type;
        acc[`${camelCaseName}`] = doc.doc;

        return acc;
      }, {});

      const payload = {
        permitId: permit?.id,
        revalidateWorkAreaConfirmation:
          state.context.verification.revalidateWorkAreaConfirmation,
        documents,
      };

      const [_, error] = await makeRequest(payload);
      if (error) {
        setLoading(false);
        return toast({
          variant: "error",
          message:
            error.message ??
            "Failed to revalidate this permit, please try again",
        });
      }
      setLoading(false);
      setSuccessful(true);
      toast({
        variant: "success",
        message: "Permit Revalidation successful",
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
