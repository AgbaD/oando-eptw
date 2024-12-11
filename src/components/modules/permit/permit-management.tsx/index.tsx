import Icon from "../../../ui/icon";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "../../../ui/dropdown";
import Header from "../../../ui/page/header";
import Search from "../../../ui/page/search";
import Button from "../../../ui/button";

import { useState, useEffect } from "preact/hooks";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";

import { useIDContext } from "../../../../context/id.context";

import useRequest from "../../../../hooks/use-request";
import { route } from "preact-router";
import { getAllPermits } from "../../../../assets/api/user";
import { useUserContext } from "../../../../context/user.context";

import { createRequest } from "../../../../assets/api";

export default function Workflows({}: any) {
  const [selectedWorkType, setSelectedWorkType] = useState("All Work Types");
  const work_types = ["All Work Types", "COLD_WORK", "HOT_WORK"];

  const [userRoles, setUserRoles] = useState([]);
  const [canCreatePermit, setCanCreatePermit] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statusOptions = [
    "All Status",
    "NOT_STARTED",
    "APPROVED",
    "REVALIDATION_INITIATED",
    "CANCELED",
    "CLOSED",
    "SUSPENDED",
    "CLOSURE_INITIATED",
  ];

  const { setID } = useIDContext();
  const { profile } = useUserContext();

  const roleActions = {
    checkRole: (roleArray) => {
      if (roleArray.includes("PERFORMING")) {
        setCanCreatePermit(true);
      }
    },
  };

  useEffect(() => {
    async function getUserProfile() {
      const userResponse: any = await createRequest(
        `/profile/${profile?.id}`,
        "GET"
      );
      setUserRoles(userResponse[0]?.data?.role?.authorities);

      console.log(userRoles);

      roleActions.checkRole(userRoles);
    }

    getUserProfile();
  }, [profile]);

  const { response, isLoading } = useRequest(getAllPermits, {}, true);

  const handleItemClick = (item) => {
    setID(item.id);
    route("/permit-management");
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const [searchTerm, setSearchTerm] = useState("");

  const workflows = response?.data || [];

  const filteredWorkflows = workflows.filter((permit) => {
    const ptwID = permit.publicId;
    const type = permit.type;
    const workArea = permit.workArea?.toLowerCase() || "";
    const entrustedCompany = permit.entrustedCompany?.name.toLowerCase() || "";
    const status = permit.status;

    // Check for the search term, selected work type, and selected status
    return (
      (ptwID.includes(searchTerm.toLowerCase()) ||
        type.includes(searchTerm.toLowerCase()) ||
        workArea.includes(searchTerm.toLowerCase()) ||
        entrustedCompany.includes(searchTerm.toLowerCase()) ||
        searchTerm === "") &&
      (selectedWorkType === "All Work Types" || type === selectedWorkType) &&
      (selectedStatus === "All Status" || status === selectedStatus)
    );
  });

  return (
    <>
      <Header title="Workflow" />

      <div className="app-section__header">
        <Search
          placeholder="Search permits by company, work area, permit type, or permit ID"
          onSearch={setSearchTerm}
        />

        <div className="app-section__filters ">
          <span className="base-date-filter--secondary">Filter by:</span>
          <div className="sm-grid-cols-2 app-section__filters">
            <Dropdown className="base-dropdown__dropdown-wrapper">
              <DropdownTrigger>{selectedStatus}</DropdownTrigger>
              <DropdownContent>
                {statusOptions.map((option) => (
                  <div
                    key={option}
                    className={"base-dropdown__option"}
                    onClick={() => setSelectedStatus(option)}
                  >
                    {option}
                  </div>
                ))}
              </DropdownContent>
            </Dropdown>

            <Dropdown className="base-dropdown__dropdown-wrapper">
              <DropdownTrigger>{selectedWorkType}</DropdownTrigger>
              <DropdownContent>
                {work_types.map((type) => (
                  <div
                    key={type}
                    className={"base-dropdown__option"}
                    onClick={() => setSelectedWorkType(type)}
                  >
                    {type}
                  </div>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
        </div>

        {canCreatePermit ? (
          <Button href="/permit/create" variant="primary" dimension="md">
            <Icon name="plus" />
            Create New Permit
          </Button>
        ) : (
          <></>
        )}
      </div>

      <div className="app-section">
        <div className="app-section__lg-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PTW ID.</TableCell>
                <TableCell>Work Type</TableCell>
                <TableCell>Work To Be Performed</TableCell>
                <TableCell>Work Location</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Status / Authority</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredWorkflows.map((data) => (
                <>
                  <TableRow key={data.id}>
                    <TableCell>{data.publicId}</TableCell>
                    <TableCell>{data.type}</TableCell>
                    <TableCell>
                      {truncateText(data.workDescription, 45)}
                    </TableCell>
                    <TableCell>
                      <span>
                        {data.workArea} / {data.location?.locationArea}
                      </span>
                    </TableCell>
                    <TableCell>{data.entrustedCompany?.name}</TableCell>
                    <TableCell>
                      <h6
                        className={`${
                          data.status === "Draft"
                            ? "draft-status"
                            : "others-status"
                        }`}
                      >
                        {data.status} / {data.currentAuthority}
                      </h6>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleItemClick(data)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <br />
                </>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="app-section__sm-table">
          <Table>
            <TableBody>
              {filteredWorkflows.map((dataItem) => (
                <div
                  key={dataItem.id}
                  className="container"
                  onClick={() => handleItemClick(dataItem)}
                >
                  <div className="location-flex">
                    <p>{dataItem.publicId}</p>
                    <h6 className={"gray"}>{dataItem.type}</h6>
                  </div>
                  <p>{truncateText(dataItem.workDescription, 45)}</p>
                  <div className="location-flex">
                    <div className="items-center">
                      <p className={"gray"}>Status / Authority:</p>
                      <h6
                        className={`${
                          dataItem.status === "Draft"
                            ? "draft-status"
                            : "others-status"
                        }`}
                      >
                        {dataItem.status} / {dataItem.currentAuthority}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </TableBody>
          </Table>
        </div>

        {!filteredWorkflows.length && (
          <div className="base-empty">
            <img src="/svgs/document.svg" />
            <p>
              {isLoading
                ? "Fetching permits, please wait..."
                : "No permits yet"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
