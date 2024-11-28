import { usePerfRevalidationContext } from "../../../../../../context/perf-revalidation-context";

import useForm from "../../../../../../hooks/use-form";
import * as Yup from "yup";

import Button from "../../../../../ui/button";
import Radio from "../../../../../ui/form/radio";

export default function Verification() {
  const { state, send } = usePerfRevalidationContext();

  const onSubmit = (selected_documents) => {
    send("submit", { data: { selected_documents } });
  };

  const { setFieldValue, values, getFieldProps, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.additional_values,
      // permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  const currentPath = window.location.pathname;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {currentPath === "/revalidate-safety-officer" ||
        currentPath === "/revalidate-issuing-supervisor" ? (
          <label class="verification">
            <Radio checked={values.consentGiven} />
            <p>Confirm work area is safe to commence work</p>
          </label>
        ) : (
          <>
            <label class="verification">
              <Radio checked={values.consentGiven} />

              <p>
                Confirm work area is checked and everything is safe to{" "}
                <span className="close">Close</span> permit
              </p>
            </label>
            <label class="verification">
              <Radio checked={values.consentGiven} />
              <p>
                Confirm work area is checked and everything is safe to{" "}
                <span className="revalidate">Revalidate</span>
                permit
              </p>
            </label>
          </>
        )}

        <div className="app-register__form-footer">
          <Button
            variant="secondary"
            type="button"
            onClick={() => send("go_back")}
          >
            Back
          </Button>
          <Button variant="primary" onClick={() => handleSubmit}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

const validationSchema = Yup.object({});
