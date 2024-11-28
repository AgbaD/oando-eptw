import * as Yup from "yup";
import useForm from "../../../../../hooks/use-form";
import Checkbox from "../../../../ui/form/checkbox";
import Input from "../../../../ui/form/input";
import Button from "../../../../ui/button";
import { usePermitApprovalContext } from "../../../../../context/approve-permit.context";

export default function FireFighting() {
  const { state, send } = usePermitApprovalContext();
  const { handleSubmit, getFieldProps, values, setFieldValue } = useForm({
    initialValues: state.context.fireFighting,
    onSubmit,
    validationSchema,
  });

  function onSubmit(fireFighting) {
    send("submit", { data: { fireFighting } });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__attachment-form">
      <h3 className="app-register__form__title">FIREFIGHTING PRECAUTION</h3>

      {OPTIONS.map((opt, i) => (
        <label key={i}>
          <Checkbox
            checked={values[opt.label]}
            onChange={(v) => setFieldValue(opt.label, v)}
          />
          <p>{opt.label}</p>
        </label>
      ))}

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

const OPTIONS = [
  { label: "FIRE EXTINGUISHER (CO2)" },
  { label: "FIRE EXTINGUISHER (DCP)" },
  { label: "REMOVAL OF FLAMMABLE SUBSTANCES" },
  { label: "EXPLOSION-PROOF WORKING TOOLS (e.g. bronze tools)" },
  { label: "FLAME PROOF BLANKET" },
  { label: "GROUNDING OF EQUIPMENT" },
  { label: "CONTINOUS GAS MONITORING" },
  { label: "FIREWATCHER / STANDBY MAN" },
];

const validationSchema = Yup.object({});
