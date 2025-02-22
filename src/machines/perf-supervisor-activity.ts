import { createMachine } from "xstate";
import { randomHash } from "../assets/utils";

const ActivityPerfSupervisorMachine = () =>
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
                target: "submit",
                actions: ["updateContext"],
              },
            ],
            go_back: "selected_documents",
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

export default ActivityPerfSupervisorMachine;
