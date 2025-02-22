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
import Submit from "./submit";

import { capitalize } from "../../../../../../assets/utils";
import Button from "../../../../../ui/button";
import { useState } from "preact/hooks";
import ViewPermitDetails from "./view-permit-details";

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
                  Step {currentIdx} of {STEPS.length - 1}
                </p>
              </div>
              <div className="app-register__progress-bar">
                <span
                  style={{
                    width: `${(currentIdx / STEPS.length - 1) * 100}%`,
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
          {state.matches("submit") && <Submit />}
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
  "work_hazards",
  "personal_protective_equipment",
  "firefighting_equipment",
  "selected_documents",
  "document_uploads",
  "mechanical_precaution",
  "electrical_precaution",
  "submit",
];

export default function ProcessIssuingPermit({}: any) {
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
};
