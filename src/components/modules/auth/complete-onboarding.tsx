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
