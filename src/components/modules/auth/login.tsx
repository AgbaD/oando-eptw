import {
  // useEffect,
  useState,
} from "preact/hooks";
import Button from "../../ui/button";
import Input from "../../ui/form/input";
import Icon from "../../ui/icon";
import { Link } from "preact-router";
import useForm from "../../../hooks/use-form";
import useRequest from "../../../hooks/use-request";
import { toast } from "../../ui/toast";
import { useUserContext } from "../../../context/user.context";
import { login } from "../../../assets/api/auth";
import * as Yup from "yup";
import "./index.scss";

import { loginRequest } from "../../../msal-auth-config";

import { useMsal } from "@azure/msal-react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login({}: any) {
  const userContext = useUserContext();
  const [activeScreen, setActiveScreen] = useState<"get_started" | "login">(
    "get_started"
  );
  const [showPassword, setShowPassword] = useState(false);

  const { makeRequest, isLoading } = useRequest(login);
  const { getFieldProps, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  async function onSubmit(data) {
    const [res, error] = await makeRequest(data);
    if (error) return toast({ message: error?.message, variant: "error" });
    userContext.login(res?.data);
  }

  const { instance } = useMsal();

  async function handleRedirect() {
    const response: any = instance.loginRedirect({
      ...loginRequest,
      prompt: "create",
    });
    console.log(response);
  }

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);

  function onChange() {
    setIsCaptchaSuccess(true);
  }

  return (
    <div className="app-login">
      <div className="app-login__card">
        <div className="app-login__card__text">
          <img
            src="/svgs/logo.svg"
            alt="Oando-logo"
            className="app-login__card__logo"
          />
          <h2>
            Electronic Permit to Work System <strong>(e-PTW)</strong>
          </h2>
        </div>

        {activeScreen === "get_started" && (
          <div className="app-login__card__form">
            <h2>Get Started</h2>
            <p className="app-login__card__form__desc">
              Welcome to Oando Electronic Permit To Work System e-PTW. <br />
              Click the button below to get started.
            </p>

            <Button variant="primary" onClick={() => setActiveScreen("login")}>
              Sign In to your account
            </Button>
          </div>
        )}

        {activeScreen === "login" && (
          <form onSubmit={handleSubmit} className="app-login__card__form login">
            <h2>Sign In</h2>

            <Input
              label="Email Address"
              placeholder="example@oando.com"
              type="email"
              {...getFieldProps("email")}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
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

            <Link
              href="/forgot-password"
              className="app-login__card__form__link"
            >
              Forgot Password
            </Link>

            <ReCAPTCHA
              sitekey="6LerQJgqAAAAADS_o9r55abOFrkwKK92oFBaKK_p"
              onChange={onChange}
            />

            <Button
              variant="primary"
              {...{ isLoading }}
              disabled={!isCaptchaSuccessful}
            >
              Login to your account
              <Icon name="arrow-right" />
            </Button>

            <p className="app-login__auth-method-divider">
              <span>OR</span>
            </p>

            <Button variant="outline" type="button" onClick={handleRedirect}>
              <Icon name="microsoft" />
              Sign In with Microsoft
            </Button>
          </form>
        )}
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
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
