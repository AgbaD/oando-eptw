import { createMachine } from "xstate";
import { randomHash } from "../assets/utils";

const ActivityAuthorizingMachine = () =>
  createMachine(
    {
      context: {
        work_hazards: {
          hazards: {},
          potentialHazardDescription: "",
        },
        personal_protective_equipment: {
          protectiveEquipment: {},
        },
        firefighting_equipment: {
          firefightingEquipment: {},
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
        mechanical_precaution: {
          mechanicalPrecaution: {},
        },
        electrical_precaution: {
          electricalPrecaution: {},
        },
        adjust_date_time: {
          fromDate: "",
          fromTime: "",
          toDate: "",
          toTime: "",
        },
        // tool_kit_time: {},
        submit: {},
      },
      predictableActionArguments: true,
      initial: "work_hazards",
      states: {
        work_hazards: {
          meta: { title: "Hazard Identification", section: "A" },
          on: {
            submit: {
              target: "personal_protective_equipment",
              actions: ["updateContext"],
            },
          },
        },
        personal_protective_equipment: {
          meta: { title: "Personal Protective Equipment", section: "B" },
          on: {
            submit: {
              target: "firefighting_equipment",
              actions: ["updateContext"],
            },
            go_back: "work_hazards",
          },
        },
        firefighting_equipment: {
          meta: { title: "Firefighting Equipment", section: "C" },
          on: {
            submit: {
              target: "selected_documents",
              actions: ["updateContext"],
            },
            go_back: "personal_protective_equipment",
          },
        },
        selected_documents: {
          meta: { title: "Document Selection", section: "D" },
          on: {
            submit: {
              target: "document_uploads",
              actions: ["updateContext"],
            },
            go_back: "firefighting_equipment",
          },
        },
        document_uploads: {
          meta: { title: "Document Uploads", section: "E" },
          on: {
            submit: [
              {
                target: "mechanical_precaution",
                actions: ["updateContext"],
              },
            ],
            go_back: "selected_documents",
          },
        },
        mechanical_precaution: {
          meta: {
            title: "Mechanical Isolation (Measures on Equipments / Line)",
          },
          on: {
            submit: {
              target: "electrical_precaution",
              actions: ["updateContext"],
            },
            go_back: "document_uploads",
          },
        },
        electrical_precaution: {
          meta: {
            title: "Electrical Isolation (Measures on Equipments / Line)",
          },
          on: {
            submit: [
              {
                target: "adjust_date_time",
                actions: ["updateContext"],
              },
            ],
            go_back: "mechanical_precaution",
          },
        },
        adjust_date_time: {
          meta: { title: "Adjust Date & Time" },
          on: {
            submit: [
              {
                target: "submit",
                actions: ["updateContext"],
              },
            ],
            go_back: "electrical_precaution",
          },
        },

        submit: {
          type: "final",
          on: {
            submit: {
              target: "submit",
              actions: ["updateContext"],
            },
            go_back: "adjust_date_time",
          },
        },
      },
    },
    {
      actions: {
        updateContext(ctx, event) {
          Object.assign(ctx, event.data);
        },
      },
    }
  );

export default ActivityAuthorizingMachine;
