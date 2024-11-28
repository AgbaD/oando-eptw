import * as Yup from "yup";
import useForm from "../../../../../hooks/use-form";
import Checkbox from "../../../../ui/form/checkbox";
import Input from "../../../../ui/form/input";
import Button from "../../../../ui/button";
import { usePermitApprovalContext } from "../../../../../context/approve-permit.context";

export default function Precautions() {
  const { state, send } = usePermitApprovalContext();
  const { handleSubmit, getFieldProps, values, setFieldValue } = useForm({
    initialValues: state.context.precautions,
    onSubmit,
    validationSchema,
  });

  function onSubmit(precautions) {
    send("submit", { data: { precautions } });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__attachment-form">
      <h3 className="app-register__form__title">PRECAUTION</h3>

      <div className="app-register__form-grid">
        {OPTIONS.map((opt, i) => (
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

const OPTIONS = [
  { label: "SHIELD ADJACENT WORK / EQUIPMENT" },
  { label: "AREA TO BE CORDONED / WARNING SIGNS / NOTICES" },
  { label: "WIND DIRECTION" },
  { label: "SEWERS / DRAIN TO BE CLOSED" },
  { label: "REMOTE CONTROLLED EQUIPMENT AFFECTED" },
  { label: "SCAFFOLDING / WORK PLATFORM / RESCUE PLAN IN PLACE" },
  { label: "EARTHING / BONDING CORRECTLY APPLIED" },
  { label: "WORK TO STOP DURING ADVERSE WEATHER" },
  { label: "NON-CONDUCTIVE LADDER" },
  { label: "USE OF NON-SPARK TOOL" },
  { label: "ELECTRICAL ISOLATED TOOLS" },
  { label: "FOAM MAKING EQUIPMENT / FIRE TRUCK" },
  { label: "VOLTAGE IS BELOW 6KV IF NOT SEE BELOW" },
  { label: "TBT SIGNED BY WORK FORCE" },
  { label: "ABOVE 6KV PERSONNEL MUST BE TRAINED TO WORK ON THE SYSTEM" },
  { label: "GAS TESTING" },
  { label: "PORTABLE GROUNDING KIT" },
  { label: "CONTAINMENT OF ANY LIQUID" },
];

const validationSchema = Yup.object({});
