import { usePermitDetails } from "../../../../context/permit-details.context";

interface PermitDetails {
  status: string;
  [key: string]: any;
}

import { useIDContext } from "../../../../context/id.context";
import { useState, useEffect } from "preact/hooks";
import { createRequest } from "../../../../assets/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";
import dayjs from "dayjs";

export default function OnsiteNotes() {
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

  const onsiteNotes = permitDetails?.onsiteNotes || [];
  console.log(onsiteNotes);

  return (
    <>
      <div className="">
        {onsiteNotes?.length === 0 ? (
          <div className="base-empty">
            <img src="/svgs/checklist.png" />
            <p>
              Onsite notes & comments will be active once the permit has been
              approved and now on-site.
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Creator</TableCell>
                  <TableCell>Authority</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {onsiteNotes?.map((note: any) => (
                  <TableRow key={note.id}>
                    <TableCell>
                      {dayjs(note?.createdAt).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell>{note?.content}</TableCell>
                    <TableCell>{note?.creator.fullname}</TableCell>
                    <TableCell>{note?.creatorAuthority}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </>
  );
}
