import * as Yup from "yup";
import useForm from "../../../../hooks/use-form";
import Select from "../../../ui/form/select";
import Input from "../../../ui/form/input";
import Textarea from "../../../ui/form/text-area";
import Button from "../../../ui/button";
import { usePermitContext } from "../../../../context/permit.context";

export default function WorkDescription() {
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

  const locationOptions = [
    { text: "Location A", value: 1 },
    { text: "Location B", value: 2 },
    { text: "Location C", value: 3 },
  ];

  // const companyOptions = response?.data?.map((opt) => ({
  //   text: `${opt.firstname} ${opt.lastname}`,
  //   value: opt.id,
  // }));

  return (
    <form onSubmit={handleSubmit} className="app-register__form">
      <div className="app-register__form-grid">
        {/* <Select
          label="Performing Department"
          {...getFieldProps("performing_department")}
          options={[{ text: "Performing department 1", value: "BU_1" }]}
          required
        /> */}
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
        {/* <Select
          label="Location of Work"
          {...getFieldProps("location_of_work")}
          options={locationOptions}
          // required
        /> */}
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
          label="Work Location"
          {...getFieldProps("locationId")}
          options={locationOptions}
          // required
        />
        <Select
          label="Work Area (Unit / Installation)"
          {...getFieldProps("work_area")}
          options={locationOptions}
          // required
        />
        <Textarea
          label="Environmental Considerations"
          placeholder="Identify environmental issues related to the task."
          {...getFieldProps("environmental_issues")}
        />
        <div></div>
        {/* <Input
          label="Plant / Equipment to be worked upon"
          placeholder="Enter plant / equipment"
          {...getFieldProps("equipment_to_be_worked")}
        /> */}
        {/* <Input
          label="Type of Process"
          placeholder="Enter process type"
          {...getFieldProps("type_of_process")}
        /> */}

        {/* {state.context.permit_type === "cold_permit" ? (
          <>
            <Select
              label="Entrusted company"
              placeholder="Select entrusted company"
              {...getFieldProps("entrusted_company")}
              options={companyOptions}
              required
            />
            <Select
              label="Executing Company"
              placeholder="Select executing Company"
              {...getFieldProps("executing_company")}
              options={companyOptions}
              required
            />
            <Input
              label="Performer"
              placeholder="Performer"
              {...getFieldProps("performer")}
            />

            <Input
              label="Contractor No"
              placeholder="Enter contractor number"
              {...getFieldProps("contractor_no")}
            />
          </>
        ) : (
          <Select
            label="Contractor"
            {...getFieldProps("contractor")}
            options={companyOptions}
            required
          />
        )} */}

        {/* <Input
          label="Contact Tel. No."
          placeholder="Enter phone no."
          {...getFieldProps("contact_tel")}
        />
        <Input
          label="Contact Phone No."
          placeholder="Enter phone no."
          {...getFieldProps("contact_phone")}
        />
        <Input
          label="No of Personnel for Activity"
          placeholder="Enter no. of personnel"
          {...getFieldProps("no_of_personnel")}
        /> */}
      </div>

      {/* <Textarea
        label="Work to be Performed"
        placeholder="Write here..."
        {...getFieldProps("work_to_be_done")}
      />

      <div className="app-register__form-grid">
        <Textarea
          label="Equipment / Tools / Materials"
          placeholder="Write here..."
          {...getFieldProps("tools")}
        />
        <Textarea
          label="What Type of Environmental Issues"
          placeholder="Write here..."
          {...getFieldProps("environmental_issues")}
        />
      </div> */}

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

        {state.context.permit_type === "cold_permit" ? (
          <>
            {/* <Input
              label="Reference to Sequential PTW (No.)"
              placeholder="Enter reference"
              {...getFieldProps("sequential_ptw_ref")}
            />
            <Input
              label="Reference to Parallel PTW (No.)"
              placeholder="Enter reference"
              {...getFieldProps("parallel_ptw_ref")}
            /> */}
          </>
        ) : (
          <>
            {/* <Input
              label="Reference to Previous PTW (No.)"
              placeholder="Enter reference"
              {...getFieldProps("from_reference_to_previous_work")}
            />
            <Input
              label="Reference to Previous PTW (No.)"
              placeholder="Enter reference"
              {...getFieldProps("to_reference_to_previous_work")}
            /> */}
          </>
        )}
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
