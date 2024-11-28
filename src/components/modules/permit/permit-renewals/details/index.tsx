import useTabs from "../../../../../hooks/use-tabs";
import { Accordion, AccordionItem } from "../../../../ui/accordion";
import Header from "../../../../ui/page/header";
import Tabs from "../../../../ui/tabs";
import { PermitLevelStatus } from "../../details";
import SafetyOfficer from "./safety-officer";
import IssuingAuth from "./issuing-auth";
import useRequest from "../../../../../hooks/use-request";
import { getPermitRenewal } from "../../../../../assets/api/permit";
import { useRouter } from "preact-router";
import dayjs from "dayjs";

export default function PermitRenewalsDetails({}: any) {
  const [
    {
      matches: { id },
    },
  ] = useRouter();
  const { isLoading, response } = useRequest(getPermitRenewal, { id }, true);
  const permit = response?.data;
  const { activeTab, tabs } = useTabs([
    "Renewal Details",
    "Safety Officer",
    "Issuing Auth.",
  ]);

  return (
    <div className="app-ptw__details">
      <Header title="Permit Renewal Details" />

      <div className="app-section">
        <div
          className="app-ptw__header-status"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <h4>Safety Officer</h4>
            <PermitLevelStatus variant={permit?.safetyOfficerStatus} />
          </div>

          <div>
            <h4>Issuing Authority</h4>
            <PermitLevelStatus variant={permit?.issuringAuthoritySupStatus} />
          </div>
        </div>
      </div>

      <Tabs {...{ tabs }} />

      {permit ? (
        <>
          {activeTab === "Renewal Details" && (
            <div className="app-section">
              <Accordion show>
                <AccordionItem
                  title="Start Date & Time"
                  value={dayjs(permit.startDate).format(
                    "DD / MM / YYYY. HH:mm A"
                  )}
                />
                <AccordionItem
                  title="End Date & Time"
                  value={dayjs(permit.endDate).format(
                    "DD / MM / YYYY. HH:mm A"
                  )}
                />
                <AccordionItem
                  title="Name of Gas Tester"
                  value={permit.gasTesterName}
                />
                <AccordionItem
                  title="Date Gas Test"
                  value={dayjs(permit.gasTestDate).format(
                    "DD / MM / YYYY. HH:mm A"
                  )}
                />
                <AccordionItem title="23.5% > O2 < 19.5%t" value="MECHANICAL" />
                <AccordionItem title="CO" value={permit.o2Percentage} />
                <AccordionItem title="H2S < 2PPM" value={permit.h2s} />
                <AccordionItem title="L.E.L. < 10%" value={permit.lel} />
              </Accordion>

              <Accordion show>
                <AccordionItem
                  title="Date Created"
                  value={dayjs(permit.createdAt).format(
                    "DD / MM / YYYY. HH:mm A"
                  )}
                />
                <AccordionItem
                  title="Initiated by:"
                  value={`${permit.initiator.firstname} ${permit.initiator.lastname}`}
                />
                <AccordionItem title="PTW No." value={permit.permitId} />
              </Accordion>
            </div>
          )}

          {activeTab === "Safety Officer" && <SafetyOfficer {...{ permit }} />}

          {activeTab === "Issuing Auth." && <IssuingAuth {...{ permit }} />}
        </>
      ) : (
        <div className="base-empty">
          <img src="/svgs/document.svg" />
          <p>
            {isLoading
              ? "Fetching permit renewal details, please wait..."
              : "Failed to fetch, please try again"}
          </p>
        </div>
      )}
    </div>
  );
}
