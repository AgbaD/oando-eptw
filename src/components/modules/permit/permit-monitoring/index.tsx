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
import { siteOptions } from "../../locations/data";
import Header from "../../../ui/page/header";
import Search from "../../../ui/page/search";
import Button from "../../../ui/button";
import useRequest from "../../../../hooks/use-request";
import { getAllPermits } from "../../../../assets/api/user";
import CountdownTimer from "./countdown-timer";
import { usePermitDetails } from "../../../../context/permit-details.context";

import { createRequest } from "../../../../assets/api";
export default function Monitoring({}: any) {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedWorkType, setSelectedWorkType] = useState("All Status");
  const work_types = ["All Work Types", "Cold Work", "Hot Work"];

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

  return (
    <>
      <Header title="Monitoring" />

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
              {response?.data.map((data) => (
                <>
                  {" "}
                  <TableRow key={data.id}>
                    {" "}
                    <TableCell>{data.publicId}</TableCell>
                    <TableCell>{data.type}</TableCell>
                    <TableCell>{data.workDescription}</TableCell>
                    <TableCell>
                      {data.location?.locationArea} / {data.workArea}
                    </TableCell>
                    <TableCell>{data?.entrustedCompany?.name}</TableCell>
                    <TableCell>
                      <>
                        <CountdownTimer
                          fromDate={data.fromDate}
                          fromTime={data.fromTime}
                          toDate={data.toDate}
                          toTime={data.toTime}
                        />
                      </>
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
              {response?.data.map(
                (dataItem) =>
                  dataItem.status !== "NOT_STARTED" && (
                    <div
                      key={dataItem.id}
                      className="container"
                      onClick={() => handleItemClick(dataItem)}
                    >
                      <div className="location-flex">
                        <p>{dataItem.publicId}</p>
                        <h6 className={"gray"}>{dataItem.type}</h6>
                      </div>
                      <p>{dataItem.workDescription}</p>
                      <div className="location-flex">
                        <div className="items-center">
                          <p className={"gray"}>Time Remaining:</p>
                          <h6 className="countdown-timer">
                            {" "}
                            <>
                              <CountdownTimer
                                fromDate={dataItem.fromDate}
                                fromTime={dataItem.fromTime}
                                toDate={dataItem.toDate}
                                toTime={dataItem.toTime}
                              />
                            </>
                          </h6>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </TableBody>
          </Table>
        </div>
        {!response?.data?.length && (
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
