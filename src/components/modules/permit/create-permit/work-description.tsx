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
import { useDraftDetails } from "../../../../context/draft-details.context";

export default function WorkDescription() {
  const { draft, isDraft } = useDraftDetails();

  const siteApi = useRequest(getSites, {}, true);

  const [siteName, setSiteName] = useState("--select work site--");
  const [locationName, setLocationName] = useState(
    "--select work location area--"
  );
  const [locationOptions, setLocationOptions] = useState([]);
  const [workAreaOptions, setWorkAreaOptions] = useState([]);

  const { state, send } = usePermitContext();

  const validationSchema = getValidationSchema(isDraft);

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

  function onSubmit(values) {
    const work_description = {
      role: values.role || draft?.performerRole,
      performer: values.performer || draft?.performingPersonInCharge,
      work_description: values.work_description || draft?.workDescription,
      equipment_to_be_worked:
        values.equipment_to_be_worked || draft?.equipmentToolsMaterials,
      locationId: values.locationId || draft?.locationId,
      work_area: values.work_area || draft?.location?.workAreas?.[0],
      environmental_issues:
        values.environmental_issues || draft?.environmentalConsideration,
      from_date: values.from_date,
      from_time: values.from_time,
      to_date: values.to_date,
      to_time: values.to_time,
    };

    send("submit", { data: { work_description } });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__form">
      <div className="app-register__form-grid">
        <Input
          label={`Role *`}
          placeholder={`${
            isDraft
              ? draft?.performerRole
              : "Enter role (e.g., electrician, supervisor)"
          }`}
          {...getFieldProps("role")}
        />
        <Select
          label="Performing Person / Person-In-Charge *"
          placeholder={`${
            isDraft
              ? draft?.performingPersonInCharge
              : "Select performing person / person-in-charge"
          }`}
          {...getFieldProps("performer")}
          options={[
            { text: "Internal (Oando)", value: "INTERNAL" },
            { text: "External (Contractor)", value: "EXTERNAL" },
          ]}
        />
        <Textarea
          label="Work Description / Details *"
          placeholder={`${
            isDraft
              ? draft?.workDescription
              : "Describe the type of process or work to be performed."
          }`}
          {...getFieldProps("work_description")}
        />
        <Textarea
          label="Equipment / Tools / Materials *"
          placeholder={`${
            isDraft ? draft?.equipmentToolsMaterials : "Write here..."
          }`}
          {...getFieldProps("equipment_to_be_worked")}
        />
        <Select
          label="Site *"
          placeholder={`${
            isDraft ? `previous: ${draft?.location?.site}` : siteName
          }`}
          {...getFieldProps("site")}
          options={siteOptions}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setSiteName(value);
            setFieldValue("site", value); // Update field value
          }}
        />
        <Select
          label="Work Location *"
          placeholder={`${
            isDraft
              ? `previous: ${draft?.location?.locationArea}`
              : locationName
          }`}
          {...getFieldProps("locationId")}
          options={locationOptions}
          onChange={(e) => {
            const value = Number((e.target as HTMLSelectElement).value);
            handleLocationAreaChange(value);
            getFieldProps("locationId").onChange(e);
          }}
        />
        <Select
          label="Work Area (Unit / Installation) *"
          placeholder={`${
            isDraft
              ? `previous: ${draft?.location?.workAreas[0]}`
              : "--select work area / unit--"
          }`}
          {...getFieldProps("work_area")}
          options={workAreaOptions}
          onChange={(e) => {
            const value = (e.target as HTMLSelectElement).value;
            setFieldValue("work_area", value);
            console.log(`Selected Work Area: ${value}`);
          }}
        />
        <Textarea
          label="Environmental Considerations *"
          placeholder={`${
            isDraft
              ? draft?.environmentalConsideration
              : "Identify environmental issues related to the task."
          }`}
          {...getFieldProps("environmental_issues")}
        />
      </div>

      <h4>Permit Valid From / To</h4>
      <div className="app-register__form-grid">
        <div className="app-register__form-grid">
          <Input
            label="From Date *"
            placeholder={`${isDraft ? draft?.fromDate : "dd / mm / yyyy"}`}
            type="date"
            {...getFieldProps("from_date")}
          />
          <Input label="Time *" type="time" {...getFieldProps("from_time")} />
        </div>
        <div className="app-register__form-grid">
          <Input
            label="To Date *"
            placeholder="dd / mm / yyyy"
            type="date"
            {...getFieldProps("to_date")}
          />
          <Input
            label="Time *"
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

function getValidationSchema(isDraft) {
  const now = new Date();

  const dateTimeValidation = Yup.string().required("This field is required");

  const fromDateTimeValidation = Yup.string()
    .required("From date is required")
    .test(
      "is-not-in-past",
      "From date and time cannot be in the past",
      function (value) {
        const { from_time } = this.parent;
        const fromDateTime = new Date(`${value}T${from_time}`);
        return fromDateTime >= now;
      }
    );

  const toDateTimeValidation = Yup.string()
    .required("To date is required")
    .test(
      "is-after-from",
      "To date and time must be after the From date and time",
      function (value) {
        const { from_date, from_time, to_time } = this.parent;
        const fromDateTime = new Date(`${from_date}T${from_time}`);
        const toDateTime = new Date(`${value}T${to_time}`);
        return toDateTime > fromDateTime;
      }
    );

  if (isDraft) {
    return Yup.object({
      role: Yup.string(),
      performer: Yup.string(),
      work_description: Yup.string(),
      locationId: Yup.number(),
      work_area: Yup.string(),
      from_date: fromDateTimeValidation,
      to_date: toDateTimeValidation,
      from_time: dateTimeValidation,
      to_time: dateTimeValidation,
    });
  }

  return Yup.object({
    role: Yup.string().required("Role is required"),
    performer: Yup.string().required("Performer is required"),
    work_description: Yup.string().required("Work description is required"),
    locationId: Yup.number()
      .typeError("Location is required")
      .required("Location is required"),
    work_area: Yup.string().required("Work area is required"),
    from_date: fromDateTimeValidation,
    to_date: toDateTimeValidation,
    from_time: dateTimeValidation,
    to_time: dateTimeValidation,
  });
}
