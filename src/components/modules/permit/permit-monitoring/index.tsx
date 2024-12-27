import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
} from "../../../ui/dropdown";

import { useState } from "preact/hooks";
import { route } from "preact-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";
import Header from "../../../ui/page/header";
import Search from "../../../ui/page/search";
import Button from "../../../ui/button";
import useRequest from "../../../../hooks/use-request";
import { getAllPermits } from "../../../../assets/api/user";
import CountdownTimer from "./countdown-timer";
import { usePermitDetails } from "../../../../context/permit-details.context";
import { createRequest } from "../../../../assets/api";
import { convertSnakeCaseToTitleCase } from "../../../../assets/utils";

export default function Monitoring({}: any) {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statusOptions = [
    "All Status",
    "APPROVED",
    "REVALIDATION_INITIATED",
    "CLOSURE_INITIATED",
  ];

  const [selectedWorkType, setSelectedWorkType] = useState("All Work Types");
  const work_types = ["All Work Types", "COLD_WORK", "HOT_WORK"];

  const { updatePermit } = usePermitDetails();
  const { response, isLoading } = useRequest(getAllPermits, {}, true);

  async function getPermitDetails(id: any) {
    const permitResponse = await createRequest(`/permit/${id}`, "GET");
    const permitData = permitResponse[0].data;
    updatePermit(permitData);
  }

  const handleItemClick = (item) => {
    getPermitDetails(item.id);
    route("monitoring-details");
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const [searchTerm, setSearchTerm] = useState("");

  const monitoring = response?.data || [];
  const filteredMonitoring = monitoring.filter((permit) => {
    const ptwID = permit.publicId;
    const type = permit.type;
    const workArea = permit.workArea?.toLowerCase() || "";
    const entrustedCompany = permit.entrustedCompany?.name.toLowerCase() || "";

    // Filter based on search term and selected work type
    const isSearchMatch =
      ptwID.includes(searchTerm.toLowerCase()) ||
      type.includes(searchTerm.toLowerCase()) ||
      workArea.includes(searchTerm.toLowerCase()) ||
      entrustedCompany.includes(searchTerm.toLowerCase()) ||
      searchTerm === "";

    const isWorkTypeMatch =
      selectedWorkType === "All Work Types" || type === selectedWorkType;

    const isStatus =
      selectedStatus === "All Status" || permit.status === selectedStatus;

    return isSearchMatch && isWorkTypeMatch && isStatus;
  });

  return (
    <>
      <Header title="Monitoring" />

      <div className="app-section__header">
        <Search placeholder="Search permits" onSearch={setSearchTerm} />
        <br />

        <div className="app-section__filters">
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
      </div>

      <div className="app-section">
        {/* Large Table */}
        <div className="app-section__lg-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>PTW ID.</TableCell>
                <TableCell>Work Type</TableCell>
                <TableCell>Work To Be Performed</TableCell>
                <TableCell>Work Location</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Time Remaining</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredMonitoring
                .filter(
                  (data) =>
                    data.status !== "NOT_STARTED" &&
                    data.status !== "CANCELED" &&
                    data.status !== "CLOSED"
                )
                .map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.publicId}</TableCell>
                    <TableCell>
                      {convertSnakeCaseToTitleCase(data.type)}
                    </TableCell>
                    <TableCell>
                      {truncateText(data.workDescription, 45)}
                    </TableCell>
                    <TableCell>
                      {data.location?.locationArea} / {data.workArea}
                    </TableCell>
                    <TableCell>{data?.entrustedCompany?.name}</TableCell>
                    <TableCell>
                      <CountdownTimer
                        fromDate={data.fromDate}
                        fromTime={data.fromTime}
                        permitShiftType={data.permitShiftType}
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleItemClick(data)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Small Table */}
        <div className="app-section__sm-table">
          <Table>
            <TableBody>
              {filteredMonitoring.map(
                (dataItem) =>
                  dataItem.status !== "NOT_STARTED" && (
                    <div
                      key={dataItem.id}
                      className="container"
                      onClick={() => handleItemClick(dataItem)}
                    >
                      <div className="location-flex">
                        <p>{dataItem.publicId}</p>
                        <h6 className={"gray"}>
                          {convertSnakeCaseToTitleCase(dataItem.type)}
                        </h6>
                      </div>
                      <p>{truncateText(dataItem.workDescription, 45)}</p>
                      <div className="location-flex">
                        <div className="items-center">
                          <p className={"gray"}>Time Remaining:</p>
                          <h6 className="countdown-timer">
                            <CountdownTimer
                              fromDate={dataItem.fromDate}
                              fromTime={dataItem.fromTime}
                              permitShiftType={dataItem.permitShiftType}
                            />
                          </h6>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </TableBody>
          </Table>
        </div>

        {/* Empty State */}
        {!filteredMonitoring.length && (
          <div className="base-empty">
            <img src="/svgs/document.svg" alt="No Permits" />
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
