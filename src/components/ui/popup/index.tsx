import "./index.scss";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../table";
import { JSX } from "preact/jsx-runtime";

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: string; // allows custom color styling
}

interface PopupModalProps {
  icon?: JSX.Element;
  title: string;
  message?: string;
  onClose: () => void;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  type?: "table" | "action";
  tableData?: {
    header: string;
    description: string;
  }[];
}

export default function PopupModal({
  icon,
  title,
  message,
  onClose,
  primaryButton,
  secondaryButton,
  type,
  tableData,
}: PopupModalProps) {
  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {type === "table" ? (
          <div className="popup-content">
            <div className="icon-container">
              <p>{title}</p>
            </div>
            <div className="app-section__lg-table popup-lg-table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Header</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData?.map((item) => (
                    <TableRow key={item.header}>
                      <TableCell>{item.header}</TableCell>
                      <TableCell>{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="popup-sm-table">
              <div className="">
                <div className="">
                  {tableData?.map((item) => (
                    <div className="" key={item.header}>
                      <span>{item.header}</span>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="popup-content">
            <div className="icon-container">{icon}</div>
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="button-group">
              {secondaryButton && (
                <button
                  onClick={secondaryButton.onClick}
                  style={{
                    backgroundColor: secondaryButton.color || "#fff",
                    color: "#fff",
                  }}
                >
                  {secondaryButton.label}
                </button>
              )}
              {primaryButton && (
                <button
                  onClick={primaryButton.onClick}
                  style={{
                    backgroundColor: primaryButton.color || "#fff",
                    color: "#fff",
                  }}
                >
                  {primaryButton.label}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
