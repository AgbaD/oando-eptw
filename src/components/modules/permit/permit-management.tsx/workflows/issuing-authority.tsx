import Section from "../../../../ui/sections";
import Icon from "../../../../ui/icon";
import { HAZARDS } from "../../create-permit/work-hazards";
import { PERSONAL_EQUIPMENT } from "../approve/personal-equipments";
import { FIREFIGHTING_EQUIPMENT } from "../activities/process-permit/firefighting-precautions";

export default function IssuingAuthorities({ response }: any) {
  const details = response;
  console.log(details);
  const hazardsArray =
    details?.permitHazards && details.permitHazards.length > 0
      ? details.permitHazards[1]
      : null;

  const selectedHazards = hazardsArray?.hazard || {};

  const hazards = [
    {
      section: "D",
      header: "Hazard Identification",
      content: [
        {
          id: 1,
          title: "Describe the potential hazards",
          info: hazardsArray?.hazard?.potentialHazardDescription || "",
        },
      ],
    },
  ];

  const equipment = [
    {
      header: "PERSONNEL PROTECTIVE EQUIPMENT",
      second_title: "Identification of potential hazards",
      section: "",
      content: [],
    },
  ];

  const firefighting = [
    {
      second_title: "Identification of potential hazards",
      section: "",
      content: [],
    },
  ];

  const documents = [
    {
      section: "",
      content: [
        {
          id: 1,
          title: "Entry Certificate",
          upload_option: "LAR / MBE / RA / 9851 / 2023",
        },
        {
          id: 2,
          title: "Explosives Cert.",
          upload_option: "LAR / MBE / RA / 9851 / 2023",
        },
        {
          id: 3,
          title: "Gas Clearance Cert.",
          upload_option: "LAR / MBE / RA / 9851 / 2023",
        },
      ],
    },
  ];

  const renderHazards = () => {
    return HAZARDS.filter((hazard) =>
      selectedHazards.hasOwnProperty(hazard.value)
    ) // Only include hazards that are selected
      .map((hazard) => (
        <div key={hazard.value} className="hazard-item">
          <p>
            <span class="hazard-value">
              {selectedHazards[hazard.value] ? "YES" : "NO"}
            </span>{" "}
            - {hazard.text}
          </p>
        </div>
      ));
  };

  const personalProtectiveArray =
    details?.protectiveEquipments && details.protectiveEquipments.length > 0
      ? details.protectiveEquipments[0].protectiveEquipment
      : null;

  const selectedProtectiveEquipment = personalProtectiveArray || {};

  const EQUIPMENT_MAP = {
    "SAFETY HELMET": "safetyHardHats",
    "BEATING APPARATUS": "breathingAparatus",
    "SAFETY BOOTS (boots / rubber boots)": "safetyShoes",
    "DUST / FUMES / SPECIAL GAS FILTER MASKS": "dustMasks", // Update key if necessary
    "BODY CLOTHING (coverall / full chem / APRON)": "bodyProtection",
    "LIFE JACKET / WORK VESTS": "lifeVest",
    "GLOVES (chemical / work / weld)": "safetyGloves",
    "ELECTRICAL RESCUE (Shepherds) HOOK": "electricalRescueHook", // Update key if necessary
    "SAFETY GLASSES / FACE SHIELD": "safetyGlasses",
    "ELECTRICAL STATIC DISCHARGE STICK": "staticDischargeStick", // Update key if necessary
    "HEARING PROTECTION (ear muff / ear plugs)": "hearingProtection",
    "FOAM MAKING EQUIPMENT / FIRE TRUCK": "foamEquipment", // Update key if necessary
    "SAFETY HARNESS (full body type only) / LIFELINE": "safetyHarness", // Update key if necessary
    "ABOVE 6KV PERSONNEL MUST BE TRAINED TO WORK ON THE SYSTEM":
      "highVoltageTraining", // Update key if necessary
    "PORTABLE GROUNDING KIT": "portableGroundingKit", // Update key if necessary
  };

  const renderPersonalEquipment = () => {
    return PERSONAL_EQUIPMENT.map((item) => {
      const equipmentKey = EQUIPMENT_MAP[item.label];
      const isSelected = selectedProtectiveEquipment[equipmentKey] || false;

      return (
        <div key={item.label} className="personal-item">
          <p>
            <span className="personal-value">{isSelected ? "YES" : "NO"}</span>{" "}
            - {item.label}
          </p>
        </div>
      );
    });
  };

  const firefightingEquipment =
    details?.firefightingPrecautions &&
    details.firefightingPrecautions.length > 0
      ? details.firefightingPrecautions[0].firefightingPrecaution
      : null;

  const selectedFireFightingEquipment = firefightingEquipment || {};

  const FIRE_FIGHTING_MAP = {
    "FIRE EXTINGUISHER (CO2)": "fireExtinguisherCO2", // Adjust the key if necessary
    "FIRE EXTINGUISHER (DCP)": "fireExtinguisherDCP", // Adjust the key if necessary
    "REMOVAL OF FLAMMABLE SUBSTANCES": "flammableSubstanceRemoval", // Adjust the key if necessary
    "EXPLOSION-PROOF WORKING TOOLS (e.g. bronze tools)": "explosionProofTools", // Adjust the key if necessary
    "FLAME PROOF BLANKET": "flameProofBlanket", // Adjust the key if necessary
    "GROUNDING OF EQUIPMENT": "equipmentGrounding", // Adjust the key if necessary
    "CONTINOUS GAS MONITORING": "continuousGasMonitoring", // Adjust the key if necessary
    "FIREWATCHER / STANDBY MAN": "fireWatcherStandby", // Adjust the key if necessary
  };

  const renderFirefightingEquipment = () => {
    return FIREFIGHTING_EQUIPMENT.map((equipment) => (
      <div key={equipment} className="firefighting-item">
        <p>
          <span className="firefighting-value">
            {firefightingEquipment.some((precaution) =>
              precaution.hasOwnProperty(FIRE_FIGHTING_MAP[equipment.text])
            )
              ? "YES"
              : "NO"}
          </span>{" "}
          - {equipment}
        </p>
      </div>
    ));
  };

  return (
    <div className={"app-permit__sections"}>
      <br />
      <Section
        type="Primary"
        header="HAZARD IDENTIFICATION"
        children={hazards[0]}
        section={hazards[0].section}
      />
      <div className="section">
        <div className="section__content">
          <p className="title">Description of potential hazards</p>
          <p>{hazardsArray?.hazard?.potentialHazardDescription}</p>
        </div>
        <div className="section__content">
          <p className="title">Identification of potential hazards</p>
          <p className="info">
            {Object.keys(selectedHazards).length > 0 ? (
              renderHazards()
            ) : (
              <p>No hazards selected.</p>
            )}
          </p>
        </div>
      </div>

      <Section
        type="List"
        header="PERSONNEL PROTECTIVE EQUIPMENT"
        children={equipment[0]}
        section={equipment[0].section}
      />

      <div className="section">
        <div className="section__content">
          <p className="info">
            {Object.keys(selectedProtectiveEquipment).length > 0 ? (
              renderPersonalEquipment()
            ) : (
              <p>No personal protective equipment selected.</p>
            )}
          </p>
        </div>
      </div>

      <Section
        type="List"
        header="FIREFIGHTING PRECAUTION"
        children={firefighting[0]}
        section={firefighting[0].section}
      />

      <div className="section">
        <div className="section__content">
          <p className="info">
            {Object.keys(selectedFireFightingEquipment).length > 0 ? (
              renderFirefightingEquipment()
            ) : (
              <p>No firefighting equipment selected.</p>
            )}
          </p>
        </div>
      </div>

      <Section
        type="Permits"
        header="COMPLEMENTARY PERMITS / CERTIFICATES / DOCUMENTS"
        children={documents[0]}
        section={documents[0].section}
      />

      <Section
        type="List"
        header="MECHANICAL ISOLATION (MEASURES ON EQUIPMENT / LINES)"
        children={equipment[0]}
        section={equipment[0].section}
      />
      <Section
        type="List"
        header="ELECTRICAL ISOLATION"
        children={equipment[0]}
        section={equipment[0].section}
      />

      <br />

      <div className="actions">
        <div className="print">
          <div>
            <h4>Print </h4>
            <p>Click the button to get a hardcopy version of this permit</p>
          </div>

          <button className={"flex-center"}>
            <Icon name="print" />
            Print Permit
          </button>
        </div>
      </div>
    </div>
  );
}
