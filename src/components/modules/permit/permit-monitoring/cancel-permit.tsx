import * as Yup from "yup";

import { route } from "preact-router";

import { cancelPermit } from "../../../../assets/api/permit";
import { toast } from "../../../ui/toast";
import Button from "../../../ui/button";
import Textarea from "../../../ui/form/text-area";
import useRequest from "../../../../hooks/use-request";
import useForm from "../../../../hooks/use-form";

import { usePermitDetails } from "../../../../context/permit-details.context";
interface ViewProps {
  setModalOpen: () => void;
}
export default function CancelPermit({ setModalOpen }: ViewProps) {
  const { permit } = usePermitDetails();

  const { getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      permitId: 0,
      reason: "",
    },
    onSubmit,
  });

  const { makeRequest, isLoading } = useRequest(cancelPermit);

  async function onSubmit(data) {
    const [_, err] = await makeRequest({
      permitId: permit?.id,
      reason: data.reason,
    });
    if (err) {
      toast({
        variant: "error",
        message: err?.message || "Failed to cancel permit, please try again",
      });
      return;
    } else {
      toast({
        variant: "success",
        message: "Permit cancelled succesfully",
      });
      route("/permit-activities");
    }
  }
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-modal">
          <div className="grid-cols-2">
            <h3>Cancel Permit</h3>
            <button className="close-button" onClick={setModalOpen}>
              &times;
            </button>
          </div>
          <br />

          <div className="popup-content">
            <div className="">
              <form onSubmit={handleSubmit}>
                <h5>
                  Kindly state the reason for cancelling this permit below
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
