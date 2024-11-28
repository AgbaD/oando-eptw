import { Dropdown, DropdownContent, DropdownTrigger } from "../dropdown";
import { PERIOD_LIST } from "./utils";
import Icon from "../icon";
import "./index.scss";

interface DateFilterProps {
  variant?: "primary" | "secondary";
}

export default function DateFilter(props: DateFilterProps) {
  const { variant = "primary" } = props;

  if (variant === "secondary") return <SecondaryDateFilter />;

  return (
    <Dropdown className="base-date-filter">
      <DropdownTrigger>Last 30 days</DropdownTrigger>
      <DropdownContent>
        {PERIOD_LIST.map((period) => (
          <button className="base-date-filter__option">{period.label}</button>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}

export function SecondaryDateFilter() {
  return (
    <div className="base-date-filter--secondary">
      <p>Filter by: </p>
      <div className="base-date-filter--secondary__buttons">
        <button>
          <Icon name="calendar" />
          Start date
        </button>
        <span>---</span>
        <button>
          <Icon name="calendar" />
          End date
        </button>
      </div>
    </div>
  );
}
