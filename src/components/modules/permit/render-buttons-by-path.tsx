import { useEffect, useState } from "react";
import Icon from "../../ui/icon";
import PopupModal from "../../ui/popup";

import useRequest from "../../../hooks/use-request";
import { requestPermitClosure } from "../../../assets/api/permit";
import { toast } from "../../ui/toast";
import { route } from "preact-router";
import { usePermitDetails } from "../../../context/permit-details.context";
import SuspendPermit from "./permit-monitoring/suspend-permit";
import CancelPermit from "./permit-monitoring/cancel-permit";

import { createRequest } from "../../../assets/api";
import { useUserContext } from "../../../context/user.context";

export default function RenderButtonsOnPath(path: string) {
  const { makeRequest } = useRequest(requestPermitClosure);

  const { permit } = usePermitDetails();
  const { profile } = useUserContext();

  const [userRole, setUserRole] = useState<string>();

  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(
        `/permit/${permit?.id}`,
        "GET"
      );
      const permitData = permitResponse[0].data;

      const userRole = permitData?.permitRoles?.[profile?.id];
      console.log(userRole);
      setUserRole(userRole);
    }

    getPermitDetails();
  }, [permit, profile?.id]);

  const [deletePopUp, setDeletePopUp] = useState(false);
  const [closurePopup, setClosurePopup] = useState(false);
  const [suspendPopup, setSuspendPopup] = useState(false);

  const handleSuspendPopup = (value: boolean) => {
    setSuspendPopup(value);
  };

  const [isCancelPopup, setIsCancelPopup] = useState(false);
  const handleCancelPopup = (value: boolean) => {
    setIsCancelPopup(value);
  };

  const handleClosurePopup = (value: boolean) => {
    setClosurePopup(value);
  };

  const handleDeletePopUp = (value: boolean) => {
    setDeletePopUp(value);
  };

  const handleDeletePermit = async () => {
    const id = permit?.id;

    try {
      const response = await createRequest(`/permit/draft/${id}`, "DELETE");
      console.log(response);

      toast({
        variant: "success",
        message: "Permit deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "error",
        message: error?.response?.error ?? "Failed to delete permit.",
      });
    }

    setDeletePopUp(false);
  };

  async function closureRequest(id) {
    const [_, err] = await makeRequest(id);
    if (err) {
      return toast({ variant: "error", message: err.message });
    } else {
      toast({
        variant: "success",
        message: "Permit closure initiated successfully",
      });
    }
    setClosurePopup(false);
    route("/permit-management");
  }

  // Utility function to format camelCase to Title Case
  const formatTitle = (key) => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Handle acronyms
      .replace(/^[a-z]/, (char) => char.toUpperCase()); // Capitalize first letter
  };

  const handlePrint = () => {
    const printContent = document.getElementById("permit-details-print");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html>
        <head>
          <title>Permit Details</title>
          <style>
            body { font-family: Helvetica, sans-serif; margin: 20px; }
            .header {display: flex; justify-content: space-between; align-items: center; text-align: center; margin-bottom: 20px; }
            .header img { max-width: 100px; margin-right: 20px;}
            .details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .item { padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; }
            .sub-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 20px; }
            .small-text {font-size: 12px}
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/svgs/logo.sidebar.svg" alt="Logo" />
            <h3>Permit Details</h3>
          </div>
          <div class="details">
            ${printContent.innerHTML}
          </div>
          <div class="footer">Printed on: ${new Date().toLocaleString()}</div>
        </body>
      </html>`
    );
    printWindow.document.close();
    printWindow.print();
  };

  const renderValue = (value) => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return value.length > 0
          ? value.map((item, index) => (
              <div key={index}>{renderValue(item)}</div>
            ))
          : "N/A";
      }
      return (
        <div>
          {Object.entries(value)
            .filter(([key]) => key.toLowerCase() !== "permitDocuments")
            .map(([key, val]) => (
              <div key={key} className="sub-grid">
                <h5>{formatTitle(key)}:</h5>
                <p className="small-text">{renderValue(val)}</p>
              </div>
            ))}
        </div>
      );
    }
    return value !== null ? value.toString() : "N/A";
  };

  const permitEntries = Object.entries(permit || {}).filter(
    ([key]) =>
      ![
        "id",
        "locationId",
        "cancellationInitiatorId, updatedAt, permitDocuments, firefightingPrecautions",
      ].includes(key)
  );

  function renderItems() {
    switch (path) {
      case "/monitoring-details":
        return (
          <>
            <div className="actions">
              <div className="print">
                <div>
                  <h4>Print</h4>
                  <p>
                    Click the button to get a hardcopy version of this permit
                  </p>
                </div>
                <button className="flex-center" onClick={handlePrint}>
                  Print Permit
                </button>

                <div id="permit-details-print" style={{ display: "none" }}>
                  {permitEntries.map(([key, value]) => (
                    <div key={key} className="item">
                      <h4>{formatTitle(key)}:</h4>
                      <p>{renderValue(value)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {userRole === "PERFORMING_SUPERVISOR" && (
                <div className="closure">
                  <div>
                    <h4>Request for closure</h4>
                    <p>Click the button to process closure of this permit</p>
                  </div>

                  <button
                    className={"flex-center"}
                    onClick={() => handleClosurePopup(true)}
                  >
                    <Icon name="export" />
                    Request Closure{" "}
                  </button>
                </div>
              )}

              {(userRole === "ISSUING" ||
                userRole === "AUTHORIZING" ||
                userRole === "ISSUING_SUPERVISOR") && (
                <div className="double">
                  <div className="suspension">
                    <div>
                      <h4>Suspend Permit</h4>
                      <p>
                        {" "}
                        Click the button below to process suspension of this
                        permit.
                      </p>
                    </div>
                    <br />

                    <button
                      className={"flex-center"}
                      onClick={() => handleSuspendPopup(true)}
                    >
                      Suspend Permit
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
                      onClick={() => handleCancelPopup(true)}
                    >
                      Cancel Permit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      case "/permit-management":
        return (
          <>
            <div className="actions">
              <div className="print">
                <div>
                  <h4>Print</h4>
                  <p>
                    Click the button to get a hardcopy version of this permit
                  </p>
                </div>
                <button className="flex-center" onClick={handlePrint}>
                  Print Permit
                </button>

                <div id="permit-details-print" style={{ display: "none" }}>
                  {permitEntries.map(([key, value]) => (
                    <div key={key} className="item">
                      <h4>{formatTitle(key)}:</h4>
                      <p>{renderValue(value)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {permit?.authorizingAuthorityStatus !== "APPROVED" &&
                userRole === "PERFORMING" && (
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
                )}
            </div>
          </>
        );
    }
  }

  return (
    <>
      {renderItems()}

      <div className="">
        {deletePopUp && (
          <PopupModal
            icon={<img src="/svgs/delete_img.png" />} // Pass your custom icon here
            title="Delete Permit"
            message="Are you sure you want to delete this permit? This action cannot be undone."
            onClose={() => setDeletePopUp(false)}
            primaryButton={{
              label: "Delete",
              onClick: handleDeletePermit,
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
        {suspendPopup && (
          <SuspendPermit setModalOpen={() => handleSuspendPopup(false)} />
        )}
      </div>

      <div className="">
        {closurePopup && (
          <PopupModal
            icon={<img src="" />} // Pass your custom icon here
            title="Request Closure of Permit"
            message=""
            onClose={() => setClosurePopup(false)}
            primaryButton={{
              label: "Request Closure",
              onClick: () => closureRequest(permit?.id),
              color: "#371071",
            }}
            secondaryButton={{
              label: "Cancel",
              onClick: () => handleClosurePopup(false),
              color: "#E86E18",
            }}
          />
        )}
      </div>

      <div className="">
        {isCancelPopup && (
          <CancelPermit setModalOpen={() => handleCancelPopup(false)} />
        )}
      </div>
    </>
  );
}
