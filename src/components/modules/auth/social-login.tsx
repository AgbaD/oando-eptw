import { useEffect } from "preact/hooks";
import Button from "../../ui/button";

import useRequest from "../../../hooks/use-request";
import { toast } from "../../ui/toast";
import { useUserContext } from "../../../context/user.context";
import { socialLogin } from "../../../assets/api/auth";
import "./index.scss";

import { msalInstance, initializeMsal } from "../../../msal-auth-config";

export default function SocialLogin({}: any) {
  const userContext = useUserContext();
  const { makeRequest } = useRequest(socialLogin);

  const initiateLogin = async (token) => {
    const [res, error] = await makeRequest({
      access_token: token,
    });
    if (error) {
      return toast({ message: error?.message, variant: "error" });
    }
    userContext.login(res?.data);
  };

  useEffect(() => {
    async function socialLogin() {
      try {
        await initializeMsal();
        const response = await msalInstance.handleRedirectPromise();

        if (response) {
          // Save the access token to session storage
          sessionStorage.setItem("access_token", response?.accessToken);
          console.log(response, "this is the response");
          initiateLogin(response?.accessToken);
        }
      } catch (error) {
        console.error("Error handling redirect:", error);
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
