import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";
import Button from "../../../ui/button";
import { getPermitRenewals } from "../../../../assets/api/permit";
import useRequest from "../../../../hooks/use-request";

export default function PermitRenewalsList({ flag }: any) {
  const { response, isLoading } = useRequest(
    getPermitRenewals,
    { flag },
    true
  );

  return (
    <div className="app-section">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>PTW No.</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Gas Tester</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response?.data?.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.permitId}</TableCell>
              <TableCell>
                {dayjs(data.startDate).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell>
                {dayjs(data.endDate).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell>{data.gasTesterName}</TableCell>
              <TableCell>
                <div className={`base-tag--${getStatus(data.status)}`}>
                  {data.status?.replace("_", " ").toLowerCase()}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  href={`/permit-renewals/ptw/${data.id}`}
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
