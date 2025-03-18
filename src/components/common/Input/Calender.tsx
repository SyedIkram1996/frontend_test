"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  setYear,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import Dropdown, { DropdownOption } from "./Dropdown";

const Calendar = () => {
  const years = useMemo(() => {
    const startYear = 1990;
    const endYear = 2099;
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push({ label: `${year}`, value: `${year}` });
    }

    return years;
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Generate calendar dates
  const getCalendarDates = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  };

  // Previous month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Next month navigation
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Date selection handler
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const handleSelect = (selected: DropdownOption | null) => {
    console.log(selectedDate);
    if (selectedDate) {
      setSelectedDate(setYear(selectedDate, Number(selected?.label)));
      return;
    }
    setCurrentMonth(setYear(currentMonth, Number(selected?.label)));
  };

  return (
    <div className="relative z-20" ref={calendarRef}>
      <button
        onClick={() => {
          if (selectedDate) {
            setCurrentMonth(selectedDate);
          }
          setIsOpen(!isOpen);
        }}
        className={`px-4 py-0.5 cursor-pointer bg-white ${
          selectedDate ? "text-gray-900" : "text-gray-500"
        } border rounded-md shadow-sm hover:bg-gray-50 transition-colors`}
      >
        {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Select Date"}

        {!selectedDate ? (
          <span className={"float-right px-2 mt-1"}>
            <svg
              className="text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              color="#000000"
              fill="none"
            >
              <path
                d="M18 2V4M6 2V4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 8H20.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 8H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDate(null);
            }}
            className="float-right rounded-full px-2 hover:bg-gray-300 font-medium"
          >
            X
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute sm:right-0 mt-2 p-4 bg-white border rounded-lg shadow-lg w-64">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePreviousMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <span className="font-semibold flex items-center gap-2">
              {format(currentMonth, "MMMM")}
              <Dropdown
                options={years}
                onSelect={handleSelect}
                placeholder={format(currentMonth, "yyyy")}
                className="w-22 text-sm"
                btnClassName="px-1 bg-red-500"
              />
            </span>

            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week Days Header */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-600"
              >
                {day}
              </div>
            ))}

            {/* Calendar Dates */}
            {getCalendarDates().map((date) => {
              const isCurrentMonth = isSameMonth(date, currentMonth);
              const isSelected = selectedDate && isSameDay(date, selectedDate);

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelect(date)}
                  className={`
                    h-8 rounded
                    ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                    ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }
                    ${isCurrentMonth && !isSelected ? "bg-white" : ""}
                    text-sm transition-colors
                  `}
                  disabled={!isCurrentMonth}
                >
                  {format(date, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
