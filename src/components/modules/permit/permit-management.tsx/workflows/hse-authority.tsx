import Icon from "../../../../ui/icon";
import Section from "../../../../ui/sections";

export default function HSEAuthority() {
  const hazards = [
    {
      header: "Hazard Identification",
      second_title: "Identification of potential hazards",
      section: "",
      content: [
        {
          id: 1,
          hazard: "--------",
          value: "",
        },
      ],
    },
  ];

  const equipment = [
    {
      header: "PERSONNEL PROTECTIVE EQUIPMENT",
      second_title: "Identification of potential hazards",
      section: "",
      content: [
        {
          id: 1,
          equipment: "--------",
          value: "",
        },
      ],
    },
  ];

  const firefighting = [
    {
      second_title: "Identification of potential hazards",
      section: "",
      content: [{ id: 1, equipment: "--------", value: "" }],
    },
  ];

  const documents = [
    {
      section: "",
      content: [
        {
          id: 1,
          title: "--------",
          upload_option: "",
        },
      ],
    },
  ];

  return (
    <div className={"app-permit__sections"}>
      <br />
      <Section
        type="Hazards"
        header="HAZARDS IDENTIFICATION"
        children={hazards[0]}
        section={hazards[0].section}
      />
      <Section
        type="List"
        header="PERSONNEL PROTECTIVE EQUIPMENT"
        children={equipment[0]}
        section={equipment[0].section}
      />
      <Section
        type="List"
        header="FIREFIGHTING PRECAUTION"
        children={firefighting[0]}
        section={firefighting[0].section}
      />

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
