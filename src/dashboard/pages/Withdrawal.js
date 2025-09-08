import React, { useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import { useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { endpoint } from "../../utils/APIRoutes";
import { useFormik } from "formik";
import CustomTable from "../../Shared/CustomTable";
import moment from "moment";
import soment from "moment-timezone"
import CustomToPagination from "../../Shared/Pagination";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [loding, setLoding] = useState(false);
  const client = useQueryClient();
  const { data: profile } = useQuery(
    ["get_profile"],
    () => apiConnectorGet(endpoint?.profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const user_profile = profile?.data?.result || 0;

  const initialValues = {
    with_amount: "",
  };
  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqbody = {
        with_amount: amount,
      };
      Withdarwal(reqbody);
    },
  });
  async function Withdarwal(reqbody) {
    setLoding(true);
    try {
      const res = await apiConnectorPost(
        endpoint?.add_user_withdrawal,
        reqbody
      );
      toast(res?.data?.message);
      fk.handleReset();
      client.refetchQueries("get_withdrawal");
      client.refetchQueries("get_profile");
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }
  const [page, setPage] = useState(1);
  const initialValuesssss = {
    search: "",
    pageSize: 10,
    created_at: "",
    updated_at: "",
  };

  const formik = useFormik({
    initialValues: initialValuesssss,
    enableReinitialize: true,
  });
  const { data, isLoading } = useQuery(
    [
      "get_withdrawal",
      formik.values.search,
      formik.values.created_at,
      formik.values.updated_at,
      page,
    ],
    () =>
      apiConnectorPost(endpoint?.withdrawal_list, {
        search: formik.values.search,
        created_at: formik.values.created_at,
        updated_at: formik.values.updated_at,
        pageNumber: page,
        pageSize: "10",
      }),
    {
      keepPreviousData: true, 
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.error("Error fetching direct data:", err),
    }
  );

  const allData = data?.data?.data || [];
  console.log(formik.values)
  const tablehead = [
    <span>S.No.</span>,
    <span>Date</span>,
    <span>Transaction Id</span>,
    <span>Amount ($)</span>,
    <span>Wallet Address</span>,
    <span>Status</span>,
  ];
  const tablerow = allData?.data?.map((row, index) => {
    return [
      <span> {index + 1}</span>,
      <span>
        {row?.wdrl_created_at
          ? soment(row?.wdrl_created_at)
              .tz("Asia/Kolkata")
              .format("DD-MM-YYYY HH:mm:ss")
          : "--"}
      </span>,
      <span>{row?.wdrl_transacton_id}</span>,
      <span> {row?.wdrl_amont || 0}</span>,
      <span>{row?.wdrl_to}</span>,
      <span>{row?.wdrl_status || "N/A"}</span>,
    ];
  });
  return (
    <>
   
      <div className="p-2">
        <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Payout Report
          </h2>

          <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
            <input
              type="date"
              name="created_at"
              id="created_at"
              value={formik.values.created_at}
              onChange={formik.handleChange}
              className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
            />
            <input
              type="date"
              name="updated_at"
              id="updated_at"
              value={formik.values.updated_at}
              onChange={formik.handleChange}
              className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
            />
            {/* <input
              type="text"
              name="search"
              id="search"
              value={formik.values.search}
              onChange={formik.handleChange}
              placeholder="User ID"
              className="bg-gray-700 border border-gray-600 rounded-full py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
            /> */}
            <button
              onClick={() => {
                setPage(1);
                client.invalidateQueries(["get_withdrawal"]);
              }}
              type="submit"
              className="bg-gold-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-dark-color transition-colors w-full sm:w-auto text-sm"
            >
              Search
            </button>
            <button
              onClick={() => {
                formik.handleReset();
                setPage(1);
              }}
              className="bg-gray-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white transition-colors w-full sm:w-auto text-sm"
            >
              Clear
            </button>
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
          <CustomToPagination page={page} setPage={setPage} data={allData} />
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
