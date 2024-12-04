import IssuingAuthorities from "../permit-management.tsx/workflows/issuing-authority";
import HSEAuthority from "../permit-management.tsx/workflows/hse-authority";
import AuthAuthority from "../permit-management.tsx/workflows/auth-authority";
import PerfAuthSupervisor from "../permit-management.tsx/workflows/perf-auth-supervisor";
import { route } from "preact-router";

import Icon from "../../../ui/icon";
import Header from "../../../ui/page/header";
import ReusableTabs from "../../../ui/resuableTabs";
import useTabs from "../../../../hooks/use-tabs";
import PerformingAuthActivities from "../permit-management.tsx/activities/performing-auth-activities";
import SafetyOfficer from "../permit-management.tsx/workflows/safety-officer";
import IssuAuthSupervisor from "../permit-management.tsx/workflows/issu-auth-supervisor";
import { useIDContext } from "../../../../context/id.context";
import { useEffect, useState } from "preact/hooks";

import { createRequest } from "../../../../assets/api";

export default function ClosurePermitIndex({}: any) {
  const { valueID, setID } = useIDContext();
  const id = valueID;

  const [permitDetails, setPermitDetails] = useState({});
  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
      setID(permitData.id);
    }

    getPermitDetails();
  }, [valueID]);

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

  const handleNavigate = (data: any) => {
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
        break;
    }
  };
  return (
    <>
      {" "}
      <Header title="Activities" />
      <br />
      <div className={"app-permit__sections"}>
        <div className="actions">
          <div className="closure">
            <div>
              <h4>Closure Requested</h4>
              <p>Click the button to process the closure of this permit</p>{" "}
            </div>

            <button
              className={"flex-center"}
              onClick={() => handleNavigate(permitDetails)}
            >
              <Icon name="process" />
              Process Closure
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className={"app-authorities"}>
        <ReusableTabs
          {...{ tabs, counts, className: "app-authorities__tabs" }}
        />

        <div className="app-authorities__content">
          {activeTab === "Performing Auth." && <PerformingAuthActivities />}
          {activeTab === "Issuing Auth" && <IssuingAuthorities />}
          {activeTab === "HSE Auth" && <HSEAuthority />}
          {activeTab === "Authorizing Auth" && <AuthAuthority />}
          {activeTab === "Perf. Auth. Supervisor" && <PerfAuthSupervisor />}
          {activeTab === "Safety Officer" && <SafetyOfficer />}
          {activeTab === "Issuing. Auth. Supervisor" && <IssuAuthSupervisor />}
        </div>
      </div>
    </>
  );
}
