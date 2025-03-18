"use client";

import Calendar from "@/components/common/Input/Calender";
import Dropdown, { DropdownOption } from "@/components/common/Input/Dropdown";

const Filter = () => {
  const status = [
    { label: "Completed", value: "apple" },
    { label: "In Progress", value: "banana" },
    { label: "Pending", value: "orange" },
    { label: "On Hold", value: "onHold" },
  ];

  const handleSelect = (selected: DropdownOption | null) => {
    console.log("Selected :", selected);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-end gap-2">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-600">Status:</p>
        <Dropdown
          options={status}
          onSelect={handleSelect}
          placeholder="Select status"
          className="w-44"
        />
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-600">Due Date:</p>
        <Calendar />
      </div>
    </div>
  );
};

export default Filter;
