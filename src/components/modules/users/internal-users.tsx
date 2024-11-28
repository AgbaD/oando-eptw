import { useState } from "preact/hooks";
import { getExternalUsers } from "../../../assets/api/user";
import useModal from "../../../hooks/use-modal";
import useRequest from "../../../hooks/use-request";

import Button from "../../ui/button";
import Icon from "../../ui/icon";
import { Modal, ModalBody, ModalDetail, ModalHeader } from "../../ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../ui/table";
import dayjs from "dayjs";
import ReusableMobileTable from "../../ui/global/mobiletable";

import { route } from "preact-router";

import Search from "../../ui/page/search";
import { DropdownContent, DropdownTrigger, Dropdown } from "../../ui/dropdown";

import { siteOptions } from "../locations/data";

export default function InternalUsers() {
  const [selectedUser, viewUser] = useState<any>();
  const { toggle, modals } = useModal({ user_details: false });
  const { response, isLoading } = useRequest(getExternalUsers, {}, true);

  const isInternalUsers = false;

  const handleItemClick = (item) => {
    viewUser(item);
    toggle("user_details");
  };

  const getName = (item) => {
    return `${item.fullname}`;
  };
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const status = ["All Status", "Active", "Inactive"];
  return (
    <>
      <div className="">
        <div className="app-section__header">
          <Search placeholder="Search by user name" />

          <div className="app-section__filters ">
            <span className="base-date-filter--secondary">Filter by:</span>
            <div className="sm-grid-cols-2 app-section__filters">
              <Dropdown className="base-dropdown__dropdown-wrapper">
                <DropdownTrigger>{selectedLocation}</DropdownTrigger>
                <DropdownContent>
                  {siteOptions.map((location) => (
                    <div
                      key={location.value}
                      className={"base-dropdown__option"}
                      onClick={() => setSelectedLocation(location.value)}
                    >
                      {location.text}
                    </div>
                  ))}
                </DropdownContent>
              </Dropdown>

              <Dropdown className="base-dropdown__dropdown-wrapper">
                <DropdownTrigger>{selectedStatus}</DropdownTrigger>
                <DropdownContent>
                  {status.map((status) => (
                    <div
                      key={status}
                      className={"base-dropdown__option"}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </div>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>
          </div>
        </div>
        <div>
          {isInternalUsers ? (
            <div className="app-section">
              <div className="app-section__lg-table">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Status</TableCell>
                      {/* <TableCell>Role</TableCell> */}
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {response?.data?.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.fullname}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        {/* <TableCell>{data.type?.toLowerCase()}</TableCell> */}
                        <TableCell>
                          {data?.location?.state ?? "---"} ,{" "}
                          {data?.location?.country ?? "---"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`status ${
                              data.status === "Active"
                                ? "status.active"
                                : ".inactive"
                            }`}
                          >
                            Active
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            onClick={() => {
                              viewUser(data);
                              toggle("user_details");
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <ReusableMobileTable
                data={response?.data}
                onItemClick={handleItemClick}
                getName={getName}
                type={"Users"}
                getDetails={""}
                formatCreatedAt={""}
              />

              {!response?.data?.length && (
                <div className="base-empty">
                  <img src="/svgs/document.svg" />
                  <p>
                    {isLoading
                      ? "Fetching users, please wait..."
                      : "No users yet"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="app-section">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Status</TableCell>
                      {/* <TableCell>Role</TableCell> */}
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </div>
              <div className="empty-state">
                <div>
                  {" "}
                  <div className="flex-center">
                    <img src="/svgs/no-users.png" />
                  </div>
                  <p>
                    All internal users will appear here. Click the button below
                    to create a new user
                  </p>
                </div>
              </div>
            </>
          )}

          <Modal
            toggle={() => toggle("user_details")}
            show={modals.user_details}
          >
            <ModalHeader>Location Details</ModalHeader>
            <ModalBody>
              <ModalDetail label="Date Created:">
                {dayjs(selectedUser?.createdAt).format(
                  "MMM DD, YYYY • HH:mm A"
                )}
              </ModalDetail>
              <ModalDetail label="Created By:">
                <a href="" className="app-link">
                  {selectedUser?.creator?.firstname}{" "}
                  {selectedUser?.creator?.lastname}
                </a>
              </ModalDetail>
              <ModalDetail label="Full name:">
                {selectedUser?.firstname}, {selectedUser?.lastname}
              </ModalDetail>
              <ModalDetail label="Email Address:">
                {selectedUser?.email}
              </ModalDetail>
              <div className="grid-cols-2">
                <ModalDetail label="User Type:">
                  {selectedUser?.type?.toLowerCase()}
                </ModalDetail>
                <ModalDetail label="Status:">
                  {" "}
                  <span
                    className={`status ${
                      selectedUser?.status === "Active"
                        ? "status.active"
                        : "status.inactive"
                    }`}
                  >
                    Active
                  </span>
                </ModalDetail>
              </div>
              <ModalDetail label="Role:">
                {selectedUser?.role?.name ?? "---"}
              </ModalDetail>
              <ModalDetail label="Location:">
                {selectedUser?.location?.address}
              </ModalDetail>

              <div className="app-modal__footer">
                <button
                  className="app-modal__btn--yellow"
                  onClick={() => {
                    route("/users/edit");
                  }}
                >
                  <Icon name="edit" />
                  Edit User
                </button>
                <button className="app-modal__btn--red">
                  <Icon name="delete" />
                  Delete
                </button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
}
