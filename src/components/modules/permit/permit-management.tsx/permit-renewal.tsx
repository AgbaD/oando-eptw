import * as Yup from "yup";
import { route, useRouter } from "preact-router";
import useForm from "../../../../hooks/use-form";
import Button from "../../../ui/button";
import Input from "../../../ui/form/input";
import useRequest from "../../../../hooks/use-request";
import { renewPermit } from "../../../../assets/api/permit";
import { toast } from "../../../ui/toast";

export default function PermitRenewal({}: any) {
  const { makeRequest, isLoading } = useRequest(renewPermit);
  const [
    {
      matches: { id: permitId },
    },
  ] = useRouter();
  const { getFieldProps, handleSubmit } = useForm({
    initialValues: {
      permitId: +permitId,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      gasTesterName: "",
      gasTestDate: "",
      o2Percentage: "",
      co: "",
      h2s: "",
      lel: "",
    },
    validationSchema,
    onSubmit,
  });

  async function onSubmit(data) {
    const [_, err] = await makeRequest(data);
    if (err) {
      return toast({
        variant: "error",
        message: err.message ?? "Failed to renew permit. Please try again",
      });
    }

    toast({
      variant: "success",
      message: "Permit renewed successfully",
    });

    route(`/permit-management/ptw/${permitId}`);
  }

  return (
    <div className="app-register">
      <div className="app-register__nav-wrapper app-container-wrapper">
        <div className="app-container app-register__nav">
          <img src="/svgs/logo.svg" alt="eptw_logo" />

          <h5>Permit To Work Form / Hot Work</h5>

          <a href="#" className="app-link">
            Need help?
          </a>
        </div>
      </div>

      <div className="app-register__content-wrapper app-container-wrapper ">
        <div className="app-register__content app-container">
          <div className="app-register__content__header app-create-permit__header">
            <h3>PERMIT RENEWAL</h3>
          </div>
          <br />
          <br />

          <form className="app-register__form" onSubmit={handleSubmit}>
            <div className="app-register__form-grid">
              <h3 style={{ marginBottom: "20px" }}>Start Date</h3>
              <h3 style={{ marginBottom: "20px" }}>End Date</h3>

              <div className="app-register__form-grid">
                <Input
                  label="Date"
                  placeholder="dd / mm / yyyy"
                  type="date"
                  {...getFieldProps("startDate")}
                />
                <Input
                  label="Time"
                  type="time"
                  placeholder="00:00AM"
                  {...getFieldProps("startTime")}
                />
              </div>

              <div className="app-register__form-grid">
                <Input
                  label="Date"
                  placeholder="dd / mm / yyyy"
                  type="date"
                  {...getFieldProps("endDate")}
                />
                <Input
                  label="Time"
                  type="time"
                  placeholder="00:00AM"
                  {...getFieldProps("endTime")}
                />
              </div>

              <Input
                label="Name of Gas Tester"
                placeholder="Enter gas tester"
                type="text"
                {...getFieldProps("gasTesterName")}
              />

              <Input
                label="Date Gas Test"
                placeholder="dd / mm / yyyy"
                type="date"
                {...getFieldProps("gasTestDate")}
              />

              <Input
                label="25% > O2 < 19.5%"
                placeholder="---"
                type="text"
                {...getFieldProps("o2Percentage")}
              />

              <Input
                label="CO:"
                placeholder="---"
                type="text"
                {...getFieldProps("co")}
              />

              <Input
                label="H2S < 2PPM"
                placeholder="---"
                type="text"
                {...getFieldProps("h2s")}
              />

              <Input
                label="L.E.L < 10%"
                placeholder="---"
                type="text"
                {...getFieldProps("lel")}
              />
            </div>

            <div className="app-register__form-footer">
              <Button
                variant="secondary"
                type="button"
                href={`/permit-management/ptw/${permitId}`}
              >
                Back
              </Button>
              <Button variant="primary" {...{ isLoading }}>
                Next
              </Button>
            </div>
          </form>
        </div>

        <img src="/svgs/auth-blur.svg" alt="auth-blur" />
      </div>
    </div>
  );
}

const validationSchema = Yup.object({
  startDate: Yup.string().required("This field is required"),
  startTime: Yup.string().required("This field is required"),
  endDate: Yup.string().required("This field is required"),
  endTime: Yup.string().required("This field is required"),
  gasTesterName: Yup.string().required("This field is required"),
  gasTestDate: Yup.string().required("This field is required"),
  o2Percentage: Yup.string().required("This field is required"),
  co: Yup.string().required("This field is required"),
  h2s: Yup.string().required("This field is required"),
  lel: Yup.string().required("This field is required"),
});
