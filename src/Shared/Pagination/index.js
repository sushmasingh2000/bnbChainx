import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton } from "@mui/material";

const CustomToPagination = ({ setPage, page, data }) => {
  const totalPages = data?.totalPage || 1;
  const currentPage = data?.currPage || 1;

  return (
    <div className="bg-gray-200 w-full flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-2 sm:gap-4  rounded mt-4">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base text-black">
        <span className="font-semibold text-dark-color ">
          Total Pages: <span className="text-black">{totalPages}</span>
        </span>
        <span className="font-semibold text-dark-color">
          Current Page: <span className="text-black">{currentPage}</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <IconButton
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`transition-transform duration-200 rounded-full ${page <= 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-110"
            }`}
        >
          <ChevronLeftIcon className="text-black" />
        </IconButton>

        <IconButton
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className={`transition-transform duration-200 rounded-full ${page >= totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-110"
            }`}
        >
          <ChevronRightIcon className="text-black" />
        </IconButton>
      </div>
    </div>
  );
};

export default CustomToPagination;
