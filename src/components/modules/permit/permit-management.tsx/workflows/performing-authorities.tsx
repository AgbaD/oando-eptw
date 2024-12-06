import dayjs from "dayjs";
import Section from "../../../../ui/sections";

import RenderButtonsOnPath from "../../render-buttons-by-path";

export default function PerformingAuthorities({ response }: any) {
  const details = response;
  console.log(details);
  const hazardsArray =
    details?.permitHazards && details.permitHazards.length > 0
      ? details.permitHazards[0].hazard
      : null;

  console.log(hazardsArray);

  const documentsArray =
    details?.permitDocuments && details.permitDocuments.length > 0
      ? details.permitDocuments[0]
      : null;

  const documentObject = documentsArray?.document || {};

  const items = [
    {
      section: "A",
      header: "Work Type",
      content: [
        {
          id: 1,
          title: "Permit Type",
          info: details?.type || "",
        },
        {
          id: 2,
          title: "Permit ID",
          info: details?.publicId || "",
        },
        {
          id: 3,
          title: "Status / Authority",
          info: `${details?.status} / ${details?.currentAuthority}` || "",
        },
      ],
    },
    {
      section: "B",
      header: "Permit Details",
      content: [
        {
          id: 1,
          title: "Role",
          info: details?.performerRole,
        },
        {
          id: 2,
          title: "Performing Person / Person In Charge",
          info: details?.performingPersonInCharge,
        },
        {
          id: 3,
          title: "Work Details",
          info: details?.workDescription,
        },
        {
          id: 4,
          title: "Equipment / Tools / Materials",
          info: details?.equipmentToolsMaterials,
        },
        {
          id: 5,
          title: "Work Location / Work Area",
          info: `${details?.location?.locationArea} / ${details?.workArea}`,
        },
        {
          id: 6,
          title: "Permit Valid From - To (Date & Time)",
          info: `${dayjs(details?.fromDate).format(
            "dddd, MMM D YYYY"
          )} /  ${dayjs(details?.fromTime).format("hh:mm A")} - ${dayjs(
            details?.toDate
          ).format("dddd, MMM D YYYY")}  / ${dayjs(details?.toTime).format(
            "hh:mm A"
          )}`,
        },
      ],
    },
    {
      section: "C",
      header: "Company Details",
      content: [
        {
          id: 1,
          title: "Entrusted Company",
          info: details?.entrustedCompany?.name,
        },
        {
          id: 2,
          title: "Executing Company",
          info: details?.executingCompany?.name,
        },
        {
          id: 3,
          title: "Performing Department",
          info: details?.performingDepartment,
        },
        {
          id: 4,
          title: "Contact Phone Number",
          info: details?.contractorPhoneNumber,
        },
      ],
    },
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

  const documents = [
    {
      section: "E",
      header: "Document Uploads",
      content: [],
    },
  ];

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

  const currentPath = window.location.pathname;

  return (
    <div className={"app-permit__sections"}>
      <br />
      {items.map((item) => (
        <Section
          type="Primary"
          header={item.header}
          children={item.content}
          section={item.section}
        />
      ))}

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
          <p className="info">{renderDisplayItems(hazardsArray)}</p>
        </div>
      </div>

      <Section
        type="Secondary"
        header="Documents"
        children={documents[0]}
        section={documents[0]?.section}
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

      <br />

      {RenderButtonsOnPath(currentPath)}
    </div>
  );
}
