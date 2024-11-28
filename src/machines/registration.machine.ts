import { createMachine } from "xstate";

const RegistrationMachine = createMachine(
  {
    context: {
      personal_details: {
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        nationality: "",
        passport: "",
        contact_number: "",
      },
      company_details: {
        company: "",
        division: "",
        department: "",
      },
      attachment: {
        isCorrect: false,
        consentGiven: false,
        supportingDoc: null,
      },
    },
    predictableActionArguments: true,
    initial: "personal_details",
    states: {
      personal_details: {
        on: {
          submit: { target: "company", actions: ["updatePersonalDetails"] },
        },
      },
      company: {
        on: {
          submit: { target: "working_visa", actions: ["updateCompanyDetails"] },
          go_back: "personal_details",
        },
      },
      working_visa: {
        on: {
          submit: { target: "attachment", actions: ["updateWorkingVisa"] },
          go_back: "company",
        },
      },
      attachment: {
        on: {
          go_back: "working_visa",
        }
      },
    },
  },
  {
    actions: {
      updateTenant(ctx, event) {
        return Object.assign(ctx, { tenant_details: event.data });
      },
      updatePersonalDetails(ctx, event) {
        return Object.assign(ctx, { personal_details: event.data });
      },
      updateRoles(ctx, event) {
        return Object.assign(ctx, { roles: event.data });
      },
      updateCompanyDetails(ctx, event) {
        return Object.assign(ctx, { company_details: event.data });
      },
      updateWorkingVisa(ctx, event) {
        return Object.assign(ctx, event.data);
      },
    },
  }
);

export default RegistrationMachine;
