import * as Yup from "yup";
import useForm from "../../../../hooks/use-form";
import Select from "../../../ui/form/select";
import Input from "../../../ui/form/input";
import Textarea from "../../../ui/form/text-area";
import Button from "../../../ui/button";
import { usePermitContext } from "../../../../context/permit.context";

import { siteOptions } from "../../locations/data";
import useRequest from "../../../../hooks/use-request";
import { getSites } from "../../../../assets/api/user";
import { useState, useEffect } from "preact/hooks";
import { createRequest } from "../../../../assets/api";

export default function WorkDescription() {
  const siteApi = useRequest(getSites, {}, true);

  const [siteName, setSiteName] = useState("--select work site--");
  const [locationName, setLocationName] = useState(
    "--select work location area--"
  );
  const [locationOptions, setLocationOptions] = useState([]);
  const [workAreaOptions, setWorkAreaOptions] = useState([]);

  const { state, send } = usePermitContext();

  const { getFieldProps, handleSubmit, setFieldValue } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.work_description,
      permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  useEffect(() => {
    if (siteName && siteApi.response) {
      const siteData = siteApi.response.data[siteName];

      // Map locations for the selected site, or show "No locations found"
      const locations = siteData
        ? siteData.map((location) => ({
            text: location.locationArea,
            value: location.id,
          }))
        : [{ text: "No location areas found", value: "" }];

      setLocationOptions(locations);
    }
  }, [siteName, siteApi.response]);

  async function handleLocationAreaChange(id) {
    const locations = await createRequest(`/location/${id}`, "GET");

    const name = locations[0]?.locationArea;
    setLocationName(name);

    const locationData = locations[0]?.data?.workAreas;

    const options = locationData
      ? locationData.map((area) => ({
          text: area,
          value: area, // Ensure value is set to the work area name
        }))
      : [{ text: "No work areas found", value: "" }];

    setWorkAreaOptions(options);
  }

  function onSubmit(work_description) {
    send("submit", { data: { work_description } });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__form">
      <div className="app-register__form-grid">
        <Input
          label="Role"
          placeholder="Enter role (e.g., electrician, supervisor)"
          {...getFieldProps("role")}
        />
        <Select
          label="Performing Person / Person-In-Charge"
          {...getFieldProps("performer")}
          options={[
            { text: "Internal (Eni Nigeria)", value: "INTERNAL" },
            { text: "External (Contractor)", value: "EXTERNAL" },
          ]}
        />
        <Textarea
          label="Work Description / Details"
          placeholder="Describe the type of process or work to be performed."
          {...getFieldProps("work_description")}
        />
        <Textarea
          label="Equipment / Tools / Materials"
          placeholder="Write here..."
          {...getFieldProps("equipment_to_be_worked")}
        />
        <Select
          label="Site"
          placeholder={siteName}
          {...getFieldProps("site")}
          options={siteOptions}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setSiteName(value);
            setFieldValue("site", value); // Update field value
          }}
        />
        <Select
          label="Work Location"
          placeholder={locationName}
          {...getFieldProps("locationId")}
          options={locationOptions}
          onChange={(e) => {
            const value = Number((e.target as HTMLSelectElement).value);
            handleLocationAreaChange(value);
            getFieldProps("locationId").onChange(e);
          }}
        />
        <Select
          label="Work Area (Unit / Installation)"
          placeholder="--select work area / unit--"
          {...getFieldProps("work_area")}
          options={workAreaOptions}
          onChange={(e) => {
            const value = (e.target as HTMLSelectElement).value;
            setFieldValue("work_area", value);
            console.log(`Selected Work Area: ${value}`);
          }}
        />
        <Textarea
          label="Environmental Considerations"
          placeholder="Identify environmental issues related to the task."
          {...getFieldProps("environmental_issues")}
        />
      </div>

      <h4>Permit Valid From / To</h4>
      <div className="app-register__form-grid">
        <div className="app-register__form-grid">
          <Input
            label="From Date"
            placeholder="dd / mm / yyyy"
            type="date"
            {...getFieldProps("from_date")}
          />
          <Input label="Time" type="time" {...getFieldProps("from_time")} />
        </div>
        <div className="app-register__form-grid">
          <Input
            label="To Date"
            placeholder="dd / mm / yyyy"
            type="date"
            {...getFieldProps("to_date")}
          />
          <Input
            label="Time"
            type="time"
            placeholder="00:00AM"
            {...getFieldProps("to_time")}
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
        <Button variant="primary">Next</Button>
      </div>
    </form>
  );
}

const validationSchema = Yup.object({
  role: Yup.string().required("Role is required"),
  performer: Yup.string().required("Performer is required"),
  work_description: Yup.string().required("Work description is required"),
  locationId: Yup.number()
    .typeError("Location is required")
    .required("Location is required"),
  work_area: Yup.string().required("Work area is required"),
  from_date: Yup.string().required("From date is required"),
  to_date: Yup.string().required("To date is required"),
  from_time: Yup.string().required("From time is required"),
  to_time: Yup.string().required("To time is required"),
});
