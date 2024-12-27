import "../index.scss";
import "../../registration/index.scss";

import {
  RevalidationProvider,
  usePerfRevalidationContext,
} from "../../../../context/perf-revalidation-context";

import { Link } from "preact-router";

import Button from "../../../ui/button";
import { useState } from "preact/hooks";

import SelectDocuments from "../permit-revalidation/modules/select-documents";
import VerificationClosure from "./modules/verification-closure";
import ClosureUploadDocuments from "./modules/upload-documents-closure";
import SafetyClosureSubmit from "./modules/safety-closure-submit";
import ViewPermitDetails from "../permit-management.tsx/activities/process-permit/view-permit-details";

function Module() {
  const { state } = usePerfRevalidationContext();
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

          <h5> Permit Closure</h5>

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

          {state.matches("verification") && <VerificationClosure />}
          {state.matches("selected_documents") && <SelectDocuments />}
          {state.matches("document_uploads") && <ClosureUploadDocuments />}
          {state.matches("submit") && <SafetyClosureSubmit />}
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
  "submit",
];

export default function ClosureSafetyOfficer({}: any) {
  return (
    <RevalidationProvider>
      <Module />
    </RevalidationProvider>
  );
}
