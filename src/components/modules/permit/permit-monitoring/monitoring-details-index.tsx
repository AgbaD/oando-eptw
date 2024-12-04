import useTabs from "../../../../hooks/use-tabs";
import Header from "../../../ui/page/header";

import ReusableTabs from "../../../ui/resuableTabs";

import PermitActionHistory from "../permit-management.tsx/permit-action-history";
import WorkAuthoriesFlow from "../permit-management.tsx/work-authories-flow";

import "./monitoring.scss";
import { useState } from "preact/hooks";

import Icon from "../../../ui/icon";
import { route } from "preact-router";
import AddOnsiteComments from "./add-onsite-comments";

import CountdownTimer from "./countdown-timer";
import useRequest from "../../../../hooks/use-request";
import {
  requestPermitClosure,
  requestPermitRevalidation,
} from "../../../../assets/api/permit";
import { toast } from "../../../ui/toast";

import PopupModal from "../../../ui/popup";
import { usePermitDetails } from "../../../../context/permit-details.context";

// interface PermitDetails {
//   from_date: string;
//   from_time: string;
//   to_date: string;
//   to_time: string;
//   [key: string]: any;
// }

export default function MonitoringDetailsIndex({}: any) {
  const { tabs, activeTab } = useTabs([
    "PTW Details",
    "Action History",
    "Onsite Notes & Comments",
  ]);

  const { permit } = usePermitDetails();
  console.log(permit);

  const counts = {
    // "All Permits": 120,
    // "Issuing Auth": 60,
    // "HSE Auth": 60,
    // "Authorizing Auth": 60,
    // "Safety Off": 60,
    // Approved: 60,
    // Rejected: 60,
  };

  const [closurePopup, setClosurePopup] = useState(false);
  const [revalidatePopup, setRevalidatePopup] = useState(false);

  const [isrevalidate, setIsRevalidate] = useState(false);

  const handleClosurePopup = (value: boolean) => {
    setClosurePopup(value);
  };

  const handleRevalidatePopup = (value: boolean) => {
    setIsRevalidate(true);
    setRevalidatePopup(value);
  };

  const { makeRequest } = useRequest(
    isrevalidate ? requestPermitRevalidation : requestPermitClosure
  );

  async function handleRequest(id) {
    console.log(id);
    const [_, err] = await makeRequest(id);
    if (err) {
      return toast({ variant: "error", message: err.message });
    } else {
      toast({ variant: "success", message: "Successful" });
    }
    setClosurePopup(false);
    setRevalidatePopup(false);
    route("/permit-management");
  }

  return (
    <>
      <Header title="Monitoring" />

      <div className="countdown-status">
        <div className="">
          <p className="countdown-status__title">
            Countdown to Automatic Revalidation
          </p>
          <h5 className="countdown-status__timer">
            <>
              {permit?.status === "CANCELED" || permit?.status === "CLOSED" ? (
                <p>00 h : 00 m : 00 s</p>
              ) : (
                <CountdownTimer
                  fromDate={permit?.fromDate}
                  fromTime={permit?.fromTime}
                  toDate={permit?.toDate}
                  toTime={permit?.toTime}
                />
              )}
            </>
          </h5>
        </div>
      </div>

      <div className={"app-permit__sections"}>
        <div className="actions">
          {permit?.type === "HOT_WORK" ? (
            <>
              <div className="closure">
                <div>
                  <h4>Request For Closure</h4>
                  <p>
                    Click the button to request closure for this permit
                  </p>{" "}
                </div>

                <button
                  className={"flex-center"}
                  onClick={() => handleClosurePopup(true)}
                >
                  <Icon name="export" />
                  Request Closure
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="print">
                <div>
                  <h4>Request For Revalidation</h4>
                  <p>
                    Click the button to request validation for this permit
                  </p>{" "}
                </div>

                <button
                  className={"flex-center"}
                  onClick={() => handleRevalidatePopup(true)}
                >
                  <Icon name="export" />
                  Revalidate Permit
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ReusableTabs {...{ tabs, counts, className: "app-permit__tabs" }} />

      {activeTab === "PTW Details" && <WorkAuthoriesFlow />}
      {activeTab === "Action History" && <PermitActionHistory />}
      {activeTab === "Onsite Notes & Comments" && <AddOnsiteComments />}

      <div className="">
        {closurePopup && (
          <PopupModal
            icon={<img src="" />} // Pass your custom icon here
            title="Request Closure of Permit"
            message=""
            onClose={() => setClosurePopup(false)}
            primaryButton={{
              label: "Request Closure",
              onClick: () => handleRequest(permit?.id),
              color: "#371071",
            }}
            secondaryButton={{
              label: "Cancel",
              onClick: () => handleClosurePopup(false),
              color: "#E86E18",
            }}
          />
        )}
      </div>

      <div className="">
        {revalidatePopup && (
          <PopupModal
            icon={<img src="" />} // Pass your custom icon here
            title="Request Revalidation of Permit"
            message=""
            onClose={() => setRevalidatePopup(false)}
            primaryButton={{
              label: "Request Revalidation",
              onClick: () => handleRequest(permit?.id),
              color: "#81374C",
            }}
            secondaryButton={{
              label: "Cancel",
              onClick: () => handleRevalidatePopup(false),
              color: "#E86E18",
            }}
          />
        )}
      </div>
    </>
  );
}
