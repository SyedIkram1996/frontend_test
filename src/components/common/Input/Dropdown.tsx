"use client";

import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect?: (selectedOption: DropdownOption | null) => void;
  placeholder?: string;
  className?: string;
  btnClassName?: string;
  option?: DropdownOption;
  onClickClose?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
  className = "",
  btnClassName = "",
  option,
  onClickClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    option || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelect?.(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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

  return (
    <div className={`z-21 relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left bg-white border rounded-md hover:bg-gray-50 focus:outline-none cursor-pointer ${
          selectedOption && !btnClassName ? "text-gray-900" : "text-gray-500"
        } ${btnClassName ? btnClassName : "px-4 py-0.5 shadow-sm"}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedOption?.label || placeholder}
        {!selectedOption || btnClassName ? (
          <span className={`float-right ${btnClassName ? "px-0" : "px-2"} `}>
            ▼
          </span>
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setSelectedOption(null);
              if (onClickClose) {
                onClickClose();
              }
            }}
            className=" font-medium float-right rounded-full px-2 hover:bg-gray-300"
          >
            X
          </span>
        )}
      </button>

      <div
        className={`absolute w-full max-h-[30vh] overflow-auto mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        role="menu"
      >
        <div className="py-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`block w-full px-4 py-2 text-sm text-left ${
                selectedOption?.value === option.value
                  ? "bg-blue-100 text-blue-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              role="menuitem"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
