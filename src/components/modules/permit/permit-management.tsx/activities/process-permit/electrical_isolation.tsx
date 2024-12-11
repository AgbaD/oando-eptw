import * as Yup from "yup";

import useForm from "../../../../../../hooks/use-form";
import Button from "../../../../../ui/button";
import Radio from "../../../../../ui/form/radio";
import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";
import { useState, useMemo } from "preact/hooks";
import SendToAuthority from "./send-back-to-authority";

import Section from "../../../../../ui/sections";
import { usePermitDetails } from "../../../../../../context/permit-details.context";

export default function ElectricalIsolation() {
  const { send, state } = useIssuingActivityContext();

  const { permit } = usePermitDetails();
  const details = permit;

  const currentPath = window.location.pathname;

  const eletricalIsolationPrecaution =
    details?.electricalIsolationPrecaution &&
    details.electricalIsolationPrecaution.length > 0
      ? details.electricalIsolationPrecaution[0].electricalIsolationPrecaution
      : null;

  const displayEquipments = useMemo(() => {
    const items = Object.entries(eletricalIsolationPrecaution || {})
      .filter(
        ([key, value]) =>
          value === null && !["id", "createdAt", "updatedAt"].includes(key)
      )
      .map(([key, value]) => ({
        key,
        value: value ?? false,
      }));

    const NEWITEMS = LIST.filter((equipment) =>
      items.some((item) => item.key === equipment.value)
    );

    return NEWITEMS;
  }, [eletricalIsolationPrecaution]);

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
  let initialItems = {};
  currentPath === "/activities-process/hse"
    ? (initialItems = LIST.reduce((acc, item) => {
        acc[item.value] =
          state.context.mechanical_precaution?.mechanical_precaution?.[
            item.value
          ] ?? undefined;
        return acc;
      }, {}))
    : (initialItems = {});

  const { handleSubmit, setFieldValue, values } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.electrical_precaution,
      electricalPrecaution: initialItems,
    },
    onSubmit,
  });

  function updateElectricalIsolation(name: string, value: boolean) {
    setFieldValue("electricalPrecaution", {
      ...values.electricalPrecaution,
      [name]: value,
    });
  }

  function onSubmit(electrical_precaution) {
    send("submit", { data: { electrical_precaution } });
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const equipment = [
    {
      section: "",
      header: "Selected Isolation Precaution",
      second_title: "",
      content: [],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="app-register__form">
          {currentPath === "/activities-process/hse" && (
            <>
              <Section
                type="Selected Equipment"
                header="Selected Isolation Precaution"
                children={equipment[0]}
                section={equipment[0].section}
              />

              <div className="section">
                <div className="section__content">
                  <p className="title">Issuing Authority</p>
                  <p className="info">
                    {renderDisplayItems(eletricalIsolationPrecaution)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="app-create-permit__group-header">
          Select applicable option(s)
        </div>
        <div className="app-register__form">
          {currentPath === "/activities-process" ? (
            <>
              {LIST.map((item) => (
                <div className="app-create-permit__radio-container">
                  <p>{item.text}</p>
                  <div>
                    <Radio
                      checked={values.electricalPrecaution[item.value] === true}
                      onChange={() =>
                        updateElectricalIsolation(item.value, true)
                      }
                      label="YES"
                    />
                    <Radio
                      checked={
                        values.electricalPrecaution[item.value] === false
                      }
                      onChange={() =>
                        updateElectricalIsolation(item.value, false)
                      }
                      label="NO"
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {displayEquipments.map((item) => (
                <div className="app-create-permit__radio-container">
                  <p>{item.text}</p>
                  <div>
                    <Radio
                      checked={values.electricalPrecaution[item.value] === true}
                      onChange={() =>
                        updateElectricalIsolation(item.value, true)
                      }
                      label="YES"
                    />
                    <Radio
                      checked={
                        values.electricalPrecaution[item.value] === false
                      }
                      onChange={() =>
                        updateElectricalIsolation(item.value, false)
                      }
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

          <Button variant="primary">SUBMIT</Button>
        </div>
      </form>
      {isModalOpen && (
        <SendToAuthority setModalOpen={() => setModalOpen(false)} />
      )}
    </>
  );
}

export const LIST = [
  {
    text: "SWITCH OFF OR SHUTDOWN THE EQUIPMENT",
    value: "equipmentShutdown",
  },
  {
    text: "RACK OUT AND PADLOCK THE CIRCUIT BREAKER (Car seal is also optional)",
    value: "circuitBreakerPadlock",
  },
  {
    text: "USE MULTIMAKER TO CHECK VOLTAGE READING",
    value: "voltageReadingCheck",
  },
  {
    text: "DISCONNECT SUPPLY FROM THE SOURCE",
    value: "supplyDisconnection",
  },
  {
    text: "DISCONNECT CABLE FROM EQUIPMENT",
    value: "cableDisconnection",
  },

  {
    text: "INSTALLATION OF GROUND FAULT CIRCUIT INTERUPTOR (GCFI OR RESIDUAL CURRENT CICUIT BREAKER (RCCB)",
    value: "gfciInstallation",
  },
  { text: "OTHERS", value: "other" },
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
