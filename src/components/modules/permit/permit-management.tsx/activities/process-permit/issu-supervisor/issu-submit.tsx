import { useEffect, useState } from "react";

import { route } from "preact-router";

import { useIssuingSupervisorActivityContext } from "../../../../../../../context/issuing-supervisor-context";
import { toast } from "../../../../../../ui/toast";
import { useIDContext } from "../../../../../../../context/id.context";

import Button from "../../../../../../ui/button";

import { approveIssuingSupervisor } from "../../../../../../../assets/api/permit";
import useRequest from "../../../../../../../hooks/use-request";

function convertToISO8601(startTime) {
  const now = new Date();
  let datePart = now.toISOString().split("T")[0];

  if (startTime.trim() === "") {
    return now.toISOString();
  }

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(startTime)) {
    throw new Error(
      "Invalid time format. Please provide a valid time in 'HH:mm' format."
    );
  }

  const isoString = `${datePart}T${startTime}:00.000Z`;

  return isoString;
}

export default function IssuSupervisorProcessSubmit() {
  const { state } = useIssuingSupervisorActivityContext();
  const { makeRequest } = useRequest(approveIssuingSupervisor);

  const [loading, setLoading] = useState(false);
  const { valueID } = useIDContext();

  const permitId = valueID;

  useEffect(() => {
    async function submitForm() {
      const approvedTime: string = convertToISO8601(
        state.context.tool_kit_time?.startTime
      ).toString();

      console.log(typeof approvedTime);

      setLoading(true);
      const payload = {
        permitId: permitId,
        documents: {
          // gasClearanceCertType: "MANUAL",
          // gasClearanceCert: "...",
          // radiographyCertType: "MANUAL",
          // radiographyCert: "...",
          // confinedSpaceCertType: "MANUAL",
          // confinedSpaceCert: "...",
          // toolBoxStockType: "MANUAL",
          // toolBoxStockCert: "...",
        },
        toolBoxLeaderIdentity:
          state.context.tool_kit_time?.toolBoxLeaderIdentity,
        toolBoxPosition: state.context.tool_kit_time?.toolBoxPosition,
        startTime: approvedTime,

        issuingAuthoritySupervisorTimeAdjustment:
          state.context.tool_kit_time?.startTime === "" ? false : true,
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
        message: "Permit created successfully",
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
