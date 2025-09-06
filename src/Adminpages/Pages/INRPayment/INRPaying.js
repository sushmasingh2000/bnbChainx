import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import CustomToPagination from '../../../Shared/Pagination';
import { apiConnectorGet, apiConnectorPost } from '../../../utils/APIConnector';
import { endpoint } from '../../../utils/APIRoutes';
import CustomTable from '../../Shared/CustomTable';
import { Button } from '@mui/material';
import { Lock } from '@mui/icons-material';
import toast from 'react-hot-toast';
import SweetAlert from "sweetalert2";

const INRPaying = () => {
  const client = useQueryClient();
  const [page, setPage] = useState(1)
  const initialValuesssss = {
    search: '',
    pageSize: 10,
    start_date: '',
    end_date: '',
  };

  const fk = useFormik({
    initialValues: initialValuesssss,
    enableReinitialize: true,

  })
  const { data, isLoading } = useQuery(
    ['get_paying_Admin', fk.values.search, fk.values.start_date, fk.values.end_date, page],
    () =>
      apiConnectorPost(endpoint?.admin_paying_report, {
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

  const handleSubmit = (id) => {
    SweetAlert.fire({
      title: "Are you sure?",
      text: "You want to Approve this Amount!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "custom-confirm",
        cancelButton: "custom-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleRequestStatus(id,2);
      }
    });
  };
  const handleRequestStatus = async (id,status) => {
    try {
      const res = await apiConnectorPost(endpoint?.change_status_fund, {
        tr09_req_id: id,
        status: status,
      });
      client.refetchQueries("get_paying_Admin")
      toast(res?.data?.message);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRejectSubmit = (id) => {
    SweetAlert.fire({
      title: "Are you sure?",
      text: "You want to Reject this Amount!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "custom-confirm",
        cancelButton: "custom-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleRequestStatus(id,3);
      }
    });
  };
  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Amount ($)</span>,
    <span>Status</span>,
    <span>Date</span>,
    <span>Action</span>


  ];
  const tablerow = allData?.data?.map((row, index) => {
    return [
      <span> {index + 1}</span>,
      <span>{row?.or_m_user_id}</span>,
      <span> {row?.or_m_name || 0}</span>,
      <span>{row?.tr09_req_amount}</span>,
      <span>
        {row?.m_top_status === 2
          ? "Pending"
          : row?.m_top_status === 1
            ? "Approved"
            : row?.m_top_status === 0
              ? "Rejected"
              : "N/A"}
      </span>,
      <span>{row?.m_top_reqdate ? moment(row?.m_top_reqdate)?.format("DD-MM-YYYY HH:mm:ss") : "--"}</span>,

      <span className='flex justify-center gap-1'> <span>
        {row?.m_top_status === 2  ? (
          <button
            className="!bg-[#198754] !text-white p-2 rounded"
            onClick={() => handleSubmit(row?.tr09_req_id)}
          >
            Approve
          </button>
        ) : (
          <Lock />
        )}
      </span>
        <span>
          {row?.m_top_status === 2 ? (
            <button
              className="!bg-red-500 !text-white p-2 rounded"

              onClick={() => handleRejectSubmit(row?.tr09_req_id)}
            >
              Reject
            </button>
          ) : (
            <Lock />
          )}
        </span></span>
    ];
  })

  return (
    <>

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
                client.invalidateQueries(["get_withdrawal_Admin"]);
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
        <CustomToPagination
          page={page}
          setPage={setPage}
          data={allData}
        />
      </div>
    </>
  );
};

export default INRPaying;