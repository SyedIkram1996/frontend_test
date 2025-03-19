"use client";

import Calendar from "@/components/common/Input/Calender";
import Dropdown, { DropdownOption } from "@/components/common/Input/Dropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = [
    { label: "Completed", value: "completed" },
    { label: "In Progress", value: "in progress" },
    { label: "Pending", value: "pending" },
    { label: "On Hold", value: "on hold" },
  ];

  const handleSelect = (selected: DropdownOption | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (selected) {
      params.set("status", selected.value);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const onClickCloseStatus = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    params.delete("status");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectDate = (selected: Date | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (selected) {
      params.set("dueDate", selected.toISOString());
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const onClickCloseDate = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    params.delete("dueDate");

    router.replace(`${pathname}?${params.toString()}`);
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
          onClickClose={onClickCloseStatus}
          option={
            searchParams.get("status")
              ? {
                  label: searchParams.get("status") || "",
                  value: searchParams.get("status") || "",
                }
              : undefined
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-600">Due Date:</p>
        <Calendar
          date={
            searchParams.get("dueDate")
              ? //@ts-ignore
                new Date(searchParams.get("dueDate"))
              : null
          }
          onSelect={handleSelectDate}
          filter
          onClickClose={onClickCloseDate}
        />
      </div>
    </div>
  );
};

export default Filter;
