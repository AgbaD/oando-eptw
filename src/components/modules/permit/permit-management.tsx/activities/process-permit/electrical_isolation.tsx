import * as Yup from "yup";

import useForm from "../../../../../../hooks/use-form";
import Button from "../../../../../ui/button";
import Radio from "../../../../../ui/form/radio";
import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";
import { route } from "preact-router";
import { useRoleContext } from "../../../../../../context/role.context";

export default function ElectricalIsolation() {
  const { send, state } = useIssuingActivityContext();

  const { getFieldProps, handleSubmit, setFieldValue, values } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.electrical_precaution,
    },
    onSubmit,
  });

  function updateElectricalIsolation(name: string, value: boolean) {
    setFieldValue("electricalPrecaution", {
      ...values.electricalPrecaution,
      [name]: value,
    });
  }

  async function submitForm() {
    const payload = {
      permitId: 1,
      hazards: {
        potentialHazardDescription:
          state.context.work_hazards?.potential_hazards,
        hazards: state.context.work_hazards?.hazards,
      },
      protectiveEquipment:
        state.context.personal_protective_equipment?.protectiveEquipment,

      firefightingPrecaution:
        state.context.firefighting_equipment?.firefightingEquipment,

      documents: {
        gasClearanceCertType: "MANUAL",
        gasClearanceCert: "...",
        scaffoldingCertType: "MANUAL",
        scaffoldingCert: "...",
        mewpCertType: "MANUAL",
        mewpCert: "...",
        manBasketCertType: "MANUAL",
        manBasketCert: "...",
      },
      mechanicalIsolationPrecaution:
        state.context.mechanical_precaution?.mechanicalPrecaution,

      electricalIsolationPrecaution:
        state.context.electrical_precaution?.electricalPrecaution,
    };

    console.log("payload", payload);
  }

  function onSubmit(electrical_precaution) {
    send("submit", { data: { electrical_precaution } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="app-create-permit__group-header">
        Select applicable option(s)
      </div>
      <div className="app-register__form">
        {LIST.map((item) => (
          <div className="app-create-permit__radio-container">
            <p>{item.text}</p>
            <div>
              <Radio
                checked={values.electricalPrecaution[item.value] === true}
                onChange={() => updateElectricalIsolation(item.value, true)}
                label="YES"
              />
              <Radio
                checked={values.electricalPrecaution[item.value] === false}
                onChange={() => updateElectricalIsolation(item.value, false)}
                label="NO"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="app-register__form-footer">
        <Button
          variant="danger"
          type="button"
          onClick={() => route("/process-permits")}
        >
          Send Back To Authority
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("go_back")}
        >
          Previous
        </Button>

        <Button variant="primary">SUBMIT</Button>
      </div>
    </form>
  );
}

export const LIST = [
  {
    text: "SWITCH OFF OR SHUTDOWN THE EQUIPMENT",
    value: "equipmentShutdown",
  },
  {
    text: "RACK OUT AND PADLOCK THE CIRCUIT BREAKER (Car seal is also optional)",
    value: "circuitBreakerPadlock",
  },
  {
    text: "USE MULTIMAKER TO CHECK VOLTAGE READING",
    value: "voltageReadingCheck",
  },
  {
    text: "DISCONNECT SUPPLY FROM THE SOURCE",
    value: "supplyDisconnection",
  },
  {
    text: "DISCONNECT CABLE FROM EQUIPMENT",
    value: "cableDisconnection",
  },
  // { text: "OVERHEAD HAZARDS, CRANES, ETC", value: "overheadHazardsCranes" },
  {
    text: "INSTALLATION OF GROUND FAULT CIRCUIT INTERUPTOR (GCFI OR RESIDUAL CURRENT CICUIT BREAKER (RCCB)",
    value: "gfciInstallation",
  },
  { text: "OTHERS", value: "others" },
];

const isHotPermit =
  (message) =>
  ([permit_type], schema) => {
    if (permit_type !== "hot_permit") return schema.optional();
    return schema.required(message);
  };

const validationSchema = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
