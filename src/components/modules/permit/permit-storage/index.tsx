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

import { route } from "preact-router";

export default function Storage({}: any) {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedWorkType, setSelectedWorkType] = useState("All Status");
  const work_types = ["All Work Types", "Cold Work", "Hot Work"];

  const { setID } = useIDContext();

  const dummy = [
    {
      id: 1,
      ptw_id: "1044/23",
      type: "Hot Work",
      work_to_be_performed: "Coiled tubing nitrogen lift by weafri at IDU 11",
      work_location: "AKRI",
      company: "Indomie",
      status: "Closed",
    },
    {
      id: 2,
      ptw_id: "1044/23",
      type: "Hot Work",
      work_to_be_performed: "Coiled tubing nitrogen lift by weafri at IDU 11",
      work_location: "AKRI",
      company: "Nestle",
      status: "Cancelled",
    },
  ];

  const handleItemClick = (item) => {
    setID(item.id);
    route("/permit-storage/details");
  };

  return (
    <>
      <Header title="Storage" />

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
                <TableCell>Status / Authority</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dummy.map((data) => (
                <>
                  {" "}
                  <TableRow key={data.id}>
                    {" "}
                    <TableCell>{data.ptw_id}</TableCell>
                    <TableCell>{data.type}</TableCell>
                    {/* <TableCell>{data.type?.toLowerCase()}</TableCell> */}
                    <TableCell>{data.work_to_be_performed}</TableCell>
                    <TableCell>{data.work_location}</TableCell>
                    <TableCell>{data.company}</TableCell>
                    <TableCell>
                      <h6
                        className={`${
                          data.status === "Draft"
                            ? "draft-status"
                            : "others-status"
                        }`}
                      >
                        {data.status}
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
              {dummy.map((dataItem) => (
                <div
                  key={dataItem.id}
                  className="container"
                  onClick={() => handleItemClick(dataItem)}
                >
                  <div
                    className="location-flex"
                    // onClick={() => handleItemClick(dataItem)}
                  >
                    <p>{dataItem.ptw_id}</p>
                    <h6 className={"gray"}>{dataItem.type}</h6>
                  </div>
                  <p>{dataItem.work_to_be_performed}</p>
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
                        {dataItem.status}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
