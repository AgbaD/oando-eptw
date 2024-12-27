import * as Yup from "yup";
import { usePerfRevalidationContext } from "../../../../../context/perf-revalidation-context";
import useForm from "../../../../../hooks/use-form";
import Button from "../../../../ui/button";
import Radio from "../../../../ui/form/radio";

export default function VerificationClosure() {
  const { state, send } = usePerfRevalidationContext();

  // Function to handle form submission
  const onSubmit = () => {
    send("submit", {
      data: {
        verification: { closureWorkAreaConfirmation: true },
      },
    });
  };

  const { values, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.verification,
    },
    onSubmit,
  });

  const currentPath = window.location.pathname;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {currentPath === "/closure-safety-officer" ||
        currentPath === "/closure-issuing-supervisor" ? (
          <label className="verification">
            <Radio
              checked={values.consentGiven}
              onChange={(e) => {
                values.consentGiven = e.target.checked;
              }}
            />
            <p>Confirm work area is safe to commence work</p>
          </label>
        ) : (
          <>
            <label className="verification">
              <Radio
                checked={values.consentGiven}
                onChange={(e) => {
                  values.consentGiven = e.target.checked;
                }}
              />
              <p>
                Confirm work area is checked and everything is safe to{" "}
                <span className="close">Close</span> permit
              </p>
            </label>
          </>
        )}

        <div className="app-register__form-footer">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              window.location.href = "/permit-activities";
            }}
          >
            Back
          </Button>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

const validationSchema = Yup.object({});
