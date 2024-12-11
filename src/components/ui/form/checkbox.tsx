import "./index.scss";

interface CheckboxProps {
  checked?: boolean;
  onChange: (isChecked: boolean) => void;
  disabled?: boolean;
}

export default function Checkbox(props: CheckboxProps) {
  const { checked, onChange, disabled } = props;

  return (
    <input
      className="base-checkbox"
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={({ currentTarget: { checked } }) => onChange(checked)}
    />
  );
}
