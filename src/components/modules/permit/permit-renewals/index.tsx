import useTabs from "../../../../hooks/use-tabs";
import DateFilter from "../../../ui/date/date-filter";
import Header from "../../../ui/page/header";
import Search from "../../../ui/page/search";
import Tabs from "../../../ui/tabs";
import PermitRenewalsList from "./permit-renewals-list";

export default function PermitRenewals({}: any) {
  const { tabs, activeTab } = useTabs([
    "All Permits",
    "Safety Officer",
    "Issuing Auth. Supervisor",
    "Approved",
    "Rejected",
  ]);

  return (
    <>
      <Header title="Permit Renewals" />

      <div className="app-section__header">
        <Search placeholder="Search by user name" onSearch={""} />
        <DateFilter variant="secondary" />
      </div>

      <Tabs {...{ tabs }} />

      {activeTab === "All Permits" && <PermitRenewalsList />}
      {activeTab === "Safety Officer" && <PermitRenewalsList flag="safety" />}
      {activeTab === "Issuing Auth. Supervisor" && (
        <PermitRenewalsList flag="issuing" />
      )}
      {activeTab === "Approved" && <PermitRenewalsList flag="approved" />}
      {activeTab === "Rejected" && <PermitRenewalsList flag="rejected" />}
    </>
  );
}
