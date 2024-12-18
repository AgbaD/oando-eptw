import { useEffect } from "preact/hooks";
import Button from "../../ui/button";

import useRequest from "../../../hooks/use-request";
import { toast } from "../../ui/toast";
import { useUserContext } from "../../../context/user.context";
import { socialLogin } from "../../../assets/api/auth";
import "./index.scss";

export default function SocialLogin({}: any) {
  const userContext = useUserContext();
  const { makeRequest } = useRequest(socialLogin);

  // function getTokenFromURL(url) {
  //   try {
  //     const tokenMatch = url.match(/code=1\.([^&]*)/);
  //     if (tokenMatch && tokenMatch[1]) {
  //       return tokenMatch[1];
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error("Error parsing URL:", error);
  //     return null;
  //   }
  // }

  useEffect(() => {
    async function socialLogin() {
      const params = new URLSearchParams(window.location.search);
      const authCode = params.get("code");

      // Retrieve the code verifier from sessionStorage
      // const codeVerifier = sessionStorage.getItem("code_verifier");

      const id = sessionStorage.getItem("id_token");
      const response = sessionStorage.getItem("microsoft_response");

      // if (!codeVerifier) {
      //   return toast({
      //     message: "Code verifier not found. Please restart the login process.",
      //     variant: "error",
      //   });
      // }

      console.log("this is the id token", id);
      console.log("this is the response", response);

      if (authCode) {
        // const tokenData = {
        //   client_id: "373d919d-2a08-46b9-ac26-2638978ec8ba",
        //   scope: "openid profile email",
        //   code: `${authCode}`,
        //   redirect_uri: "https://oando-eptw.vercel.app/social-login",
        //   grant_type: "authorization_code",
        //   code_verifier: `${codeVerifier}`,
        // };

        // const response = await fetch(
        //   `https://login.microsoftonline.com/a3329a53-02fd-4abb-94cd-6d1b954419f6/oauth2/v2.0/token`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     body: new URLSearchParams(tokenData),
        //   }
        // );

        // const tokenResponse = await response.json();

        // console.log(tokenResponse);

        const [res, error] = await makeRequest({
          token: authCode,
          // codeVerifier: codeVerifier,
        });
        if (error) return toast({ message: error?.message, variant: "error" });
        userContext.login(res?.data);
      }
    }

    socialLogin();
  }, []);

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

        <div className="app-login__card__form login">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button variant="primary" isLoading>
            Logging you in ...
          </Button>
        </div>
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
