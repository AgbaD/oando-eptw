import "./index.scss";
import * as Yup from "yup";
import Input from "../../ui/form/input";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import useForm from "../../../hooks/use-form";
import useRequest from "../../../hooks/use-request";
import { toast } from "../../ui/toast";
import { forgotPassword } from "../../../assets/api/auth";
import { route } from "preact-router";

export default function ForgotPassword({}: any) {
  const { makeRequest, isLoading } = useRequest(forgotPassword);
  const { handleSubmit, getFieldProps } = useForm({
    initialValues: { email: "" },
    validationSchema,
    onSubmit,
  });

  async function onSubmit(v) {
    const [_, err] = await makeRequest(v);
    if (err) return toast({ variant: "error", message: err.message });
    route(`/reset-password?email=${v.email}`);
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
          <h2>Forgotten Password?</h2>
          <p className="app-login__card__form__desc">
            Input your registered email address to recover password.
          </p>

          <Input
            placeholder="example@oando.com"
            label="Email address"
            {...getFieldProps("email")}
          />

          <Button {...{ isLoading }} variant="primary" className="last-btn">
            Recover Password
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
  email: Yup.string().required("Email is required"),
});
