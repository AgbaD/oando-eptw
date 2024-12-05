import { getContinuationPermits } from "../../../../assets/api/permit";
import useTabs from "../../../../hooks/use-tabs";
import DateFilter from "../../../ui/date/date-filter";
import Header from "../../../ui/page/header";
import Tabs from "../../../ui/tabs";
import PermitsList from "./permit-list";

export default function WorkSuspensions({}: any) {
  const { tabs, activeTab } = useTabs(["SUSPENDED WORKS", "WORK CONTINUATION"]);

  return (
    <>
      <Header title="Work Completions" />

      <div className="app-section__header">
        <DateFilter variant="secondary" />
      </div>

      <Tabs {...{ tabs }} />

      {activeTab === "SUSPENDED WORKS" && <PermitsList />}
      {activeTab === "WORK CONTINUATION" && <WorkContinuations />}
    </>
  );
}

function WorkContinuations() {
  const { tabs, activeTab } = useTabs([
    "All Requests",
    "HSE Officer",
    "Issuing Auth. Supervisor",
    "Approved",
  ]);

  return (
    <>
      <Tabs {...{ tabs }} />
      {activeTab === "All Requests" && (
        <PermitsList
          api={getContinuationPermits}
          flag="all"
          detailsLink="/permit-suspensions/continuation/"
        />
      )}
      {activeTab === "HSE Officer" && (
        <PermitsList
          api={getContinuationPermits}
          flag="hse"
          detailsLink="/permit-suspensions/continuation/"
        />
      )}
      {activeTab === "Issuing Auth. Supervisor" && (
        <PermitsList
          api={getContinuationPermits}
          flag="issuing"
          detailsLink="/permit-suspensions/continuation/"
        />
      )}
      {activeTab === "Approved" && (
        <PermitsList
          api={getContinuationPermits}
          flag="approved"
          detailsLink="/permit-suspensions/continuation/"
        />
      )}
    </>
  );
}
