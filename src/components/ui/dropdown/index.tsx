import "./index.scss";
import { Children, cloneElement, useRef, useState } from "react";
import useClickOutside from "../../../hooks/use-click-outside";
import classNames from "classnames";

export function Dropdown({ children, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside([dropdownRef], () => {
    setIsOpen(false);
  });

  const DecoratedChildren = Children.map(children, (child) =>
    cloneElement(child, { isOpen, setIsOpen })
  );

  return (
    <div className={classNames("base-dropdown", className)} ref={dropdownRef}>
      {DecoratedChildren}
    </div>
  );
}

export function DropdownTrigger({ children, isOpen, setIsOpen }: any) {
  return (
    <button
      className="base-dropdown__trigger"
      data-active={isOpen}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span>{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.35334 10.8534C8.25959 10.947 8.13251 10.9996 8.00001 10.9996C7.86751 10.9996 7.74043 10.947 7.64668 10.8534L2.64668 5.85335C2.55836 5.75857 2.51027 5.63321 2.51256 5.50367C2.51485 5.37414 2.56732 5.25055 2.65893 5.15894C2.75054 5.06733 2.87413 5.01486 3.00366 5.01257C3.1332 5.01029 3.25856 5.05837 3.35334 5.14669L8.00001 9.79335L12.6467 5.14669C12.6925 5.09756 12.7477 5.05816 12.809 5.03083C12.8703 5.00351 12.9365 4.98881 13.0037 4.98763C13.0708 4.98644 13.1375 4.99879 13.1997 5.02394C13.262 5.04909 13.3186 5.08652 13.366 5.134C13.4135 5.18147 13.4509 5.23803 13.4761 5.30029C13.5012 5.36255 13.5136 5.42923 13.5124 5.49637C13.5112 5.5635 13.4965 5.62971 13.4692 5.69105C13.4419 5.75238 13.4025 5.80758 13.3533 5.85335L8.35334 10.8534Z"
          fill="#8F92A1"
        />
      </svg>
    </button>
  );
}

export function DropdownContent({ children, isOpen }: any) {
  if (!isOpen) return null;

  const DecoratedChildren = Children.map(children, (child) =>
    cloneElement(child, { isOpen })
  );

  return <div className="base-dropdown__content">{DecoratedChildren}</div>;
}

export function DropdownOption({ children, setIsOpen }: any) {
  return (
    <div className="base-dropdown__option" onClick={() => setIsOpen(true)}>
      {children}
    </div>
  );
}
