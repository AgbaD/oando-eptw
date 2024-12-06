import Section from "../../../../ui/sections";
import { useRef, useState, useEffect } from "preact/hooks";

import Icon from "../../../../ui/icon";

export default function IssuAuthSupervisor({ response }: any) {
  const details = response;

  const [approved, setApproved] = useState(false);

  useEffect(() => {
    details?.perfAuthorizingSupervisorStatus === "APPROVED"
      ? setApproved(true)
      : details?.perfAuthorizingSupervisorStatus === null
      ? setApproved(false)
      : setApproved(false);
  }, [details]);

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

  function extractFileName(data) {
    const url = data;

    if (!url) {
      throw new Error("URL is required.");
    }

    const segments = url.split("/");
    const fileName = segments[segments.length - 1];

    const name = fileName.split("-").slice(1).join("-");

    return name;
  }

  const renderDocuments = () => {
    const documentEntries = Object.entries(documentObject);

    return documentEntries
      .filter(([key, value]) => {
        // Filter out technical fields like `id`, `createdAt`, `updatedAt`, `draftId`
        if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
          return false;
        }

        // Skip entries where the value is null or undefined
        if ((key.includes("Type") || key.includes("Doc")) && !value) {
          return false;
        }

        if (value === null) {
          return false;
        }

        return true; // Keep all other valid entries
      })
      .map(([key, value]) => {
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
                <p>{value?.toString() || "No document provided"}</p>
              </div>
            </div>
          );
        }

        // If it's a document field, render it
        return (
          <div key={key} className="document-item">
            <div className="section__content">
              <p className="document">
                <span>Document</span>
              </p>
              <p className="document_item">
                {/* {value} */}
                {extractFileName(value)}
                <span>
                  <img
                    src="/svgs/document_download.svg"
                    alt="Download document"
                  />
                </span>
              </p>
            </div>
          </div>
        );
      });
  };
  const printRef = useRef<HTMLDivElement>(null);

  const printHandler = () => {
    if (printRef.current) {
      const originalContent = document.body.innerHTML;
      const printContent = printRef.current.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    } else {
      window.print();
    }
  };

  return (
    <div className={"app-permit__sections"}>
      <br />
      {approved ? (
        <>
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

          <div className="actions">
            <div className="print">
              <div>
                <h4>Print </h4>
                <p>Click the button to get a hardcopy version of this permit</p>
              </div>

              <button className={"flex-center"} onClick={printHandler}>
                <Icon name="print" />
                Print Permit
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="base-empty">
            <img src="/svgs/checklist.png" />
            <p>Approval in progress</p>
          </div>
        </>
      )}
    </div>
  );
}
