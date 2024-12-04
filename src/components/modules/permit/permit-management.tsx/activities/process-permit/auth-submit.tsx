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
  const { valueID } = useIDContext();

  const permitId = valueID;

  useEffect(() => {
    async function submitForm() {
      setLoading(true);
      const payload = {
        permitId: permitId,
        hazards: {
          potentialHazardDescription:
            state.context.work_hazards?.potentialHazardDescription || "",
          ...state.context.work_hazards?.hazards,
        },
        protectiveEquipment:
          state.context.personal_protective_equipment?.protectiveEquipment,

        firefightingPrecaution:
          state.context.firefighting_equipment?.firefightingEquipment,

        documents: {
          gasClearanceCertType: "MANUAL",
          gasClearanceCert: "...",
          scaffoldingCertType: "MANUAL",
          scaffoldingCert: "...",
          mewpCertType: "MANUAL",
          mewpCert: "...",
          manBasketCertType: "MANUAL",
          manBasketCert: "...",
        },
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
