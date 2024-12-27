import * as Yup from "yup";

import useForm from "../../../../../../hooks/use-form";
import Input from "../../../../../ui/form/input";
import Button from "../../../../../ui/button";

import { useAuthorizingActivityContext } from "../../../../../../context/authorizing-activity-context";

import { useIDContext } from "../../../../../../context/id.context";
import { createRequest } from "../../../../../../assets/api";
import { useState, useEffect } from "preact/hooks";
import dayjs from "dayjs";

export default function UpdateTimeDate() {
  const { state, send } = useAuthorizingActivityContext();

  const { valueID } = useIDContext();
  const id = valueID;

  const [permitDetails, setPermitDetails] = useState<any>({
    from_date: "",
    from_time: "",
    to_date: "",
    to_time: "",
  });

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
      ...state.context.adjust_date_time,
      //   permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  function onSubmit(adjust_date_time) {
    send("submit", { data: { adjust_date_time } });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__form">
      <h4>Kindly re-djust the date & time as appropriate (Optional)</h4>
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

      <h4>Adjust Permit Date & Time</h4>

      <div className="app-register__form-grid">
        <div className="app-register__form-grid show">
          <Input
            label="From Date"
            placeholder="dd / mm / yyyy"
            type="date"
            {...getFieldProps("fromDate")}
          />
          <Input label="Time" type="time" {...getFieldProps("fromTime")} />
        </div>

        <div className="app-register__form-grid show">
          <Input
            label="To Date"
            placeholder="dd / mm / yyyy"
            type="date"
            {...getFieldProps("toDate")}
          />
          <Input
            label="Time"
            type="time"
            placeholder="00:00AM"
            {...getFieldProps("toTime")}
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
