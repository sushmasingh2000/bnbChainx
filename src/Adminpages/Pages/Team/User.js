import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { apiConnectorPost } from '../../../utils/APIConnector';
import { endpoint } from '../../../utils/APIRoutes';
import CustomToPagination from '../../../Shared/Pagination';
import { useFormik } from 'formik';
import CustomTable from '../../Shared/CustomTable';
import moment from 'moment';
const UserDetail = () => {
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
        ['get_user_admin', fk.values.search, fk.values.start_date, fk.values.end_date, page],
        () =>
            apiConnectorPost(endpoint?.admin_user_details, {
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
            onError: (err) => console.error("Error fetching level data:", err),
        }
    );

    const allData = data?.data?.result || [];

    const tablehead = [
        <span>S.No.</span>,
        <span>User ID</span>,
        <span>User Name</span>,
        <span>Email</span>,
        <span>Mobile No</span>,
        <span>Fund Wallet ($)</span>,
        <span>Income Wallet ($)</span>,
        <span>TopUp Wallet ($)</span>,
        <span>Topup Date</span>,
        <span>Password</span>,
        <span> Status</span>,
        <span>Join. Date</span>,

    ];

    const tablerow = allData?.data?.map((row, index) => {
        return [
            <span> {index + 1}</span>,
            <span>{row.or_m_user_id}</span>,
            <span>{row.or_m_name}</span>,
            <span>{row.or_m_email}</span>,
            <span>{row.or_m_mobile_no}</span>,
            <span>{row?.or_m_fund_wallet}</span>,
            <span>{row.or_m_income_wallet}</span>,
            <span>{row?.or_m_topup_amt}</span>,
            <span>{row.or_m_topup_date ? moment?.utc(row.or_m_topup_date).format("DD-MM-YYYY") : "--"}</span>,
            <span>{row?.or_login_pwd}</span>,
            <span>{row?.or_m_status === 1 ? "Active" : "DeActive"}</span>,
            <span>{row.or_member_joining_date ? moment?.utc(row.or_member_joining_date).format("DD-MM-YYYY") : "--"}</span>,
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
            <CustomToPagination
                page={page}
                setPage={setPage}
                data={allData}
            />

        </div>
    );
};

export default UserDetail;
