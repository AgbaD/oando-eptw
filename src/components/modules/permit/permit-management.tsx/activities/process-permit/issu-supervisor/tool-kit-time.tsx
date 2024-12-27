import * as Yup from "yup";

import useForm from "../../../../../../../hooks/use-form";
import Input from "../../../../../../ui/form/input";
import Button from "../../../../../../ui/button";

import { useIssuingSupervisorActivityContext } from "../../../../../../../context/issuing-supervisor-context";
import { useEffect, useState } from "preact/hooks";

import { createRequest } from "../../../../../../../assets/api";
import { useIDContext } from "../../../../../../../context/id.context";
import dayjs from "dayjs";

export default function ToolKitTime() {
  const { state, send } = useIssuingSupervisorActivityContext();
  const { valueID } = useIDContext();
  const id = valueID;

  const [permitDetails, setPermitDetails] = useState<any>({
    from_date: "",
    from_time: "",
    to_date: "",
    to_time: "",
  });

  function getCurrentTimeIn12HrFormat() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }

  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
    }

    getPermitDetails();
  }, [valueID]);

  const { getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.tool_kit_time,
      //   permit_type: state.context.permit_type,
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
          <span>
            {dayjs(permitDetails.from_date).format("DD/MM/YYYY")} :{" "}
            {dayjs(permitDetails.from_time).format("hh:mm A")} -{" "}
            {dayjs(permitDetails.to_date).format("DD/MM/YYYY")} :{" "}
            {dayjs(permitDetails.to_time).format("hh:mm A")}{" "}
          </span>
        </div>
      </div>

      <div className="">
        <div className="">
          <div className="">
            <h4>Edit Start Time</h4>
            <div class="edit-start-time">
              <p>
                {" "}
                The time your are selecting must be more than the current time:
              </p>
              <br />
              <span>{getCurrentTimeIn12HrFormat()}</span>
            </div>
          </div>
          <br />
          <Input
            label="Time"
            type="time"
            placeholder="00:00AM"
            {...getFieldProps("startTime")}
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

  toolBoxLeaderIdentity: Yup.string().required("Identity leader is required"),
  toolBoxPosition: Yup.string().required("Position is required"),
});
