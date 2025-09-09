import { Edit, FilterAlt } from "@mui/icons-material";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {
  Button,
  Dialog,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomToPagination from "../../../Shared/CustomToPagination";
import { frontend } from "../../../utils/APIRoutes";
import { enCryptData } from "../../../utils/Secret";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";
const UserDetail = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [descriptin, setDescriptin] = useState("");
  const [tr_type, setTr_type] = useState("dr");

  const UserBonusFn = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.user_data, {
        created_at: from_date,
        updated_at: to_date,
        page: page,
        count: 10,
        search: search,
      });
      setData(res?.data?.data || []);
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    UserBonusFn();
  }, [page]);

  async function stopIncome(id, type) {
    try {
      const response = await axiosInstance.post(API_URLS?.stop_user_income, {
        lgn_cust_id: id,
        type: type,
      });
      UserBonusFn();
      toast(response?.data?.message);
    } catch (e) {
      return toast("Something went wrong");
    }
  }
  async function handleSubmit() {
    try {
      const response = await axiosInstance.post(
        API_URLS?.amount_deducted_by_admin,
        {
          amount: amount || 0,
          lgn_cust_id: openPopup,
          descriptin: descriptin || "",
          tr_type: tr_type,
        }
      );
      if (response?.data?.success) {
        UserBonusFn();
        setOpenPopup(false);
      }
      toast(response?.data?.message);
    } catch (e) {
      console.log(e);
      return toast("Something went wrong");
    }
  }
  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>Topup Amnt</span>,
    <span>Lapps Amnt</span>,
    <span>Net Amnt</span>,
    <span>Total Income</span>,
    <span>Curr Wallet</span>,
    <span>Date/Time</span>,
    <span className="!flex !whitespace-nowrap">
      Income | Profile | DW | OL | SD
    </span>,
  ];

  const tablerow = data?.data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span
        className={`${i?.lgn_token ? "!text-blue-600" : "!text-black"}`}
        onClick={() =>
          i?.lgn_token &&
          window.open(
            `${frontend}/admin-login-user-id?id=${encodeURIComponent(
              enCryptData(i?.lgn_cust_id)
            )}&token=${i?.lgn_token}`,
            "_blank"
          )
        }
      >
        {i?.lgn_cust_id}
      </span>,
      <span>{i?.lgn_real_name || i?.jnr_name || "--"}</span>,
      <span>{i?.lgn_real_mob || "--"}</span>,
      <span>{i?.lgn_real_email || "--"}</span>,
      <span>{i?.jnr_topup_wallet || "--"}</span>,
      <span>{i?.jnr_collapse_pkg || "--"}</span>,
      <span>
        {Number(
          Number(i?.jnr_topup_wallet || 0) - Number(i?.jnr_collapse_pkg || 0)
        )?.toFixed(2) || "--"}
      </span>,
      <span>{i?.jnr_total_income || "--"}</span>,
      <span>{i?.jnr_curr_wallet || "--"}</span>,

      <span>{moment(i?.jnr_created_at).format("DD-MM-YYYY HH:mm:ss")}</span>,
      <span className="!flex">
        <IconButton onClick={() => stopIncome(i?.lgn_cust_id, "income")}>
          <DoNotDisturbAltIcon
            className={`${
              i?.jnr_is_active_for_income === "Active"
                ? "!text-green-500"
                : "!text-rose-500"
            }`}
          />
        </IconButton>
        <IconButton onClick={() => stopIncome(i?.lgn_cust_id, "profile")}>
          <DoNotDisturbAltIcon
            className={`${
              i?.lgn_update_prof === "Active"
                ? "!text-green-500"
                : "!text-rose-500"
            }`}
          />
        </IconButton>
        <IconButton
          disabled={Number(i?.jnr_curr_wallet) <= 0}
          onClick={() => setOpenPopup(i?.lgn_cust_id)}
        >
          <Edit
            disabled={Number(i?.jnr_curr_wallet) <= 0}
            className={`!text-gray-700`}
          />
        </IconButton>
        <IconButton onClick={() => stopIncome(i?.lgn_cust_id, "openlevel")}>
          <DoNotDisturbAltIcon
            className={`${
              i?.jnr_is_open_al_level === "True"
                ? "!text-green-500"
                : "!text-rose-500"
            }`}
          />
        </IconButton>
        <IconButton onClick={() => stopIncome(i?.lgn_cust_id, "isdeposit")}>
          <DoNotDisturbAltIcon
            className={`${
              i?.lgn_is_deposit === "Active"
                ? "!text-green-500"
                : "!text-rose-500"
            }`}
          />
        </IconButton>
      </span>,
    ];
  });

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row flex-wrap gap-4 md:gap-5 items-start md:items-end">
        {/* From Date */}
        <div className="flex flex-col w-full md:w-48">
          <span className="text-sm font-semibold mb-1">From:</span>
          <TextField
            type="date"
            size="small"
            value={from_date}
            onChange={(e) => setFrom_date(e.target.value)}
            fullWidth
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col w-full md:w-48">
          <span className="text-sm font-semibold mb-1">To:</span>
          <TextField
            type="date"
            size="small"
            value={to_date}
            onChange={(e) => setTo_date(e.target.value)}
            fullWidth
          />
        </div>

        {/* User ID Search */}
        {/* <div className="flex flex-col w-full md:w-64">
          <span className="text-sm font-semibold mb-1">User ID:</span>
          <TextField
            type="search"
            placeholder="Search by user ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            fullWidth
          />
        </div> */}

        {/* Action Buttons */}
        <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
          <Button
            onClick={() => {
              setPage(1);
              UserBonusFn();
            }}
            variant="contained"
            startIcon={<FilterAlt />}
            className="w-full md:w-auto"
            color="primary"
          >
            Filter
          </Button>
          <Button
            onClick={() => {
              setSearch("");
              setTo_date("");
              setFrom_date("");
              setPage(1);
              UserBonusFn();
            }}
            variant="outlined"
            startIcon={<FilterAltOffIcon />}
            className="w-full md:w-auto"
            color="secondary"
          >
            Remove
          </Button>
        </div>
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
        isPagination={false}
      />
      <div className="flex justify-center mt-6">
        {/* <CustomPagination data={data} setPage={setPage} /> */}
        <CustomToPagination setPage={setPage} page={page} data={data} />
      </div>
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <div className="bg-white rounded-3xl shadow-2xl lg:p-6 p-1 w-full lg:!max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            {tr_type === "cr" ? "Credit" : "Debit"} Wallet
          </h2>

          <div className="flex flex-wrap gap-6 px-12">
            <div className="w-full ">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="dr"
                name="radio-buttons-group"
                value={tr_type}
                onChange={(e) => setTr_type(e.target.value)}
              >
                <FormControlLabel
                  value="cr"
                  control={<Radio />}
                  label="Credited"
                />
                <FormControlLabel
                  value="dr"
                  control={<Radio />}
                  label="Debited"
                />
              </RadioGroup>
              <label className="block text-gray-700 font-medium mb-1">
                Amount
              </label>
              <TextField
                type="number"
                fullWidth
                placeholder="Enter amount"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </div>

            <div className="w-full ">
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <TextField
                type="text"
                multiline
                rows={5}
                fullWidth
                placeholder="Enter description"
                variant="outlined"
                value={descriptin}
                onChange={(e) => setDescriptin(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => setOpenPopup(false)}
              className="px-4 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!amount}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserDetail;
