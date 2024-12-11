import useForm from "../../../../../../hooks/use-form";
import * as Yup from "yup";

import Button from "../../../../../ui/button";
import Radio from "../../../../../ui/form/radio";
import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";

import { useState, useMemo } from "preact/hooks";
import SendToAuthority from "./send-back-to-authority";
import { usePermitDetails } from "../../../../../../context/permit-details.context";

import Section from "../../../../../ui/sections";
import Input from "../../../../../ui/form/input";

export const FIREFIGHTING_EQUIPMENT = [
  { text: "FIRE EXTINGUISHER (CO2)", value: "fireExtinguisherCO2" },
  { text: "FIRE EXTINGUISHER (DCP)", value: "fireExtinguisherDCP" },
  {
    text: "REMOVAL OF FLAMMABLE SUBSTANCES",
    value: "removalOfFlammableSubstances",
  },
  {
    text: "EXPLOSION-PROOF WORKING TOOLS (e.g. bronze tools)",
    value: "explosionProofTools",
  },
  { text: "FLAME PROOF BLANKET", value: "flameProofBlanket" },
  { text: "GROUNDING OF EQUIPMENT", value: "groundingOfEquipment" },
  { text: "CONTINUOUS GAS MONITORING", value: "continuousGasMonitoring" },
  { text: "FIREWATCHER / STANDBY MAN", value: "firewatcher" },
  // { text: "OTHERS", value: "otherPrecaution" },
];

export default function FireFightingEquipment() {
  const { state, send } = useIssuingActivityContext();
  const { permit } = usePermitDetails();
  const details = permit;

  const currentPath = window.location.pathname;

  const firefightingEquipment =
    details?.firefightingPrecautions &&
    details.firefightingPrecautions.length > 0
      ? details.firefightingPrecautions[0].firefightingPrecaution
      : null;

  const displayEquipments = useMemo(() => {
    const items = Object.entries(firefightingEquipment || {})
      .filter(
        ([key, value]) =>
          value === null && !["id", "createdAt", "updatedAt"].includes(key)
      )
      .map(([key, value]) => ({
        key,
        value: value ?? false,
      }));

    const NEWITEMS = FIREFIGHTING_EQUIPMENT.filter((equipment) =>
      items.some((item) => item.key === equipment.value)
    );

    return NEWITEMS;
  }, [firefightingEquipment]);

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
    ? (initialItems = FIREFIGHTING_EQUIPMENT.reduce((acc, item) => {
        acc[item.value] =
          state.context.firefighting_equipment?.firefighting_equipment?.[
            item.value
          ] ?? undefined;
        return acc;
      }, {}))
    : (initialItems = {});

  const { setFieldValue, values, handleSubmit, getFieldProps } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.firefighting_equipment,
      firefightingEquipment: initialItems,
    },
    onSubmit,
  });

  function updateFirefightingEquipment(name: string, value: boolean) {
    setFieldValue("firefightingEquipment", {
      ...values.firefightingEquipment,
      [name]: value,
    });
  }

  function onSubmit(firefighting_equipment) {
    send("submit", { data: { firefighting_equipment } });
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const equipment = [
    {
      section: "",
      header: "Selected Precautions",
      second_title: "",
      content: [],
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} className="app-register__attachment-form">
        <div className="app-register__form">
          {currentPath === "/activities-process/hse" && (
            <>
              <Section
                type="Selected Equipment"
                header="Hazards"
                children={equipment[0]}
                section={equipment[0].section}
              />

              <div className="section">
                <div className="section__content">
                  <p className="title">Issuing Authority</p>
                  <p className="info">
                    {renderDisplayItems(firefightingEquipment)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <p>Select applicable option(s)</p>
        <div className="app-register__form app-create-permit__docs">
          {currentPath === "/activities-process" ? (
            <>
              {FIREFIGHTING_EQUIPMENT.map((item) => (
                <div className="app-create-permit__radio-container">
                  <p>{item.text}</p>
                  <div>
                    <Radio
                      checked={
                        values.firefightingEquipment[item.value] === true
                      }
                      onChange={() =>
                        updateFirefightingEquipment(item.value, true)
                      }
                      label="YES"
                    />
                    <Radio
                      checked={
                        values.firefightingEquipment[item.value] === false
                      }
                      onChange={() =>
                        updateFirefightingEquipment(item.value, false)
                      }
                      label="NO"
                    />
                  </div>
                </div>
              ))}

              <Input
                type="text"
                label="Others"
                placeholder={"Others"}
                {...getFieldProps("otherPrecaution")}
              />
            </>
          ) : (
            <>
              {displayEquipments.map((item) => (
                <div className="app-create-permit__radio-container">
                  <p>{item.text}</p>
                  <div>
                    <Radio
                      checked={
                        values.firefightingEquipment[item.value] === true
                      }
                      onChange={() =>
                        updateFirefightingEquipment(item.value, true)
                      }
                      label="YES"
                    />
                    <Radio
                      checked={
                        values.firefightingEquipment[item.value] === false
                      }
                      onChange={() =>
                        updateFirefightingEquipment(item.value, false)
                      }
                      label="NO"
                    />
                  </div>
                </div>
              ))}

              <Input
                type="text"
                label="Others"
                placeholder={"Others"}
                {...getFieldProps("otherPrecaution")}
              />
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
            Back
          </Button>
          <Button variant="primary">Next</Button>

          {/* <button onClick={onSubmit}>Next</button> */}
        </div>
      </form>

      {isModalOpen && (
        <SendToAuthority setModalOpen={() => setModalOpen(false)} />
      )}
    </>
  );
}

const validationSchema = Yup.object({});
