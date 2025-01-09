import * as Yup from "yup";
import useForm from "../../../../hooks/use-form";
import Textarea from "../../../ui/form/text-area";
import Button from "../../../ui/button";
import Radio from "../../../ui/form/radio";
import { usePermitContext } from "../../../../context/permit.context";
import { useDraftDetails } from "../../../../context/draft-details.context";

import Input from "../../../ui/form/input";

export default function WorkHazards() {
  const { send, state } = usePermitContext();

  const { draft, isDraft } = useDraftDetails();
  console.log("draft details are", draft);

  // Initialize hazards state with all possible hazard keys
  const initialHazards = HAZARDS.reduce((acc, hazard) => {
    acc[hazard.value] =
      state.context.work_hazards?.hazards?.[hazard.value] ?? undefined;
    return acc;
  }, {});

  const validationSchema = getValidationSchema(isDraft);

  const { getFieldProps, handleSubmit, setFieldValue, values } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.work_hazards,
      hazards: initialHazards,
      permit_type: state.context.permit_type,
    },
    onSubmit,
  });

  function updateHazard(name, value) {
    setFieldValue("hazards", {
      ...values.hazards,
      [name]: value,
    });
  }

  function onSubmit(work_hazards) {
    send("submit", { data: { work_hazards } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="app-register__form">
        <div className="app-register__form-grid">
          <Textarea
            label="Describe the potential hazards *"
            placeholder={`${"Write here..."}`}
            {...getFieldProps("potentialHazardDescription")}
          />
        </div>
      </div>

      <div className="app-create-permit__group-header">
        Identification of Hazards
      </div>
      <div className="app-register__form">
        {HAZARDS.map((hazard) => (
          <div
            key={hazard.value}
            className="app-create-permit__radio-container"
          >
            <p>{hazard.text}</p>
            <div>
              <Radio
                checked={values.hazards?.[hazard.value] === true}
                onChange={() => updateHazard(hazard.value, true)}
                label="YES"
              />
              <Radio
                checked={values.hazards?.[hazard.value] === false}
                onChange={() => updateHazard(hazard.value, false)}
                label="NO"
              />
            </div>
          </div>
        ))}

        <Input
          type="text"
          label="Others"
          placeholder={"Others"}
          {...getFieldProps("otherHazard")}
        />
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

export const HAZARDS = [
  { text: "NOISE", value: "noise" },
  { text: "TOXIC SUBSTANCE", value: "toxicSubstance" },
  { text: "CHEMICAL", value: "chemical" },
  { text: "EXPLOSIVES", value: "explosives" },
  { text: "HEIGHT", value: "height" },
  { text: "OVERHEAD HAZARDS, CRANES, ETC", value: "overheadCranes" },
  { text: "ILLUMINATING", value: "illuminating" },
  { text: "SPILL (CONTAINMENT IN PLACE)", value: "spill" },
  { text: "FALLING OBJECTS", value: "falling" },
  { text: "RADIATION", value: "radiation" },
  { text: "TYPE OF WASTE IS KNOWN", value: "knownWaste" },
  // { text: "OTHER", value: "otherHazard" },
];

function getValidationSchema(isDraft) {
  if (isDraft) {
    return Yup.object({
      potentialHazardDescription: Yup.string().required(
        "Describe the potential hazards."
      ),
    });
  }

  // Otherwise, apply the standard required validation
  return Yup.object({
    potentialHazardDescription: Yup.string().required(
      "Describe the potential hazards."
    ),
  });
}
