"use client";

import InputField from "@/components/common/Input/InputField";
import useTextFieldDebounce from "@/hooks/useTextFieldDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const { handleTextFieldChange } = useTextFieldDebounce({
    searchParams,
    replace,
    pathname,
  });

  return (
    <InputField
      name="search"
      placeholder="Search for something..."
      defaultValue={searchParams.get("search") || ""}
      onChange={(e) => {
        handleTextFieldChange(e);
      }}
      className="w-96" // Custom width
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          color="#9b9b9b"
          fill="none"
        >
          <path
            d="M17.5 17.5L22 22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  );
};

export default Search;
