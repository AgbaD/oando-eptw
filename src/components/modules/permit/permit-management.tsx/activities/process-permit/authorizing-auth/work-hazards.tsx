import * as Yup from "yup";

import { route } from "preact-router";

import useForm from "../../../../../../../hooks/use-form";
import Button from "../../../../../../ui/button";
import Radio from "../../../../../../ui/form/radio";
import { useAuthorizingActivityContext } from "../../../../../../../context/authorizing-activity-context";
import Section from "../../../../../../ui/sections";

export default function AuthWorkHazards() {
  const { send, state } = useAuthorizingActivityContext();

  // Initialize hazards state with all possible hazard keys
  const initialHazards = HAZARDS.reduce((acc, hazard) => {
    acc[hazard.value] =
      state.context.work_hazards?.hazards?.[hazard.value] ?? undefined;
    return acc;
  }, {});

  const { getFieldProps, handleSubmit, setFieldValue, values } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.work_hazards,
      hazards: initialHazards,
    },
    onSubmit,
  });

  function updateHazards(name, value) {
    setFieldValue("hazards", { ...values.hazards, [name]: value });
  }

  function onSubmit(work_hazards) {
    send("submit", { data: { work_hazards } });
  }
  const hazards = [
    {
      section: "D",
      header: "Hazard Identification",
      second_title: "Selected potential hazards",
      content: [
        {
          id: 1,
          hazard: "NOISE",
          value: "YES",
        },
        {
          id: 2,
          hazard: "TOXIC SUBSTANCE",
          value: "YES",
        },
        {
          id: 3,
          hazard: "CHEMICALS",
          value: "NO",
        },
      ],
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="app-register__form">
        <Section
          type="Hazards"
          header="Hazards"
          children={hazards[0]}
          section={hazards[0].section}
        />
      </div>

      <div className="app-create-permit__group-header">
        Identification of Hazards
      </div>
      <div className="app-register__form">
        {HAZARDS.map((hazard) => (
          <div className="app-create-permit__radio-container">
            <p>{hazard.text}</p>
            <div>
              <Radio
                checked={values.hazards?.[hazard.value] === true}
                onChange={() => updateHazards(hazard.value, true)}
                label="YES"
              />
              <Radio
                checked={values.hazards?.[hazard.value] === false}
                onChange={() => updateHazards(hazard.value, false)}
                label="NO"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="app-register__form-footer">
        <Button
          variant="danger"
          type="button"
          onClick={() => route("/process-permits")}
        >
          Send Back To Authority
        </Button>
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
  { text: "OTHER", value: "other" },
];

const isHotPermit =
  (message) =>
  ([permit_type], schema) => {
    if (permit_type !== "hot_permit") return schema.optional();
    return schema.required(message);
  };

const validationSchema = Yup.object({
  // work_area: Yup.string().required("Work area is required"),
  // equipment_tag: Yup.string().required("Equipment tag is required"),
  // zone: Yup.string().required("Zone is required"),
  // potential_hazards: Yup.string().required("Potential hazards is required"),
  // job_safety: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Job safety is required")
  // ),
  // work_procedure: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Work procedure is required")
  // ),
  // sketch: Yup.string().when("permit_type", isHotPermit("Sketch is required")),
  // lifting_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Lifting plan is required")
  // ),
  // isolation_plan: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Isolation plan is required")
  // ),
  // other_doc: Yup.string().when(
  //   "permit_type",
  //   isHotPermit("Other doc is required")
  // ),
});
