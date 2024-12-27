import "../index.scss";
import "../../registration/index.scss";

import {
  useIssuingSupervisorRevalidationContext,
  IssuingRevalidationProvider,
} from "../../../../context/issuing-supervisor-revalidation-context";

import { Link } from "preact-router";

import Button from "../../../ui/button";
import { useState } from "preact/hooks";

import ViewPermitDetails from "../permit-management.tsx/activities/process-permit/view-permit-details";

import IssuingVerification from "./modules/issuing-supervisor-verification";
import IssuingSelectDocuments from "./modules/issuing-select-documents";
import IssuingUploadDocuments from "./modules/issuing-upload-documents";
import IssuingToolKitTime from "./modules/issuing-toolkit-time";
import IssuingRevalidationSubmit from "./issuing-supervisor-submit";

function Module() {
  const { state } = useIssuingSupervisorRevalidationContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS.indexOf(stateAsString) + 1;
  const stateMeta: any = Object.values(state.meta)?.[0];

  const [isModalOpen, setModalOpen] = useState(false);

  const handleViewPermitDetails = (value: boolean) => {
    setModalOpen(value);
    console.log(isModalOpen);
  };

  return (
    <div className="app-create-permit app-register">
      <div className="app-register__nav-wrapper app-container-wrapper">
        <div className="app-container app-register__nav">
          <Link href="/">
            <img
              src="/svgs/logo.eptw.svg"
              alt="eptw_logo"
              className={"permit-logo"}
            />
          </Link>

          <h5>Revalidate Permit</h5>

          <div className="">
            <Button
              variant="purple"
              onClick={() => handleViewPermitDetails(true)}
            >
              Permit Details
            </Button>
          </div>
        </div>
      </div>

      <div className="app-register__content-wrapper app-container-wrapper ">
        <div className="app-register__content app-container">
          {!state.matches("submit") && (
            <>
              <div className="app-register__content__header app-create-permit__header">
                <h3>
                  {stateMeta?.title
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </h3>
                <p>
                  Step {currentIdx} of {STEPS.length}
                </p>
              </div>
              <div className="app-register__progress-bar">
                <span
                  style={{
                    width: `${(currentIdx / STEPS.length) * 100}%`,
                  }}
                ></span>
              </div>
            </>
          )}

          {state.matches("verification") && <IssuingVerification />}
          {state.matches("selected_documents") && <IssuingSelectDocuments />}
          {state.matches("document_uploads") && <IssuingUploadDocuments />}
          {state.matches("tool_kit_time") && <IssuingToolKitTime />}
          {state.matches("submit") && <IssuingRevalidationSubmit />}
        </div>

        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>

      <div className="">
        {isModalOpen && (
          <ViewPermitDetails setModalOpen={() => setModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

const STEPS = [
  "verification",
  "selected_documents",
  "document_uploads",
  "tool_kit_time",
  "submit",
];

export default function RevalidateIssuingSupervisor({}: any) {
  return (
    <IssuingRevalidationProvider>
      <Module />
    </IssuingRevalidationProvider>
  );
}
