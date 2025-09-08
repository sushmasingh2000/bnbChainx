import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Loader from "../../Shared/Loader";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { enCryptData } from "../../utils/Secret";
import { Wallet } from "@mui/icons-material";
import { useQuery } from "react-query";
function Payout() {
  // const [walletAddress, setWalletAddress] = useState("");
  const [data, setData] = useState("");
  const [loding, setLoding] = useState(false);
  const location = useLocation();

  const [userData, setUserData] = useState();

  // console.log(userData, "wghsfhdsxgqf");

  const params = new URLSearchParams(location?.search);
  const IdParam = params?.get("token");
  const base64String = atob(IdParam);
  const withdrawalType = location.state?.type;
  const fk = useFormik({
    initialValues: {
      amount: "",
      walletAddress: userData?.lgn_wallet_add || "",
    },
    enableReinitialize: true,
  });

  async function Payout() {
    const reqbody = {
      wallet_add: String(fk.values.walletAddress)?.trim(),
      amount: Number(fk.values.amount)?.toFixed(3),
      wallet_type:
        withdrawalType === "jackpot" ? 3 : withdrawalType === "wingo" ? 4 : 2,
    };
    if (fk.values.amount === "" || Number(fk.values.amount) < 2)
      return toast("Amount should be grater or equal to 2$", { id: 1 });
    if (!fk.values.walletAddress)
      return toast("Please Update Your Profile before withdrawal request.", {
        id: 1,
      });
    setLoding(true);

    try {
      const res = await apiConnectorPost(
        endpoint?.withdrawal_api,
        {
          payload: enCryptData(reqbody),
        },
        base64String
      );
      setData(res?.data?.result?.[0]);
      alert(res?.data?.message);
      fk.handleReset();
      if (String(res?.data?.success) === "true") {
        GetWalletUserData();
      }
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  async function GetWalletUserData() {
    setLoding(true);
    try {
      const res = await apiConnectorGet(
        endpoint?.wallet_user_data,
        {},
        base64String
      );
      setUserData(res?.data?.result?.[0]);
      // toast(res?.data?.message);
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  useEffect(() => {
    GetWalletUserData();
  }, []);

  // const { data: profile_data } = useQuery(
  //   ["profile_api"],
  //   () => apiConnectorGetWithoutToken(endpoint?.profile_api,{},base64String),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     retry: false,
  //     retryOnMount: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );
  // const profile = profile_data?.data?.result || [];
  // console.log(userData);

  const { data: profile, refetch: refetchProfile } = useQuery( // Added refetch
    ["get_profile"],
    () => apiConnectorGet(endpoint?.profile_api),
    {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    }
);
const user_profile = profile?.data?.result?.[0] || [];
  
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <Loader isLoading={loding} />
  
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6  ">
        {/* Icon */}
        {/* <div className="flex justify-center mb-6">
          <Wallet
            className="text-gold-color"
            fontSize="large"
            style={{ fontSize: 60 }}
          />
        </div> */}
  
        {/* Balance Info */}
        <div className="bg-gray-800 p-4  mb-4 border border-gold-color">
          <div className="text-gold-color text-sm font-semibold mb-1">
           Current Balance
          </div>
          <div className="text-green-400 text-xl font-bold">
            {user_profile?.jnr_curr_wallet}
            USD
          </div>
        </div>
  
        {/* Wallet Address Display */}
        <div className="mb-4 text-sm bg-gray-800 text-white p-3  border border-gold-color">
          <div className="font-medium text-gold-color">Address:</div>
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-gold-color to-orange-500 font-semibold break-all text-xs mt-1">
            {fk.values.walletAddress}
          </div>
        </div>
  
        {/* Amount Input */}
        <div className="mb-4">
          <label htmlFor="amount" className="text-sm  font-medium mb-1 block">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter Amount"
            value={fk.values.amount}
            onChange={fk.handleChange}
            className="w-full p-2 text-sm  bg-gray-700 text-white border border-gold-color focus:ring focus:ring-yellow-300 outline-none"
          />
        </div>
  
        {/* Wallet Address Input (read-only) */}
        <div className="mb-4">
          <label htmlFor="walletAddress" className="text-xs  font-medium mb-1 block">
            Confirm Wallet Address (BEP20)
          </label>
          <input
            id="walletAddress"
            name="walletAddress"
            readOnly
            placeholder="0x..."
            value={fk.values.walletAddress}
            className="w-full p-2 text-xs font-semibold  bg-gray-800 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-gold-color border border-gold-color outline-none"
          />
        </div>
  
        {/* Confirm Button */}
        <button
          onClick={Payout}
          className="w-full py-2 mt-2 rounded-full bg-gold-color text-black font-semibold text-sm hover:bg-white transition"
        >
          Confirm
        </button>
  
        {/* Note */}
        <div className="text-xs text-red-400 mt-4 p-3 bg-gray-800 rounded-md border border-red-300">
          <strong>Note:</strong> Please ensure that your wallet address is BEP20 Network (Format: 0x..). You will be responsible for any incorrect entries.
        </div>
      </div>
    </div>
  );
  
}
export default Payout;
