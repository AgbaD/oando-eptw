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

import { toast } from "../../ui/toast";

const ExternalUsers = ({ company = [] }) => {
  const [selectedUser, viewUser] = useState(null);
  const { toggle, modals } = useModal({ user_details: false });
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const status = ["All Status", "Active", "Inactive"];
  const [searchQuery, setSearchQuery] = useState("");

  const { setID, valueID } = useIDContext();

  async function getUserById(id: number) {
    const response: any = await createRequest(`/profile/${id}`, "GET");
    viewUser(response[0]?.data);
    console.log(response[0]?.data);
  }

  const handleItemClick = (item) => {
    getUserById(item.id);
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
    if (response[0]?.statusCode === 200) {
      toggle("user_details");
      setModalOpen(false);
      return toast({
        variant: "success",
        message: "User deleted successfully",
      });
    } else {
      return toast({
        variant: "error",
        message: "User delete failed, please try again",
      });
    }
  };

  const handleEdit = (item) => {
    setID(item.id);
    route(`/users/edit`);
  };

  // Filter and search logic
  const filteredInfo = filteredData.filter((user) => {
    const name = user.fullname.toLowerCase();
    const email = user.email.toLowerCase();

    const matchesSearch =
      name.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase()) ||
      searchQuery === "";

    const statusMatch =
      selectedStatus === "All Status" ||
      (selectedStatus === "Active" && user.isActive) ||
      (selectedStatus === "Inactive" && !user.isActive);

    return matchesSearch && statusMatch;
  });

  return (
    <div>
      <div className="app-section__flex">
        <Search placeholder="Search by user name" onSearch={setSearchQuery} />
        <br />

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
            {filteredInfo.map((data) => (
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
        data={filteredInfo}
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
              {selectedUser?.creator?.fullname}{" "}
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
            {selectedUser?.role?.authorities?.map((role) => (
              <p key={role}>{role}</p>
            ))}
          </ModalDetail>
          <div className="app-modal__footer">
            <button
              className="app-modal__btn--yellow"
              onClick={() => handleEdit(selectedUser)}
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
