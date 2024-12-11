import * as Yup from "yup";

import { useState, useMemo } from "preact/hooks";
import SendToAuthority from "../send-back-to-authority";

import useForm from "../../../../../../../hooks/use-form";
import Button from "../../../../../../ui/button";
import Radio from "../../../../../../ui/form/radio";

import { useAuthorizingActivityContext } from "../../../../../../../context/authorizing-activity-context";
import { usePermitDetails } from "../../../../../../../context/permit-details.context";

import Section from "../../../../../../ui/sections";

export default function AuthPersonalProtectiveEquipment() {
  const { send, state } = useAuthorizingActivityContext();

  const { permit } = usePermitDetails();
  const details = permit;

  const currentPath = window.location.pathname;

  const personalProtectiveArray =
    details?.protectiveEquipments && details?.protectiveEquipments?.length > 0
      ? details.protectiveEquipments[0]?.protectiveEquipment
      : null;

  const hseProtectiveArray =
    details?.hseEquipprotectiveEquipmentsments &&
    details?.protectiveEquipments?.length > 0
      ? details.protectiveEquipments[1]?.protectiveEquipment
      : null;

  const combinedEquipments = useMemo(() => {
    if (!personalProtectiveArray || !hseProtectiveArray) {
      return personalProtectiveArray || hseProtectiveArray || {};
    }

    const equipments = {};
    Object.keys(personalProtectiveArray).forEach((key) => {
      if (
        personalProtectiveArray[key] === null &&
        hseProtectiveArray[key] === null
      ) {
        equipments[key] = null;
      } else {
        equipments[key] = true;
      }
    });

    return equipments;
  }, [personalProtectiveArray, hseProtectiveArray]);

  console.log(combinedEquipments);
  const displayEquipments = useMemo(() => {
    const items = Object.entries(combinedEquipments || {})
      .filter(
        ([key, value]) =>
          value === null && !["id", "createdAt", "updatedAt"].includes(key)
      )
      .map(([key, value]) => ({
        key,
        value: value ?? false,
      }));

    const NEWITEMS = EQUIPMENT.filter((equipment) =>
      items.some((item) => item.key === equipment.value)
    );

    return NEWITEMS;
  }, [personalProtectiveArray]);

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
  currentPath === "/activities-process/auth"
    ? (initialItems = EQUIPMENT.reduce((acc, item) => {
        acc[item.value] =
          state.context.personal_protective_equipment
            ?.personal_protective_equipment?.[item.value] ?? undefined;
        return acc;
      }, {}))
    : (initialItems = {});

  const { handleSubmit, setFieldValue, values } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.personal_protective_equipment,
      protectiveEquipment: initialItems,
    },
    onSubmit,
  });

  function updatePersonalEquipment(name: string, value: boolean) {
    setFieldValue("protectiveEquipment", {
      ...values.protectiveEquipment,
      [name]: value,
    });
  }

  function onSubmit(personal_protective_equipment) {
    send("submit", { data: { personal_protective_equipment } });
  }

  const [isModalOpen, setModalOpen] = useState(false);
  const equipment = [
    {
      section: "D",
      header: "Selected Equipment",
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
                header="Hazards"
                children={equipment[0]}
                section={equipment[0].section}
              />

              <div className="grid-cols-2">
                <div className="section">
                  <div className="section__content">
                    <p className="title">Issuing Authority</p>
                    <p className="info">
                      {renderDisplayItems(personalProtectiveArray)}
                    </p>
                  </div>
                </div>

                <div className="section">
                  <div className="section__content">
                    <p className="title">HSE Authority</p>
                    <p className="info">
                      {renderDisplayItems(hseProtectiveArray)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="app-create-permit__group-header">
          Select applicable option(s) below
        </div>
        <div className="app-register__form">
          {displayEquipments.map((equipment) => (
            <div className="app-create-permit__radio-container">
              <p>{equipment.text}</p>
              <div>
                <Radio
                  checked={values.protectiveEquipment[equipment.value] === true}
                  onChange={() =>
                    updatePersonalEquipment(equipment.value, true)
                  }
                  label="YES"
                />
                <Radio
                  checked={
                    values.protectiveEquipment[equipment.value] === false
                  }
                  onChange={() =>
                    updatePersonalEquipment(equipment.value, false)
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

export const EQUIPMENT = [
  { text: "SAFETY HARD HATS (Type I, Type II)", value: "safetyHardHats" },
  {
    text: "SAFETY SHOES OR BOOTS (Anti-slip, Steel toe, Chemical Resistant, rain boots)",
    value: "safetyShoes",
  },
  {
    text: "BODY PROTECTION (Coverall) (Chemical resistant, apron, fire retardant, fire resistant)",
    value: "bodyProtection",
  },
  {
    text: "SAFETY GLOVES (Welders, Chemical resistant, Electrical resistant, high impact, mechanical, anti-vibration, General purpose)",
    value: "safetyGloves",
  },
  {
    text: "BREATHING APPARATUS (Dust, Fumes, Chemical, SCBA)",
    value: "breathingApparatus", // Correct value as expected by the backend
  },
  {
    text: "SAFETY GLASSES / FACE SHIELD / ELECTRIC ARC SHIELD / GRINDING SHIELD",
    value: "safetyGlasses",
  },
  {
    text: "HEARING PROTECTION (ear muff, ear plugs, ear muff & ear plugs)",
    value: "hearingProtection",
  },
  { text: "LIFE VEST (Work Vest, Life Jacket)", value: "lifeVest" },
  { text: "LIFE BUOY / LIFE LINE", value: "lifeBuoy" },
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
