"use client";

import CustomPagination from "@/components/common/Pagination/CustomPagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 1;

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <CustomPagination
      currentPage={currentPage}
      totalItems={totalItems}
      itemsPerPage={ITEMS_PER_PAGE}
      onPageChange={handlePageChange}
      className="mt-4"
    />
  );
};

export default Pagination;
