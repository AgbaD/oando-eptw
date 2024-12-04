import { useState } from "preact/hooks";
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

export default function Login({}: any) {
  const userContext = useUserContext();
  const [activeScreen, setActiveScreen] = useState<"get_started" | "login">(
    "get_started"
  );

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

  // const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  };

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
              Welcome to Oando Eletronic Permit To Work System e-PTW. <br />
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
              label="Email address"
              placeholder="example@oando.com"
              {...getFieldProps("email")}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...getFieldProps("password")}
            />

            <Link
              href="/forgot-password"
              className="app-login__card__form__link"
            >
              Forgot Password
            </Link>

            <Button variant="primary" {...{ isLoading }}>
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
        <a href="#" className="app-link">
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

const validationSchema = Yup.object({});
