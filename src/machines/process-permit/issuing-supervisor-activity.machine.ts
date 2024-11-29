import { createMachine } from "xstate";
import { randomHash } from "../../assets/utils";

const ActivityIssuingSupervisorMachine = () =>
  createMachine(
    {
      context: {
        selected_documents: {
          documents: [],
        },
        document_uploads: {
          [`document_${randomHash(8)}`]: null,
          [`document_${randomHash(8)}`]: null,
          [`document_${randomHash(8)}`]: null,
          [`document_${randomHash(8)}`]: null,
        },
        tool_kit_time: {
          toolBoxLeaderIdentity: "",
          toolBoxPosition: "",
          issuingAuthoritySupervisorTimeAdjustment: false,
          startTime: "",
        },
        submit: {},
      },
      predictableActionArguments: true,
      initial: "selected_documents",
      states: {
        selected_documents: {
          meta: { title: "Document Selection", section: "D" },
          on: {
            submit: {
              target: "document_uploads",
              actions: ["updateContext"],
            },
          },
        },
        document_uploads: {
          meta: { title: "Document Uploads", section: "E" },
          on: {
            submit: [
              {
                target: "tool_kit_time",
                actions: ["updateContext"],
              },
            ],
            go_back: "selected_documents",
          },
        },

        tool_kit_time: {
          meta: { title: "Tool - Box Talk Details" },
          on: {
            submit: [
              {
                target: "submit",
                actions: ["updateContext"],
              },
            ],
            go_back: "document_uploads",
          },
        },
        submit: {
          type: "final",
          on: {
            submit: {
              target: "submit",
              actions: ["updateContext"],
            },
            go_back: "tool_kit_time",
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

export default ActivityIssuingSupervisorMachine;
