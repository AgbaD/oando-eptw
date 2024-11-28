import * as Yup from "yup";
import { usePermitContext } from "../../../../context/permit.context";
import useForm from "../../../../hooks/use-form";
import Button from "../../../ui/button";
import Select from "../../../ui/form/select";

export default function PermitType() {
  const { state, send } = usePermitContext();
  const { getFieldProps, handleSubmit } = useForm({
    initialValues: {
      permit_type: state.context.permit_type,
    },
    onSubmit,
    validationSchema,
  });

  function onSubmit({ permit_type }) {
    send("submit", { data: { permit_type } });
  }

  return (
    <div className="app-create-permit__header">
      <form onSubmit={handleSubmit} className="app-register__form">
        <div className="app-register__form-grid">
          <Select
            placeholder="Select permit type"
            options={[
              { text: "Hot Work", value: "hot_work" },
              { text: "Cold Work", value: "cold_work" },
            ]}
            {...getFieldProps("permit_type")}
            required
          />
        </div>

        <div className="app-register__form-footer">
          <Button variant="primary">Next</Button>
        </div>
      </form>
    </div>
  );
}

const validationSchema = Yup.object({
  permit_type: Yup.string().required("Permit type is required"),
});
