import Icon from "../../../ui/icon";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "../../../ui/dropdown";
import Header from "../../../ui/page/header";
import Search from "../../../ui/page/search";
import Button from "../../../ui/button";

import { siteOptions } from "../../locations/data";
import { useState } from "preact/hooks";

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

export default function Workflows({}: any) {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedWorkType, setSelectedWorkType] = useState("All Status");
  const work_types = ["All Work Types", "Cold Work", "Hot Work"];

  const { setID } = useIDContext();

  const { response, isLoading } = useRequest(getAllPermits, {}, true);

  const handleItemClick = (item) => {
    setID(item.id);
    route("/permit-management");
  };

  return (
    <>
      <Header title="Workflow" />

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

        <Button href="/permit/create" variant="primary" dimension="md">
          <Icon name="plus" />
          Create New Permit
        </Button>
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
              {response?.data?.map((data) => (
                <>
                  {" "}
                  <TableRow key={data.id}>
                    {" "}
                    <TableCell>{data.publicId}</TableCell>
                    <TableCell>{data.type}</TableCell>
                    {/* <TableCell>{data.type?.toLowerCase()}</TableCell> */}
                    <TableCell>{data.workDescription}</TableCell>
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
              {response?.data.map((dataItem) => (
                <div
                  key={dataItem.id}
                  className="container"
                  onClick={() => handleItemClick(dataItem)}
                >
                  <div
                    className="location-flex"
                    onClick={() => handleItemClick(dataItem)}
                  >
                    <p>{dataItem.publicId}</p>
                    <h6 className={"gray"}>{dataItem.type}</h6>
                  </div>
                  <p>{dataItem.workDescription}</p>
                  <div className="location-flex">
                    <div className="items-center">
                      <p className={"gray"}>Status / Authority:</p>
                      <h6
                        className={` ${
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
