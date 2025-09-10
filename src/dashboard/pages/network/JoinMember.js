import { Button, MenuItem, Select } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import CustomTable from '../../../Shared/CustomTable';
import { apiConnectorGet } from '../../../utils/APIConnector';
import { endpoint } from '../../../utils/APIRoutes';

const JoinMember = () => {
  const [level, setLevel] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const { isLoading, data: team_data } = useQuery(
    ["team_api_downline", level, searchTrigger],
    () =>
      apiConnectorGet(
        `${endpoint?.team_data_api}?level=${limit || level}&page=${page}`
      ),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const data = team_data?.data?.result || [];

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
  };

  const tablehead = [
    <span>S.No.</span>,
    <span>Login Id</span>,
    <span>Level</span>,
    <span>TopUp Amount ($)</span>,
    // <span>Last Week Business</span>,
    <span>TopUp Date</span>,


  ];
  const tablerow = data?.map((row, index) => {
    return [
      <span> {index + 1}</span>,
      <span>{row.lgn_cust_id}</span>,
      <span>{row.level || 'N/A'}</span>,
      <span>{row.jnr_topup_wallet || 'N/A'}</span>,
      // <span>{row.last_week_buss}</span>,
      <span>{row.jnr_topup_date ? moment(row.jnr_topup_date)?.format("DD-MM-YYYY") : "--"}</span>,
    ];
  });
  return (
    <div className="p-2">
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">My Direct Team</h2>

        <div className="mb-6 w-full">
          <p className="text-text-color mb-2">
            {localStorage.getItem("isCP") === "Yes" ? "Enter" : "Select"}{" "}
            Level:
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {localStorage.getItem("isCP") === "No" ? (
              <Select
                value={level}
                onChange={(e) => handleLevelChange(Number(e.target.value))}
                className=" rounded text-black w-full md:w-1/2 bg-white bg-opacity-50"
              >
                {[...Array(1)].map((_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    Level {index + 1}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <input
                type="number"
                placeholder="Enter Level"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="px-4 py-2 rounded w-full md:w-1/2 bg-white bg-opacity-50 text-black"
              />
            )}

            {localStorage.getItem("isCP") === "Yes" && (
              <Button
                onClick={() => setSearchTrigger((prev) => prev + 1)}
                size="small"
                variant="contained"
                className="w-full md:w-auto"
              >
                Search
              </Button>
            )}
          </div>
        </div>
        <div className="!text-white !flex !flex-wrap !justify-between">
          <p>
            Total Count:{" "}
            <span className="!text-gold-color font-extrabold">
              {data?.length}
            </span>
          </p>
          {/* <p>
              Last Week Buss:
              <span className="!text-gold-color font-extrabold">
                {data
                  ?.reduce((a, b) => a + Number(b?.last_week_buss), 0)
                  ?.toFixed(2)}
                $
              </span>
            </p> */}
          <p>
            Total Buss:
            <span className="!text-gold-color font-extrabold">
              {data
                ?.reduce((a, b) => a + Number(b?.jnr_topup_wallet), 0)
                ?.toFixed(2)}
              $
            </span>
          </p>
        </div>
      </div>


      {/* Main Table Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700">
        <CustomTable
          tablehead={tablehead}
          tablerow={tablerow}
          isLoading={isLoading}
        />


        {/* Pagination */}
        {/* <CustomToPagination
          page={page}
          setPage={setPage}
          data={allData}
        /> */}
      </div>
    </div>
  );
};

export default JoinMember;
