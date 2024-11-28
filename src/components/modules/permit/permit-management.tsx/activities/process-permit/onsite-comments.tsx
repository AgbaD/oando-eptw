import "../../../index.scss";

import "../../../../registration/index.scss";

import { Link } from "preact-router";

import Textarea from "../../../../../ui/form/text-area";
import Button from "../../../../../ui/button";
import { route } from "preact-router";

function Module() {
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

          <Link href="/" className="app-link">
            Click here to go back?
          </Link>
        </div>
      </div>

      <div className="app-register__content-wrapper app-container-wrapper ">
        <div className="app-register__content app-container">
          <h3>Onsite Comments & Notes</h3>
          <br />
          <Textarea placeholder="Enter your comments" />

          <div className="app-submit-screen">
            <div className="app-register__form-footer">
              <span></span>
              <Button
                variant="primary"
                type="button"
                onClick={() => route("/monitoring-details")}
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </div>

        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>
    </div>
  );
}

export default function OnsiteCommentsView({}: any) {
  return <Module />;
}
