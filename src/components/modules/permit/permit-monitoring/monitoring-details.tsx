import useTabs from "../../../../hooks/use-tabs";

import ReusableTabs from "../../../ui/resuableTabs";
import PerformingAuthorities from "../permit-management.tsx/workflows/performing-authorities";
import IssuingAuthorities from "../permit-management.tsx/workflows/issuing-authority";
import HSEAuthority from "../permit-management.tsx/workflows/hse-authority";
import AuthAuthority from "../permit-management.tsx/workflows/auth-authority";
import IssuAuthSupervisor from "../permit-management.tsx/workflows/issu-auth-supervisor";
import PerfAuthSupervisor from "../permit-management.tsx/workflows/perf-auth-supervisor";
import SafetyOfficer from "../permit-management.tsx/workflows/safety-officer";

export default function MonitoringDetails({}: any) {
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
  return (
    <div className={"app-authorities"}>
      <ReusableTabs {...{ tabs, counts, className: "app-authorities__tabs" }} />

      <div className="app-authorities__content">
        {activeTab === "Performing Auth." && <PerformingAuthorities />}
        {activeTab === "Issuing Auth" && <IssuingAuthorities />}
        {activeTab === "HSE Auth" && <HSEAuthority />}
        {activeTab === "Authorizing Auth" && <AuthAuthority />}
        {activeTab === "Safety Officer" && <SafetyOfficer />}
        {activeTab === "Perf. Auth. Supervisor" && <PerfAuthSupervisor />}
        {activeTab === "Issuing. Auth. Supervisor" && <IssuAuthSupervisor />}
      </div>
    </div>
  );
}
