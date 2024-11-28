import { useState } from "preact/hooks";
import Section from "../../../../ui/sections";
import Icon from "../../../../ui/icon";

import PopupModal from "../../../../ui/popup";
import PermitPopupModal from "../../permit-monitoring/permit-popup-modal";

import { HAZARDS } from "../../create-permit/work-hazards";

export default function PerformingAuthorities({ response }: any) {
  const details = response;
  const hazardsArray =
    details?.permitHazards && details.permitHazards.length > 0
      ? details.permitHazards[0]
      : null;

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
          info: `${details?.fromDate} /  ${details?.fromTime} - ${details?.toDate}  / ${details?.toTime}`,
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

  const selectedHazards = hazardsArray?.hazard || {};
  // Filter and map over the selected hazards
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

  const renderDocuments = () => {
    const documentEntries = Object.entries(documentObject);

    return documentEntries.map(([key, value]) => {
      // Filter out technical fields like `id`, `createdAt`, `updatedAt`, and `draftId`
      if (["id", "createdAt", "updatedAt", "draftId"].includes(key)) {
        return null;
      }

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
              <p> {value || "No document provided"}</p>
            </div>
          </div>
        );
      }

      // If it's a document field, render it
      return (
        <div key={key} className="document-item">
          <>
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
          </>
        </div>
      );
    });
  };

  const [deletePopUp, setDeletePopUp] = useState(false);
  const handleDeletePopUp = (value: boolean) => {
    setDeletePopUp(value);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const handleSuspensionModal = (value: boolean) => {
    setModalOpen(value);
  };

  const [isCancelPopup, setIsCancelPopup] = useState(false);
  const handleCancelPoopup = (value: boolean) => {
    setIsCancelPopup(value);
  };

  const currentPath = window.location.pathname;

  const RenderButtonsOnPath = (currentPath: string) => {
    switch (currentPath) {
      case "/monitoring-details":
        return (
          <>
            <div className="actions">
              <div className="print">
                <div>
                  <h4>Print </h4>
                  <p>
                    Click the button to get a hardcopy version of this permit
                  </p>
                </div>

                <button className={"flex-center"}>
                  <Icon name="print" />
                  Print Permit
                </button>
              </div>
              <div className="closure">
                <div>
                  <h4>Request for closure</h4>
                  <p>Click the button to process closure of this permit</p>
                </div>

                <button
                  className={"flex-center"}
                  onClick={() => handleDeletePopUp(true)}
                >
                  <Icon name="export" />
                  Request Closure{" "}
                </button>
              </div>

              <div className="double">
                <div className="suspension">
                  <div>
                    <h4>Permit Suspension </h4>
                    <p>Click the button below to process permit suspension.</p>
                  </div>
                  <br />

                  <button
                    className={"flex-center"}
                    onClick={() => handleSuspensionModal(true)}
                  >
                    Suspend Permit{" "}
                  </button>
                </div>
                <div className="cancel">
                  <div>
                    <h4>Permit Cancellation</h4>
                    <p>
                      {" "}
                      Click the button below to process cancel this permit.
                    </p>
                  </div>
                  <br />

                  <button
                    className={"flex-center"}
                    onClick={() => handleCancelPoopup(true)}
                  >
                    Cancel Permit
                  </button>
                </div>
              </div>
            </div>
          </>
        );

      case "/permit-management":
        return (
          <>
            <div className="actions">
              <div className="print">
                <div>
                  <h4>Print </h4>
                  <p>
                    Click the button to get a hardcopy version of this permit
                  </p>
                </div>

                <button className={"flex-center"}>
                  <Icon name="print" />
                  Print Permit
                </button>
              </div>
              <div className="delete">
                <div>
                  <h4>Delete</h4>
                  <p>Click the button to delete this permit</p>
                </div>

                <button
                  className={"flex-center"}
                  onClick={() => handleDeletePopUp(true)}
                >
                  <Icon name="delete" />
                  Delete Permit
                </button>
              </div>
            </div>
          </>
        );
    }
  };

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

      <div className="section">
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

      <div className="">
        {deletePopUp && (
          <PopupModal
            icon={<img src="/svgs/delete_img.png" />} // Pass your custom icon here
            title="Delete Role"
            message="Are you sure you want to delete this role? This action cannot be undone."
            onClose={() => setDeletePopUp(false)}
            primaryButton={{
              label: "Delete",
              onClick: () => handleDeletePopUp(false),
              color: "#D30021",
            }}
            secondaryButton={{
              label: "Cancel",
              onClick: () => handleDeletePopUp(false),
              color: "#E86E18",
            }}
          />
        )}
      </div>

      <div className="">
        {isModalOpen && (
          <PermitPopupModal
            icon={<img src="/svgs/reject.svg" />}
            title="Suspend Permit"
            message="Kindly state the reason for suspending this permit below"
            onClose={() => setModalOpen(false)}
            primaryButton={{
              label: "Suspend Permit",
              onClick: () => handleSuspensionModal(false),
              color: "#D30021",
            }}
            secondaryButton={{
              label: "Back",
              onClick: () => handleSuspensionModal(false),
              color: "#E86E180D",
            }}
          />
        )}
      </div>

      <div className="">
        {isCancelPopup && (
          <PermitPopupModal
            icon={<img src="/svgs/reject.svg" />}
            title="Cancel Permit"
            message="Kindly state the reason for cancelling this permit below"
            onClose={() => setIsCancelPopup(false)}
            primaryButton={{
              label: "Cancel Permit",
              onClick: () => handleCancelPoopup(false),
              color: "#D30021",
            }}
            secondaryButton={{
              label: "Back",
              onClick: () => handleCancelPoopup(false),
              color: "#E86E180D",
            }}
          />
        )}
      </div>
    </div>
  );
}
