import useTabs from "../../../../hooks/use-tabs";

import ReusableTabs from "../../../ui/resuableTabs";
import PerformingAuthorities from "./workflows/performing-authorities";
import IssuingAuthorities from "./workflows/issuing-authority";
import HSEAuthority from "./workflows/hse-authority";
import AuthAuthority from "./workflows/auth-authority";
import IssuAuthSupervisor from "./workflows/issu-auth-supervisor";
import PerfAuthSupervisor from "./workflows/perf-auth-supervisor";
import SafetyOfficer from "./workflows/safety-officer";

import { usePermitDetails } from "../../../../context/permit-details.context";

export default function WorkAuthoriesFlow({}: any) {
  const { permit } = usePermitDetails();
  const permitDetails = permit;

  console.log(permitDetails);

  console.log(permitDetails, "permitDetails");

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
        {activeTab === "Performing Auth." && (
          <PerformingAuthorities response={permitDetails} />
        )}
        {activeTab === "Issuing Auth" && (
          <IssuingAuthorities response={permitDetails} />
        )}
        {activeTab === "HSE Auth" && <HSEAuthority response={permitDetails} />}
        {activeTab === "Authorizing Auth" && (
          <AuthAuthority response={permitDetails} />
        )}
        {activeTab === "Safety Officer" && (
          <SafetyOfficer response={permitDetails} />
        )}
        {activeTab === "Perf. Auth. Supervisor" && (
          <PerfAuthSupervisor response={permitDetails} />
        )}
        {activeTab === "Issuing. Auth. Supervisor" && (
          <IssuAuthSupervisor response={permitDetails} />
        )}
      </div>
    </div>
  );
}
