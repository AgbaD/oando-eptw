import { useEffect, useState } from "preact/hooks";
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

// import { loginRequest } from "../../../msal-auth-config";

// import { useMsal } from "@azure/msal-react";
import ReCAPTCHA from "react-google-recaptcha";

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

  // const { instance } = useMsal();

  // const activeAccount = instance.getActiveAccount();

  // const handleRedirect = () => {
  //   instance
  //     .loginRedirect({
  //       ...loginRequest,
  //       prompt: "create",
  //     })
  //     .catch((error) => console.log(error));
  // };

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);

  function onChange() {
    setIsCaptchaSuccess(true);
  }

  /**
   * Generate a random code verifier
   */
  function generateCodeVerifier() {
    const array = new Uint32Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, (num) => num.toString(36))
      .join("")
      .slice(0, 128);
  }

  /**
   * Generate a code challenge based on a code verifier
   * @param {string} codeVerifier
   * @returns {Promise<string>}
   */
  async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const verifier =
    "1a7aiyx1u5iyabquso095bsdw5kal9j850wkfwblca4x3qvj1e140gvmnmf1qs8vxiep2lkvk9uulejg41il8ka51xs9rxs17twbt31jhrv40alsy00zdu7851kur4re";
  generateCodeChallenge(verifier).then((challenge) => {
    console.log("Verifier:", verifier);
    console.log("Generated Challenge:", challenge);
  });

  const clientId = "373d919d-2a08-46b9-ac26-2638978ec8ba";
  const tenantId = "a3329a53-02fd-4abb-94cd-6d1b954419f6";
  const redirectUri = "https://oando-eptw.vercel.app/social-login"; // Your frontend URL
  // let codeChallenge;

  // const codeVerifier = generateCodeVerifier();
  // sessionStorage.setItem("code_verifier", codeVerifier);
  const [codeChallenge, setCodeChallenge] = useState("");

  useEffect(() => {
    async function initializePKCE() {
      const verifier = generateCodeVerifier();
      sessionStorage.setItem("code_verifier", verifier);
      const challenge = await generateCodeChallenge(verifier);
      setCodeChallenge(challenge);
    }

    initializePKCE();
  }, []);

  const handleRedirect = () => {
    const authUrl =
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=openid profile email` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256`;

    window.location.href = authUrl;
    sessionStorage.setItem("code_challenge", codeChallenge);
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

const validationSchema = Yup.object({});
