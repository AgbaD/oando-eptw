import { route } from "preact-router";
import Button from "../../ui/button";
import Icon from "../../ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../ui/table";

export default function Permits({ approvedPermits }) {
  return (
    <>
      <div className="app-overview__permits-header">
        <h4>Approved Permits</h4>

        <button onClick={() => route("/permit-management")}>
          View all
          <Icon name="diagonal-arrow" />
        </button>
      </div>

      {approvedPermits?.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Permit ID</TableCell>
              <TableCell>Issued by</TableCell>
              <TableCell>Work Performed</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {approvedPermits?.map((permit) => (
              <TableRow key={permit?.id}>
                <TableCell>{permit?.id}</TableCell>
                <TableCell>{permit?.issuringAuthority?.firstname} {permit?.issuringAuthority?.lastname}</TableCell>
                <TableCell>{permit?.workDescription}</TableCell>
                <TableCell>
                  <Button variant="outline" href={`permit-management/ptw/${permit?.id}`}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) :
        <div className="base-empty" style={{ margin: "100px auto" }}>
          <img src="/svgs/document.svg" />
          <p>No approved permits available</p>
        </div>
      }
    </>
  );
}
