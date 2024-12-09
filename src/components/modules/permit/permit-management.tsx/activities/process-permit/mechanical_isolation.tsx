import * as Yup from "yup";

import useForm from "../../../../../../hooks/use-form";
import Button from "../../../../../ui/button";
import Radio from "../../../../../ui/form/radio";
import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";

import SendToAuthority from "./send-back-to-authority";
import { useState } from "preact/hooks";

export default function MechanicalIsolation() {
  const { send, state } = useIssuingActivityContext();
  const { handleSubmit, setFieldValue, values } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.mechanical_precaution,
    },
    onSubmit,
  });

  function updateMechanicalIsolation(name: string, value: boolean) {
    setFieldValue("mechanicalPrecaution", {
      ...values.mechanicalPrecaution,
      [name]: value,
    });
  }

  function onSubmit(mechanical_precaution) {
    send("submit", { data: { mechanical_precaution } });
  }

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
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
                  checked={values.mechanicalPrecaution[item.value] === true}
                  onChange={() => updateMechanicalIsolation(item.value, true)}
                  label="YES"
                />
                <Radio
                  checked={values.mechanicalPrecaution[item.value] === false}
                  onChange={() => updateMechanicalIsolation(item.value, false)}
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
            onClick={() => setModalOpen(true)}
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
          <Button variant="primary">Next</Button>
        </div>
      </form>

      {isModalOpen && (
        <SendToAuthority setModalOpen={() => setModalOpen(false)} />
      )}
    </>
  );
}

export const LIST = [
  {
    text: "ISOLATION AND TAGGING OF VALVES (Ref. to P&IDs)",
    value: "valveIsolationAmdTagging",
  },
  {
    text: "FLANGES (Ref. to P&IDs and/or other schematic drawings) INSTALLATION",
    value: "flangesInstallation",
  },
  {
    text: "FLANGES (Ref. to P&IDs and/or other schematic drawings) REMOVAL",
    value: "flangesRemoval",
  },
  {
    text: "LINE DISCONNECTION (Ref. to P&IDs and/or other schematic drawings)",
    value: "lineDisconnection",
  },
  { text: "LINE / EQUIPMENT DRAINAGE", value: "lineDrainage" },

  {
    text: "LINE / EQUIPMENT DEPRESSURIZATION",
    value: "lineDepressurization",
  },
  { text: "VENTILATION (Natural / Mechanical means)", value: "ventilation" },
  { text: "OTHER", value: "other" },
];

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
