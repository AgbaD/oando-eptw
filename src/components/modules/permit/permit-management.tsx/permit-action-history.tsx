import { usePermitDetails } from "../../../../context/permit-details.context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";

import dayjs from "dayjs";

export default function PermitActionHistory() {
  const { permit } = usePermitDetails();

  console.log(permit?.actions);
  const actions = permit?.actions || [];

  return (
    <div>
      <div className="app-section">
        <div className="app-section__lg-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date & Time</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Authority</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {actions.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    {dayjs(data.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </TableCell>
                  <TableCell>{data.action}</TableCell>
                  <TableCell>{data.authority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="app-section__sm-table">
          {actions.map((data) => (
            <>
              <div className="container-item">
                <span>
                  {dayjs(data.createdAt).format("DD/MM/YYYY hh:mm A")}
                </span>
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
