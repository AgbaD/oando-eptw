import { useState } from "preact/hooks";
import useModal from "../../../hooks/use-modal";
// import useRequest from "../../../hooks/use-request";
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

import PopupModal from "../../ui/popup";
import { createRequest } from "../../../assets/api";
import { useIDContext } from "../../../context/id.context";

const ExternalUsers = ({ company = [] }) => {
  const [selectedUser, viewUser] = useState(null);
  const { toggle, modals } = useModal({ user_details: false });
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const status = ["All Status", "Active", "Inactive"];

  const { setID, valueID } = useIDContext();

  const handleItemClick = (item) => {
    viewUser(item);
    toggle("user_details");
  };

  const getName = (item) => `${item.fullname}`;

  // Optional chaining for map and checking company length for conditional rendering
  const filteredData = company || [];

  const [isModalOpen, setModalOpen] = useState(false);

  const startDelete = (item) => {
    setID(item.id);
    setModalOpen(true);
  };

  const handleDeleteRole = async () => {
    const id = valueID;

    const response = await createRequest(`/profile/${id}`, "DELETE");
    console.log(response);

    toggle("user_details");
    setModalOpen(false);
  };

  return (
    <div>
      <div className="app-section__flex">
        <Search placeholder="Search by user name" onSearch={""} />
        <div className="app-section__filters">
          <span className="base-date-filter--secondary">Filter by:</span>
          <Dropdown className="base-dropdown__dropdown-wrapper">
            <DropdownTrigger>{selectedStatus}</DropdownTrigger>
            <DropdownContent>
              {status.map((status) => (
                <div
                  key={status}
                  className="base-dropdown__option"
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </div>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>
        <Button href="/users/create-external" variant="primary" dimension="md">
          <Icon name="plus" />
          Add New User
        </Button>
      </div>
      <div className="app-section__lg-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.fullname}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>
                  <span
                    className={
                      data.isActive ? "status-active" : "status-inactive"
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
        data={filteredData}
        onItemClick={handleItemClick}
        getName={getName}
        formatCreatedAt={(item) =>
          dayjs(item?.createdAt).format("MMM DD, YYYY")
        }
        getDetails={(item) => item?.type}
        type={"Users"}
      />

      {!filteredData.length && (
        <div className="base-empty">
          <img src="/svgs/document.svg" alt="No Data" />
          <p>No users yet</p>
        </div>
      )}

      <Modal toggle={() => toggle("user_details")} show={modals.user_details}>
        <ModalHeader>User Details</ModalHeader>
        <ModalBody>
          <ModalDetail label="Date Created:">
            {dayjs(selectedUser?.createdAt).format("MMM DD, YYYY • HH:mm A")}
          </ModalDetail>
          <ModalDetail label="Created By:">
            <a href="#" className="app-link">
              {selectedUser?.creator?.firstname}{" "}
              {selectedUser?.creator?.lastname}
            </a>
          </ModalDetail>
          <ModalDetail label="Full name:">{selectedUser?.fullname}</ModalDetail>
          <ModalDetail label="Email Address:">
            {selectedUser?.email}
          </ModalDetail>
          <div className="grid-cols-2">
            <ModalDetail label="User Type:">
              {selectedUser?.type?.toUpperCase()}
            </ModalDetail>
            <ModalDetail label="Status:">
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
            {selectedUser?.roles?.map((role) => (
              <span key={role.id}>{role.name}, </span>
            ))}
          </ModalDetail>
          <div className="app-modal__footer">
            <button
              className="app-modal__btn--yellow"
              onClick={() => route("/users/edit")}
            >
              <Icon name="edit" /> Edit User
            </button>
            <button
              className="app-modal__btn--red"
              onClick={() => startDelete(selectedUser)}
            >
              <Icon name="delete" /> Delete
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
  );
};

export default ExternalUsers;
