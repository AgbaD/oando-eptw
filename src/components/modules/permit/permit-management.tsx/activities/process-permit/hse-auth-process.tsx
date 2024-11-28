import "../../../index.scss";
import "../../../../registration/index.scss";

import {
  PermitProvider,
  useIssuingActivityContext,
} from "../../../../../../context/issuing-activity-context";

import { RoleProvider } from "../../../../../../context/role.context";

import { Link } from "preact-router";
import WorkHazards from "./work-hazards";
import PersonalProtectiveEquipment from "./personal-protective-equipment";
import FireFightingEquipment from "./firefighting-precautions";
import Documents from "./document-uploads";
import FinalUpload from "./final-upload";

import MechanicalIsolation from "./mechanical_isolation";
import ElectricalIsolation from "./electrical_isolation";

import { capitalize } from "../../../../../../assets/utils";
import Button from "../../../../../ui/button";
import { useState } from "preact/hooks";

import PopupModal from "../../../../../ui/popup";
import HseProcessSubmit from "./hse-submit";

function Module() {
  const { state } = useIssuingActivityContext();
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

          {state.matches("work_hazards") && <WorkHazards />}
          {state.matches("personal_protective_equipment") && (
            <PersonalProtectiveEquipment />
          )}
          {state.matches("firefighting_equipment") && <FireFightingEquipment />}
          {state.matches("selected_documents") && <Documents />}
          {state.matches("document_uploads") && <FinalUpload />}
          {state.matches("mechanical_precaution") && <MechanicalIsolation />}
          {state.matches("electrical_precaution") && <ElectricalIsolation />}
          {state.matches("submit") && <HseProcessSubmit />}
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
  "work_hazards",
  "personal_protective_equipment",
  "firefighting_equipment",
  "selected_documents",
  "document_uploads",
  "mechanical_precaution",
  "electrical_precaution",
  "adjust_time_date",
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

export default function ProcessHsePermit({}: any) {
  return (
    <PermitProvider>
      <RoleProvider>
        <Module />
      </RoleProvider>
    </PermitProvider>
  );
}

export const ROLE_CONFIG = {
  issuingAuth: [
    "work_hazards",
    "personal_protective_equipment",
    "firefighting_equipment",
    "selected_documents",
    "document_uploads",
    "mechanical_precaution",
    "electrical_precaution",
    "submit",
  ],
  hseAuth: [
    "work_hazards",
    "personal_protective_equipment",
    "firefighting_equipment",
    "selected_documents",
    "document_uploads",
    "mechanical_precaution",
    "electrical_precaution",
    "submit",
  ],
  authorizingAuth: [
    "work_hazards",
    "personal_protective_equipment",
    "firefighting_equipment",
    "selected_documents",
    "document_uploads",
    "mechanical_precaution",
    "electrical_precaution",
    "adjust_time_date",
    "submit",
  ],
  perfAuthSupervisor: ["selected_documents", "document_uploads", "submit"],
  safetyOfficer: ["selected_documents", "document_uploads", "submit"],
  issuingSupervisor: [
    "selected_documents",
    "document_uploads",
    "tool_box_date",
    "submit",
  ],
};
