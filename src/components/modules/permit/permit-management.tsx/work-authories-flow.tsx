import useTabs from "../../../../hooks/use-tabs";

import ReusableTabs from "../../../ui/resuableTabs";
import PerformingAuthorities from "./workflows/performing-authorities";
import IssuingAuthorities from "./workflows/issuing-authority";
import HSEAuthority from "./workflows/hse-authority";
import AuthAuthority from "./workflows/auth-authority";
import IssuAuthSupervisor from "./workflows/issu-auth-supervisor";
import PerfAuthSupervisor from "./workflows/perf-auth-supervisor";
import SafetyOfficer from "./workflows/safety-officer";
import { useIDContext } from "../../../../context/id.context";
import { useEffect, useState } from "preact/hooks";
import { createRequest } from "../../../../assets/api";

export default function WorkAuthoriesFlow({}: any) {
  const { valueID } = useIDContext();
  const id = valueID;

  const [permitDetails, setPermitDetails] = useState({});

  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
    }

    getPermitDetails();
  }, [valueID]);

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
        {activeTab === "HSE Auth" && <HSEAuthority />}
        {activeTab === "Authorizing Auth" && <AuthAuthority />}
        {activeTab === "Safety Officer" && <SafetyOfficer />}
        {activeTab === "Perf. Auth. Supervisor" && <PerfAuthSupervisor />}
        {activeTab === "Issuing. Auth. Supervisor" && <IssuAuthSupervisor />}
      </div>
    </div>
  );
}
