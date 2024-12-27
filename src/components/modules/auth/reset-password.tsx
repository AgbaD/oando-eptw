import { useState, useEffect } from "react";
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

import { Link } from "preact-router";

export default function ResetPassword({}: any) {
  const router = useRouter();
  const email = router[0].matches.email;
  const { makeRequest, isLoading } = useRequest(verifyForgotPasswordOtp);
  const resendOtpApi = useRequest(forgotPassword, { email });
  const { handleSubmit, setFieldValue, getFieldProps } = useForm({
    onSubmit,
    initialValues: { otp: "", email },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required"),
    }),
  });
  const otpField = getFieldProps("otp");
  // const token = response?.data.token;

  const [timer, setTimer] = useState(120); // Timer in seconds
  const [canResend, setCanResend] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [token, setToken] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  async function onSubmit(v) {
    const [res, err] = await makeRequest({ ...v, otp: Number(v.otp) });
    if (err) {
      toast({ variant: "error", message: err.message });
      return;
    }
    setIsOtpVerified(true);
    setToken(res?.data);
  }

  async function resendOtp() {
    if (!canResend) return;

    const [_, err] = await resendOtpApi.makeRequest();
    if (err) return toast({ variant: "error", message: err.message });
    toast({ variant: "success", message: "OTP resent successfully" });

    setTimer(120);
    setCanResend(false);
  }

  if (isOtpVerified) {
    if (token !== "") return <ResetPasswordForm {...{ token }} />;
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
          <h2>Verify Email Address</h2>
          <p className="app-login__card__form__desc">
            A 6-digit code has been sent to{" "}
            <span className="app-link">{email}</span>. Input the code below to
            proceed.
          </p>

          <CodeInput
            length={6}
            onChange={(value) => {
              if (value.length <= 6) {
                setFieldValue("otp", value);
              }
            }}
          />

          <Link className="app-link" href="/login">
            Back to login?
          </Link>

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
              onClick={resendOtp}
              type="button"
              disabled={!canResend}
            >
              {resendOtpApi.isLoading
                ? "Resending..."
                : canResend
                ? "Resend Code"
                : `Wait ${Math.floor(timer / 60)}:${
                    timer % 60 < 10 ? "0" : ""
                  }${timer % 60}`}
            </button>
          </p>
        </form>
      </div>

      <div className="app-login__footer">
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

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(v) {
    console.log(v);
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
            button={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                width="20"
                height="20"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12A3 3 0 1112 9a3 3 0 013 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                    />
                  </>
                ) : (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.792C2.824 10.17 2 11.99 2 12c1.274 4.057 5.064 7 9.542 7 1.46 0 2.844-.348 4.082-.96M10.478 5.055C11.31 5.019 12.153 5 13 5c4.478 0 8.268 2.943 9.542 7-.279.884-.703 1.702-1.236 2.44M9.212 9.212A3 3 0 0012 15a2.995 2.995 0 001.788-.63M21 21l-6.477-6.477"
                    />
                  </>
                )}
              </svg>
            }
          />

          <Input
            label="Confirm Password"
            placeholder="Re-enter your password"
            type="password"
            {...getFieldProps("confirmPassword")}
            button={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                width="20"
                height="20"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12A3 3 0 1112 9a3 3 0 013 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                    />
                  </>
                ) : (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.792C2.824 10.17 2 11.99 2 12c1.274 4.057 5.064 7 9.542 7 1.46 0 2.844-.348 4.082-.96M10.478 5.055C11.31 5.019 12.153 5 13 5c4.478 0 8.268 2.943 9.542 7-.279.884-.703 1.702-1.236 2.44M9.212 9.212A3 3 0 0012 15a2.995 2.995 0 001.788-.63M21 21l-6.477-6.477"
                    />
                  </>
                )}
              </svg>
            }
          />

          <Button
            {...{ isLoading }}
            variant="primary"
            className="last-btn"
            type="submit"
          >
            Save password
            <Icon name="arrow-right" />
          </Button>
        </form>
      </div>

      <div className="app-login__footer">
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
