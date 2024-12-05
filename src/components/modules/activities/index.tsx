import dayjs from "dayjs";
import { useState } from "preact/hooks";
import { getAudits } from "../../../assets/api/user";
import useModal from "../../../hooks/use-modal";
import useRequest from "../../../hooks/use-request";
import Button from "../../ui/button";
import DateFilter from "../../ui/date/date-filter";
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
import ReusableMobileTable from "../../ui/global/mobiletable";
import { Dropdown, DropdownTrigger, DropdownContent } from "../../ui/dropdown";

import { siteOptions } from "../locations/data";

export default function Activities({}: any) {
  const [stagedActivity, stageActivity] = useState<any>();
  const { toggle, modals } = useModal({ activityDetails: false });
  const { response, isLoading } = useRequest(getAudits, {}, true);
  const activities = response?.data || [];

  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const [searchTerm, setSearchTerm] = useState("");

  const handleItemClick = (item) => {
    stageActivity(item);
    toggle("activityDetails");
  };

  const formatCreatedAt = (date) => {
    return dayjs(date).format("DD/MM/YYYY • HH:mm A");
  };

  const getName = (item) => {
    return `${item.profile.fullname}`;
  };

  const getDetails = (item) => {
    return item.activityPerformed;
  };

  const filteredActivities = activities.filter((activity) => {
    const userName =
      `${activity.profile.firstname} ${activity.profile.lastname}`.toLowerCase();
    const activityPerformed = activity.activityPerformed.toLowerCase();
    const locationArea = activity?.location?.locationArea?.toLowerCase() || "";
    const site = activity?.location?.site?.toLowerCase() || "";

    return (
      userName.includes(searchTerm.toLowerCase()) ||
      activityPerformed.includes(searchTerm.toLowerCase()) ||
      locationArea.includes(searchTerm.toLowerCase()) ||
      site.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Header title="Audits" />

      <div className="app-section__header">
        <Search
          placeholder="Search by user name, location or activity"
          onSearch={setSearchTerm}
        />
        <div className="app-section__filters">
          <DateFilter variant="secondary" />

          <Dropdown className="base-dropdown__dropdown-wrapper">
            <DropdownTrigger>{selectedLocation}</DropdownTrigger>
            <DropdownContent>
              {siteOptions.map((location) => (
                <div
                  key={location.value}
                  className={"base-dropdown__option"}
                  onClick={() => setSelectedLocation(location.value)}
                >
                  {location}
                </div>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>
      </div>

      <div className="app-section">
        <div className="app-section__lg-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date & Time</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredActivities?.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    {dayjs(data.createdAt).format("DD/MM/YYYY • HH:mm A")}
                  </TableCell>
                  <TableCell>{data.profile.fullname}</TableCell>
                  <TableCell>
                    {data?.location?.locationArea}, {data?.location?.site}
                  </TableCell>
                  <TableCell>
                    {data.activityPerformed.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        stageActivity(data);
                        toggle("activityDetails");
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
          data={filteredActivities}
          onItemClick={handleItemClick}
          formatCreatedAt={formatCreatedAt}
          getName={getName}
          getDetails={getDetails}
          type={"Default"}
        />

        {!filteredActivities.length && (
          <div className="base-empty">
            <img src="/svgs/document.svg" />
            <p>
              {isLoading
                ? "Fetching audits, please wait..."
                : "No activities yet"}
            </p>
          </div>
        )}
      </div>

      <Modal
        toggle={() => toggle("activityDetails")}
        show={modals.activityDetails}
      >
        <ModalHeader>Audit Details</ModalHeader>
        <ModalBody>
          <ModalDetail label="Date">
            {dayjs(stagedActivity?.createdAt).format("DD MMM YYYY, HH:mm A")}
          </ModalDetail>
          <ModalDetail label="User">
            <a href="" className="app-link">
              {stagedActivity?.profile.firstname}{" "}
              {stagedActivity?.profile.lastname}
            </a>
          </ModalDetail>
          <ModalDetail label="Activity">
            {stagedActivity?.activityPerformed}
          </ModalDetail>
          <ModalDetail label="Location">
            {stagedActivity?.location?.locationArea} ,
            {stagedActivity?.location?.site}
          </ModalDetail>
        </ModalBody>
      </Modal>
    </>
  );
}
