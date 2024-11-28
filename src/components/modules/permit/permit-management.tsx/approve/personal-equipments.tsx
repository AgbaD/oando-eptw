import * as Yup from "yup";
import useForm from "../../../../../hooks/use-form";
import Checkbox from "../../../../ui/form/checkbox";
import Input from "../../../../ui/form/input";
import Button from "../../../../ui/button";
import { usePermitApprovalContext } from "../../../../../context/approve-permit.context";

export default function PersonalEquipments() {
  const { state, send } = usePermitApprovalContext();
  const { handleSubmit, getFieldProps, values, setFieldValue } = useForm({
    initialValues: state.context.personalEquipments,
    onSubmit,
    validationSchema,
  });

  function onSubmit(personalEquipments) {
    send("submit", { data: { personalEquipments } });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__attachment-form">
      <h3 className="app-register__form__title">
        PERSONAL PROTECTIVE EQUIPMENT
      </h3>

      <div className="app-register__form-grid">
        {PERSONAL_EQUIPMENT.map((opt, i) => (
          <label className="base-checkbox-label" key={i}>
            <Checkbox
              checked={values[opt.label]}
              onChange={(v) => setFieldValue(opt.label, v)}
            />
            <p>{opt.label}</p>
          </label>
        ))}
      </div>

      <div className="app-register__form-grid">
        <Input
          label="OTHERS"
          placeholder="Write here..."
          {...getFieldProps("others")}
        />
      </div>

      <div className="app-register__form-footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => send("goBack")}
        >
          Previous
        </Button>
        <Button variant="primary">Next</Button>
      </div>
    </form>
  );
}

export const PERSONAL_EQUIPMENT = [
  { label: "SAFETY HELMET" },
  { label: "BEATING APPARATUS" },
  { label: "SAFETY BOOTS (boots / rubber boots)" },
  { label: "DUST / FUMES / SPECIAL GAS FILTER MASKS" },
  { label: "BODY CLOTHING (coverall / full chem / APRON)" },
  { label: "LIFE JACKET / WORK VESTS" },
  { label: "GLOVES (chemical / work / weld)" },
  { label: "ELECTRICAL RESCUE (Shepherds) HOOK" },
  { label: "SAFETY GLASSES / FACE SHIELD" },
  { label: "ELECTRICAL STATIC DISCHARGE STICK" },
  { label: "HEARING PROTECTION (ear muff / ear plugs)" },
  { label: "FOAM MAKING EQUIPMENT / FIRE TRUCK" },
  { label: "SAFETY HARNESS (full body type only) / LIFELINE" },
  { label: "ABOVE 6KV PERSONNEL MUST BE TRAINED TO WORK ON THE SYSTEM" },
  { label: "PORTABLE GROUNDING KIT" },
];

const validationSchema = Yup.object({});
