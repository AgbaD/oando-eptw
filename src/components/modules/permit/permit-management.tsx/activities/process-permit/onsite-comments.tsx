import "../../../index.scss";

import "../../../../registration/index.scss";

import { Link } from "preact-router";
import * as Yup from "yup";

import Textarea from "../../../../../ui/form/text-area";
import Button from "../../../../../ui/button";
import { route } from "preact-router";
import { usePermitDetails } from "../../../../../../context/permit-details.context";
import useRequest from "../../../../../../hooks/use-request";
import { addOnsiteNote } from "../../../../../../assets/api/permit";

import { toast } from "../../../../../ui/toast";
import useForm from "../../../../../../hooks/use-form";

function Module() {
  const { permit } = usePermitDetails();

  const { getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      permitId: 0,
      content: "",
    },
    onSubmit,
  });

  const { makeRequest, isLoading } = useRequest(addOnsiteNote);

  async function onSubmit(data: any) {
    const [_, err] = await makeRequest({
      permitId: permit?.id,
      content: data.content,
    });
    if (err) {
      return toast({ variant: "error", message: err.message });
    } else {
      toast({ variant: "success", message: "Successful" });
    }

    route("/monitoring-details");
  }
  return (
    <div className="app-create-permit app-register">
      <div className="app-register__nav-wrapper app-container-wrapper">
        <div className="app-container app-register__nav">
          <Link href="/">
            <img
              src="/svgs/logo.eptw.svg"
              alt="eptw_logo"
              className={"permit-logo"}
            />
          </Link>

          <Link href="/" className="app-link">
            Click here to go back?
          </Link>
        </div>
      </div>

      <div className="app-register__content-wrapper app-container-wrapper ">
        <div className="app-register__content app-container">
          <h3>Onsite Comments & Notes</h3>
          <br />

          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="Enter your comments"
              {...getFieldProps("content")}
            />

            <div className="app-submit-screen">
              <div className="app-register__form-footer">
                <span></span>
                <Button variant="primary" type="submit" isLoading={isLoading}>
                  SUBMIT
                </Button>
              </div>
            </div>
          </form>
        </div>

        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>
    </div>
  );
}

const validationSchema = Yup.object({});

export default function OnsiteCommentsView({}: any) {
  return <Module />;
}
