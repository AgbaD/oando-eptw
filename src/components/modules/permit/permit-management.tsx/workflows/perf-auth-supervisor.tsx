import Section from "../../../../ui/sections";

export default function PerfAuthSupervisor({ response }: any) {
  const details = response;
  const documents = [
    {
      section: "",
      header: "Document Uploads",
      content: [],
    },
  ];

  const documentsArray =
    details?.permitDocuments && details.permitDocuments.length > 0
      ? details.permitDocuments[4]
      : null;

  const documentObject = documentsArray?.document || {};

  const renderDocuments = () => {
    const documentEntries = Object.entries(documentObject);

    // Filter out invalid entries
    const filteredEntries = documentEntries.filter(([key, value]) => {
      // Exclude technical fields and entries where Type or Doc is null
      if (
        ["id", "createdAt", "updatedAt", "draftId"].includes(key) ||
        ((key.includes("Type") || key.includes("Doc")) && !value)
      ) {
        return false;
      }
      return true;
    });

    // If no valid entries exist, return a fallback message
    if (filteredEntries.length === 0) {
      return <p>--- No items uploaded ---</p>;
    }

    // Map through valid entries and render them
    return filteredEntries.map(([key, value]) => {
      // If it's a type field, format the text
      if (key.includes("Type")) {
        return (
          <div key={key} className="document-item">
            <div className="section__content__document_section">
              <p className="section__header">
                {key.replace(/([A-Z])/g, " $1").toUpperCase()}
              </p>
            </div>
            <div className="section__content">
              <p className="document">
                <span>Upload Option</span>
              </p>
              <p>{String(value) || "No document provided"}</p>
            </div>
          </div>
        );
      }

      // If it's a document field, render it
      if (key.includes("Doc")) {
        return (
          <div key={key} className="document-item">
            <div className="section__content">
              <p className="document">
                <span>Document</span>
              </p>
              <p className="document_item">
                {value}
                <span>
                  <img src="/svgs/document_download.svg" alt="" />
                </span>
              </p>
            </div>
          </div>
        );
      }

      return null;
    });
  };

  const currentAuthority = details?.currentAuthority;

  if (currentAuthority === "PERFORMING_SUPERVISOR") {
    <div className="base-empty">
      <img src="/svgs/document.svg" />
      <p>{"Approval in progress."}</p>
    </div>;
  }

  return (
    <div className={"app-permit__sections"}>
      <br />
      <Section
        type="Permits"
        header="DOCUMENT UPLOADS / ATTACHMENTS"
        children={documents[0]}
        section={documents[0].section}
      />

      <div className="section">
        <div className="">
          <p className="info">
            {Object.keys(documentObject).length > 0 ? (
              renderDocuments()
            ) : (
              <p>No documents uploaded.</p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
