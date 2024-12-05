import { useState } from "react";
import useModal from "../../../hooks/use-modal";
import PopupModal from "../../ui/popup";
import Header from "../../ui/page/header";
import Search from "../../ui/page/search";
import Button from "../../ui/button";

import DateFilter from "../../ui/date/date-filter";
import { DropdownContent, DropdownTrigger, Dropdown } from "../../ui/dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../ui/table";
import { getAllDrafts } from "../../../assets/api/user";
import useRequest from "../../../hooks/use-request";

import dayjs from "dayjs";
import { useIDContext } from "../../../context/id.context";
import { createRequest } from "../../../assets/api";
import { toast } from "../../ui/toast";

export default function Drafts({}: any) {
  const [viewDraft] = useState<any>();
  const { toggle } = useModal({ draft_details: false });
  const { response, isLoading } = useRequest(getAllDrafts, {}, true);

  const { setID, valueID } = useIDContext();

  // const handleItemClick = (item) => {
  //   viewDraft(item);
  //   toggle("draft_details");
  // };

  const [selectedType, setSelectedType] = useState("All Types");
  const types = ["All Types", "Hot Permit", "Cold Permit"];
  const [isModalOpen, setModalOpen] = useState(false);

  const startDelete = (item) => {
    setID(item.id);
    setModalOpen(true);
  };

  const handleDeleteRole = async () => {
    const id = valueID;

    try {
      const response = await createRequest(`/permit/draft/${id}`, "DELETE");
      console.log(response);

      toast({
        variant: "success",
        message: "Draft deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "error",
        message: response?.error ?? "Failed to delete draft.",
      });
    }

    setModalOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const drafts = response?.data || [];

  const filteredDrafts = drafts.filter((draft) => {
    const workType = draft.type;
    const dateCreated = draft.createdAt;
    const locationArea = draft?.location?.locationArea?.toLowerCase() || "";

    return (
      workType.includes(searchTerm.toLowerCase()) ||
      dateCreated.includes(
        dayjs(searchTerm).format("MMM DD, YYYY • HH:mm A").toLowerCase()
      ) ||
      locationArea.includes(searchTerm.toLowerCase()) ||
      searchTerm === ""
    );
  });

  return (
    <>
      <Header title="Drafts" />

      <div className="app-section__header">
        <Search placeholder="Search drafts" onSearch={setSearchTerm} />
        <div className="app-section__filters">
          <DateFilter variant="secondary" />

          <Dropdown className="base-dropdown__dropdown-wrapper">
            <DropdownTrigger>{selectedType}</DropdownTrigger>
            <DropdownContent>
              {types.map((type) => (
                <div
                  key={type}
                  className={"base-dropdown__option"}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
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
                <TableCell>Date Created</TableCell>
                <TableCell>Work Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredDrafts.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    {dayjs(data.createdAt).format("MMM DD, YYYY • HH:mm A")}
                  </TableCell>
                  <TableCell>{data.type}</TableCell>
                  {/* <TableCell>Lagos, Nigeria</TableCell> */}
                  <TableCell>
                    <>{data.workArea}</>
                  </TableCell>
                  <TableCell>Alize Cornet</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        viewDraft(data);
                        toggle("draft_details");
                      }}
                    >
                      Open
                    </Button>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Button
                      onClick={() => {
                        startDelete(data);
                      }}
                    >
                      <img src="/svgs/delete_icon.svg" alt="Delete" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {!filteredDrafts.length && (
          <div className="base-empty">
            <img src="/svgs/document.svg" />
            <p>
              {isLoading ? "Fetching drafts, please wait..." : "No drafts yet"}
            </p>
          </div>
        )}

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
      </div>
    </>
  );
}
