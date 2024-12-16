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
import useRequest from "../../../../hooks/use-request";
import { getAllPermits } from "../../../../assets/api/user";
import { usePermitDetails } from "../../../../context/permit-details.context";

export default function Storage({}: any) {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedWorkType, setSelectedWorkType] = useState("All Work Types");
  const work_types = ["All Work Types", "COLD_WORK", "HOT_WORK"];

  const { setID } = useIDContext();
  const { updatePermit } = usePermitDetails();

  const { response, isLoading } = useRequest(getAllPermits, {}, true);

  const handleItemClick = (item) => {
    setID(item.id);
    updatePermit(item);
    route("/permit-storage/details");
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const [searchTerm, setSearchTerm] = useState("");

  const storage = response?.data || [];

  const filteredStorage = storage.filter((permit) => {
    const ptwID = permit.publicId;
    const type = permit.type;
    const workArea = permit.workArea?.toLowerCase() || "";
    const entrustedCompany = permit.entrustedCompany?.name.toLowerCase() || "";

    const matchesSearch =
      ptwID.includes(searchTerm.toLowerCase()) ||
      type.includes(searchTerm.toLowerCase()) ||
      workArea.includes(searchTerm.toLowerCase()) ||
      entrustedCompany.includes(searchTerm.toLowerCase()) ||
      searchTerm === "";

    const matchesWorkType =
      selectedWorkType === "All Work Types" || permit.type === selectedWorkType;

    return matchesSearch && matchesWorkType;
  });

  return (
    <>
      <Header title="Storage" />

      <div className="app-section__header">
        <Search placeholder="Search permits" onSearch={setSearchTerm} />
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredStorage
                .filter(
                  (data) =>
                    data.status === "CLOSED" || data.status === "CANCELED"
                )
                .map((data) => (
                  <>
                    {" "}
                    <TableRow key={data.id}>
                      {" "}
                      <TableCell>{data.publicId}</TableCell>
                      <TableCell>{data.type}</TableCell>
                      {/* <TableCell>{data.type?.toLowerCase()}</TableCell> */}
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
              {filteredStorage
                .filter(
                  (dataItem) =>
                    dataItem.status === "CLOSED" ||
                    dataItem.status === "CANCELED"
                )
                .map((dataItem) => (
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
                        <h6 className="others-status">
                          {dataItem.status} / {dataItem.currentAuthority}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
            </TableBody>
          </Table>
        </div>
        {!filteredStorage.length && (
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
