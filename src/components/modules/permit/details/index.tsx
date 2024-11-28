import useTabs from "../../../../hooks/use-tabs";
import Icon from "../../../ui/icon";
import Header from "../../../ui/page/header";
import Tabs from "../../../ui/tabs";
import HseAuth from "./hse-auth";
import IssuingAuth from "./issuing-auth";
import PtwDetails from "./ptw-details";
import "./index.scss";
import useRequest from "../../../../hooks/use-request";
import { getPermit } from "../../../../assets/api/permit";
import { route, useRouter } from "preact-router";
import AuthorizingAuthority from "./authorizing-auth";
import Button from "../../../ui/button";
import OnsiteComments from "./onsite-comments";
import dayjs from "dayjs";
import WorkContinuation from "./work-cotinuation-btn";

export default function PermitToWorkDetails({}: any) {
  const router = useRouter();
  const ptwId = router[0].matches.id;
  const { response, isLoading } = useRequest(getPermit, { id: ptwId }, true);
  const permit = response?.data;
  const rawTabs = [
    "PTW Details",
    "Issuing Auth",
    "HSE Auth",
    "Authorizing Auth",
  ];
  if (permit?.status === "APPROVED") rawTabs.push("Onsite Notes & Comments");
  const isInProgress = dayjs().isBefore(dayjs(permit?.validityendDate));
  const { activeTab, tabs } = useTabs(rawTabs);

  return (
    <div className="app-ptw__details">
      <Header title="Permit Details" />

      {permit?.status === "APPROVED" && (
        <div className="app-ptw__print">
          <div>
            <h3>Print Permit</h3>
            <p>Click the button to get a hardcopy version of this permit</p>
          </div>
          <Button variant="primary" dimension="md">
            <Icon name="print" />
            Print Permit
          </Button>
        </div>
      )}

      <div className="app-section">
        <div className="app-ptw__header-status">
          <div>
            <h4>Issuing Authority</h4>
            <PermitLevelStatus variant={permit?.issuringAuthorityStatus} />
          </div>

          <div>
            <h4>HSE Authority</h4>
            <PermitLevelStatus variant={permit?.hseAuthorityStatus} />
          </div>

          <div>
            <h4>Authorizing Authority</h4>
            <PermitLevelStatus variant={permit?.authorizingAuthorityStatus} />
          </div>
        </div>
      </div>

      <Tabs {...{ tabs }} />

      <WorkContinuation {...{ permit }} />

      {permit?.status === "COMPLETED" ? (
        //  && !isInProgress?
        <div className="app-ptw__renew">
          <div>
            <h3>Renew This Permit</h3>
            <p>Click the button for permit renewal</p>
          </div>
          <Button
            variant="primary"
            dimension="md"
            onClick={() => route(`/permit-management/ptw/renew/${permit?.id}`)}
          >
            <Icon name="renew" />
            Renew Permit
          </Button>
        </div>
      ) : null}

      {permit ? (
        <>
          {activeTab === "PTW Details" && <PtwDetails {...{ permit, isInProgress }} />}
          {activeTab === "Issuing Auth" && <IssuingAuth {...{ permit }} />}
          {activeTab === "HSE Auth" && <HseAuth {...{ permit }} />}
          {activeTab === "Authorizing Auth" && <AuthorizingAuthority {...{ permit }} />}
          {activeTab === "Onsite Notes & Comments" && <OnsiteComments {...{ permit }} />}
        </>
      ) : (
        <div className="base-empty">
          <img src="/svgs/document.svg" />
          <p>
            {isLoading
              ? "Fetching permit details, please wait..."
              : "Failed to fetch, please try again"}
          </p>
        </div>
      )}
    </div>
  );
}

export function PermitLevelStatus({ variant }) {
  if (variant?.toLowerCase() === "approved") {
    return (
      <span data-variant={variant.toLowerCase()}>
        <Icon name="approved" />
        Approved
      </span>
    );
  }

  if (variant?.toLowerCase() === "rejected") {
    return (
      <span data-variant={variant.toLowerCase()}>
        <Icon name="rejected" />
        Rejected
      </span>
    );
  }

  if (variant?.toLowerCase() === "in_progress") {
    return (
      <span data-variant={variant.toLowerCase()}>
        <Icon name="clock" />
        In Progress
      </span>
    );
  }

  return (
    <span data-variant={variant?.toLowerCase() || "awaiting"}>
      <Icon name="pending" />
      Awaiting
    </span>
  );
}
