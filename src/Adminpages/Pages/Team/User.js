import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { apiConnectorPost } from "../../../utils/APIConnector";
import { endpoint } from "../../../utils/APIRoutes";
import CustomToPagination from "../../../Shared/Pagination";
import { useFormik } from "formik";
import CustomTable from "../../Shared/CustomTable";
import moment from "moment";
import { enCryptData } from "../../../utils/Secret";
import Swal from "sweetalert2";
const UserDetail = () => {
  const [page, setPage] = useState(1);
  const client = useQueryClient();
  const [limits, setLimits] = useState({});

  const initialValues = {
    income_Type: "",
    search: "",
    page: "",
    pageSize: 10,
    start_date: "",
    end_date: "",
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
  });
  const { data, isLoading } = useQuery(
    [
      "get_user_admin",
      fk.values.search,
      fk.values.start_date,
      fk.values.end_date,
      page,
    ],
    () =>
      apiConnectorPost(endpoint?.user_data, {
        search: fk.values.search,
        start_date: fk.values.start_date,
        end_date: fk.values.end_date,
        page: page,
        pageSize: "10",
      }),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.error("Error fetching level data:", err),
    }
  );

  const allData = data?.data?.data || [];

  const handleLimitUpdate = async (userId) => {
    const limitValue = limits[userId];
    if (!limitValue) return alert("Please enter a limit.");

    try {
      const req = {
        user_id: userId,
        limit: limitValue || allData?.jnr_mlm_with_cap,
      };
      const response = await apiConnectorPost(endpoint.set_withdrawal_limit, {
        payload: enCryptData(req),
      });
      Swal.fire({
        icon: response?.data?.msg ? "success" : "error",
        title: response?.data?.msg ? "Success" : "Error",
        text: response?.data?.msg || "Something happened",
      });
    } catch (error) {
      console.error("Error updating limit:", error);
      alert("Something went wrong.");
    }
  };

  const tablehead = [
    <span>S.No.</span>,
    <span>User ID</span>,
    <span>Wallet Address</span>,
    <span>Wallet</span>,
    <span>Direct Business</span>,
    <span>Name</span>,
    <span>TopUp Wallet ($)</span>,
    <span>Topup Date</span>,
    <span>Set Withdrawal Limit</span>,
  ];

  const tablerow = allData?.data?.map((row, index) => {
    return [
      <span> {index + 1}</span>,
      <span>{row.lgn_cust_id}</span>,
      <span>{row.lgn_mobile}</span>,
      <span>{row.jnr_curr_wallet}</span>,
      <span>{row.jnr_direct_business}</span>,
      <span>{row?.jnr_name}</span>,
      <span>{row.jnr_topup_wallet}</span>,
      <span>
        {row.jnr_topup_date
          ? moment?.utc(row.jnr_topup_date).format("DD-MM-YYYY")
          : "--"}
      </span>,
      <span>
        <input
          className="text-center p-1"
          type="text"
          placeholder="Enter Withdrawal Limits"
          value={limits[row.lgn_jnr_id] ?? Number(row.jnr_mlm_with_cap).toFixed(2) ?? ""}
          onChange={(e) =>
            setLimits((prev) => ({
              ...prev,
              [row.lgn_jnr_id]: e.target.value,
            }))
          }
        />

        <button
          onClick={() => handleLimitUpdate(row.lgn_jnr_id)}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Update
        </button>
      </span>,
    ];
  });
  return (
    <div className="p-2">
      <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-3 text-white mb-6">
        <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={fk.values.start_date}
            onChange={fk.handleChange}
            className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={fk.values.end_date}
            onChange={fk.handleChange}
            className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="text"
            name="search"
            id="search"
            value={fk.values.search}
            onChange={fk.handleChange}
            placeholder="User ID"
            className="bg-white bg-opacity-50 border border-gray-600 rounded-full py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <button
            onClick={() => {
              setPage(1);
              client.invalidateQueries(["get_user_admin"]);
            }}
            type="submit"
            className="bg-blue-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-dark-color transition-colors w-full sm:w-auto text-sm"
          >
            Search
          </button>
          <button
            onClick={() => {
              fk.handleReset();
              setPage(1);
            }}
            className="bg-gray-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white transition-colors w-full sm:w-auto text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Main Table Section */}

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={isLoading}
      />

      {/* Pagination */}
      <CustomToPagination page={page} setPage={setPage} data={allData} />
    </div>
  );
};

export default UserDetail;
