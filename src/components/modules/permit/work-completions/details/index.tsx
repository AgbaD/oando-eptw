import useTabs from "../../../../../hooks/use-tabs";
import { Accordion, AccordionItem } from "../../../../ui/accordion";
import Header from "../../../../ui/page/header";
import Tabs from "../../../../ui/tabs";
import { PermitLevelStatus } from "../../details";
import HseOfficer from "./hse-officer";
import IssuingAuth from "./issuing-auth";
import useRequest from "../../../../../hooks/use-request";
import { getPermit } from "../../../../../assets/api/permit";
import { useRouter } from "preact-router";
import dayjs from "dayjs";

export default function WorkCompletionDetails({}: any) {
  const [
    {
      matches: { id },
    },
  ] = useRouter();
  const { isLoading, response } = useRequest(getPermit, { id }, true);
  const permit = response?.data;
  const { activeTab, tabs } = useTabs([
    "Completion Request",
    "HSE Officer",
    "Issuing Auth. Supervisor",
  ]);

  return (
    <div className="app-ptw__details">
      <Header title="Work Completion Details" />

      <div className="app-section">
        <div
          className="app-ptw__header-status"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <h4>HSE Officer</h4>
            <PermitLevelStatus variant={permit?.completionHseOfficerStatus} />
          </div>

          <div>
            <h4>Issuing Authority Supervisor</h4>
            <PermitLevelStatus variant={permit?.completionIssuringAuthSupStatus} />
          </div>
        </div>
      </div>

      <Tabs {...{ tabs }} />

      {permit ? (
        <>
          {activeTab === "Completion Request" && (
            <div className="app-section">
              <Accordion show>
                <AccordionItem title="Initiated by:" value="MECHANICAL" />
                <AccordionItem
                  title="Date Requested"
                  value={dayjs(permit.completionRequestDate).format(
                    "DD MMM YYYY. HH:mm A"
                  )}
                />
                <AccordionItem title="PTW No." value={permit.id} />
              </Accordion>
            </div>
          )}

          {activeTab === "HSE Officer" && <HseOfficer {...{ permit }} />}

          {activeTab === "Issuing Auth. Supervisor" && (
            <IssuingAuth {...{ permit }} />
          )}
        </>
      ) : (
        <div className="base-empty">
          <img src="/svgs/document.svg" />
          <p>
            {isLoading
              ? "Fetching permit Completion Request, please wait..."
              : "Failed to fetch, please try again"}
          </p>
        </div>
      )}
    </div>
  );
}
