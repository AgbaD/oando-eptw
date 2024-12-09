import Icon from "../../../../ui/icon";
import Section from "../../../../ui/sections";

import { useRef, useEffect, useState } from "preact/hooks";

export default function HSEAuthority({ response }: any) {
  const details = response;
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    details?.hseAuthorityStatus === "APPROVED"
      ? setApproved(true)
      : details?.hseAuthorityStatus === null
      ? setApproved(false)
      : setApproved(false);
  }, [details]);

  console.log(details);

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
      header: "Document Uploads",
      content: [],
    },
  ];

  const hazardsArray =
    details?.permitHazards && details.permitHazards.length > 0
      ? details.permitHazards[2]
      : null;

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

  const personalProtectiveArray =
    details?.protectiveEquipments && details.protectiveEquipments.length > 0
      ? details.protectiveEquipments[1]?.protectiveEquipment
      : null;

  const firefightingEquipment =
    details?.firefightingPrecautions &&
    details.firefightingPrecautions.length > 0
      ? details.firefightingPrecautions[1]?.firefightingPrecaution
      : null;

  const mechanicalPrecautionEquipment =
    details?.mechanicalIsolationPrecaution &&
    details.mechanicalIsolationPrecaution.length > 0
      ? details.mechanicalIsolationPrecaution[1]?.mechanicalIsolationPrecaution
      : null;

  const eletricalIsolationPrecaution =
    details?.eletricalIsolationPrecaution &&
    details.eletricalIsolationPrecaution.length > 0
      ? details.eletricalIsolationPrecaution[1]?.eletricalIsolationPrecaution
      : null;

  const documentsArray =
    details?.permitDocuments && details.permitDocuments.length > 0
      ? details.permitDocuments[2]
      : null;

  const documentObject = documentsArray?.document || {};

  const renderDisplayItems = (itemArray) => {
    const displayItems = itemArray || {};

    const itemEntries = Object.entries(displayItems)
      .filter(
        ([key, value]) =>
          value !== null && !["id", "createdAt", "updatedAt"].includes(key)
      )
      .map(([key, value]) => {
        return { key, value: value ?? false };
      });

    if (itemEntries.length === 0) {
      return <p>--- No items uploaded ---</p>;
    }

    return (
      itemEntries.map(({ key, value }) => (
        <div key={key} className="firefighting-item">
          <p>
            <span className="firefighting-value">{value ? "YES" : "NO"}</span> -{" "}
            {key.replace(/([A-Z])/g, " $1").toUpperCase()}{" "}
          </p>
        </div>
      )) || <p>No item found</p>
    );
  };

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
    <div className={"app-permit__sections"} ref={printRef}>
      {approved ? (
        <>
          {" "}
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
              <p className="info">{renderDisplayItems(hazardsArray.hazard)}</p>
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
                {renderDisplayItems(personalProtectiveArray)}
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
                {renderDisplayItems(firefightingEquipment)}
              </p>
            </div>
          </div>
          <Section
            type="Permits"
            header="COMPLEMENTARY PERMITS / CERTIFICATES / DOCUMENTS"
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
          <Section
            type="List"
            header="MECHANICAL ISOLATION (MEASURES ON EQUIPMENT / LINES)"
            children={equipment[0]}
            section={equipment[0].section}
          />
          <div className="section">
            <div className="section__content">
              <p className="info">
                {renderDisplayItems(mechanicalPrecautionEquipment)}
              </p>
            </div>
          </div>
          <Section
            type="List"
            header="ELECTRICAL ISOLATION"
            children={equipment[0]}
            section={equipment[0].section}
          />
          <div className="section">
            <div className="section__content">
              <p className="info">
                {renderDisplayItems(eletricalIsolationPrecaution)}
              </p>
            </div>
          </div>
          <br />
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
