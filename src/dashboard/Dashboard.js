import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import {
  FaBell,
  FaChartLine,
  FaDollarSign,
  FaLink,
  FaRocket,
  FaSitemap,
  FaUserFriends,
  FaUsers,
  FaWallet
} from "react-icons/fa";
import { useQuery } from "react-query";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint, frontend } from "../utils/APIRoutes";
import Account from "./pages/Account";
import CappingPieChart from "./pages/CappingChart";

const Dashboard = () => {

  const { data } = useQuery(
    ["get_dashboard"],
    () => apiConnectorGet(endpoint?.dashboard_data),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const dashboard = data?.data?.result;

  const { data: profile } = useQuery(
    ["get_profile"],
    () => apiConnectorGet(endpoint?.profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const user_profile = profile?.data?.result;
  const Row = ({ label, value, highlight = false, color = "text-yellow-400" }) => (
    <div className="flex justify-between pb-1">
      <span className="text-white">{label}</span>
      <span className={highlight ? `${color} font-semibold` : "text-white"}>{value}</span>
    </div>
  );
  const statCards = [
    { title: "Main Wallet", value: Number(user_profile?.or_m_income_wallet || 0)?.toFixed(2), icon: <FaWallet /> },
    { title: "Fund Wallet", value: Number(user_profile?.or_m_fund_wallet || 0)?.toFixed(2), icon: <FaChartLine /> },
    { title: "Sponsor Income", value: Number(dashboard?.directinc || 0)?.toFixed(2), icon: <FaDollarSign /> },
    { title: "Level Income", value: Number(dashboard?.levelinc || 0)?.toFixed(2), icon: <FaChartLine /> },
    { title: "ROI Income", value: Number(dashboard?.satcking_bonus || 0)?.toFixed(2), icon: <FaRocket /> },
    { title: "Total Income", value: Number(user_profile?.or_m_total_income || 0)?.toFixed(2), icon: <FaDollarSign /> },
    { title: "Total Team", value: Number(dashboard?.tot_left || 0)?.toFixed(2), icon: <FaUsers /> },
    { title: "Total Team Business", value: Number(dashboard?.tot_left_t || 0)?.toFixed(2), icon: <FaSitemap /> },
    { title: "Direct / Referral", value: Number(dashboard?.tot_d_left || 0)?.toFixed(2), icon: <FaUserFriends /> },
    { title: "Total Direct Business", value: Number(dashboard?.tot_d_left_t || 0)?.toFixed(2), icon: <FaUserFriends /> },
    { title: "Withdrawal", value: Number(dashboard?.withdrawal || 0)?.toFixed(2), icon: <FaUserFriends /> },
    { title: "Withdrawal Pending", value: Number(dashboard?.withdrawal_pending || 0)?.toFixed(2), icon: <FaUserFriends /> },
  ];
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!", { id: 1 });
  };
  return (
    <div className="lg:flex h-screen font-sans bg-[#f1f5f9]">
      <main className="flex-1 overflow-y-auto max-h-screen example">
        <div className="flex flex-wrap gap-4 lg:p-6 py-6">
          <div className="w-full md:w-[calc(50%-0.5rem)] bg-[#1e293b] text-white p-4 py-6 rounded shadow">
            <h2 className="font-bold mb-2 flex items-center gap-2">
              <FaLink /> [ Rank Participant ] Referral Link
            </h2>
            <div className="flex items-center justify-between bg-gold-color text-black p-2 rounded">
              <span className="text-sm overflow-x-auto">
                {frontend}/register?referral_id={user_profile?.Login_Id}
              </span>
              <button
                onClick={() => functionTOCopy(frontend + "/register?referral_id=" + user_profile?.Login_Id)}
                className="bg-dark-color text-white px-2 py-1 rounded text-sm">Copy</button>
            </div>
            <div className="flex space-x-4 mt-3 text-xl">
              <i className="fab fa-whatsapp"></i>
              <i className="fab fa-telegram"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
            </div>
          </div>

          <div className="w-full md:w-[calc(50%-0.5rem)] bg-[#1e293b] text-white p-4 rounded shadow">
            <Row label="Email" value={user_profile?.Email} highlight />
            <Row label="Mobile No" value={user_profile?.Mobile_No} highlight color="text-green-400" />
            <Row label="Activation Date" value={user_profile?.TOPDATE} highlight color="text-green-400" />
            <Row
              label="TopUp Amount"
              value={
                user_profile?.or_m_topup_type === "Real Topup"
                  ? `$ ${user_profile?.Topup_amt}`
                  : user_profile?.or_m_topup_type === "Special Topup" ?
                    "Special Topup"
                    : user_profile?.or_m_topup_type === "Not Topup" &&
                    " ---"
              }
              highlight
              color="text-green-400"
            />

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-6 pb-6">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-gold-color text-black p-6 rounded-xl shadow flex items-center justify-between "
            >
              <div className="text-2xl">{card.icon}</div>
              <div>
                <div className="text-sm font-normal">{card.title}</div>
                <div className="text-xl font-bold">{card.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Account />
          {/* <CappingPieChart/> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
