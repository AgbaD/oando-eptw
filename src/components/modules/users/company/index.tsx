import { useState } from "preact/hooks";
import { getAllCompanies } from "../../../../assets/api/user";
import useModal from "../../../../hooks/use-modal";
import useRequest from "../../../../hooks/use-request";

import Button from "../../../ui/button";
import Icon from "../../../ui/icon";
import { Modal, ModalBody, ModalDetail, ModalHeader } from "../../../ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";
import dayjs from "dayjs";
import ReusableMobileTable from "../../../ui/global/mobiletable";

import { route } from "preact-router";

import Search from "../../../ui/page/search";
import {
  DropdownContent,
  DropdownTrigger,
  Dropdown,
} from "../../../ui/dropdown";
import { useIDContext } from "../../../../context/id.context";

// import { createRequest } from "../../../../assets/api";

export default function Company() {
  const [selectedCompany] = useState<any>();
  const { toggle, modals } = useModal({ user_details: false });
  const { response, isLoading } = useRequest(getAllCompanies, {}, true);

  const { setID } = useIDContext();

  const isCompany = true;

  const handleItemClick = (item) => {
    setID(item.id);
    console.log("update", item.id);
    route(`/users/company/details`);
  };

  const getName = (item) => {
    return `${item.name}`;
  };

  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const status = ["All Status", "Active", "Inactive"];

  // const [isModalOpen, setModalOpen] = useState(false);
  const startDelete = (item) => {
    console.log("haba please work");
    setID(item.id);
    // setModalOpen(true);
  };

  // const handleDeleteRole = async () => {
  //   const id = valueID;

  //   const response = await createRequest(`/profile/${id}`, "DELETE");
  //   console.log(response);

  //   toggle("user_details");
  //   setModalOpen(false);
  // };

  const users = response?.data || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = users.filter((user) => {
    const contractId = user.contractId.toLowerCase();
    const name = user.name.toLowerCase();

    const matchesSearch =
      contractId.includes(searchTerm.toLowerCase()) ||
      name.includes(searchTerm.toLowerCase()) ||
      searchTerm === "";

    const statusMatch =
      selectedStatus === "All Status" || user.isActive === selectedStatus;

    return statusMatch && matchesSearch;
  });

  return (
    <>
      <div className="">
        <div className="app-section__header">
          <Search
            placeholder="Search by name or Contract ID"
            onSearch={setSearchTerm}
          />

          <div className="app-section__filters ">
            <span className="base-date-filter--secondary">Filter by:</span>

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
        <div>
          {isCompany ? (
            <div className="app-section">
              <div className="app-section__lg-table">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Contract ID</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Members</TableCell>
                      <TableCell>Status</TableCell>
                      {/* <TableCell>Role</TableCell> */}
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredCompanies.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.contractId.toUpperCase()}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        {/* <TableCell>{data.type?.toLowerCase()}</TableCell> */}
                        <TableCell>
                          {data?.members?.length > 0
                            ? data?.members?.length
                            : 0}
                        </TableCell>
                        <TableCell>
                          <span
                            className={` ${
                              data.status === "ACTIVE"
                                ? "status-active"
                                : "status-inactive"
                            }`}
                          >
                            {data.status}
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
                data={filteredCompanies}
                onItemClick={handleItemClick}
                getName={getName}
                type={"Company"}
                getDetails={""}
                formatCreatedAt={""}
              />

              {!response?.data?.length && (
                <div className="base-empty">
                  <img src="/svgs/document.svg" />
                  <p>
                    {isLoading
                      ? "Fetching users, please wait..."
                      : "No companies yet"}
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
                      <TableCell>Contract ID</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Members</TableCell>
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
                    All external users will appear here. Click the button below
                    to create a new user
                  </p>
                  <div className="flex-center">
                    <Button
                      href="/users/create-internal"
                      variant="primary"
                      dimension="md"
                    >
                      <Icon name="plus" />
                      Add Company
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          <Modal
            toggle={() => toggle("user_details")}
            show={modals.user_details}
          >
            <ModalHeader>Company Details</ModalHeader>
            <ModalBody>
              <ModalDetail label="Date Created:">
                {dayjs(selectedCompany?.createdAt).format(
                  "MMM DD, YYYY • HH:mm A"
                )}
              </ModalDetail>
              <ModalDetail label="Created By:">
                <a href="" className="app-link">
                  {selectedCompany?.creator?.firstname}{" "}
                  {selectedCompany?.creator?.lastname}
                </a>
              </ModalDetail>
              <ModalDetail label="Full name:">
                {selectedCompany?.firstname}, {selectedCompany?.lastname}
              </ModalDetail>
              <ModalDetail label="Email Address:">
                {selectedCompany?.email}
              </ModalDetail>
              <div className="grid-cols-2">
                <ModalDetail label="User Type:">
                  {selectedCompany?.type?.toLowerCase()}
                </ModalDetail>
                <ModalDetail label="Status:">
                  {" "}
                  <span
                    className={`status ${
                      selectedCompany?.status === "Active"
                        ? "status.active"
                        : "status.inactive"
                    }`}
                  >
                    {selectedCompany?.status}
                  </span>
                </ModalDetail>
              </div>
              <ModalDetail label="Role:">
                {selectedCompany?.role?.name ?? "---"}
              </ModalDetail>
              <ModalDetail label="Location:">
                {selectedCompany?.location?.address}
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
                <button
                  className="app-modal__btn--red"
                  onClick={() => {
                    startDelete(selectedCompany);
                  }}
                >
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
