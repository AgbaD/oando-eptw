import "./index.scss";

interface CheckboxProps {
  checked?: boolean;
  onChange: (isChecked: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <input
      className="base-checkbox"
      type="checkbox"
      {...props}
      onChange={({ currentTarget: { checked } }) => props.onChange(checked)}
    />
  );
}
