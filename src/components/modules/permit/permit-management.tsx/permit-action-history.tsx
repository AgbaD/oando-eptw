import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../ui/table";

export default function PermitActionHistory() {
  const actions = [
    {
      id: 1,
      name: "Jennifer Joe",
      authority: "Perf. Authority",
      date: "13/07/2023 • 11:30 am",
      action: "Created the permit",
    },
  ];
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
      </div>
    </div>
  );
}
