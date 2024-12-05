import useTabs from "../../../../hooks/use-tabs";
import DateFilter from "../../../ui/date/date-filter";
import Header from "../../../ui/page/header";
import Tabs from "../../../ui/tabs";
import PermitsList from "./permit-list";

export default function WorkCompletions({}: any) {
  const { tabs, activeTab } = useTabs([
    "All Permits",
    "Safety Officer",
    "Issuing Auth. Supervisor",
    "Approved",
    "Rejected",
  ]);

  return (
    <>
      <Header title="Work Completions" />

      <div className="app-section__header">
        <DateFilter variant="secondary" />
      </div>

      <Tabs {...{ tabs }} />

      {activeTab === "All Permits" && <PermitsList />}
      {activeTab === "Safety Officer" && <PermitsList flag="safety" />}
      {activeTab === "Issuing Auth. Supervisor" && (
        <PermitsList flag="issuing" />
      )}
      {activeTab === "Approved" && <PermitsList flag="approved" />}
      {activeTab === "Rejected" && <PermitsList flag="rejected" />}
    </>
  );
}
