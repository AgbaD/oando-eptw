import "./index.scss";
import Input from "../../ui/form/input";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import useForm from "../../../hooks/use-form";
import * as Yup from "yup";
import { route } from "preact-router";
import useRequest from "../../../hooks/use-request";
import { completeExternalOnboarding } from "../../../assets/api/auth";
import { toast } from "../../ui/toast";

import { useState } from "preact/hooks";

export default function CompleteOnboarding({}: any) {
  const token = getTokenFromURL();
  return <ResetPasswordForm {...{ token }} />;
}

function ResetPasswordForm({ token }: { token: string }) {
  const { makeRequest, isLoading } = useRequest(completeExternalOnboarding);
  const { handleSubmit, getFieldProps } = useForm({
    initialValues: { token, password: "", confirmPassword: "" },
    validationSchema,
    onSubmit,
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: {
    token: string;
    password: string;
    confirmPassword: string;
  }) {
    const [_, err] = await makeRequest(values);
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
          <h2>Complete Onboarding</h2>
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

          <Button {...{ isLoading }} variant="primary" className="last-btn">
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
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

// Utility function to extract token from the URL
function getTokenFromURL(): string {
  try {
    const url = window.location.href; // Get the current browser URL
    const urlObj = new URL(url); // Parse the URL
    return urlObj.searchParams.get("token") || ""; // Return the token or an empty string
  } catch (error) {
    console.error("Error extracting token from URL:", error);
    return "";
  }
}
