import dayjs from "dayjs";
import { getRoles } from "../../../assets/api/user";
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
import { useState } from "preact/hooks";
import ReusableMobileTable from "../../ui/global/mobiletable";

import PopupModal from "../../ui/popup";

import { route } from "preact-router";
import { useIDContext } from "../../../context/id.context";
import { createRequest } from "../../../assets/api";

import { Pagination } from "../../ui/pagination";
import { paginate } from "../../../assets/utils";

export default function Roles({}: any) {
  const [selectedRole, viewRole] = useState<any>();
  const { toggle, modals } = useModal({ role_details: false });
  const { response, isLoading } = useRequest(getRoles, {}, true);

  const { setID, valueID } = useIDContext();

  const handleItemClick = (item) => {
    setID(item.id);

    viewRole(item);
    toggle("role_details");
  };

  const editRoles = (item) => {
    setID(item.id);

    route("/roles/edit");
  };
  const startDelete = (item) => {
    setID(item.id);
    setModalOpen(true);
  };

  const formatCreatedAt = (date) => {
    return dayjs(date).format("DD/MM/YYYY • HH:mm A");
  };

  const getName = (item) => {
    return item.name; // Displays the role name
  };

  const getDetails = (item) => {
    return item.permissions?.join(", ") || "---"; // Displays permissions or '---' if empty
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteRole = async () => {
    const id = valueID;

    const response = await createRequest(`/role/${id}`, "DELETE");
    console.log(response);

    toggle("role_details");
    setModalOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const roles = response?.data || [];

  const filteredRoles = roles.filter((role) => {
    const roleName = `${role.name}`.toLowerCase();
    const permissions = role.permissions || [];

    return (
      roleName.includes(searchTerm.toLowerCase()) ||
      permissions.some((p) =>
        p.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = filteredRoles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const paginatedData = paginate(sortedData, currentPage, itemsPerPage);

  return (
    <>
      <Header title="Roles & Permissions" />

      <div className="app-section__header">
        <Search
          placeholder="Search by role name or permissions"
          onSearch={setSearchTerm}
        />

        <Button href="/roles/create" variant="primary" dimension="md">
          <Icon name="plus" />
          Create New Role
        </Button>
      </div>

      <div className="app-section">
        <div className="app-section__lg-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    {data.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                  </TableCell>
                  <TableCell>
                    {dayjs(data.createdAt).format("MMM DD, YYYY • HH:mm A")}
                  </TableCell>
                  <TableCell>
                    <div className="w-roles">
                      {data.permissions?.join(", ") || "---"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        viewRole(data);
                        toggle("role_details");
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
          data={paginatedData}
          onItemClick={handleItemClick}
          formatCreatedAt={formatCreatedAt}
          getName={getName}
          getDetails={getDetails}
          type={"Default"}
        />

        {filteredRoles.length && (
          <Pagination
            totalItems={filteredRoles.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        {!filteredRoles.length && (
          <div className="base-empty">
            <img src="/svgs/document.svg" />
            <p>
              {isLoading ? "Fetching roles, please wait..." : "No roles yet"}
            </p>
          </div>
        )}
      </div>

      <Modal toggle={() => toggle("role_details")} show={modals.role_details}>
        <ModalHeader>Role Details</ModalHeader>
        <ModalBody>
          <ModalDetail label="Date Created:">
            {dayjs(selectedRole?.createdAt).format("MMM DD, YYYY • HH:mm A")}
          </ModalDetail>
          <ModalDetail label="Created By:">
            <a href="" className="app-link">
              {selectedRole?.createdBy?.firstname}{" "}
              {selectedRole?.createdBy?.lastname}
            </a>
          </ModalDetail>
          <ModalDetail label="Role Name:">{selectedRole?.name}</ModalDetail>
          <ModalDetail label="Permissions:">
            {selectedRole?.permissions?.join(", ") || "---"}
          </ModalDetail>
          <ModalDetail label="Total Permitted User:">25</ModalDetail>

          <div className="app-modal__footer">
            <button
              className="app-modal__btn--yellow"
              onClick={() => {
                editRoles(selectedRole);
              }}
            >
              <Icon name="edit" />
              Edit Role
            </button>
            <button
              className="app-modal__btn--red"
              onClick={() => {
                startDelete(selectedRole);
              }}
            >
              <Icon name="delete" />
              Delete
            </button>
          </div>

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
