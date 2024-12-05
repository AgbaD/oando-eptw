import { usePermitDetails } from "../../../../context/permit-details.context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";

import { useIDContext } from "../../../../context/id.context";
import { useEffect, useState } from "preact/hooks";

import { createRequest } from "../../../../assets/api";

interface PermitDetails {
  status: string;
  [key: string]: any;
}

export default function PermitActionHistory() {
  const { valueID, setID } = useIDContext();
  const id = valueID;

  const { updatePermit } = usePermitDetails();

  const [permitDetails, setPermitDetails] = useState<PermitDetails>({
    status: "",
  });

  useEffect(() => {
    async function getPermitDetails() {
      const permitResponse = await createRequest(`/permit/${id}`, "GET");
      const permitData = permitResponse[0].data;
      setPermitDetails(permitData);
      updatePermit(permitData);
      setID(permitData.id);
    }

    getPermitDetails();
  }, [id]);

  const actions = permitDetails?.actions || [];

  return (
    <div>
      <div className="app-section">
        <div className="app-section__lg-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date & Time</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Authority</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {actions.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    {data.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                  </TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.authority}</TableCell>
                  <TableCell>{data.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="app-section__sm-table">
          {actions.map((data) => (
            <>
              <div className="container-item">
                <h2>{data.name}</h2>
                <span>{data.date}</span>
              </div>
              <p>{data.action}</p>
              <p>
                <span>Authority:</span> {data.authority}
              </p>
            </>
          ))}
        </div>

        <div className="">
          {actions.length === 0 && (
            <>
              <div className="base-empty">
                <img src="/svgs/checklist.png" />
                <p>No actions on this permit yet</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
