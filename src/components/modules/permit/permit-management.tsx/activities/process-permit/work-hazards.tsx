import * as Yup from "yup";

import useForm from "../../../../../../hooks/use-form";
import Button from "../../../../../ui/button";
import Radio from "../../../../../ui/form/radio";

import Section from "../../../../../ui/sections";
import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";

import SendToAuthority from "./send-back-to-authority";
import { useMemo, useState } from "preact/hooks";
import { usePermitDetails } from "../../../../../../context/permit-details.context";

export default function WorkHazards() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { send, state } = useIssuingActivityContext();

  const { permit } = usePermitDetails();
  const details = permit;

  const currentPath = window.location.pathname;

  const hazardsArray = details?.permitHazards?.[0]?.hazard ?? null;

  const issuingHazards = details?.permitHazards?.[1]?.hazard ?? null;

  const combinedHazards = useMemo(() => {
    if (!hazardsArray || !issuingHazards) {
      return {};
    }

    const hazards = {};
    Object.keys(hazardsArray).forEach((key) => {
      if (hazardsArray[key] === null && issuingHazards[key] === null) {
        hazards[key] = null;
      }
    });

    return hazards;
  }, [hazardsArray, issuingHazards]);

  const issuingDisplayHazards = useMemo(() => {
    const items = Object.entries(hazardsArray || {})
      .filter(
        ([key, value]) =>
          value === null &&
          ![
            "id",
            "createdAt",
            "updatedAt",
            "potentialHazardDescription",
          ].includes(key)
      )
      .map(([key, value]) => ({
        key,
        value: value ?? false,
      }));

    const NEWHAZARDS = HAZARDS.filter((hazard) =>
      items.some((item) => item.key === hazard.value)
    );

    console.log(NEWHAZARDS);

    return NEWHAZARDS;
  }, [issuingHazards]);

  const displayHazards = useMemo(() => {
    const items = Object.entries(combinedHazards || {})
      .filter(
        ([key, value]) =>
          value === null &&
          ![
            "id",
            "createdAt",
            "updatedAt",
            "potentialHazardDescription",
          ].includes(key)
      )
      .map(([key, value]) => ({
        key,
        value: value ?? false,
      }));

    const NEWHAZARDS = HAZARDS.filter((hazard) =>
      items.some((item) => item.key === hazard.value)
    );

    return NEWHAZARDS;
  }, [hazardsArray]);

  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};

    const itemEntries = Object.entries(displayItems)
      .filter(
        ([key, value]) =>
          value !== null &&
          ![
            "id",
            "createdAt",
            "updatedAt",
            "potentialHazardDescription",
          ].includes(key)
      )
      .map(([key, value]) => {
        return { key, value: value ?? false };
      });

    return itemEntries.map(({ key, value }) => (
      <div key={key} className="firefighting-item">
        <p>
          <span className="firefighting-value">{value ? "YES" : "NO"}</span> -{" "}
          {key.replace(/([A-Z])/g, " $1").toUpperCase()}{" "}
        </p>
      </div>
    ));
  };

  let initialHazards = {};

  currentPath === "/activities-process" ||
  currentPath === "/activities-process/hse"
    ? (initialHazards = HAZARDS.reduce((acc, hazard) => {
        acc[hazard.value] =
          state.context.work_hazards?.hazards?.[hazard.value] ?? undefined;
        return acc;
      }, {}))
    : {};

  const { handleSubmit, setFieldValue, values } = useForm({
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
      second_title: "",
      content: [],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="app-register__form">
          <Section
            type="Hazards"
            header="Hazards"
            children={hazards[0]}
            section={hazards[0].section}
          />
          <div className="grid-cols-2">
            <div className="section">
              <div className="section__content">
                <p className="title">Performing Authority</p>
                <p className="info">{renderDisplayItems(hazardsArray)}</p>
              </div>
            </div>

            {currentPath === "/activities-process/hse" && (
              <div className="section">
                <div className="section__content">
                  <p className="title">Issuing Authority</p>
                  <p className="info">{renderDisplayItems(issuingHazards)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="app-create-permit__group-header">
          Identification of Hazards
        </div>
        <div className="app-register__form">
          {currentPath === "/activities-process" ? (
            <>
              {" "}
              {issuingDisplayHazards.map((hazard) => (
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
            </>
          ) : (
            <>
              {" "}
              {displayHazards.map((hazard) => (
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
            </>
          )}
        </div>

        <div className="app-register__form-footer">
          <Button
            variant="danger"
            type="button"
            onClick={() => setModalOpen(true)}
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

      {isModalOpen && (
        <SendToAuthority setModalOpen={() => setModalOpen(false)} />
      )}
    </>
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
  { text: "OTHER", value: "otherHazard" },
];

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
