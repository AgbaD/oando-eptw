import { useEffect, useState } from "react";

import { route } from "preact-router";

import Button from "../../../../ui/button";
import useRequest from "../../../../../hooks/use-request";

import { toast } from "../../../../ui/toast";
import { usePermitDetails } from "../../../../../context/permit-details.context";

import { usePerfRevalidationContext } from "../../../../../context/perf-revalidation-context";
import { closurePerfSupervisor } from "../../../../../assets/api/permit";

export function formatDateForBackend(fromDate, fromTime) {
  if (!fromDate || !fromTime) {
    throw new Error("Both fromDate and fromTime are required");
  }

  const timeISO = new Date(`1970-01-01T${fromTime}:00Z`).toISOString();

  return timeISO;
}

export default function PerfClosureSubmit() {
  const { state } = usePerfRevalidationContext();

  const { makeRequest } = useRequest(closurePerfSupervisor);

  const [loading, setLoading] = useState(false);

  const { permit } = usePermitDetails();

  useEffect(() => {
    async function submitForm() {
      setLoading(true);
      const payload = {
        permitId: permit?.id,
        closureWorkAreaConfirmation:
          state.context.verification.closureWorkAreaConfirmation,
        documents: {
          toolBoxStockDocType: "MANUAL",
          toolBoxStockDoc: "...",
        },
      };

      console.log(payload);

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
        message: "Permit closure approved successfully",
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
                  <p>Approving Permit Closure....</p>
                  <span>
                    Please be patient as we process the closure of this permit.
                  </span>
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
                  <p>Permit Closure Approved</p>
                  <span>
                    You have successfully approved this permit closure.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="app-submit-screen">
            <div className="app-register__form-footer">
              <Button
                variant="tertiary"
                type="button"
                onClick={() => route("/permit-management")}
              >
                Home
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => route("/process-permit")}
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
