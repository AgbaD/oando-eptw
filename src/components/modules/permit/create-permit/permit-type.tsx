import * as Yup from "yup";
import { usePermitContext } from "../../../../context/permit.context";
import useForm from "../../../../hooks/use-form";
import Button from "../../../ui/button";
import Select from "../../../ui/form/select";
import { useDraftDetails } from "../../../../context/draft-details.context";

export default function PermitType() {
  const { draft, isDraft } = useDraftDetails();
  const { state, send } = usePermitContext();

  const validationSchema = getValidationSchema(isDraft);

  const { getFieldProps, handleSubmit } = useForm({
    initialValues: {
      permit_type: state.context.permit_type,
    },
    onSubmit,
    validationSchema,
  });

  function onSubmit({ permit_type }) {
    const finalPermitType =
      permit_type || (isDraft ? draft.type.toLowerCase() : null);

    const dataToSend = draft
      ? {
          permit_type: finalPermitType,
        }
      : { permit_type: finalPermitType };

    send("submit", { data: dataToSend });
  }

  return (
    <div className="app-create-permit__header">
      <form onSubmit={handleSubmit} className="app-register__form">
        <div className="app-register__form-grid">
          <Select
            {...getFieldProps("permit_type")}
            placeholder={`${
              isDraft ? draft?.type.replace(/_/g, " ") : "Select Permit Type"
            }`}
            options={[
              { text: "Hot Work", value: "hot_work" },
              { text: "Cold Work", value: "cold_work" },
            ]}
            // required
          />
        </div>

        <div className="app-register__form-footer">
          <Button variant="primary">Next</Button>
        </div>
      </form>
    </div>
  );
}

function getValidationSchema(isDraft) {
  if (isDraft) {
    // If it's a draft, don't require `permit_type`
    return Yup.object({
      permit_type: Yup.string(),
    });
  }

  // Otherwise, apply the standard required validation
  return Yup.object({
    permit_type: Yup.string().required("Permit type is required"),
  });
}
