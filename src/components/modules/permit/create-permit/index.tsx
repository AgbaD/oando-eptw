import "../../registration/index.scss";
import "../index.scss";
import WorkDescription from "./work-description";
import WorkHazards from "./work-hazards";
import Documents from "./documents";
import AdditionalNotes from "./notes";
import {
  PermitProvider,
  usePermitContext,
} from "../../../../context/permit.context";
import PermitType from "./permit-type";
import { capitalize } from "../../../../assets/utils";
import { Link, route } from "preact-router";
import CompanyDetails from "./company-details";
import UploadDocuments from "./upload-documents";

import { useState } from "preact/hooks";
import useRequest from "../../../../hooks/use-request";
import { createDraft } from "../../../../assets/api/permit";
import PopupModal from "../../../ui/popup";

import { toast } from "../../../ui/toast";
import { formatDateForBackend } from "../permit-closure/modules/perf-closure-submit";
import Button from "../../../ui/button";
import { useDraftDetails } from "../../../../context/draft-details.context";

function Module() {
  const { state } = usePermitContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS.indexOf(stateAsString) + 1;
  const stateMeta: any = Object.values(state.meta)?.[0];

  const { updateIsDraft } = useDraftDetails();

  const [draftPopup, setDraftPopup] = useState(false);
  const { makeRequest } = useRequest(createDraft);

  function handlePopup(value: boolean) {
    setDraftPopup(value);
  }

  function handleGoBack() {
    updateIsDraft(false);
    route("/");
  }

  async function handleCreateDraft() {
    const payload = {
      type: state.context.permit_type.toUpperCase(),
      workArea: state.context.work_description?.work_area,
      locationId: 1,
      performerRole: state.context.work_description?.role,
      performerPersonInCharge: state.context.work_description?.performer,
      workDescription: state.context.work_description?.work_description,
      equipmentToolsMaterials:
        state.context.work_description?.equipment_to_be_worked,
      environmentalConsideration:
        state.context.work_description?.environmental_issues,
      fromDate: state.context.work_description?.from_date,
      fromTime: formatDateForBackend(
        state.context.work_description?.from_date,
        state.context.work_description?.from_time
      ),
      toDate: state.context.work_description?.to_date,
      toTime: formatDateForBackend(
        state.context.work_description?.to_date,
        state.context.work_description?.to_time
      ),
      entrustedCompanyId: 1,
      executingCompanyId: 1,
      performingDepartment:
        state.context.company_details?.performing_department,
      contractorPhoneNumber:
        state.context.company_details?.company_contact_phone,
      hazard: {
        potentialHazardDescription:
          state.context.work_hazards?.potentialHazardDescription || "",
        ...(state.context.work_hazards?.hazards || {}),
      },

      documents: {
        jobSafetyAnalysisType: "MANUAL",
        jobSafetyAnalysisDoc: "...",
        workProcedureType: "MANUAL",
        workProcedureDoc: "...",
      },
    };

    const [_, error] = await makeRequest(payload);
    if (error) {
      return toast({
        variant: "error",
        message: error.message ?? "Failed to create draft, please try again",
      });
    }
    updateIsDraft(false);
    route("/");
    toast({
      variant: "success",
      message: "Draft created successfully",
    });
  }

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

          <h5>
            Permit To Work Form{" "}
            {state.context.permit_type && !state.matches("permit_type")
              ? `/ ${capitalize(state.context.permit_type.split("_")[0])} Work`
              : ""}
          </h5>

          <div className="">
            {state.matches("permit_type") ||
            state.matches("work_description") ||
            state.matches("company_details") ? (
              <>
                <Button className="app-link" onClick={() => handleGoBack()}>
                  Go back to home page
                </Button>
              </>
            ) : (
              <Button className="app-link" onClick={() => handlePopup(true)}>
                {" "}
                Go back to home page
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="app-register__content-wrapper app-container-wrapper ">
        <div className="app-register__content app-container">
          {!state.matches("additional_notes") && (
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

          {state.matches("permit_type") && <PermitType />}
          {state.matches("work_description") && <WorkDescription />}
          {state.matches("company_details") && <CompanyDetails />}
          {state.matches("work_hazards") && <WorkHazards />}
          {state.matches("selected_documents") && <Documents />}
          {state.matches("document_uploads") && <UploadDocuments />}
          {state.matches("additional_notes") && <AdditionalNotes />}
        </div>

        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>

      <div className="">
        {draftPopup && (
          <PopupModal
            icon={<img src="/svgs/save-draft.svg" />}
            title="Save Draft"
            message="You can save as draft, so you can be able to continue from where you stopped"
            onClose={() => handlePopup(false)}
            primaryButton={{
              label: "Save As Draft",
              onClick: handleCreateDraft,
              color: "#D30021",
            }}
            secondaryButton={{
              label: "Cancel",
              onClick: () => route("/"),
              color: "#E86E18",
            }}
          />
        )}
      </div>
    </div>
  );
}

const STEPS = [
  "permit_type",
  "work_description",
  "company_details",
  "work_hazards",
  "selected_documents",
  "document_uploads",
  "additional_notes",
];

export default function CreatePermit({}: any) {
  return (
    <PermitProvider>
      <Module />
    </PermitProvider>
  );
}
