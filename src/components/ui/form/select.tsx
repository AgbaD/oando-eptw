import { h } from "preact";
import "./index.scss";
import Icon from "../icon";

interface InputProps extends h.JSX.HTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  isTouched?: boolean;
  options?: { text: string; value: any }[];
}

export default function Select({
  label = "",
  error,
  isTouched,
  options,
  placeholder,
  ...props
}: InputProps) {
  const showError = isTouched ? Boolean(error) : false;

  return (
    <label className="base-input">
      {label ? <span>{label}</span> : null}

      <div className="select-container">
        <select data-hasError={showError} {...props}>
          <option value="" default>
            {placeholder ?? `Select ${label.toLowerCase()}`}
          </option>

          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <Icon name="caret-left" />
      </div>

      {showError && (
        <p className="base-input__error">
          {/* prettier-ignore */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {error}
        </p>
      )}
    </label>
  );
}
