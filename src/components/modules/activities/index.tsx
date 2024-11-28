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

export default function Activities({}: any) {
  const [stagedActivity, stageActivity] = useState<any>();
  const { toggle, modals } = useModal({ activityDetails: false });
  const { response, isLoading } = useRequest(getAudits, {}, true);
  const activities = response?.data;

  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const locations = ["All Locations", "Port Harcourt"];

  const handleItemClick = (item) => {
    stageActivity(item);
    toggle("activityDetails");
  };

  const formatCreatedAt = (date) => {
    return dayjs(date).format("DD/MM/YYYY • HH:mm A");
  };

  const getName = (item) => {
    return `${item.profile.firstname} ${item.profile.lastname}`;
  };

  const getDetails = (item) => {
    return item.activityPerformed;
  };

  return (
    <>
      <Header title="Audits" />

      <div className="app-section__header">
        <Search placeholder="Search by user name" />
        <div className="app-section__filters">
          <DateFilter variant="secondary" />

          <Dropdown className="base-dropdown__dropdown-wrapper">
            <DropdownTrigger>{selectedLocation}</DropdownTrigger>
            <DropdownContent>
              {locations.map((location) => (
                <div
                  key={location}
                  className={"base-dropdown__option"}
                  onClick={() => setSelectedLocation(location)}
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
              {activities?.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    {dayjs(data.createdAt).format("DD/MM/YYYY • HH:mm A")}
                  </TableCell>
                  <TableCell>
                    {data.profile.firstname} {data.profile.lastname}
                  </TableCell>
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
          data={activities}
          onItemClick={handleItemClick}
          formatCreatedAt={formatCreatedAt}
          getName={getName}
          getDetails={getDetails}
          type={"Default"}
        />

        {!response?.data?.length && (
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
