import { Link } from "preact-router";
import {
  RegistrationProvider,
  useRegistrationContext,
} from "../../../context/registration.context";
import PersonalDetails from "./personal-details";
import "./index.scss";
import CompanyDetails from "./company-details";
import WorkingVisa from "./working_visa";
import Attachment from "./attachment";

function Module() {
  const { state } = useRegistrationContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS.indexOf(stateAsString) + 1;

  return (
    <div className="app-register">
      <div className="app-register__nav-wrapper app-container-wrapper">
        <div className="app-container app-register__nav">
          <Link href="/">
            <img src="/svgs/logo.eptw.svg" alt="eptw_logo" />
          </Link>

          <h5>Contactor Self Registration</h5>

          <a href="#" className="app-link">
            Need help?
          </a>
        </div>
      </div>

      <div className="app-register__content-wrapper app-container-wrapper ">
        <div className="app-register__content app-container">
          <div className="app-register__content__header">
            <h3>{stateAsString?.replaceAll("_", " ")}</h3>
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

          {state.matches("personal_details") && <PersonalDetails />}
          {state.matches("company") && <CompanyDetails />}
          {state.matches("working_visa") && <WorkingVisa />}
          {state.matches("attachment") && <Attachment />}
        </div>

        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>
    </div>
  );
}

export default function Register({}: any) {
  return (
    <RegistrationProvider>
      <Module />
    </RegistrationProvider>
  );
}

const STEPS = [
  "tenant",
  "personal_details",
  "company",
  "working_visa",
  "attachment",
];
