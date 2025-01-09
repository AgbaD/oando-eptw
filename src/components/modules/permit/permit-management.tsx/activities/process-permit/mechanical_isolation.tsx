import * as Yup from "yup";

import useForm from "../../../../../../hooks/use-form";
import Button from "../../../../../ui/button";
import Radio from "../../../../../ui/form/radio";
import { useIssuingActivityContext } from "../../../../../../context/issuing-activity-context";

import SendToAuthority from "./send-back-to-authority";
import { useState, useMemo } from "preact/hooks";
import { usePermitDetails } from "../../../../../../context/permit-details.context";

import Section from "../../../../../ui/sections";
import Input from "../../../../../ui/form/input";

export default function MechanicalIsolation() {
  const { send, state } = useIssuingActivityContext();
  const { permit } = usePermitDetails();
  const details = permit;

  const currentPath = window.location.pathname;

  const mechanicalPrecautionEquipment =
    details?.mechanicalIsolationPrecaution &&
    details.mechanicalIsolationPrecaution.length > 0
      ? details.mechanicalIsolationPrecaution[0].mechanicalIsolationPrecaution
      : null;

  const displayEquipments = useMemo(() => {
    const items = Object.entries(mechanicalPrecautionEquipment || {})
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
  }, [mechanicalPrecautionEquipment]);

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

  const { handleSubmit, setFieldValue, values, getFieldProps } = useForm({
    validationSchema,
    initialValues: {
      ...state.context.mechanical_precaution,
      mechanicalPrecaution: initialItems,
    },
    onSubmit,
  });

  function updateMechanicalIsolation(name: string, value: boolean) {
    setFieldValue("mechanicalPrecaution", {
      ...values.mechanicalPrecaution,
      [name]: value,
    });
  }

  function onSubmit(mechanical_precaution) {
    send("submit", { data: { mechanical_precaution } });
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
                    {renderDisplayItems(mechanicalPrecautionEquipment)}
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
          {currentPath == "/activities-process" ? (
            <>
              {LIST.map((item) => (
                <div className="app-create-permit__radio-container">
                  <p>{item.text}</p>
                  <div>
                    <Radio
                      checked={values.mechanicalPrecaution[item.value] === true}
                      onChange={() =>
                        updateMechanicalIsolation(item.value, true)
                      }
                      label="YES"
                    />
                    <Radio
                      checked={
                        values.mechanicalPrecaution[item.value] === false
                      }
                      onChange={() =>
                        updateMechanicalIsolation(item.value, false)
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
                {...getFieldProps("other")}
              />
            </>
          ) : (
            <>
              {displayEquipments.map((item) => (
                <div className="app-create-permit__radio-container">
                  <p>{item.text}</p>
                  <div>
                    <Radio
                      checked={values.mechanicalPrecaution[item.value] === true}
                      onChange={() =>
                        updateMechanicalIsolation(item.value, true)
                      }
                      label="YES"
                    />
                    <Radio
                      checked={
                        values.mechanicalPrecaution[item.value] === false
                      }
                      onChange={() =>
                        updateMechanicalIsolation(item.value, false)
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
                {...getFieldProps("other")}
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

export const LIST = [
  {
    text: "ISOLATION AND TAGGING OF VALVES (Ref. to P&IDs)",
    value: "valveIsolationAmdTagging",
  },
  {
    text: "FLANGES (Ref. to P&IDs and/or other schematic drawings) INSTALLATION",
    value: "flangesInstallation",
  },
  {
    text: "FLANGES (Ref. to P&IDs and/or other schematic drawings) REMOVAL",
    value: "flangesRemoval",
  },
  {
    text: "LINE DISCONNECTION (Ref. to P&IDs and/or other schematic drawings)",
    value: "lineDisconnection",
  },
  { text: "LINE / EQUIPMENT DRAINAGE", value: "lineDrainage" },
  {
    text: "LINE / EQUIPMENT DEPRESSURIZATION",
    value: "lineDepressurization",
  },
  { text: "VENTILATION (Natural / Mechanical means)", value: "ventilation" },
  // { text: "OTHER", value: "other" },
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
