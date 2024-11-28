import "../../../index.scss";
import "../../../../registration/index.scss";

import {
  RoleProvider,
  useRoleContext,
} from "../../../../../../context/role.context";

import { Link } from "preact-router";

import { capitalize } from "../../../../../../assets/utils";
import UpdateTimeDate from "./adjust-time-date";
import Button from "../../../../../ui/button";
import { useState } from "preact/hooks";

import PopupModal from "../../../../../ui/popup";
import HseProcessSubmit from "./hse-submit";
import {
  PermitProvider,
  useAuthorizingActivityContext,
} from "../../../../../../context/authorizing-activity-context";
import AuthWorkHazards from "./authorizing-auth/work-hazards";
import AuthPersonalProtectiveEquipment from "./authorizing-auth/auth-personal-protective";
import AuthFireFightingEquipment from "./authorizing-auth/auth-firefighting";
import AuthDocuments from "./authorizing-auth/auth-document-uploads";
import AuthFinalUpload from "./authorizing-auth/auth-final-upload";
import AuthMechanicalIsolation from "./authorizing-auth/auth-mechanical-isolation";
import AuthElectricalIsolation from "./authorizing-auth/auth-electrical";
import AuthProcessSubmit from "./auth-submit";

function Module() {
  const { state } = useAuthorizingActivityContext();
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

          {state.matches("work_hazards") && <AuthWorkHazards />}
          {state.matches("personal_protective_equipment") && (
            <AuthPersonalProtectiveEquipment />
          )}
          {state.matches("firefighting_equipment") && (
            <AuthFireFightingEquipment />
          )}
          {state.matches("selected_documents") && <AuthDocuments />}
          {state.matches("document_uploads") && <AuthFinalUpload />}
          {state.matches("mechanical_precaution") && (
            <AuthMechanicalIsolation />
          )}
          {state.matches("electrical_precaution") && (
            <AuthElectricalIsolation />
          )}
          {state.matches("adjust_date_time") && <UpdateTimeDate />}
          {state.matches("submit") && <AuthProcessSubmit />}
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

export default function ProcessAuthorizingPermit({}: any) {
  return (
    <PermitProvider>
      <RoleProvider>
        <Module />
      </RoleProvider>
    </PermitProvider>
  );
}

export const ROLE_CONFIG = {
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
