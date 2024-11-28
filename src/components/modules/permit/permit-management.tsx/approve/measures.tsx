import * as Yup from "yup";
import useForm from "../../../../../hooks/use-form";
import Checkbox from "../../../../ui/form/checkbox";
import Input from "../../../../ui/form/input";
import Button from "../../../../ui/button";
import { usePermitApprovalContext } from "../../../../../context/approve-permit.context";
import { useRouter } from "preact-router";

export default function MeasuresOnEquipment() {
  const { state, send } = usePermitApprovalContext();
  const [
    {
      matches: { id },
    },
  ] = useRouter();
  const { handleSubmit, getFieldProps, values, setFieldValue } = useForm({
    initialValues: state.context.measuresOnEquipments,
    onSubmit,
    validationSchema,
  });

  function onSubmit(measuresOnEquipments) {
    send("submit", { data: { measuresOnEquipments } });
  }

  return (
    <form onSubmit={handleSubmit} className="app-register__attachment-form">
      <h3 className="app-register__form__title">
        MEASURES ON EQUIPMENT / LINES
      </h3>

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
          href={`/permit-management/ptw/${id}`}
          variant="secondary"
          type="button"
        >
          Previous
        </Button>
        <Button variant="primary">Next</Button>
      </div>
    </form>
  );
}

const OPTIONS = [
  { label: "ISOLATION AND TAGGING OF VALVES (Ref. to P&IDs)" },
  { label: "FLANGES (Ref. to P&IDs and/or other schematic drawings)" },
  { label: "INSTALLATION" },
  { label: "REMOVAL" },
  {
    label: "LINE DISCONNECTION (Ref. to P&IDs and/or other schematic drawings)",
  },
  { label: "DRAINAGE" },
  { label: "DEPRESSURIZATION" },
  { label: "INERTING (inert gas / water / steam)" },
  { label: "VENTILATION (natural / mechanical means)" },
];

const validationSchema = Yup.object({});
