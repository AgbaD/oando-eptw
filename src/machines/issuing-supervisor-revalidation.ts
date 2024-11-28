import { createMachine } from "xstate";
import { randomHash } from "../assets/utils";

const IssuingSupervisorRevalidationMachine = createMachine(
  {
    context: {
      verification: {},
      selected_documents: {
        documents: [],
      },
      document_uploads: {
        [`document_${randomHash(8)}`]: null,
        [`document_${randomHash(8)}`]: null,
        [`document_${randomHash(8)}`]: null,
        [`document_${randomHash(8)}`]: null,
      },
      tool_kit_time: {},
    },
    predictableActionArguments: true,
    initial: "verification",
    states: {
      verification: {
        meta: { title: "Take Commitment", section: "A" },
        on: {
          submit: {
            target: "selected_documents",
            actions: ["updateContext"],
          },
        },
      },
      selected_documents: {
        meta: { title: "Document Selection", section: "B" },
        on: {
          submit: {
            target: "document_uploads",
            actions: ["updateContext"],
          },
          go_back: "verification",
        },
      },
      document_uploads: {
        meta: { title: "Document Uploads", section: "C" },
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
          submit: {
            target: "submit",
            actions: ["updateContext"],
          },
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
          go_back: "document_uploads",
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

export default IssuingSupervisorRevalidationMachine;
