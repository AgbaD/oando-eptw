import useTabs from "../../../../../hooks/use-tabs";
import ReusableTabs from "../../../../ui/resuableTabs";
import Icon from "../../../../ui/icon";
import Header from "../../../../ui/page/header";
import PerformingAuthActivities from "./performing-auth-activities";
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

interface PermitDetails {
  status: string;
  [key: string]: any;
}

export default function ProcessPermitsIndex({}: any) {
  const { valueID, setID } = useIDContext();
  const id = valueID;

  const { updatePermit } = usePermitDetails();

  const [permitDetails, setPermitDetails] = useState<PermitDetails>({
    status: "",
  });

  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
      updatePermit(permitData);
      setID(permitData.id);
    }

    getPermitDetails();
  }, [id]);

  const { tabs, activeTab } = useTabs([
    "Performing Auth.",
    "Issuing Auth",
    "HSE Auth",
    "Authorizing Auth",
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
        <div className="actions">
          {permitDetails?.status === "NOT_STARTED" ? (
            <>
              <div className="print">
                <div>
                  <h4>Process Permit</h4>
                  <p>Click the button to process / approve this permit</p>{" "}
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
                  <p>Click the button to reactive this permit</p>{" "}
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
          ) : (
            <>
              <div className="closure">
                <div>
                  <h4>Process Closure</h4>
                  <p>
                    Click the button to request closure for this permit
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
      </div>
      <br />
      <div className={"app-authorities"}>
        <ReusableTabs
          {...{ tabs, counts, className: "app-authorities__tabs" }}
        />

        <div className="app-authorities__content">
          {activeTab === "Performing Auth." && (
            <PerformingAuthActivities response={permitDetails} />
          )}
          {activeTab === "Issuing Auth" && (
            <IssuingAuthorities response={permitDetails} />
          )}
          {activeTab === "HSE Auth" && <HSEAuthority />}
          {activeTab === "Authorizing Auth" && <AuthAuthority />}
          {activeTab === "Perf. Auth. Supervisor" && <PerfAuthSupervisor />}
          {activeTab === "Safety Officer" && <SafetyOfficer />}
          {activeTab === "Issuing. Auth. Supervisor" && <IssuAuthSupervisor />}
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
