import { route } from "preact-router";
import Icon from "../../ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../ui/table";

export default function Permits({ closedPermits }) {
  return (
    <>
      <div className="app-overview__permits-header">
        <h4>Recently Closed Permits</h4>

        <button onClick={() => route("/permit-management")}>
          View all
          <Icon name="diagonal-arrow" />
        </button>
      </div>

      {closedPermits?.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PTW ID</TableCell>
              <TableCell>Work Type</TableCell>
              <TableCell>Work To Be Performed</TableCell>
              <TableCell>Work Location</TableCell>
              {/* <TableCell>Company</TableCell> */}
              {/* <TableCell>Date Closed</TableCell> */}

              <TableCell>Date Closed</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {closedPermits?.map((permit) => (
              <TableRow key={permit?.publicId}>
                <TableCell>{permit?.publicId}</TableCell>
                <TableCell>{permit?.type}</TableCell>

                <TableCell>{permit?.workDescription}</TableCell>
                <TableCell>{permit?.workArea}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="base-empty" style={{ margin: "100px auto" }}>
          <img src="/svgs/document.svg" />
          <p>No closed permits available</p>
        </div>
      )}
    </>
  );
}
