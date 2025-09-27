import copy from "copy-to-clipboard";
import moment from "moment";
import toast from "react-hot-toast";
import {
  FaChartLine,
  FaDollarSign,
  FaLink,
  FaRocket,
  FaWallet,
} from "react-icons/fa";
import { useQuery } from "react-query";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint, frontend, support_mail } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { Mail } from "@mui/icons-material";

const Dashboard = () => {
  const { data: dashboard_Api, isLoading } = useQuery(
    ["dashboard_api"],
    () => apiConnectorGet(endpoint?.user_dashboard_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const dashboard = dashboard_Api?.data?.result?.[0] || [];

  const { data: profile_data, isLoading: profileloading } = useQuery(
    ["profile_api"],
    () => apiConnectorGet(endpoint?.profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const user_profile = profile_data?.data?.result?.[0] || [];

  const Row = ({
    label,
    value,
    highlight = false,
    color = "text-yellow-400",
  }) => (
    <div className="flex justify-between pb-1">
      <span className="text-white">{label}</span>
      <span className={highlight ? `${color} font-semibold` : "text-white"}>
        {value}
      </span>
    </div>
  );
  const statCards = [
    {
      path: "#",
      title: "Main Wallet",
      value: Number(user_profile?.jnr_curr_wallet || 0)?.toFixed(2),
      icon: <FaWallet />,
    },
    {
      path: "/activation",
      title: "Fund Wallet",
      value: Number(user_profile?.topup_amount || 0)?.toFixed(2),
      icon: <FaChartLine />,
    },
    {
      path: "/income/direct",
      title: "Upline Income",
      value: Number(dashboard?.direct || 0)?.toFixed(2),
      icon: <FaDollarSign />,
    },
    {
      path: "/income/level",
      title: "Level Income",
      value: Number(dashboard?.level || 0)?.toFixed(2),
      icon: <FaChartLine />,
    },
    {
      path: "/income/roi",
      title: "ROI Income",
      value: Number(dashboard?.roi_income || 0)?.toFixed(2),
      icon: <FaRocket />,
    },
    {
      path: "/income/reward",
      title: "Reward Bonus",
      value: Number(dashboard?.reward_bonus || 0)?.toFixed(2),
      icon: <FaRocket />,
    },
    {
      path: "#",
      title: "Total Income",
      value: Number(user_profile?.total_income || 0)?.toFixed(2),
      icon: <FaDollarSign />,
    },
  ];
  const functionTOCopy = (value) => {
    copy(value);
    toast.success("Copied to clipboard!", { id: 1 });
  };

  const navigate = useNavigate();

  return (
    <div className="lg:flex h-screen font-sans bg-[#f1f5f9]">
      <Loader isLoading={isLoading || profileloading} />
      <main className="flex-1 overflow-y-auto max-h-screen example">
        <div className="flex flex-wrap gap-4 lg:p-6 py-6">
          <div className="w-full md:w-[calc(50%-0.5rem)] bg-[#1e293b] text-white p-4 py-6 rounded shadow">
            <h2 className="font-bold mb-2 flex items-center gap-2">
              <FaLink /> [ Rank Participant ] Referral Link
            </h2>
            <div className="flex items-center justify-between bg-gold-color text-black p-2 rounded">
              <span className="text-sm text-blue-600 overflow-x-auto">
                {frontend + `/login?startapp=${user_profile?.lgn_cust_id}`}
              </span>

              <button
                onClick={() =>
                  functionTOCopy(
                    frontend + "/login?startapp=" + user_profile?.lgn_cust_id
                  )
                }
                className="bg-dark-color text-white px-2 py-1 rounded text-sm"
              >
                Copy
              </button>
            </div>
            <div className="flex space-x-4 mt-3 text-sm items-center">
              <Mail onClick={() => functionTOCopy(support_mail)} />{" "}
              <span className="!text-[11px]" onClick={() => functionTOCopy(support_mail)}>{support_mail}</span>
              {/* <i className="fab fa-mail"></i>
              <i className="fab fa-telegram"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i> */}
            </div>
          </div>

          <div className="w-full md:w-[calc(50%-0.5rem)] bg-[#1e293b] text-white p-4 rounded shadow">
            <Row label="Wallet Address " highlight />

            <p className="text-green-400 pb-1 text-[10px]">
              {user_profile?.lgn_email}
            </p>
            <Row
              label="Subscriber Id"
              value={user_profile?.lgn_cust_id || "--"}
              highlight
              color="text-green-400"
            />
            <Row
              label="Activation Date"
              value={
                user_profile?.topup_date
                  ? moment(user_profile?.topup_date)?.format("DD-MM-YYYY")
                  : "--"
              }
              highlight
              color="text-green-400"
            />
            <Row
              label="TopUp Amount"
              value={user_profile?.topup_amount || "--"}
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
              onClick={() => navigate(card?.path)}
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
          {/* <Account /> */}
          {/* <CappingPieChart/> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
