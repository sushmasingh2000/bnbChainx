import React, { useState } from 'react';
import { apiConnectorGet, apiConnectorPost } from '../../utils/APIConnector';
import { useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { endpoint } from '../../utils/APIRoutes';
import { useFormik } from 'formik';
import CustomTable from '../../Shared/CustomTable';
import moment from 'moment';
import CustomToPagination from '../../Shared/Pagination';

const Withdrawal = () => {
    const [amount, setAmount] = useState('');
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
    }
    const fk = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: () => {
            const reqbody = {
                with_amount: amount,
            };
            Withdarwal(reqbody)
        }
    });
    async function Withdarwal(reqbody) {
        setLoding(true)
        try {
            const res = await apiConnectorPost(endpoint?.add_user_withdrawal, reqbody);
            toast(res?.data?.message);
            fk.handleReset();
            client.refetchQueries("get_withdrawal");
            client.refetchQueries("get_profile");

        } catch (e) {
            console.log(e);
        }
        setLoding(false);
    }
    const [page, setPage] = useState(1)
    const initialValuesssss = {
        search: '',
        pageSize: 10,
        start_date: '',
        end_date: '',
    };

    const formik = useFormik({
        initialValues: initialValuesssss,
        enableReinitialize: true,

    })
    const { data, isLoading } = useQuery(
        ['get_withdrawal', formik.values.search, formik.values.start_date, formik.values.end_date, page],
        () =>
            apiConnectorPost(endpoint?.withdrawal_list, {
                search: formik.values.search,
                start_date: formik.values.start_date,
                end_date: formik.values.end_date,
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
        <span>Date</span>,
        <span>Transaction Id</span>,
        <span>Amount ($)</span>,
        <span>Wallet Address</span>,
        <span>Status</span>


    ];
    const tablerow = allData?.data?.map((row, index) => {
        return [
            <span> {index + 1}</span>,
            <span>{row?.m_w_reqdate1 ? moment?.utc(row?.m_w_reqdate1)?.format("DD-MM-YYYY HH:mm:ss") : "--"}</span>,
            <span>{row?.m_order_id}</span>,
            <span> {row?.m_w_amount || 0}</span>,
            <span>{row?.or_m_wallet_address}</span>,
            <span>{row?.m_w_status || 'N/A'}</span>,

        ];
    })
    return (
        <>
 {/* <div className="lg:py-8 bg-gray-900 text-gray-100 rounded-xl flex items-center justify-center">
               <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg">
                    <div className='mb-3'>
                        <label htmlFor="walletBalance" className="block text-sm font-medium text-gray-300 mb-1">
                            Wallet ($)
                        </label>
                        <input
                            type="text"
                            id="walletBalance"
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none cursor-not-allowed"
                            value={user_profile?.or_m_income_wallet}
                            readOnly
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="enterAddress" className="block text-sm font-medium text-gray-300 mb-1">
                            Enter Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                            value={user_profile?.wallet_Address}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                            Amount($) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="amount"
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-start space-x-4 pt-4">
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-md bg-green-500 text-gray-900 font-semibold hover:bg-gold-color focus:outline-none focus:ring-2 focus:ring-green-500"
                            onClick={fk.handleSubmit} >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={fk.handleReset}
                            className="px-8 py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div> 
            </div>*/}
            <div className="p-2">
                <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-200">Payout Report</h2>

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
                                client.invalidateQueries(["get_withdrawal"]);
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
        </>
    );
};

export default Withdrawal;