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

  function getTokenFromURL(url) {
    try {
      const tokenMatch = url.match(/code=1\.([^&]*)/);
      if (tokenMatch && tokenMatch[1]) {
        return tokenMatch[1];
      }
      return null;
    } catch (error) {
      console.error("Error parsing URL:", error);
      return null;
    }
  }

  useEffect(() => {
    async function socialLogin() {
      const token = getTokenFromURL(window.location.href);
      const [res, error] = await makeRequest({
        token: token,
      });
      if (error) return toast({ message: error?.message, variant: "error" });
      userContext.login(res?.data);
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
