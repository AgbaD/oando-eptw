import { createMachine } from "xstate";
import { randomHash } from "../assets/utils";

const PermitMachine = createMachine(
  {
    context: {
      work_description: {
        role: "",
        performer: "",
        work_description: "",
        equipment_to_be_worked: "",
        locationId: 0,
        work_area: "",
        environmental_issues: "",
        from_date: "",
        from_time: "",
        to_date: "",
        to_time: "",
      },
      company_details: {
        entrusted_company: "",
        executing_company: "",
        performing_department: "",
        company_contact_phone: "",
      },
      work_hazards: {
        potentialHazardDescription: "",
        hazards: {},
      },
      selected_documents: {
        documents: [],
      },
      document_uploads: {
        [`document_${randomHash(8)}`]: null,
        [`document_${randomHash(8)}`]: null,
        [`document_${randomHash(8)}`]: null,
        [`document_${randomHash(8)}`]: null,
      },
      additional_notes: {
        additional_notes: "",
        isCorrect: false,
        consentGiven: false,
      },
      formatted_documents: {},
    },
    predictableActionArguments: true,
    initial: "permit_type",
    states: {
      permit_type: {
        meta: { title: "Work Type", section: "A" },
        on: {
          submit: {
            target: "work_description",
            actions: ["updateContext"],
          },
        },
      },
      work_description: {
        meta: { title: "Permit Details", section: "A" },
        on: {
          submit: {
            target: "company_details",
            actions: ["updateContext"],
          },
          go_back: "permit_type",
        },
      },
      company_details: {
        meta: { title: "Company Details", section: "B" },
        on: {
          submit: {
            target: "work_hazards",
            actions: ["updateContext"],
          },
          go_back: "work_description",
        },
      },
      work_hazards: {
        meta: { title: "Hazard Identification", section: "C" },
        on: {
          submit: {
            target: "selected_documents",
            actions: ["updateContext"],
          },
          go_back: "company_details",
        },
      },
      selected_documents: {
        meta: { title: "Document Uploads", section: "D" },
        on: {
          submit: {
            target: "document_uploads",
            actions: ["updateContext"],
          },
          go_back: "work_hazards",
        },
      },
      document_uploads: {
        meta: { title: "Document Uploads", section: "D" },
        on: {
          submit: {
            target: "additional_notes",
            actions: ["updateContext"],
          },
          go_back: "selected_documents",
        },
      },
      additional_notes: {
        meta: { title: "Permit Summary" },
        on: {
          go_back: "document_uploads",
        },
      },
    },
  },
  {
    actions: {
      updateContext(ctx, event) {
        return Object.assign(ctx, event.data);
      },
    },
  }
);

export default PermitMachine;
