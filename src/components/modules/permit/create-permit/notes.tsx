import * as Yup from "yup";
import { route } from "preact-router";
import useForm from "../../../../hooks/use-form";
import Button from "../../../ui/button";
import { usePermitContext } from "../../../../context/permit.context";
import useRequest from "../../../../hooks/use-request";
import { createPermit } from "../../../../assets/api/permit";
import { toast } from "../../../ui/toast";
import Section from "../../../ui/sections";

import { HAZARDS } from "./work-hazards";

export default function AdditionalNotes() {
  const { state, send } = usePermitContext();
  const { makeRequest, isLoading } = useRequest(createPermit);
  const { handleSubmit } = useForm({
    initialValues: state.context.additional_values || {},
    onSubmit,
    validationSchema,
  });

  // Permit Summary Items
  const items = [
    {
      section: "A",
      header: "Work Type",
      content: [
        {
          id: 1,
          title: "Permit Type",
          info: state.context.permit_type,
        },
      ],
    },
    {
      section: "B",
      header: "Work Description",
      content: [
        { id: 1, title: "Role", info: state.context.work_description?.role },
        {
          id: 2,
          title: "Performing Person / Person In Charge",
          info: state.context.work_description?.performer,
        },
        {
          id: 3,
          title: "Work Details",
          info: state.context.work_description?.work_description,
        },
        {
          id: 4,
          title: "Equipment / Tools / Materials",
          info: state.context.work_description?.equipment_to_be_worked,
        },
        {
          id: 5,
          title: "Environmental Considerations",
          info: state.context.work_description?.environmental_issues,
        },
        {
          id: 6,
          title: "Work Location / Work Area",
          info: state.context.work_description?.locationId,
        },
        {
          id: 7,
          title: "Permit Valid From - To (Date & Time)",
          info: `${state.context.work_description?.from_date} - ${state.context.work_description?.to_date} ${state.context.work_description?.from_time} - ${state.context.work_description?.to_time}`,
        },
      ],
    },
    {
      section: "C",
      header: "Company Details",
      content: [
        {
          id: 1,
          title: "Entrusted Company",
          info: state.context.company_details?.entrusted_company,
        },
        {
          id: 2,
          title: "Executing Company",
          info: state.context.company_details?.executing_company,
        },
        {
          id: 3,
          title: "Performing Department",
          info: state.context.company_details?.performing_department,
        },
        {
          id: 4,
          title: "Contact Phone Number",
          info: state.context.company_details?.company_contact_phone,
        },
      ],
    },
    {
      section: "D",
      header: "Hazard Identification",
      content: [
        {
          id: 1,
          title: "Describe the potential hazards",
          info: state.context.work_hazards?.potential_hazards,
        },
      ],
    },
  ];

  const selectedHazards = state.context.work_hazards?.hazards || {};
  // Filter and map over the selected hazards
  const renderHazards = () => {
    return HAZARDS.filter((hazard) =>
      selectedHazards.hasOwnProperty(hazard.value)
    ) // Only include hazards that are selected
      .map((hazard) => (
        <div key={hazard.value} className="hazard-item">
          <p>
            <span class="hazard-value">
              {selectedHazards[hazard.value] ? "YES" : "NO"}
            </span>{" "}
            - {hazard.text}
          </p>
        </div>
      ));
  };

  function formatForBackend(fromDate, fromTime) {
    if (!fromDate || !fromTime) {
      throw new Error("Both fromDate and fromTime are required");
    }

    const timeISO = new Date(`1970-01-01T${fromTime}:00Z`).toISOString();

    return timeISO;
  }

  const documents = [
    {
      section: "E",
      header: "Document Uploads",
      content: [
        { id: 1, title: "Job Safety Analysis", upload_option: "Manual" },
        { id: 2, title: "Work Procedure", upload_option: "Online" },
        { id: 3, title: "Explosives Cert.", upload_option: "Manual" },
      ],
    },
  ];

  async function onSubmit(data) {
    console.log(data);
    const payload = {
      type: state.context.permit_type.toUpperCase(),
      workArea: state.context.work_description?.work_area,
      locationId: 1,
      performerRole: state.context.work_description?.role,
      performerPersonInCharge: state.context.work_description?.performer,
      workDescription: state.context.work_description?.work_description,
      equipmentToolsMaterials:
        state.context.work_description?.equipment_to_be_worked,
      environmentalConsideration:
        state.context.work_description?.environmental_issues,
      fromDate: state.context.work_description?.from_date,
      fromTime: formatForBackend(
        state.context.work_description?.from_date,
        state.context.work_description?.from_time
      ),
      toDate: state.context.work_description?.to_date,
      toTime: formatForBackend(
        state.context.work_description?.to_date,
        state.context.work_description?.to_time
      ),
      entrustedCompanyId: 1,
      // state.context.company_details?.entrusted_company,
      executingCompanyId: 1,
      performingDepartment:
        state.context.company_details?.performing_department,
      contractorPhoneNumber:
        state.context.company_details?.company_contact_phone,
      hazard: {
        potentialHazardDescription:
          state.context.work_hazards?.potentialHazardDescription || "",
        ...state.context.work_hazards?.hazards,
      },

      documents: {
        jobSafetyAnalysisType: "MANUAL",
        jobSafetyAnalysisDoc: "...",
        workProcedureType: "MANUAL",
        workProcedureDoc: "...",
        explosivesCertType: "MANUAL",
        explosivesCert: "...",
        mechanicalIsolationCertType: "MANUAL",
        mechanicalIsolationCert: "...",
      },
    };

    const [_, error] = await makeRequest(payload);
    if (error) {
      return toast({
        variant: "error",
        message: error.message ?? "Failed to create permit, please try again",
      });
    }
    route("/");
    toast({
      variant: "success",
      message: "Permit created successfully",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="app-register__form app-register__attachment-form"
    >
      <div className="app-register__content__header app-create-permit__header">
        <h3>Permit Summary</h3>
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("go_back")}
        >
          Back
        </Button>
      </div>
      <p>Review your permit to work before final submission.</p>
      <div></div>
      {items.map((item) => (
        <Section
          type="Primary"
          header={item.header}
          children={item.content}
          section={item.section}
        />
      ))}

      <div className="section">
        <div className="section__content">
          <p className="title">Identification of potential hazards</p>
          <p className="info">
            {Object.keys(selectedHazards).length > 0 ? (
              renderHazards()
            ) : (
              <p>No hazards selected.</p>
            )}
          </p>
        </div>
      </div>

      <Section
        type="Secondary"
        header="Documents"
        children={documents[0]}
        section={documents[0]?.section}
      />
      <div className="app-register__form-footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("go_back")}
        >
          Previous
        </Button>
        <Button variant="primary" isLoading={isLoading}>
          SUBMIT
        </Button>
      </div>
    </form>
  );
}

const validationSchema = Yup.object({
  // additional_notes: Yup.string().optional(),
});
