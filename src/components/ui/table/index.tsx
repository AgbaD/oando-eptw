import "./index.scss";

export function Table({ children }: any) {
  return (
    <table className="base-table" cellSpacing={0}>
      {children}
    </table>
  );
}

export function TableHead({ children }: any) {
  return <thead className="base-table__head">{children}</thead>;
}

export function TableBody({ children }: any) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: any) {
  return <tr className="base-table__row">{children}</tr>;
}

export function TableCell({ children }: any) {
  return <td className="base-table__cell">{children}</td>;
}
