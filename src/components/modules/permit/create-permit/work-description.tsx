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
    "--select work location area --"
  );
  const [locationOptions, setLocationOptions] = useState([]);
  const [workAreaOptions, setWorkAreaOptions] = useState([]);

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

  async function handleLocationAreaChange(id: number) {
    const locations = await createRequest(`/location/${id}`, "GET");

    const name = locations[0]?.locationArea;
    setLocationName(name);

    const locationData = locations[0]?.data?.workAreas;

    const options = locationData.map((area) => ({
      text: area,
      value: "",
    }));
    console.log(locationData);
    setWorkAreaOptions(options || [{ text: "No work areas found", value: "" }]);
  }

  const { state, send } = usePermitContext();

  const { getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.work_description,
      permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  function onSubmit(work_description) {
    send("submit", { data: { work_description } });
  }

  // const companyOptions = response?.data?.map((opt) => ({
  //   text: `${opt.firstname} ${opt.lastname}`,
  //   value: opt.id,
  // }));

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
          // required
        />

        <Textarea
          label="Work Description / Details"
          placeholder="Describe of the type of process or work to be performed."
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
          onChange={(e) => setSiteName((e.target as HTMLInputElement).value)}
          // required
        />
        <Select
          label="Work Location"
          placeholder={locationName}
          {...getFieldProps("locationId")}
          options={locationOptions}
          onChange={(e) => {
            const value = parseInt((e.target as HTMLSelectElement).value);
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
            getFieldProps("work_area").onChange(e);
          }}
        />

        <Textarea
          label="Environmental Considerations"
          placeholder="Identify environmental issues related to the task."
          {...getFieldProps("environmental_issues")}
        />
        <div></div>
      </div>

      <h4>Permit Valid Form / To</h4>

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
  // performing_department: Yup.string().required(
  //   "Performing department is required"
  // ),
  // location_of_work: Yup.number()
  //   .typeError("Location is required")
  //   .required("Location is required"),
  // equipment_to_be_worked: Yup.string().required(
  //   "Equipment to be be worked is required"
  // ),
  // type_of_process: Yup.string().required("Type of process is required"),
  // contact_tel: Yup.string().required("Contact tel is required"),
  // contact_phone: Yup.string().required("Contact phone is required"),
  // no_of_personnel: Yup.number()
  //   .typeError("Number of personnel must be a number")
  //   .required("Number of personnel is required"),
  // work_to_be_done: Yup.string().required("Work to be done is required"),
  // tools: Yup.string().required("Tools is required"),
  // environmental_issues: Yup.string().required(
  //   "Environmental issues is required"
  // ),
  // from_date: Yup.string().required("From date is required"),
  // to_date: Yup.string().required("To date is required"),
  // from_time: Yup.string().required("From time is required"),
  // to_time: Yup.string().required("To time is required"),
  // // cold work fields
  // entrusted_company: Yup.string().when(
  //   "permit_type",
  //   isColdPermit("Entrusted company is required")
  // ),
  // executing_company: Yup.string().when(
  //   "permit_type",
  //   isColdPermit("Executing company is required")
  // ),
  // performer: Yup.string().when(
  //   "permit_type",
  //   isColdPermit("Performer is required")
  // ),
  // contractor_no: Yup.string().when(
  //   "permit_type",
  //   isColdPermit("Contractor no is required")
  // ),
  // sequential_ptw_ref: Yup.string().when(
  //   "permit_type",
  //   isColdPermit("Sequential PTW reference is required")
  // ),
  // parallel_ptw_ref: Yup.string().when(
  //   "permit_type",
  //   isColdPermit("Parallel PTW reference is required")
  // ),
  // // hot work fields
  // contractor: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Contractor is required")
  // ),
  // from_reference_to_previous_work: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Reference to previous PTW is required")
  // ),
  // to_reference_to_previous_work: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Reference to previous PTW is required")
  // ),
});
