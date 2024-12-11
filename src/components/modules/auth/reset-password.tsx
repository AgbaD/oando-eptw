import "./index.scss";
import Input from "../../ui/form/input";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import CodeInput from "../../ui/form/code-input";
import useForm from "../../../hooks/use-form";
import * as Yup from "yup";
import { route, useRouter } from "preact-router";
import useRequest from "../../../hooks/use-request";
import {
  forgotPassword,
  resetPassword,
  verifyForgotPasswordOtp,
} from "../../../assets/api/auth";
import { toast } from "../../ui/toast";

export default function ResetPassword({}: any) {
  const router = useRouter();
  const email = router[0].matches.email;
  const { makeRequest, response, isLoading } = useRequest(
    verifyForgotPasswordOtp
  );
  const resendOtpApi = useRequest(forgotPassword, { email });
  const { handleSubmit, setFieldValue, getFieldProps } = useForm({
    onSubmit,
    initialValues: { otp: "", email },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required"),
    }),
  });
  const otpField = getFieldProps("otp");
  const token = response?.data.token;

  async function onSubmit(v) {
    const [_, err] = await makeRequest({ ...v, otp: Number(v.otp) });
    if (err) return toast({ variant: "error", message: err.message });
  }

  async function resendOtp() {
    const [_, err] = await resendOtpApi.makeRequest();
    if (err) return toast({ variant: "error", message: err.message });
    toast({ variant: "success", message: "OTP resent successfully" });
  }

  if (token) return <ResetPasswordForm {...{ token }} />;

  return (
    <div className="app-login">
      <div className="app-login__card">
        <div className="app-login__card__text">
          <img src="/svgs/logo.svg" alt="Oando-logo" />
          <h2>
            Electronic Permit to Work System <strong>(e-PTW)</strong>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="app-login__card__form">
          <h2>Verify Email Address</h2>
          <p className="app-login__card__form__desc">
            A 6-digit code has been sent to{" "}
            <span className="app-link">{email}</span>. Input the code below to
            proceed.
          </p>

          <CodeInput onChange={(value) => setFieldValue("otp", value)} />
          {otpField.isTouched && otpField.error ? (
            <p className="base-input__error">
              <Icon name="info" />
              {otpField.error}
            </p>
          ) : null}

          <Button {...{ isLoading }} variant="primary" className="last-btn">
            Verify
            <Icon name="arrow-right" />
          </Button>

          <p className="app-login__card__footer-text">
            Didn’t get a code?{" "}
            <button
              className="app-link"
              onClick={resendOtpApi.isLoading ? null : resendOtp}
              type="button"
            >
              {resendOtpApi.isLoading ? "Resending...." : "Resend Code"}
            </button>
          </p>
        </form>
      </div>

      <div class="app-login__footer">
        <a href="mailto:helpdesk@oandoplc.com" className="app-link">
          Need help?
        </a>
      </div>

      <img
        className="app-login__blur"
        src="/svgs/auth-blur.svg"
        alt="auth-blur"
      />
    </div>
  );
}

function ResetPasswordForm({ token }) {
  const { makeRequest, isLoading } = useRequest(resetPassword);
  const { handleSubmit, getFieldProps } = useForm({
    initialValues: { token, password: "", confirmPassword: "" },
    validationSchema,
    onSubmit,
  });

  async function onSubmit(v) {
    const [_, err] = await makeRequest(v);
    if (err) return toast({ variant: "error", message: err.message });
    route("/login");
  }

  return (
    <div className="app-login">
      <div className="app-login__card">
        <div className="app-login__card__text">
          <img src="/svgs/logo.svg" alt="Oando-logo" />
          <h2>
            Electronic Permit to Work System <strong>(e-PTW)</strong>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="app-login__card__form">
          <h2>Reset Password?</h2>
          <p className="app-login__card__form__desc">
            Input and confirm your new password below.
          </p>

          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...getFieldProps("password")}
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            type="password"
            {...getFieldProps("confirmPassword")}
          />

          <Button {...{ isLoading }} variant="primary" className="last-btn">
            Save password
            <Icon name="arrow-right" />
          </Button>
        </form>
      </div>

      <div class="app-login__footer">
        <a href="mailto:helpdesk@oandoplc.com" className="app-link">
          Need help?
        </a>
      </div>

      <img
        className="app-login__blur"
        src="/svgs/auth-blur.svg"
        alt="auth-blur"
      />
    </div>
  );
}

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm your password"),
});
