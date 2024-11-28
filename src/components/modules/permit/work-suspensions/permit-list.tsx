import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";
import Button from "../../../ui/button";
import { getSuspendedPermits } from "../../../../assets/api/permit";
import useRequest from "../../../../hooks/use-request";

export default function PermitsList({ flag, detailsLink = "/permit-management/ptw/",  api = getSuspendedPermits }: any) {
  const { response, isLoading } = useRequest(api, { flag }, true);

  return (
    <div className="app-section">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>PTW No.</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Work To Be Performed</TableCell>
            <TableCell>Location of Work</TableCell>
            <TableCell>Exec. Company</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response?.data?.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>
                {dayjs(data.validityStartDate).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell>{data.workDescription ?? "-"}</TableCell>
              <TableCell>AKRI</TableCell>
              <TableCell>Pasquale_Appaito</TableCell>
              <TableCell>
                <div className={`base-tag--${getStatus(data.status)}`}>
                  {data.status?.replace("_", " ").toLowerCase()}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  href={`${detailsLink}${data.id}`}
                  variant="outline"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!response?.data?.length && (
        <div className="base-empty">
          <img src="/svgs/document.svg" />
          <p>
            {isLoading ? "Fetching permits, please wait..." : "No permits yet"}
          </p>
        </div>
      )}
    </div>
  );
}

function getStatus(status: string) {
  switch (status) {
    case "IN_PROGRESS":
      return "warn";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "danger";
    case "COMPLETED":
      return "success";
    case "SUSPENDED":
      return "warn";
  }
}
