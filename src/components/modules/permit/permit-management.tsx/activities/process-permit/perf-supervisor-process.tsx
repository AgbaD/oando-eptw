import "../../../index.scss";
import "../../../../registration/index.scss";

import { RoleProvider } from "../../../../../../context/role.context";

import { Link } from "preact-router";

import { capitalize } from "../../../../../../assets/utils";
import Button from "../../../../../ui/button";
import { useState } from "preact/hooks";

import {
  PermitProvider,
  usePerfSupervisorActivityContext,
} from "../../../../../../context/perf-supervisor-activity.context";
import PerfSupervisorDocuments from "./perf-supervisor-auth/perf-select-documents";
import PerfSupervisorFinalUpload from "./perf-supervisor-auth/perf-upload-documents";
import PerfProcessSubmit from "./perf-supervisor-auth/perf-submit";
import ViewPermitDetails from "./view-permit-details";

function Module() {
  const { state } = usePerfSupervisorActivityContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS.indexOf(stateAsString) + 1;

  const stateMeta = STEPS.includes(stateAsString)
    ? { title: capitalize(stateAsString.replace("_", " ")) }
    : null;

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

          <h5>Process Permit</h5>

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
                <h3>{stateMeta?.title}</h3>
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

          {state.matches("selected_documents") && <PerfSupervisorDocuments />}
          {state.matches("document_uploads") && <PerfSupervisorFinalUpload />}

          {state.matches("submit") && <PerfProcessSubmit />}
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

const STEPS = ["selected_documents", "document_uploads", "submit"];

export default function ProcessPerfSupervisorPermit({}: any) {
  return (
    <PermitProvider>
      <RoleProvider>
        <Module />
      </RoleProvider>
    </PermitProvider>
  );
}

export const ROLE_CONFIG = {
  perfAuthSupervisor: ["selected_documents", "document_uploads", "submit"],
  safetyOfficer: ["selected_documents", "document_uploads", "submit"],
  issuingSupervisor: [
    "selected_documents",
    "document_uploads",
    "tool_box_date",
    "submit",
  ],
};
