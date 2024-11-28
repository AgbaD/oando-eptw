import { useState } from "preact/hooks";
import { getSites } from "../../../assets/api/user";
import useModal from "../../../hooks/use-modal";
import useRequest from "../../../hooks/use-request";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import { Modal, ModalBody, ModalDetail, ModalHeader } from "../../ui/modal";
import Header from "../../ui/page/header";
import Search from "../../ui/page/search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../ui/table";
import { route } from "preact-router";
import { useIDContext } from "../../../context/id.context";

import { createRequest } from "../../../assets/api";
import PopupModal from "../../ui/popup";

import { toast } from "../../ui/toast";

export default function Locations({}: any) {
  const [selectedLocation, viewLocation] = useState<any>();
  const { response, isLoading } = useRequest(getSites, {}, true);
  const { toggle: originalToggle, modals } = useModal({ role_details: false });

  const { setID, valueID } = useIDContext();

  const [selectedSubLocation, setSelectedSubLocation] = useState<any>(null);

  // Enhanced toggle function to reset the sub-location when the modal closes
  const toggle = (modalName) => {
    if (modals[modalName]) {
      setSelectedSubLocation(null); // Reset to first modal
    }
    originalToggle(modalName);
  };

  const handleItemClick = (item) => {
    viewLocation(item);
    toggle("role_details");
  };

  const handleSubLocationClick = (subLocation) => {
    setSelectedSubLocation(subLocation);
  };

  const formattedData = response?.data
    ? Object.keys(response.data).map((siteKey) => {
        const siteData = response.data[siteKey];
        const locationCount = siteData.length;
        const workAreaCount = siteData.reduce(
          (acc, loc) => acc + (loc.workAreas?.length || 0),
          0
        );
        const totalMembers = siteData.reduce(
          (acc, loc) => acc + (loc.members?.length || 0),
          0
        );

        return {
          site: siteKey,
          locations: locationCount,
          workAreas: workAreaCount,
          totalMembers: totalMembers,
          data: siteData,
        };
      })
    : [];

  const handleEditLocation = (item) => {
    setID(item.id);
    route("/locations/edit");
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteRole = async () => {
    const id = valueID;

    const response = await createRequest(`/location/${id}`, "DELETE");
    console.log(response);

    toggle("role_details");
    setModalOpen(false);
    if (response[0]?.status === 200) {
      return toast({
        variant: "success",
        message: response[0]?.message ?? "Location deleted succesfully.",
      });
    } else {
      return toast({
        variant: "success",
        message: response[0]?.message ?? "Location deleted succesfully.",
      });
    }
  };

  const startDelete = (item) => {
    setID(item.id);
    setModalOpen(true);
  };

  return (
    <>
      <Header title="Locations" />
      <div className="app-section__header">
        <Search placeholder="Search by user name" />

        <div className="grid-cols-2">
          <Button
            href="/locations/create/location-area"
            variant="primary"
            dimension="md"
          >
            <Icon name="plus" />
            Add New Location Area
          </Button>
          <Button
            href="/locations/create/work-area"
            variant="tertiary"
            dimension="md"
          >
            <Icon name="plus" />
            Add New Work Area
          </Button>
        </div>
      </div>

      <div className="app-section">
        <div className="app-section__lg-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Site</TableCell>
                <TableCell>Location(s)</TableCell>
                <TableCell>Work Area(s)</TableCell>
                <TableCell>Total Members</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {formattedData.map((dataItem) => (
                <TableRow key={dataItem.site}>
                  <TableCell>{dataItem.site}</TableCell>
                  <TableCell>
                    {dataItem.locations > 0 ? dataItem.locations : "-"}
                  </TableCell>
                  <TableCell>
                    {dataItem.workAreas > 0 ? dataItem.workAreas : "-"}
                  </TableCell>
                  <TableCell>
                    {dataItem.totalMembers > 0 ? dataItem.totalMembers : "---"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => handleItemClick(dataItem)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="app-section__sm-table">
          <Table>
            <TableBody>
              {formattedData.map((dataItem) => (
                <div key={dataItem.site} className="container">
                  <h2>{dataItem.site}</h2>

                  <div
                    className="location-flex"
                    onClick={() => handleItemClick(dataItem)}
                  >
                    <p>
                      <span> Location(s): </span>
                      {dataItem.locations > 0 ? dataItem.locations : "-"}
                    </p>
                    <p>
                      <span>Work Area(s): </span>
                      {dataItem.workAreas > 0 ? dataItem.workAreas : "-"}
                    </p>
                    <p>
                      <span>Total Members: </span>
                      {dataItem.totalMembers > 0
                        ? dataItem.totalMembers
                        : "---"}
                    </p>
                  </div>
                </div>
              ))}
            </TableBody>
          </Table>
        </div>

        {!response?.data && (
          <div className="base-empty">
            <img src="/svgs/document.svg" />
            <p>
              {isLoading
                ? "Fetching locations, please wait..."
                : "No locations yet"}
            </p>
          </div>
        )}
      </div>

      <Modal toggle={() => toggle("role_details")} show={modals.role_details}>
        <ModalHeader>
          {selectedSubLocation
            ? `${selectedSubLocation.locationArea}`
            : "Site Details"}
        </ModalHeader>
        <ModalBody>
          {selectedSubLocation ? (
            <>
              <ModalDetail label="Location Admin:">
                {selectedSubLocation.locationAdminId}
              </ModalDetail>
              <div className="grid-cols-2">
                <ModalDetail label="Total Members:">
                  {selectedSubLocation.members.length}
                </ModalDetail>
                <ModalDetail label="Work Areas:">
                  {selectedSubLocation.workAreas.length}
                </ModalDetail>
              </div>

              <span>Below is the list of work area in this location area</span>
              <br />
              <br />
              <ul className={"grid-cols-2"} style={{ listStyle: "disc" }}>
                {selectedSubLocation.workAreas.length > 0
                  ? selectedSubLocation.workAreas.map((workArea) => (
                      <li key={workArea.id}>{workArea}</li>
                    ))
                  : "No work areas yet"}
              </ul>
              <br />
            </>
          ) : (
            <>
              <ModalDetail label="Site:">{selectedLocation?.site}</ModalDetail>
              <ModalDetail label="Total Members:">
                {selectedLocation?.totalMembers > 0
                  ? selectedLocation?.totalMembers
                  : "---"}
              </ModalDetail>
              <ModalDetail label="Location(s):">
                {selectedLocation?.locations > 0
                  ? selectedLocation?.locations
                  : "-"}
              </ModalDetail>
              <ModalDetail label="Work Area(s):">
                {selectedLocation?.workAreas > 0
                  ? selectedLocation?.workAreas
                  : 0}
              </ModalDetail>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Location Area</TableCell>
                    <TableCell>Work Areas</TableCell>
                    <TableCell>Members</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedLocation?.data.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.locationArea}</TableCell>
                      <TableCell>{data.workAreas.length}</TableCell>
                      <TableCell>{data.members.length}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => handleSubLocationClick(data)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}

          {selectedSubLocation ? (
            <div className="app-modal__footer">
              <button
                className="app-modal__btn--yellow"
                onClick={() => {
                  handleEditLocation(selectedSubLocation);
                }}
              >
                <Icon name="edit" />
                Edit Location
              </button>
              <button
                className="app-modal__btn--red"
                onClick={() => {
                  startDelete(selectedSubLocation);
                }}
              >
                <Icon name="delete" />
                Delete
              </button>
            </div>
          ) : (
            <div className="app-modal__double-footer">
              <button
                className="app-modal__btn--gradient"
                onClick={() => route("/locations/create/location-area")}
              >
                <Icon name="plus" />
                Add Loc. Area
              </button>
              <button
                className="app-modal__btn--orange"
                onClick={() => route("/locations/create/work-area")}
              >
                <Icon name="plus" />
                Add Work Area
              </button>
            </div>
          )}

          <div className="">
            {isModalOpen && (
              <PopupModal
                icon={<img src="/svgs/delete_img.png" />} // Pass your custom icon here
                title="Delete Role"
                message="Are you sure you want to delete this role? This action cannot be undone."
                onClose={() => setModalOpen(false)}
                primaryButton={{
                  label: "Delete",
                  onClick: handleDeleteRole,
                  color: "#D30021",
                }}
                secondaryButton={{
                  label: "Cancel",
                  onClick: () => setModalOpen(false),
                  color: "#E86E18",
                }}
              />
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
