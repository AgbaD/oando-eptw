import * as Yup from "yup";
import useForm from "../../../../hooks/use-form";
import Input from "../../../ui/form/input";
import Button from "../../../ui/button";
import { usePermitContext } from "../../../../context/permit.context";

export default function CompanyDetails() {
  const { send, state } = usePermitContext();
  const { getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.company_details,
      permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  function onSubmit(company_details) {
    send("submit", { data: { company_details } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="app-register__form">
        <div className="app-register__form-grid">
          <Input
            label="Entrusted Company (Optional)"
            placeholder="Write here..."
            {...getFieldProps("entrusted_company")}
          />
          <Input
            label="Executing Company (Optional)"
            placeholder="Write here..."
            {...getFieldProps("executing_company")}
          />
          <Input
            label="Performing Department"
            placeholder="Enter performing Dept."
            {...getFieldProps("performing_department")}
            // required
          />
          <Input
            label="Contact Phone Number (Optional)"
            placeholder="Enter contact number"
            {...getFieldProps("company_contact_phone")}
          />
        </div>
      </div>

      <div className="app-register__form-footer">
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

const validationSchema = Yup.object({
  // performance_department: Yup.string().required(
  //   "Performance Dept. is required"
  // ),
});
