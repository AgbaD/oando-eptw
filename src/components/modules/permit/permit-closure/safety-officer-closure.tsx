import "../index.scss";
import "../../registration/index.scss";

import {
  RevalidationProvider,
  usePerfRevalidationContext,
} from "../../../../context/perf-revalidation-context";

import { Link } from "preact-router";

import Submit from "../permit-management.tsx/activities/process-permit/submit";

import Button from "../../../ui/button";
import { useState } from "preact/hooks";

import PopupModal from "../../../ui/popup";

import PerfUploadDocuments from "../permit-revalidation/modules/upload-documents";
import SelectDocuments from "../permit-revalidation/modules/select-documents";
import VerificationClosure from "./modules/verification-closure";

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

          {state.matches("verification") && <VerificationClosure />}
          {state.matches("selected_documents") && <SelectDocuments />}
          {state.matches("document_uploads") && <PerfUploadDocuments />}
          {state.matches("submit") && <Submit />}
        </div>

        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>

      <div className="">
        {isModalOpen && (
          <PopupModal
            type="table"
            title="Permit Details"
            tableData={permitDetails}
            onClose={() => setModalOpen(false)}
          />
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

const permitDetails = [
  {
    header: "Role",
    description: "Supervisor",
  },
  {
    header: "Performing Person / Person In Charge",
    description: "External (Contractor)",
  },
  {
    header: "Work Details",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae nunc neque. Mauris tincidunt ipsum sed lacus commodo.",
  },
  {
    header: "Equipment / Tools / Materials",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae nunc neque. Mauris tincidunt ipsum sed lacus commodo.",
  },
  {
    header: "Work Location / Work Area",
    description: "Ebocha Oil Centre / Unit 232",
  },
  {
    header: "Permit Valid From - To (Date & Time)",
    description: "17 / 04 / 2022  08:00 AM  -  17 / 04 / 2022  08:00 AM ",
  },
];

export default function ClosureSafetyOfficer({}: any) {
  return (
    <RevalidationProvider>
      <Module />
    </RevalidationProvider>
  );
}
