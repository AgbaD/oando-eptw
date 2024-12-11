import useTabs from "../../../../../hooks/use-tabs";
import ReusableTabs from "../../../../ui/resuableTabs";
import Icon from "../../../../ui/icon";
import Header from "../../../../ui/page/header";

import IssuingAuthorities from "../workflows/issuing-authority";
import HSEAuthority from "../workflows/hse-authority";
import AuthAuthority from "../workflows/auth-authority";
import PerfAuthSupervisor from "../workflows/perf-auth-supervisor";
import { route } from "preact-router";

import SafetyOfficer from "../workflows/safety-officer";
import IssuAuthSupervisor from "../workflows/issu-auth-supervisor";

import { useIDContext } from "../../../../../context/id.context";
import { useState, useEffect } from "preact/hooks";
import { createRequest } from "../../../../../assets/api";
import { usePermitDetails } from "../../../../../context/permit-details.context";

import PopupModal from "../../../../ui/popup";
import { toast } from "../../../../ui/toast";
import PerformingAuthorities from "../workflows/performing-authorities";
import { useUserContext } from "../../../../../context/user.context";

interface PermitDetails {
  status: string;
  [key: string]: any;
}

export default function ProcessPermitsIndex({}: any) {
  const { valueID, setID } = useIDContext();
  const id = valueID;

  const { updatePermit } = usePermitDetails();
  const { profile } = useUserContext();

  const [permitDetails, setPermitDetails] = useState<PermitDetails>({
    status: "",
  });

  const [canRenderActions, setCanRenderActions] = useState(false); // State to control rendering.

  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;

      console.log(permitData);
      setPermitDetails(permitData);
      updatePermit(permitData);
      setID(permitData.id);
      const userRole = permitData?.permitRoles?.[profile?.id];
      if (userRole && userRole === permitData?.currentAuthority) {
        setCanRenderActions(true);
      } else {
        setCanRenderActions(false);
      }
    }

    getPermitDetails();
  }, [id, profile?.id]);

  console.log(permitDetails, "permit details");
  console.log(permitDetails?.isSentBack, "boolean");

  const { tabs, activeTab } = useTabs([
    "Performing Auth.",
    "Issuing Auth.",
    "HSE Auth.",
    "Authorizing Auth.",
    "Perf. Auth. Supervisor",
    "Safety Officer",
    "Issuing. Auth. Supervisor",
  ]);

  const counts = {
    // "All Permits": 120,
    // "Issuing Auth": 60,
    // "HSE Auth": 60,
    // "Authorizing Auth": 60,
    // "Safety Off": 60,
    // Approved: 60,
    // Rejected: 60,
  };

  const handleNavigate = (data) => {
    switch (data.currentAuthority) {
      case "ISSUING":
        route("/activities-process");
        break;
      case "HSE":
        route("/activities-process/hse");
        break;
      case "AUTHORIZING":
        route("/activities-process/auth");
        break;
      case "PERFORMING_SUPERVISOR":
        route("/activities-process/perf-supervisor");
        break;
      case "SAFETY_OFFICER":
        route("/activities-process/safety-officer");
        break;
      case "ISSUING_SUPERVISOR":
        route("/activities-process/issu-supervisor");
        break;
      default:
        route("/activities-process");
        break;
    }
  };

  const handleClosureNavigate = (data) => {
    switch (data.currentAuthority) {
      case "PERFORMING_SUPERVISOR":
        route("/closure-perf-auth");
        break;

      case "SAFETY_OFFICER":
        route("/closure-safety-officer");
        break;

      case "ISSUING_SUPERVISOR":
        route("/closure-issuing-supervisor");
        break;

      default:
        route("/closure-perf-auth");
    }
  };

  const handleRevalidateNavigate = (data) => {
    switch (data.currentAuthority) {
      case "PERFORMING_SUPERVISOR":
        route("/revalidate-perf-auth");
        break;

      case "SAFETY_OFFICER":
        route("/revalidate-safety-officer");
        break;

      case "ISSUING_SUPERVISOR":
        route("/revalidate-issuing-supervisor");
        break;

      default:
        route("/revalidate-perf-auth");
    }
  };

  const [reactivatePermitPopup, setReactivatePermitPopup] = useState(false);

  const handleReactivate = () => {
    setReactivatePermitPopup(true);
  };

  const handleReactivePermit = async () => {
    const id = permitDetails?.id;

    try {
      const response = await createRequest(`/permit/reactivate/${id}`, "PUT");
      console.log(response);

      toast({
        variant: "success",
        message: "Permit reactivated successfully.",
      });
    } catch (error) {
      toast({
        variant: "error",
        message: error?.response?.error ?? "Failed to reactivate permit.",
      });
    }

    setReactivatePermitPopup(false);
  };

  return (
    <>
      {" "}
      <Header title="Activities" />
      <br />
      <div className={"app-permit__sections"}>
        {canRenderActions ? (
          <div className="actions">
            {permitDetails?.isSentBack === true ? (
              <>
                <div className="print">
                  <div>
                    <h4>
                      Permit Sent back from {permitDetails?.sendBackAuthority}
                    </h4>
                    <p>{permitDetails?.sendBackReason}</p>{" "}
                  </div>

                  <button
                    className={"flex-center"}
                    onClick={() => handleNavigate(permitDetails)}
                  >
                    <Icon name="process" />
                    Process Permit
                  </button>
                </div>
              </>
            ) : permitDetails?.status === "NOT_STARTED" &&
              permitDetails?.isSentBack === false ? (
              <>
                <div className="print">
                  <div>
                    <h4>Process Permit</h4>
                    <p>
                      Click the button to process / approve this permit
                    </p>{" "}
                  </div>

                  <button
                    className={"flex-center"}
                    onClick={() => handleNavigate(permitDetails)}
                  >
                    <Icon name="process" />
                    Process Permit
                  </button>
                </div>
              </>
            ) : permitDetails?.status === "REVALIDATION_INITIATED" ? (
              <>
                <div className="print">
                  <div>
                    <h4>Revalidate Permit</h4>
                    <p>Click the button to revalidate this permit</p>{" "}
                  </div>

                  <button
                    className={"flex-center"}
                    onClick={() => handleRevalidateNavigate(permitDetails)}
                  >
                    <Icon name="process" />
                    Revalidate Permit
                  </button>
                </div>
              </>
            ) : permitDetails?.status === "SUSPENDED" ? (
              <>
                <div className="print">
                  <div>
                    <h4>Permit Suspended</h4>
                    <p>Click the button to reactivate this permit</p>{" "}
                  </div>

                  <button
                    className={"flex-center"}
                    onClick={() => handleReactivate()}
                  >
                    <Icon name="export" />
                    Reactivate Permit
                  </button>
                </div>
              </>
            ) : permitDetails?.status === "CANCELATION_INITIATED" ? (
              <>
                <div className="closure">
                  <div>
                    <h4>Process Cancellation</h4>
                    <p>
                      Click the button to process cancellation for this permit
                    </p>{" "}
                  </div>

                  <button
                    className={"flex-center"}
                    onClick={() => handleClosureNavigate(permitDetails)}
                  >
                    <Icon name="export" />
                    Process Cancellation
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="closure">
                  <div>
                    <h4>Process Closure</h4>
                    <p>
                      Click the button to proess closure for this permit
                    </p>{" "}
                  </div>

                  <button
                    className={"flex-center"}
                    onClick={() => handleClosureNavigate(permitDetails)}
                  >
                    <Icon name="export" />
                    Process Closure
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="actions">
            <div className="print">
              <div>
                <h4>Approval in Progress</h4>
                <p>
                  This permit is currently being processed by another authority.
                  Please check the permit status for further details.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
      <div className={"app-authorities"}>
        <ReusableTabs
          {...{ tabs, counts, className: "app-authorities__tabs" }}
        />

        <div className="app-authorities__content">
          {activeTab === "Performing Auth." && (
            <PerformingAuthorities response={permitDetails} />
          )}
          {activeTab === "Issuing Auth." && (
            <IssuingAuthorities response={permitDetails} />
          )}
          {activeTab === "HSE Auth." && (
            <HSEAuthority response={permitDetails} />
          )}
          {activeTab === "Authorizing Auth." && (
            <AuthAuthority response={permitDetails} />
          )}
          {activeTab === "Perf. Auth. Supervisor" && (
            <PerfAuthSupervisor response={permitDetails} />
          )}
          {activeTab === "Safety Officer" && (
            <SafetyOfficer response={permitDetails} />
          )}
          {activeTab === "Issuing. Auth. Supervisor" && (
            <IssuAuthSupervisor response={permitDetails} />
          )}
        </div>

        <div className="">
          {reactivatePermitPopup && (
            <PopupModal
              icon={<img src="/svgs/reactivate.svg" />} // Pass your custom icon here
              title="Reactivate Permit"
              message="Are you sure you want to reactivate this permit? This action cannot be undone."
              onClose={() => setReactivatePermitPopup(false)}
              primaryButton={{
                label: "Confirm",
                onClick: handleReactivePermit,
                color: "#008171",
              }}
              secondaryButton={{
                label: "Cancel",
                onClick: () => setReactivatePermitPopup(false),
                color: "#E86E18",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
