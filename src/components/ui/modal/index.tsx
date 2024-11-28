import { Children, cloneElement } from "preact/compat";
import Icon from "../icon";
import "./index.scss";

interface ModalProps {
  children: any;
  show: boolean;
  toggle: () => void;
  align?: "center" | "right"
}

export function Modal({ children, show, toggle, align = "right" }: ModalProps) {
  if (!show) return null;

  const decoratedChildren = Children.map(children, (child) =>
    cloneElement(child, { toggle })
  );

  return (
    <div className="app-modal" data-align={align}>
      <div className="app-modal__overlay" onClick={toggle}></div>
      <div className="app-modal__content">
        {decoratedChildren}

        {align === "right" && <img className="app-modal__blur" src="/svgs/auth-blur.svg" />}
      </div>
    </div>
  );
}

export function ModalHeader({ children, toggle }: any) {
  return (
    <div className="app-modal__header">
      <h4>{children}</h4>
      <button onClick={toggle}>
        <Icon name="x" />
      </button>
    </div>
  );
}

export function ModalBody({ children }) {
  return <div className="app-modal__body">{children}</div>;
}

export function ModalDetail(props: { label: string; children: any }) {
  const { label, children } = props;

  return (
    <div className="app-modal__detail">
      <div className="app-modal__detail__key">{label}</div>
      <div className="app-modal__detail__value">{children}</div>
    </div>
  );
}
