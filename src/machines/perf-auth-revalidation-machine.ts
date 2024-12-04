import { createMachine } from "xstate";
import { randomHash } from "../assets/utils";

const PerfRevalidationMachine = createMachine(
  {
    context: {
      verification: {
        closureWorkAreaConfirmation: false,
        revalidateWorkAreaConfirmation: false,
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

export default PerfRevalidationMachine;
