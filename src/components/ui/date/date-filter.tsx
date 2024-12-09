import { useState, useEffect } from "preact/hooks";
import { Dropdown, DropdownContent, DropdownTrigger } from "../dropdown";
import Icon from "../icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

import { PERIOD_LIST } from "./utils";

interface DateFilterProps {
  variant?: "primary" | "secondary";
  setDateRange?: (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void; // Callback for date range selection
}

export default function DateFilter(props: DateFilterProps) {
  const { variant = "primary", setDateRange } = props;

  if (variant === "secondary") {
    return <SecondaryDateFilter setDateRange={setDateRange} />;
  }

  return (
    <Dropdown className="base-date-filter">
      <DropdownTrigger>Last 30 days</DropdownTrigger>
      <DropdownContent>
        {PERIOD_LIST.map((period) => (
          <button key={period.label} className="base-date-filter__option">
            {period.label}
          </button>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}

function SecondaryDateFilter({
  setDateRange,
}: {
  setDateRange?: (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (setDateRange) {
      setDateRange({ startDate, endDate });
    }
  }, [startDate, endDate]);

  return (
    <div className="base-date-filter--secondary">
      <p>Filter by: </p>
      <div className="base-date-filter--secondary__buttons">
        {/* Start Date */}
        <Dropdown className="calendar-dropdown">
          <DropdownTrigger>
            <Icon name="calendar" />
            {startDate ? startDate.toDateString() : "Start date"}
          </DropdownTrigger>
          <DropdownContent>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              inline
            />
          </DropdownContent>
        </Dropdown>

        <span>---</span>

        {/* End Date */}
        <Dropdown className="calendar-dropdown">
          <DropdownTrigger>
            <Icon name="calendar" />
            {endDate ? endDate.toDateString() : "End date"}
          </DropdownTrigger>
          <DropdownContent>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              inline
            />
          </DropdownContent>
        </Dropdown>
      </div>
    </div>
  );
}
