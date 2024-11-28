import useTabs from "../../../../hooks/use-tabs";
import Header from "../../../ui/page/header";

import ReusableTabs from "../../../ui/resuableTabs";

import PermitActionHistory from "../permit-management.tsx/permit-action-history";
import WorkAuthoriesFlow from "../permit-management.tsx/work-authories-flow";

import "./monitoring.scss";
import { useEffect, useState } from "preact/hooks";

import Icon from "../../../ui/icon";
import { route } from "preact-router";
import AddOnsiteComments from "./add-onsite-comments";

export default function MonitoringDetailsIndex({}: any) {
  const { tabs, activeTab } = useTabs([
    "PTW Details",
    "Action History",
    "Onsite Notes & Comments",
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

  const initialTime = 12 * 60 * 60; // 12 hours in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    // Start the interval
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Reset the timer when it expires
          return initialTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Convert seconds into HH:MM:SS format
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours} h: ${minutes} m: ${seconds} s`;
  };

  const handleNavigate = () => {
    route("/revalidate-permit");
  };

  return (
    <>
      <Header title="Monitoring" />

      <div className="countdown-status">
        <div className="">
          <p className="countdown-status__title">
            Countdown to Automatic Revalidation
          </p>
          <h5 className="countdown-status__timer">{formatTime(timeLeft)}</h5>
        </div>
      </div>

      <div className={"app-permit__sections"}>
        <div className="actions">
          <div className="print">
            <div>
              <h4>Request For Revalidation</h4>
              <p>Click the button to request validation for this permit</p>{" "}
            </div>

            <button className={"flex-center"} onClick={handleNavigate}>
              <Icon name="export" />
              Revalidate Permit
            </button>
          </div>
        </div>
      </div>

      <ReusableTabs {...{ tabs, counts, className: "app-permit__tabs" }} />

      {activeTab === "PTW Details" && <WorkAuthoriesFlow />}
      {activeTab === "Action History" && <PermitActionHistory />}
      {activeTab === "Onsite Notes & Comments" && <AddOnsiteComments />}
    </>
  );
}
