import * as Yup from "yup";

import Button from "../../../../ui/button";
import Radio from "../../../../ui/form/radio";

import useForm from "../../../../../hooks/use-form";
import { useIssuingSupervisorRevalidationContext } from "../../../../../context/issuing-supervisor-revalidation-context";

export default function IssuingVerification() {
  const { state, send } = useIssuingSupervisorRevalidationContext();

  const onSubmit = (selected_documents) => {
    send("submit", { data: { selected_documents } });
  };
  const { values, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.additional_values,
      // permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label class="verification">
          <Radio checked={values.consentGiven} />
          <p>Confirm work area is safe to commence work</p>
        </label>

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
