import "./monitoring.scss";
import Textarea from "../../../ui/form/text-area";
import { JSX } from "preact/jsx-runtime";

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: string; // Allows custom color styling
}

interface PopupModalProps {
  icon?: JSX.Element;
  title: string;
  message?: string;
  onClose: () => void;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  type?: "suspend" | "cancel";
}

export default function PermitPopupModal({
  icon,
  title,
  message,
  onClose,
  primaryButton,
  secondaryButton,
  type,
}: PopupModalProps) {
  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        {/* Popup Header */}
        <div className="popup-header">
          <div className="icon-container">{icon}</div>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close popup"
          >
            &times;
          </button>
        </div>

        {/* Popup Content */}
        <div className="popup-content">
          <h2>{title}</h2>
          {type === "cancel" && (
            <p>Are you sure you want to cancel this permit?</p>
          )}
          {message && <p>{message}</p>}
          <br />
          <Textarea placeholder="Enter reason..." />

          {/* Button Group */}
          <div className="button-group">
            {secondaryButton && (
              <button
                onClick={secondaryButton.onClick}
                style={{
                  backgroundColor: secondaryButton.color || "#fff",
                  color: "#E86E18",
                }}
              >
                {secondaryButton.label}
              </button>
            )}
            {primaryButton && (
              <button
                onClick={primaryButton.onClick}
                style={{
                  backgroundColor: primaryButton.color || "#007BFF", // Default to a primary button color
                  color: "#fff",
                }}
              >
                {primaryButton.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
