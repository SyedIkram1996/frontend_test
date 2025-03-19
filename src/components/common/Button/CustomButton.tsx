"use client";

import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  iconPosition?: "left" | "right";
  loading?: boolean;
}

const CustomButton = ({
  children,
  onClick,
  icon,
  className = "",
  type = "button",
  iconPosition = "left",
  loading,
}: Props) => {
  return (
    <button
      disabled={loading}
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 text-sm transition-colors duration-200 rounded-full cursor-pointer ${className}`}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

export default CustomButton;
