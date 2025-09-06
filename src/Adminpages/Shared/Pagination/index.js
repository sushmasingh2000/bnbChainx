import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton } from "@mui/material";
 
const CustomToPagination = ({ setPage, page, data }) => {
  const totalPages = data?.totalPage || 1;
  const currentPage = data?.currPage || 1;
 
  return (
    <div className="!bg-gold-color w-full flex items-center justify-end gap-4 p-3 rounded">
      <span className="font-semibold text-nowrap md:text-lg text-xs text-gold-color">
        Total Pages: <span className="text-gray-400">{totalPages}</span>
      </span>
      <span className="font-semibold md:text-lg text-xs text-gold-color">
        Current Page: <span className="text-gray-400">{currentPage}</span>
      </span>
 
      <IconButton
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`transition-transform duration-200 rounded-full ${
          page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        <ChevronLeftIcon className="text-gold-color" />
      </IconButton>
 
      <IconButton
        onClick={() => setPage(page + 1)}
        disabled={page >= data?.totalPage}
        className={`transition-transform duration-200 rounded-full ${
          page >= data?.totalPage
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-110"
        }`}
      >
        <ChevronRightIcon className="text-gold-color" />
      </IconButton>
    </div>
  );
};
 
export default CustomToPagination;