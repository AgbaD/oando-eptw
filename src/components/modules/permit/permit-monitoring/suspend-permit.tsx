import * as Yup from "yup";

import { route } from "preact-router";

import { suspendPermit } from "../../../../assets/api/permit";
import { toast } from "../../../ui/toast";
import Button from "../../../ui/button";
import Textarea from "../../../ui/form/text-area";
import useRequest from "../../../../hooks/use-request";
import useForm from "../../../../hooks/use-form";

import { usePermitDetails } from "../../../../context/permit-details.context";
interface ViewProps {
  setModalOpen: () => void;
}
export default function SuspendPermit({ setModalOpen }: ViewProps) {
  const { permit } = usePermitDetails();

  const { getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      permitId: 0,
      reason: "",
    },
    onSubmit,
  });

  const { makeRequest, isLoading } = useRequest(suspendPermit);

  async function onSubmit(data) {
    const [_, err] = await makeRequest({
      permitId: permit?.id,
      reason: data.reason,
    });
    if (err) {
      toast({
        variant: "error",
        message: err?.message || "Failed to suspend permit, please try again",
      });
      return;
    } else {
      toast({
        variant: "success",
        message: "Permit suspended successfully",
      });
      route("/permit-activities");
    }
  }
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-modal">
          <div className="grid-cols-2">
            <h3>Suspend Permit</h3>
            <button className="close-button" onClick={setModalOpen}>
              &times;
            </button>
          </div>
          <br />

          <div className="popup-content">
            <div className="">
              <form onSubmit={handleSubmit}>
                <h5>
                  Kindly state the reason for suspending this permit below
                </h5>

                <Textarea
                  label=""
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
