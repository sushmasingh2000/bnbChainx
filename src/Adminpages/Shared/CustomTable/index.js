import React from "react";
import { Skeleton } from "@mui/material";

const CustomTable = ({
  tablehead = [],   // default empty array
  tablerow = [],    // default empty array
  className,
  isLoading,
}) => {
  return (
    <div className={`w-full overflow-x-auto example ${className || ""}`}>
      <table className="min-w-full table-auto divide-y divide-gray-700 text-sm">
        <thead className="bg-white bg-opacity-50">
          <tr>
            {Array.isArray(tablehead) &&
              tablehead.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="border border-white px-4 py-2 text-left text-xs font-semibold text-gray-800 uppercase whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
          </tr>
        </thead>

        <tbody className="bg-white bg-opacity-50 divide-y divide-gray-700">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.isArray(tablehead) &&
                  tablehead.map((_, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-white px-4 py-3 whitespace-nowrap text-gray-800"
                    >
                      <Skeleton animation="wave" height={20} />
                    </td>
                  ))}
              </tr>
            ))
          ) : tablerow.length === 0 ? (
            <tr>
              <td
                colSpan={tablehead?.length || 1}
                className="text-center text-white px-4 py-6"
              >
                No data found
              </td>
            </tr>
          ) : (
            tablerow.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-600/30 hover:text-white transition-colors cursor-pointer"
              >
                {Array.isArray(row) &&
                  row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-white px-4 py-3 whitespace-nowrap text-sm text-gray-800"
                    >
                      {cell}
                    </td>
                  ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
