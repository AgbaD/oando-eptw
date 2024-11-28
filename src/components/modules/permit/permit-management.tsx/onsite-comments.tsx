import * as Yup from "yup";
import useForm from "../../../../hooks/use-form";
import useRequest from "../../../../hooks/use-request";
import Button from "../../../ui/button";
import Textarea from "../../../ui/form/text-area";
import { AddOnsiteNote } from "../../../../assets/api/permit";
import { toast } from "../../../ui/toast";
import { route, useRouter } from "preact-router";

export default function PermitOnsiteComments({}: any) {
  const [
    {
      matches: { id: permitId },
    },
  ] = useRouter();
  const { isLoading, makeRequest } = useRequest(AddOnsiteNote);
  const { handleSubmit, getFieldProps } = useForm({
    onSubmit,
    initialValues: {
      permitId: +permitId,
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("This field is required"),
    }),
  });

  async function onSubmit(data) {
    const [_, err] = await makeRequest(data);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to add comment. Please try again",
      });
    }

    toast({
      variant: "success",
      message: "Comment added successfully",
    });

    route(`/permit-management/ptw/${permitId}`);
  }

  return (
    <div className="app-register">
      <div className="app-register__nav-wrapper app-container-wrapper">
        <div className="app-container app-register__nav">
          <img src="/svgs/logo.svg" alt="eptw_logo" />

          <a href="#" className="app-link">
            Need help?
          </a>
        </div>
      </div>

      <div className="app-register__content-wrapper app-container-wrapper ">
        <div className="app-register__content app-container">
          <div className="app-register__content__header app-create-permit__header">
            <h3>ONSITE NOTE / COMMENT</h3>
          </div>
          <br />
          <br />

          <form className="app-register__form" onSubmit={handleSubmit}>
            <Textarea
              placeholder="Write here..."
              {...getFieldProps("content")}
            />
            <div className="app-register__form-footer">
              <Button
                variant="secondary"
                type="button"
                href={`/permit-management/ptw/${permitId}`}
              >
                Back
              </Button>
              <Button variant="primary" {...{ isLoading }}>
                Submit
              </Button>
            </div>
          </form>
        </div>

        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>
    </div>
  );
}
