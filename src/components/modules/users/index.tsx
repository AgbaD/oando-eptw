import Button from "../../ui/button";
import Icon from "../../ui/icon";

import useTabs from "../../../hooks/use-tabs";
import ReusableTabs from "../../ui/resuableTabs";
import InternalUsers from "./internal-users";
import Header from "../../ui/page/header";
import Company from "./company";

export default function Users({}: any) {
  const { tabs, activeTab } = useTabs(["Internal Users", "External Users"]);

  const counts = {
    // "Internal Users": 120,
    // "External Users": 60,
  };

  return (
    <>
      <Header title="Users" />

      <div className="app-section__header">
        {/* <Tabs {...{ tabs }} /> */}
        <ReusableTabs {...{ tabs, counts, className: "reuseable-base-tabs" }} />

        <Button
          href={
            activeTab === "Internal Users"
              ? "/users/create-internal"
              : "/users/create-company"
          }
          variant="primary"
          dimension="md"
        >
          <Icon name="plus" />
          {activeTab === "Internal Users" ? "Create New User" : "Add  Company"}
        </Button>
      </div>

      {activeTab === "Internal Users" && <InternalUsers />}
      {activeTab === "External Users" && <Company />}
    </>
  );
}
