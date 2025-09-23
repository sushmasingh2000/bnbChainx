import { FilterAlt, Refresh } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import LockIcon from "@mui/icons-material/Lock";
import { Button, IconButton, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { enCryptData } from "../../../utils/Secret";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomToPagination from "../../../Shared/Pagination";
import { endpoint } from "../../../utils/APIRoutes";
import { apiConnectorPost } from "../../../utils/APIConnector";

const INRPayout = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalamount, setTotalamount] = useState({});
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [loding, setloding] = useState(false);
  const [page, setPage] = useState(1);
  const INRPayoutFunction = async () => {
    setloding(true);
    try {
      const res = await apiConnectorPost(endpoint?.inr_payout_data, {
        created_at: from_date,
        updated_at: to_date,
        page: page,
        count: 10,
        search: search,
      });
      setData(res?.data?.data?.data || []);
      setTotalamount(res?.data);
      // if (res) {
      //   setSearch("");
      //   setTo_date("");
      //   setFrom_date("");
      // }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    INRPayoutFunction();
  }, [page]);

  async function handleWithdrawalStatus(t_id, status) {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.payout_request_approval, {
        payload: enCryptData({ t_id: t_id, status_type: status }),
      });
      INRPayoutFunction();
      toast(res?.data?.message);
    } catch (e) {
      console.log("Something went wrong.");
    }
    setloding(false);
  }

  async function handleWalletSyc(t_id) {
    setloding(true);
    try {
      const res = await axiosInstance.get(API_URLS?.wallet_sync, {
        params: {
          t_id: t_id,
        },
      });
      INRPayoutFunction();
      toast(res?.data?.message, { id: 1 });
    } catch (e) {
      console.log("Something went wrong.");
    }
    setloding(false);
  }
  const tablehead = [
    <span>S.No</span>,
    <span>Name</span>,
    <span>Email</span>,
    <span>User Id</span>,
    <span>Mobile</span>,
    <span>Count</span>,
    <span>Address</span>,
    <span>Req Amnt</span>,
    <span>Team Buss</span>,
    <span>Wallet Type</span>,
    <span>Date/Time</span>,
    <span>Status</span>,
    <span>Action</span>,
  ];
  const tablerow = data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_real_name || "--"}</span>,
      <span>{i?.lgn_real_email || "--"}</span>,
      <span>{i?.lgn_cust_id || "--"}</span>,
      <span>{i?.lgn_real_mob || "--"}</span>,
      <span>{i?.wdrl_count || "--"}</span>,
      <p className="!flex !justify-center">
        {i?.wdrl_to}
        {i?.wdrl_status !== "Success" && (
          <Refresh
            onClick={() => handleWalletSyc(i?.wdrl_id, i?.lgn_cust_id)}
          />
        )}
      </p>,
      <span>{i?.wdrl_amont || "--"}</span>,
      <span>{i?.team_buss || "--"}</span>,
      <span>{i?.wdrl_wallet_type || "--"}</span>,
      <span className="">
        {moment(i?.wdrl_created_at).format("DD-MM-YYYY HH:mm:ss")}
      </span>,
      <span
        className={`${
          i?.wdrl_status === "Success"
            ? "text-green-500"
            : i?.wdrl_status === "Failed"
            ? "!text-rose-500"
            : "!text-gray-800"
        }`}
      >
        {i?.wdrl_status}
      </span>,
      <p>
        {i?.wdrl_status === "Pending" ? (
          <span className="!flex">
            <IconButton
              className="!text-green-500"
              onClick={() => handleWithdrawalStatus(i?.wdrl_id, 1)} //       // 1: successs, 2 failed, 3 pending, 4 rejecred
            >
              <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton
              className="!text-rose-500"
              onClick={() => handleWithdrawalStatus(i?.wdrl_id, 4)} //      // 1: successs, 2 failed, 3 pending, 4 rejecred
            >
              <CancelIcon />
            </IconButton>
          </span>
        ) : (
          <IconButton>
            <LockIcon />
          </IconButton>
        )}
      </p>,
    ];
  });

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:flex-wrap gap-4 md:items-end">
        {/* From Date */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-semibold">From:</span>
          <TextField
            type="date"
            size="small"
            value={from_date}
            onChange={(e) => setFrom_date(e.target.value)}
            fullWidth
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-semibold">To:</span>
          <TextField
            type="date"
            size="small"
            value={to_date}
            onChange={(e) => setTo_date(e.target.value)}
            fullWidth
          />
        </div>

        {/* Search Input */}
        <div className="w-full md:w-64">
          <TextField
            type="search"
            size="small"
            placeholder="Search by user ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            onClick={() => {
              setPage(1);
              INRPayoutFunction();
            }}
            variant="contained"
            color="primary"
            startIcon={<FilterAlt />}
            className="w-full md:w-auto"
          >
            Filter
          </Button>

          <Button
            onClick={() => {
              setSearch("");
              setTo_date("");
              setFrom_date("");
              setPage(1);
              INRPayoutFunction();
            }}
            variant="outlined"
            color="secondary"
            startIcon={<FilterAltOffIcon />}
            className="w-full md:w-auto"
          >
            Remove
          </Button>
        </div>
        <div className="!font-extrabold">
          <span>Total Amount: </span>
          <span>{totalamount?.sumValue?.total_amount || 0}</span>
        </div>
      </div>

      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />
      <CustomToPagination
        setPage={setPage}
        page={page}
        data={totalamount?.data}
      />
    </div>
  );
};

export default INRPayout;
