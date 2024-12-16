import { useState } from "preact/hooks";
import { getAllInternalUsers } from "../../../assets/api/user";
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
import { useIDContext } from "../../../context/id.context";
import { createRequest } from "../../../assets/api";

import PopupModal from "../../ui/popup";
import { toast } from "../../ui/toast";

export default function InternalUsers() {
  const [selectedUser, viewUser] = useState<any>();
  const { toggle, modals } = useModal({ user_details: false });
  const { response, isLoading } = useRequest(getAllInternalUsers, {}, true);

  const users = response?.data || [];

  async function getUserById(id: number) {
    const response: any = await createRequest(`/profile/${id}`, "GET");
    viewUser(response[0]?.data);
    console.log(response[0]?.data);
  }

  const handleItemClick = (item) => {
    getUserById(item.id);
    toggle("user_details");
  };

  const getName = (item) => {
    return `${item.fullname}`;
  };
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const status = ["All Status", "Active", "Inactive"];

  const { setID, valueID } = useIDContext();

  const [isModalOpen, setModalOpen] = useState(false);

  const editUsers = (item) => {
    setID(item.id);

    route("/interal-user/edit");
  };

  const startDelete = (item) => {
    setID(item.id);
    setModalOpen(true);
  };

  const handleDeleteRole = async () => {
    const id = valueID;

    try {
      const response = await createRequest(`/profile/${id}`, "DELETE");
      console.log(response);

      toggle("user_details");
      toast({
        variant: "success",
        message: "Internal user deleted successfully",
      });
    } catch (err) {
      toast({
        variant: "error",
        message: `${err?.message ?? "Failed to delete user"}`,
      });
    }
    setModalOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) => {
    const fullname = user.fullname.toLowerCase();
    const email = user.email.toLowerCase();
    const locationArea = user.location?.locationArea.toLowerCase() || "";

    const matchesSearch =
      fullname.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      locationArea.includes(searchTerm.toLowerCase()) ||
      searchTerm === "";

    const locationMatch =
      selectedLocation === "All Locations" ||
      user?.location?.site === selectedLocation;
    const statusMatch =
      selectedStatus === "All Status" || user.isActive === selectedStatus;

    return locationMatch && statusMatch && matchesSearch;
  });

  return (
    <>
      <div className="">
        <div className="app-section__header">
          <Search placeholder="Search by user name" onSearch={setSearchTerm} />
          <br />

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
          {response?.data?.length > 0 ? (
            <div className="app-section">
              <div className="app-section__lg-table">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredUsers.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.fullname}</TableCell>
                        <TableCell>{data.email}</TableCell>

                        <TableCell>
                          {data?.location?.locationArea}/ {data?.location?.site}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              data.isActive
                                ? "status-active"
                                : "status-inactive"
                            }
                          >
                            {data.isActive ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            onClick={() => handleItemClick(data)}
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
                data={filteredUsers}
                onItemClick={handleItemClick}
                getName={getName}
                formatCreatedAt={(item) =>
                  dayjs(item?.createdAt).format("MMM DD, YYYY")
                }
                type={"Users"}
                getDetails={(item) => item?.type}
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
            <ModalHeader>User Details</ModalHeader>
            <ModalBody>
              <ModalDetail label="Date Created:">
                {dayjs(selectedUser?.createdAt).format(
                  "MMM DD, YYYY • HH:mm A"
                )}
              </ModalDetail>
              <ModalDetail label="Created By:">
                <a href="" className="app-link">
                  {selectedUser?.creator?.fullname}
                </a>
              </ModalDetail>
              <ModalDetail label="Full name:">
                {selectedUser?.fullname}
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
                    className={
                      selectedUser?.isActive
                        ? "mobile-status-active"
                        : "mobile-status-inactive"
                    }
                  >
                    {selectedUser?.isActive ? "Active" : "Inactive"}
                  </span>
                </ModalDetail>
              </div>
              <ModalDetail label="Role:">
                {selectedUser?.role?.authorities?.map((role) => {
                  return (
                    <p className="app-modal__detail__value" key={role}>
                      {role}
                    </p>
                  );
                })}
              </ModalDetail>
              <ModalDetail label="Location:">
                {selectedUser?.location?.locationArea} /
                {selectedUser?.location?.workAreas}
              </ModalDetail>

              <div className="app-modal__footer">
                <button
                  className="app-modal__btn--yellow"
                  onClick={() => {
                    editUsers(selectedUser);
                  }}
                >
                  <Icon name="edit" />
                  Edit User
                </button>
                <button
                  className="app-modal__btn--red"
                  onClick={() => startDelete(selectedUser)}
                >
                  <Icon name="delete" />
                  Delete
                </button>
              </div>

              <div className="">
                {isModalOpen && (
                  <PopupModal
                    icon={<img src="/svgs/delete_img.png" />} // Pass your custom icon here
                    title="Delete User"
                    message="Are you sure you want to delete this user? This action cannot be undone."
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
        </div>
      </div>
    </>
  );
}
