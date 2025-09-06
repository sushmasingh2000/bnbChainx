import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { apiConnectorPost } from '../../../utils/APIConnector';
import { endpoint } from '../../../utils/APIRoutes';
import CustomTable from '../../../Shared/CustomTable';
import CustomToPagination from '../../../Shared/Pagination';
import { useFormik } from 'formik';
import moment from 'moment';

const JoinMember = () => {
  const [page, setPage] = useState(1)
  const client = useQueryClient();
  const initialValues = {
    income_Type: "",
    search: '',
    pageSize: 10,
    start_date: '',
    end_date: '',
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

  })
  const { data, isLoading } = useQuery(
    ['get_direct_referral', fk.values.search, fk.values.start_date, fk.values.end_date, page],
    () =>
      apiConnectorPost(endpoint?.direct_referral_user, {
        search: fk.values.search,
        start_date: fk.values.start_date,
        end_date: fk.values.end_date,
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

  const allData = data?.data?.result || [];

  const tablehead = [
    <span>S.No.</span>,
    <span>Login Id</span>,
    <span>Email</span>,
    <span>Mobile No.</span>,
    <span>User Name</span>,
    <span>TopUp Amount ($)</span>,
    <span>Join. Date</span>,
    <span>TopUp Date</span>,


  ];
  const tablerow = allData?.data?.map((row, index) => {
    return [
      <span> {index + 1}</span>,
      <span>{row.or_m_user_id}</span>,
      <span> {row.or_m_email }</span>,
      <span>{row.or_m_mobile_no}</span>,
      <span>{row.or_m_name || 'N/A'}</span>,
      <span>{row.or_m_topup_amt || 'N/A'}</span>,
      <span>{row.or_member_joining_date}</span>,
      <span>{row.or_m_topup_date? moment(row.or_m_topup_date)?.format("DD-MM-YYYY") : "--"}</span>,
    ];
  });
  return (
    <div className="p-2">
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Referral</h2>

        <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={fk.values.start_date}
            onChange={fk.handleChange}
            className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={fk.values.end_date}
            onChange={fk.handleChange}
            className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="text"
            name="search"
            id="search"
            value={fk.values.search}
            onChange={fk.handleChange}
            placeholder="User ID"
            className="bg-gray-700 border border-gray-600 rounded-full py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <button
            onClick={() => {
              setPage(1);
              client.invalidateQueries(["get_direct"]);
            }}
            type="submit"
            className="bg-gold-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-dark-color transition-colors w-full sm:w-auto text-sm"
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
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700">
        <CustomTable
          tablehead={tablehead}
          tablerow={tablerow}
          isLoading={isLoading}
        />


        {/* Pagination */}
        <CustomToPagination
          page={page}
          setPage={setPage}
          data={allData}
        />
      </div>
    </div>
  );
};

export default JoinMember;
