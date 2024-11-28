import Section from "../../../../ui/sections";

export default function SafetyOfficer() {
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
        type="Permits"
        header="DOCUMENT UPLOADS / ATTACHMENTS"
        children={documents[0]}
        section={documents[0].section}
      />
    </div>
  );
}
