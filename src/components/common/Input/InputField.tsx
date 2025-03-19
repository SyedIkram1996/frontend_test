import React, { memo } from "react";

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  icon?: React.ReactNode;
  name?: string;
  error?: string;
  defaultValue?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChange,
  className = "",
  type = "text",
  icon,
  name,
  error,
  defaultValue,
}) => {
  return (
    <div className="relative">
      {/* Icon */}
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}

      {/* Input Field */}
      <input
        name={name}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${
          icon ? "pl-10" : "pl-4"
        } pr-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none  ${className}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default memo(InputField);
