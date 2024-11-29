import { useState, useEffect } from "react";
import { useIDContext } from "../../../../../../context/id.context";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "../../../../../ui/table";
import { createRequest } from "../../../../../../assets/api";
import dayjs from "dayjs";

interface Props {
  setModalOpen: () => void;
}

interface PermitDetails {
  performerRole: string;
  performingPersonInCharge: string;
  workDescription: string;
  equipmentToolsMaterials: string;
  location: {
    locationArea: string;
    location: string;
  };
  workArea: string;
  from_time: string;
  to_time: string;
}

export default function ViewPermitDetails({ setModalOpen }: Props) {
  const { valueID } = useIDContext();
  const id = valueID;

  const [permitDetails, setPermitDetails] = useState<PermitDetails>({
    performerRole: "",
    performingPersonInCharge: "",
    workDescription: "",
    equipmentToolsMaterials: "",
    location: {
      locationArea: "",
      location: "",
    },
    workArea: "",
    from_time: "",
    to_time: "",
  });

  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
    }

    getPermitDetails();
  }, [valueID]);

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <button className="close-button" onClick={setModalOpen}>
          &times;
        </button>

        <div className="popup-content">
          <div className="icon-container">
            <p>Permit Details</p>
          </div>
          <div className="app-section__lg-table popup-lg-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Header</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>{permitDetails?.performerRole}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Performing Person / Person In Charge</TableCell>
                  <TableCell>
                    {permitDetails?.performingPersonInCharge}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Work Details</TableCell>
                  <TableCell>{permitDetails?.workDescription}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Equipment / Tools / Materials</TableCell>
                  <TableCell>
                    {permitDetails?.equipmentToolsMaterials}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Work Location / Work Area</TableCell>
                  <TableCell>
                    {permitDetails?.location?.locationArea} /{" "}
                    {permitDetails?.workArea}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Permit Valid From - To (Date & Time)</TableCell>
                  <TableCell>
                    {dayjs(permitDetails?.from_time).format("MMM DD, YYYY")} /{" "}
                    {dayjs(permitDetails?.to_time).format("MMM DD, YYYY")} /{" "}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="popup-sm-table">
            <div className="">
              <div className="">
                <div className="">
                  <span>Role:</span>
                  <p>{permitDetails?.performerRole} </p>
                </div>
                <div className="">
                  <span>Performing Person / Person In Charge</span>
                  <p>{permitDetails?.performingPersonInCharge}</p>
                </div>
                <div className="">
                  <span>Work Details</span>
                  <p>{permitDetails?.workDescription}</p>
                </div>
                <div className="">
                  <span>Equipment / Tools / Materials</span>
                  <p> {permitDetails?.equipmentToolsMaterials}</p>
                </div>
                <div className="">
                  <span>Work Location / Work Area</span>
                  <p>
                    {" "}
                    {permitDetails?.location?.locationArea} /{" "}
                    {permitDetails?.workArea}
                  </p>
                </div>
                <div className="">
                  <span>Equipment / Tools / Materials</span>
                  <p> {permitDetails?.equipmentToolsMaterials}</p>
                </div>

                <div>
                  <span>Permit Valid From - To (Date & Time)</span>
                  <p>
                    {dayjs(permitDetails?.from_time).format("MMM DD, YYYY")} /{" "}
                    {dayjs(permitDetails?.to_time).format("MMM DD, YYYY")} /{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
