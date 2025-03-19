"use client";

import CustomPagination from "@/components/common/Pagination/CustomPagination";
import { useTaskContext } from "@/context/taskContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ITEMS_PER_PAGE = 1;

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { meta } = useTaskContext();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const totalItems = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", `${page}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (!meta) {
    return;
  }

  return (
    <CustomPagination
      currentPage={meta.page}
      totalItems={meta.total}
      itemsPerPage={meta.limit}
      totalPages={meta.totalPages}
      onPageChange={handlePageChange}
      className="mt-4"
    />
  );
};

export default Pagination;
