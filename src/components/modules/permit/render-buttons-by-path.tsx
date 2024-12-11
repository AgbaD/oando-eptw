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

  function renderItems() {
    switch (path) {
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

              {userRole === "ISSUING" ||
                userRole === "ISSUING SUPERVISOR" ||
                (userRole === "AUTHORIZING" && (
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
                ))}
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
