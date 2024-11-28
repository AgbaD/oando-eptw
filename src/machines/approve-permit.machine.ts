import { createMachine } from "xstate";

const ApprovePermitMachine = createMachine(
  {
    context: {
      measuresOnEquipments: {},
      precautions: {},
      fireFighting: {},
      personalEquipments: {},
      permitCerts: {},
      uploadPermitDocs: {},
      consent: {
        isReviewed: false,
        consentGiven: false,
      },
    },
    initial: "measuresOnEquipments",
    states: {
      measuresOnEquipments: {
        on: {
          submit: {
            target: "precautions",
            actions: ["updateContext"],
          },
        },
      },
      precautions: {
        on: {
          submit: {
            target: "fireFighting",
            actions: ["updateContext"],
          },
          goBack: "measuresOnEquipments",
        },
      },
      fireFighting: {
        on: {
          submit: {
            target: "personalEquipments",
            actions: ["updateContext"],
          },
          goBack: "precautions",
        },
      },
      personalEquipments: {
        on: {
          submit: {
            target: "permitCerts",
            actions: ["updateContext"],
          },
          goBack: "fireFighting",
        },
      },
      permitCerts: {
        on: {
          submit: {
            target: "uploadPermitDocs",
            actions: ["updateContext"],
          },
          goBack: "personalEquipments",
        },
      },
      uploadPermitDocs: {
        on: {
          submit: {
            target: "consent",
            actions: ["updateContext"],
          },
          goBack: "permitCerts",
        },
      },
      consent: {
        on: {
          goBack: "uploadPermitDocs",
          submit: "success",
        },
      },
      success: {},
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

export default ApprovePermitMachine;
