import * as Yup from "yup";

import useForm from "../../../../../hooks/use-form";
import Button from "../../../../ui/button";
import Input from "../../../../ui/form/input";

import { useIssuingSupervisorRevalidationContext } from "../../../../../context/issuing-supervisor-revalidation-context";

export default function IssuingToolKitTime() {
  const { state, send } = useIssuingSupervisorRevalidationContext();

  const { getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.tool_kit_time,
    },
    onSubmit,
  });

  function onSubmit(tool_kit_time) {
    send("submit", { data: { tool_kit_time } });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__form">
      <p>Fill in the fields below to update the toolbox stock form</p>
      <br />
      <div className="app-register__form-grid">
        <Input
          label="Identity Leader"
          placeholder="Enter fullname"
          {...getFieldProps("toolBoxLeaderIdentity")}
        />
        <Input
          label="Position"
          placeholder="Enter position"
          {...getFieldProps("toolBoxPosition")}
        />
      </div>

      <h4>Adjust Time</h4>

      <p>Kindly re-djust the date & time as appropriate (Optional)</p>
      <div className="">
        <div className="get-current-date">
          <p>Current Permit Start - End Date & Time:</p>
          <span>17 / 04 / 2022 08:00 AM - 17 / 04 / 2022 08:00 AM</span>
        </div>
      </div>

      <div className="">
        <div className="">
          <div className="">
            <h4>Edit Start Time</h4>
            <p class="edit-start-time">
              The time your are selecting must be more than the current time:
              <span>11:54:00PM</span>
            </p>
          </div>
          <br />
          <Input
            label="Time"
            type="time"
            placeholder="00:00AM"
            {...getFieldProps("from_time")}
          />
        </div>
      </div>

      <div className="app-register__form-footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("go_back")}
        >
          Back
        </Button>
        <Button variant="primary">SUBMIT</Button>{" "}
      </div>
    </form>
  );
}

const validationSchema = Yup.object({
  // from_date: Yup.string().required("From date is required"),
  // to_date: Yup.string().required("To date is required"),
  // from_time: Yup.string().required("From time is required"),
  // to_time: Yup.string().required("To time is required"),
  // // cold work fields
});
