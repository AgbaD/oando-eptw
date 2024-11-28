import * as Yup from "yup";

import useForm from "../../../../../../hooks/use-form";

import Button from "../../../../../ui/button";
import Radio from "../../../../../ui/form/radio";

import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";

import { route } from "preact-router";

export default function PersonalProtectiveEquipment() {
  const { send, state } = useIssuingActivityContext();
  const { handleSubmit, setFieldValue, values } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.personal_protective_equipment,
    },
    onSubmit,
  });

  function updatePersonalEquipment(name: string, value: boolean) {
    setFieldValue("protectiveEquipment", {
      ...values.protectiveEquipment,
      [name]: value,
    });
  }

  function onSubmit(personal_protective_equipment) {
    send("submit", { data: { personal_protective_equipment } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="app-register__form"></div>

      <div className="app-create-permit__group-header">
        Select applicable option(s) below
      </div>
      <div className="app-register__form">
        {EQUIPMENT.map((equipment) => (
          <div className="app-create-permit__radio-container">
            <p>{equipment.text}</p>
            <div>
              <Radio
                checked={values.protectiveEquipment[equipment.value] === true}
                onChange={() => updatePersonalEquipment(equipment.value, true)}
                label="YES"
              />
              <Radio
                checked={values.protectiveEquipment[equipment.value] === false}
                onChange={() => updatePersonalEquipment(equipment.value, false)}
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
        <Button variant="primary">Next</Button>
      </div>
    </form>
  );
}

export const EQUIPMENT = [
  { text: "SAFETY HARD HATS (Type I, Type II)", value: "safetyHardHats" },
  {
    text: "SAFETY SHOES OR BOOTS (Anti-slip, Steel toe, Chemical Resistant, rain boots)",
    value: "safetyShoesOrBoots",
  },
  {
    text: "BODY PROTECTION (Coverall) (Chemical resistant, apron, fire retardant, fire resistant)",
    value: "bodyProtection",
  },
  {
    text: "SAFETY GLOVES (Welders, Chemical resistant, Electrical resistant, high impact, mechanical, anti-vibration, General purpose)",
    value: "safetyGloves",
  },
  {
    text: "BREATHING APPARATUS (Dust, Fumes, Chemical, SCBA)",
    value: "breathingApparatus",
  },
  {
    text: "SAFETY GLASSES / FACE SHIELD / ELECTRIC ARC SHIELD / GRINDING SHIELD",
    value: "safetyGlasses",
  },
  {
    text: "HEARING PROTECTION (ear muff, ear plugs, ear muff & ear plugs)",
    value: "hearingProtection",
  },
  { text: "LIFE VEST (Work Vest, Life Jacket)", value: "lifeVest" },
  { text: "LIFE BUOY / LIFE LINE", value: "lifeBuoy" },
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
