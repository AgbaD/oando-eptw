import * as Yup from "yup";
import Button from "../../ui/button";
import Input from "../../ui/form/input";
import { useRegistrationContext } from "../../../context/registration.context";
import useForm from "../../../hooks/use-form";
import Select from "../../ui/form/select";
import useRequest from "../../../hooks/use-request";
import { getAllExternalUsers } from "../../../assets/api/user";

export default function CompanyDetails() {
  const { response, isLoading} = useRequest(getAllExternalUsers, {}, true);
  const { send, state } = useRegistrationContext();
  const { getFieldProps, handleSubmit } = useForm({
    initialValues: state.context.company_details,
    onSubmit,
    validationSchema,
  });

  function onSubmit(data) {
    send("submit", { data });
  }

  const companyOptions = response?.data?.map((opt) => ({
    text: `${opt.firstname} ${opt.lastname}`,
    value: opt.id,
  }));

  return (
    <form onSubmit={handleSubmit} className="app-register__form">
      <div className="app-register__form-grid">
        <Select
          required
          disabled={isLoading}
          label={`Company ${isLoading ? "(please wait...)" : ""}`}
          {...getFieldProps("company")}
          options={companyOptions}
        />

        <Input
          label="Division"
          placeholder="Enter your division"
          {...getFieldProps("division")}
        />
        <Input
          label="Department"
          placeholder="Enter your department"
          {...getFieldProps("department")}
        />
      </div>

      <div className="app-register__form-footer">
        <Button
          variant="secondary"
          type="button"
          onClick={() => send({ type: "go_back" })}
        >
          Previous
        </Button>
        <Button variant="primary">Next</Button>
      </div>
    </form>
  );
}

const validationSchema = Yup.object({
  company: Yup.string().required("Company is required"),
  division: Yup.string().required("Division is required"),
  department: Yup.string().required("Department is required"),
});
