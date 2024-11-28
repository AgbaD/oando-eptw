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
export default function RevalidatePermitIndex({}: any) {
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

  const handleNavigate = () => {
    route("/revalidate-perf-auth");
  };
  return (
    <>
      {" "}
      <Header title="Activities" />
      <br />
      <div className={"app-permit__sections"}>
        <div className="actions">
          <div className="print">
            <div>
              <h4>Revalidation Requested</h4>
              <p>
                Click the button to process the revalidate of this permit
              </p>{" "}
            </div>

            <button className={"flex-center"} onClick={handleNavigate}>
              <Icon name="process" />
              Process Revalidation
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
