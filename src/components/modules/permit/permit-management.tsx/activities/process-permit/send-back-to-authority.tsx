import useForm from "../../../../../../hooks/use-form";
import * as Yup from "yup";
import Textarea from "../../../../../ui/form/text-area";
import useRequest from "../../../../../../hooks/use-request";

import { toast } from "../../../../../ui/toast";
import { route } from "preact-router";

import Button from "../../../../../ui/button";
import { sendBackToAuthority } from "../../../../../../assets/api/permit";
import Select from "../../../../../ui/form/select";
import { useIDContext } from "../../../../../../context/id.context";

interface ViewProps {
  setModalOpen: () => void;
}
export default function SendToAuthority({ setModalOpen }: ViewProps) {
  const { valueID } = useIDContext();
  const id = valueID;

  const { getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      permitId: 0,
      authority: "",
      reason: "",
    },
    onSubmit,
  });

  const { makeRequest, isLoading } = useRequest(sendBackToAuthority);

  const currentPath = window.location.pathname;

  const authorityOptionsFilter = (currentPath) => {
    switch (currentPath) {
      case "/activities-process":
        return [{ value: "PERFORMING", text: "Performing Authority" }];
      case "/activities-process/hse":
        return [
          { value: "PERFORMING", text: "Performing Authority" },
          { value: "ISSUING", text: "Issuing Authority" },
        ];
      case "/activities-process/auth":
        return [
          { value: "PERFORMING", text: "Performing Authority" },
          { value: "ISSUING", text: "Issuing Authority" },
          { value: "HSE", text: "HSE Authority" },
        ];
      case "/activities-process/perf-supervisor":
        return [
          { value: "PERFORMING", text: "Performing Authority" },
          { value: "ISSUING", text: "Issuing Authority" },
          { value: "HSE", text: "HSE Authority" },
          { value: "AUTHORIZING", text: "Authorizing Authority" },
        ];
      case "/activities-process/safety-officer":
        return [
          { value: "PERFORMING", text: "Performing Authority" },
          { value: "ISSUING", text: "Issuing Authority" },
          { value: "HSE", text: "HSE Authority" },
          { value: "AUTHORIZING", text: "Authorizing Authority" },
          {
            value: "PERFORMING_SUPERVISOR",
            text: "Performing Authority Supervisor ",
          },
        ];
      case "/activities-process/issu-supervisor":
        return [
          { value: "ISSUING", text: "Issuing Authority" },
          { value: "HSE", text: "HSE Authority" },
          { value: "AUTHORIZING", text: "Authorizing Authority" },
          {
            value: "PERFORMING_SUPERVISOR",
            text: "Performing Authority Supervisor ",
          },
          { value: "SAFETY_OFFICER", text: "Safety Officer" },
        ];
      default:
        return [{ value: "PERFORMING", text: "Performing Authority" }];
    }
  };

  let authorityOptions = authorityOptionsFilter(currentPath);

  async function onSubmit(data) {
    const [_, err] = await makeRequest({
      permitId: id,
      authority: data.authority,
      reason: data.reason,
    });
    if (err) {
      toast({
        variant: "error",
        message: err?.message || "Failed to update role, please try again",
      });
      return;
    } else {
      toast({
        variant: "success",
        message: "Permit sent back to authority successfully",
      });
      route("/permit-activities");
    }
  }
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-modal">
          <div className="grid-cols-2">
            <h3>Send Back to Authority</h3>
            <button className="close-button" onClick={setModalOpen}>
              &times;
            </button>
          </div>
          <br />

          <div className="popup-content">
            <div className="">
              <form onSubmit={handleSubmit}>
                <Select
                  label="Authority"
                  placeholder="--select authority--"
                  options={authorityOptions}
                  {...getFieldProps("authority")}
                />
                <br />

                <Textarea
                  label="Reason"
                  placeholder="Write reason here..."
                  {...getFieldProps("reason")}
                />

                <Button type="submit" variant="primary" isLoading={isLoading}>
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const validationSchema = Yup.object({});
