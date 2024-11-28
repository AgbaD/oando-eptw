import dayjs from "dayjs";
import { getPermits } from "../../../../assets/api/permit";
import useRequest from "../../../../hooks/use-request";
import Button from "../../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";

export default function PermitsList({ flag }: { flag?: string }) {
  const { response, isLoading } = useRequest(getPermits, { flag }, true);

  return (
    <div className="app-section">
      <Table>
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
                  href={`/permit-management/ptw/${data.id}`}
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
