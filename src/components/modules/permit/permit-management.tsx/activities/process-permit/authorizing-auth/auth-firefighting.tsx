import * as Yup from "yup";

import { useState } from "preact/hooks";
import SendToAuthority from "../send-back-to-authority";
import { useAuthorizingActivityContext } from "../../../../../../../context/authorizing-activity-context";
import Radio from "../../../../../../ui/form/radio";
import Button from "../../../../../../ui/button";
import useForm from "../../../../../../../hooks/use-form";

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
  { text: "OTHERS", value: "otherPrecaution" },
];

export default function AuthFireFightingEquipment() {
  const { state, send } = useAuthorizingActivityContext();

  const { setFieldValue, values, handleSubmit } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.firefighting_equipment,
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

  return (
    <>
      <form onSubmit={handleSubmit} className="app-register__attachment-form">
        <p>Select applicable option(s)</p>
        <div className="app-register__form app-create-permit__docs">
          {FIREFIGHTING_EQUIPMENT.map((item) => (
            <div className="app-create-permit__radio-container">
              <p>{item.text}</p>
              <div>
                <Radio
                  checked={values.firefightingEquipment[item.value] === true}
                  onChange={() => updateFirefightingEquipment(item.value, true)}
                  label="YES"
                />
                <Radio
                  checked={values.firefightingEquipment[item.value] === false}
                  onChange={() =>
                    updateFirefightingEquipment(item.value, false)
                  }
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
