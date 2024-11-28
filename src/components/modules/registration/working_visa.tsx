import { useRegistrationContext } from "../../../context/registration.context";
import useForm from "../../../hooks/use-form";
import Button from "../../ui/button";
import Radio from "../../ui/form/radio";
import * as Yup from "yup";

export default function WorkingVisa() {
  const { state, send } = useRegistrationContext();
  const { handleSubmit, setFieldValue, getFieldProps } = useForm({
    initialValues: { isResident: state.context.isResident },
    validationSchema,
    onSubmit,
  });
  const { value: isResident, isTouched, error } = getFieldProps("isResident");

  function onSubmit(data) {
    send("submit", { data });
  }

  return (
    <>
      <h3 className="app-register__form__title">
        Work Permit Requirement
        {isTouched && error ? (
          <span className="field-error">({error})</span>
        ) : null}
      </h3>

      <form onSubmit={handleSubmit} className="app-register__form">
        <Radio
          checked={isResident === true}
          onClick={() => setFieldValue("isResident", true)}
          label={
            <p>
              Contractor is working in locations where he or she is a{" "}
              <strong>resident or citizen</strong> and where{" "}
              <strong>no work permit</strong> is required.
            </p>
          }
        />

        <Radio
          checked={isResident === false}
          onClick={() => setFieldValue("isResident", false)}
          label={
            <p>
              Contractor is working in locations where he or she is a{" "}
              <strong>non-resident or non-citizen</strong> and where{" "}
              <strong>work permit</strong> is required.
            </p>
          }
        />

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
    </>
  );
}

const validationSchema = Yup.object({
  isResident: Yup.boolean().required("Please select an option"),
});
