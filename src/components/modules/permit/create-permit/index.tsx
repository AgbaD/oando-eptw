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
import { Link } from "preact-router";
import CompanyDetails from "./company-details";
import UploadDocuments from "./upload-documents";

function Module() {
  const { state } = usePermitContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS.indexOf(stateAsString) + 1;
  const stateMeta: any = Object.values(state.meta)?.[0];

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

          <Link href="/" className="app-link">
            Click here to go back?
          </Link>
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
