import "../../../registration/index.scss";
import "../../index.scss";
import MeasuresOnEquipment from "./measures";
import Precautions from "./precautions";
import FireFighting from "./fire-fighting";
import PersonalEquipments from "./personal-equipments";
import PermitCerts from "./permit-certs";
import UploadPermitDocs from "./upload-docs";
import Consent from "./consent";
import {
  ApprovePermitProvider,
  usePermitApprovalContext,
} from "../../../../../context/approve-permit.context";
import Button from "../../../../ui/button";
import { Fragment } from "preact/jsx-runtime";
import { useRouter } from "preact-router";

function Module() {
  const [
    {
      matches: { id },
    },
  ] = useRouter();
  const { state } = usePermitApprovalContext();
  const stateAsString = state.toStrings()[0];
  const currentIdx = STEPS.indexOf(stateAsString) + 1;

  return (
    <div className="app-register">
      <div className="app-register__nav-wrapper app-container-wrapper">
        <div className="app-container app-register__nav">
          <img src="/svgs/logo.svg" alt="eptw_logo" />

          <h5>Permit To Work Form / Hot Work</h5>

          <a href="mailto:helpdesk@oandoplc.com" className="app-link">
            Need help?
          </a>
        </div>
      </div>

      <div className="app-register__content-wrapper app-container-wrapper ">
        <div className="app-register__content app-container">
          {!state.matches("success") && (
            <Fragment>
              <div className="app-register__content__header app-create-permit__header">
                <h3>
                  <span>Section C -</span> Precautions to be Taken
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
            </Fragment>
          )}

          {state.matches("measuresOnEquipments") && <MeasuresOnEquipment />}
          {state.matches("precautions") && <Precautions />}
          {state.matches("fireFighting") && <FireFighting />}
          {state.matches("personalEquipments") && <PersonalEquipments />}
          {state.matches("permitCerts") && <PermitCerts />}
          {state.matches("uploadPermitDocs") && <UploadPermitDocs />}
          {state.matches("consent") && <Consent />}
          {state.matches("success") && (
            <div className="app-approve-permit__success">
              {/* prettier-ignore */}
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M64.5225 28.4925C67.6872 24.8417 71.6004 21.9147 75.9965 19.9101C80.3926 17.9056 85.1685 16.8704 90 16.875C100.178 16.875 109.298 21.375 115.478 28.4925C120.298 28.1483 125.136 28.8456 129.662 30.5371C134.189 32.2285 138.299 34.8744 141.713 38.295C145.132 41.708 147.777 45.8166 149.468 50.3419C151.16 54.8673 151.858 59.7036 151.515 64.5225C155.164 67.6879 158.09 71.6015 160.093 75.9975C162.097 80.3935 163.131 85.1691 163.125 90C163.13 94.8315 162.094 99.6075 160.09 104.004C158.085 108.4 155.158 112.313 151.508 115.478C151.85 120.296 151.152 125.133 149.461 129.658C147.769 134.183 145.124 138.292 141.705 141.705C138.292 145.124 134.183 147.769 129.658 149.461C125.133 151.152 120.296 151.85 115.478 151.508C112.313 155.158 108.4 158.085 104.004 160.09C99.6075 162.094 94.8315 163.13 90 163.125C85.1685 163.13 80.3926 162.094 75.9965 160.09C71.6004 158.085 67.6872 155.158 64.5225 151.508C59.7029 151.853 54.8654 151.157 50.3386 149.466C45.8118 147.776 41.7017 145.132 38.2875 141.713C34.8673 138.299 32.2216 134.189 30.5303 129.662C28.8389 125.135 28.1413 120.298 28.485 115.478C24.8356 112.312 21.91 108.399 19.9067 104.003C17.9035 99.6065 16.8695 94.831 16.875 90C16.875 79.8225 21.375 70.7025 28.4925 64.5225C28.1494 59.7035 28.8473 54.8671 30.5387 50.3417C32.23 45.8162 34.8754 41.7077 38.295 38.295C41.7077 34.8754 45.8162 32.23 50.3417 30.5387C54.8671 28.8473 59.7035 28.1494 64.5225 28.4925ZM117.075 76.395C117.525 75.7954 117.851 75.1119 118.033 74.3846C118.215 73.6574 118.25 72.9011 118.135 72.1602C118.021 71.4193 117.759 70.7087 117.366 70.0702C116.973 69.4318 116.457 68.8783 115.847 68.4424C115.237 68.0065 114.546 67.6968 113.815 67.5317C113.084 67.3666 112.327 67.3494 111.589 67.481C110.851 67.6126 110.146 67.8904 109.517 68.2981C108.888 68.7058 108.347 69.2351 107.925 69.855L83.655 103.83L71.475 91.65C70.4087 90.6564 68.9984 90.1155 67.5411 90.1412C66.0838 90.1669 64.6935 90.7573 63.6629 91.7879C62.6323 92.8185 62.0419 94.2088 62.0162 95.6661C61.9905 97.1234 62.5314 98.5337 63.525 99.6L80.4 116.475C80.9774 117.052 81.6735 117.496 82.4399 117.777C83.2063 118.058 84.0247 118.169 84.8382 118.102C85.6518 118.035 86.4409 117.792 87.151 117.389C87.861 116.986 88.4749 116.434 88.95 115.77L117.075 76.395Z" fill="#008171"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M62.1272 22.7098C65.5894 18.7157 69.8706 15.5135 74.6799 13.3205C79.4893 11.1274 84.7142 9.99499 90 10C101.134 10 111.112 14.9231 117.873 22.7098C123.146 22.3332 128.439 23.0961 133.391 24.9465C138.344 26.797 142.84 29.6916 146.574 33.4339C150.315 37.1677 153.209 41.6626 155.059 46.6134C156.91 51.5642 157.673 56.8552 157.298 62.1272C161.291 65.5902 164.492 69.8717 166.683 74.681C168.875 79.4903 170.006 84.7149 170 90C170.005 95.2858 168.873 100.511 166.68 105.32C164.487 110.129 161.284 114.411 157.29 117.873C157.665 123.145 156.901 128.436 155.051 133.387C153.201 138.337 150.307 142.832 146.566 146.566C142.832 150.307 138.337 153.201 133.387 155.051C128.436 156.901 123.145 157.665 117.873 157.29C114.411 161.284 110.129 164.487 105.32 166.68C100.511 168.873 95.2858 170.005 90 170C84.7142 170.005 79.4893 168.873 74.6799 166.68C69.8706 164.487 65.5894 161.284 62.1272 157.29C56.8544 157.668 51.5621 156.906 46.6097 155.057C41.6573 153.208 37.1608 150.315 33.4257 146.574C29.6839 142.84 26.7895 138.343 24.9391 133.391C23.0887 128.439 22.3256 123.146 22.7016 117.873C18.709 114.41 15.5083 110.128 13.3167 105.319C11.1251 100.51 9.99398 95.2851 10 90C10 78.8656 14.9231 68.8882 22.7098 62.1272C22.3344 56.8551 23.0979 51.564 24.9483 46.6131C26.7987 41.6622 29.6927 37.1674 33.4339 33.4339C37.1674 29.6927 41.6622 26.7987 46.6131 24.9483C51.564 23.0979 56.8551 22.3344 62.1272 22.7098ZM119.62 75.1159C120.113 74.4599 120.469 73.7121 120.668 72.9165C120.867 72.1209 120.905 71.2935 120.78 70.4829C120.655 69.6723 120.369 68.895 119.939 68.1965C119.509 67.498 118.944 66.8925 118.277 66.4156C117.61 65.9387 116.854 65.5999 116.054 65.4193C115.254 65.2387 114.426 65.2198 113.618 65.3638C112.811 65.5078 112.04 65.8117 111.352 66.2577C110.664 66.7038 110.072 67.2829 109.61 67.961L83.0585 105.13L69.7333 91.8051C68.5668 90.7181 67.0238 90.1263 65.4296 90.1545C63.8353 90.1826 62.3142 90.8284 61.1867 91.9559C60.0592 93.0834 59.4134 94.6045 59.3852 96.1988C59.3571 97.7931 59.9489 99.336 61.0359 100.503L79.4974 118.964C80.1292 119.595 80.8907 120.082 81.7291 120.389C82.5676 120.696 83.4629 120.817 84.3529 120.744C85.2429 120.671 86.1063 120.404 86.8831 119.964C87.6599 119.523 88.3315 118.919 88.8513 118.193L119.62 75.1159Z" fill="#008171" fill-opacity="0.1"/>
              </svg>

              <h3>Permits Success fully Approved</h3>
              <p>
                You have successfully approved this permit. And it has been
                moved ahead to other authorities.
              </p>

              <Button href={`/permit-management/ptw/${id}`} variant="primary">
                View Permit Details
              </Button>
              <Button href="/permit-management/" variant="secondary">
                Back To All Permits
              </Button>
            </div>
          )}
        </div>

        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>
    </div>
  );
}

export default function ApprovePermit({}: any) {
  return (
    <ApprovePermitProvider>
      <Module />
    </ApprovePermitProvider>
  );
}

const STEPS = [
  "measuresOnEquipments",
  "precautions",
  "fireFighting",
  "personalEquipments",
  "permitCerts",
  "uploadPermitDocs",
  "consent",
  "success",
];
