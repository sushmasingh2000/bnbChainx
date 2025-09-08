import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box } from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Loader from "../../../Shared/Loader";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/APIConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { deCryptData, enCryptData } from "../../../utils/Secret";
const tokenABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function deposit(uint256 usdtAmount, uint256 fstAmount) external",
  "function burnToken(address token, address user, uint256 amount) external",
  "function checkAllowance(address token, address user) external view returns (uint256)",
  "event Deposited(address indexed user, uint256 usdtAmount, uint256 fstAmount)",
  "event TokenBurned(address indexed user, uint256 amount)",
];

function ActivationWithFSTAndPull() {
  const [walletAddress, setWalletAddress] = useState("");
  const [no_of_Tokne, setno_of_Tokne] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [receiptStatus, setReceiptStatus] = useState("");
  const [bnb, setBnb] = useState("");

  const [gasprice, setGasPrice] = useState("");
  const [loding, setLoding] = useState(false);
  // const location = useLocation();
  // const params = new URLSearchParams(location?.search);
  // const IdParam = params?.get("token");
  // const base64String = decr?.trim();
  //  atob(IdParam);
  // const { data: general_address } = useQuery(
  //   ["contract_address_api_activation"],
  //   () => apiConnectorGet(endpoint?.general_contact_address_api),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     retry: false,
  //     retryOnMount: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );
  // const address = deCryptData(general_address?.data?.result)?.[0] || [];
  // const dollar_percent = 100;

  const fk = useFormik({
    initialValues: {
      inr_value: "",
    },
  });
  async function requestAccount() {
    setLoding(true);

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }], // Chain ID for Binance Smart Chain Mainnet
        });
        const userAccount = accounts[0];
        setWalletAddress(userAccount);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const nativeBalance = await provider.getBalance(userAccount);
        setBnb(ethers.utils.formatEther(nativeBalance));
        const tokenContract = new ethers.Contract(
          "0x55d398326f99059fF775485246999027B3197955",
          tokenABI,
          provider
        );
        const tokenBalance = await tokenContract.balanceOf(userAccount);
        setno_of_Tokne(ethers.utils.formatUnits(tokenBalance, 18));
      } catch (error) {
        console.log(error);
        toast("Error connecting...", error);
      }
    } else {
      toast("MetaMask not detected.");
    }
    setLoding(false);
  }

  async function sendTokenTransaction() {
    if (!window.ethereum) return toast("MetaMask not detected");
    if (!walletAddress) return toast("Please connect your wallet.");
    if (
      Number(fk.values.inr_value) < 5 ||
      Number(fk.values.inr_value) > 1000
    ) {
      toast("Please Enter an amount between $5 and $1000");
      return;
    }

    try {
      setLoding(true);

      // ✅ Switch to BSC Mainnet
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      const usdAmount = Number(fk.values.inr_value || 0);

      // ✅ Get latest BNB price (CoinGecko + fallback Binance)
      async function getBNBPriceInUSDT() {
        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
          );
          const data = await response.json();
          if (data?.binancecoin?.usd) return data.binancecoin.usd;
        } catch {}
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"
        );
        const data = await response.json();
        return parseFloat(data.price);
      }

      const bnbPrice = await getBNBPriceInUSDT();
      const bnbAmount = usdAmount / bnbPrice;

      const dummyData = await PayinZpDummy(bnbPrice);
      if (!dummyData?.success || !dummyData?.last_id) {
        setLoding(false);
        return alert(dummyData?.message || "Server error");
      }
      const last_id = Number(dummyData.last_id);

      // ✅ Convert to BigNumber
      const bnbValue = ethers.utils.parseEther(bnbAmount.toFixed(8));

      // ✅ Contract
      const mainContract = new ethers.Contract(
        "0x74e28f9ec75029cc2c106af8cbe5f0d4288f42e3", // your deployed contract
        ["function deposit() external payable"], // only deposit needed
        signer
      );

      // 🔍 Balance Check
      const bnbBalance = await provider.getBalance(userAddress);
      if (bnbBalance.lt(bnbValue)) {
        setLoding(false);
        return toast("Insufficient BNB balance.");
      }

      // ⛽ Estimate Gas
      const gasEstimate = await mainContract.estimateGas.deposit({
        value: bnbValue,
      });
      const gasPrice = await provider.getGasPrice();
      const gasCost = gasEstimate.mul(gasPrice);

      if (bnbBalance.lt(gasCost.add(bnbValue))) {
        setLoding(false);
        return toast(
          `Not enough BNB for gas. Need ~${ethers.utils.formatEther(
            gasCost
          )} extra BNB`
        );
      }

      // 🚀 Send Deposit Transaction
      const tx = await mainContract.deposit({
        value: bnbValue,
      });
      const receipt = await tx.wait();

      setTransactionHash(tx.hash);
      setReceiptStatus(receipt.status === 1 ? "Success" : "Failure");

      if (receipt.status === 1) {
        toast("Transaction successful!");
      } else {
        toast("Transaction failed!");
      }

      await PayinZp(bnbPrice, tx.hash, receipt.status === 1 ? 2 : 3, last_id);
    } catch (error) {
      console.error(error);
      if (error?.data?.message) {
        toast(error.data.message);
      } else if (error?.reason) {
        toast(error.reason);
      } else {
        toast("BNB transaction failed.");
      }
    } finally {
      setLoding(false);
    }
  }

  async function PayinZp(bnbPrice, tr_hash, status, id) {
    setLoding(true);

    const reqbody = {
      req_amount: fk.values.inr_value,
      u_user_wallet_address: walletAddress,
      u_transaction_hash: tr_hash,
      u_trans_status: status,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: bnbPrice,
      pkg_id: "1",
      last_id: id,
    };
    try {
      const res = await apiConnectorPost(
        endpoint?.paying_api,
        {
          payload: enCryptData(reqbody),
        }
        // base64String
      );
      toast(res?.data?.message);
      fk.handleReset();
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  async function PayinZpDummy(bnbPrice) {
    
    
    const reqbody = {
      req_amount: fk.values.inr_value,
      u_user_wallet_address: walletAddress,
      u_transaction_hash: "xxxxxxxxxx",
      u_trans_status: 1,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: bnbPrice,
      pkg_id: "1",
      deposit_type: "Mlm",
    };

    try {
      const res = await apiConnectorPost(
        endpoint?.paying_dummy_api,
        {
          payload: enCryptData(reqbody),
        }
        // base64String
      );
      return res?.data || {};
    } catch (e) {
      console.log(e);
      console.log(e);
    }
  }

  return (
    <>
      <Loader isLoading={loding} />

      <div className="py-10 bg-gray-900 flex items-center justify-center p-4">
        <Box className="w-full max-w-md bg-gray-800 p-5 rounded-xl shadow-lg ">
          {/* Wallet Icon */}
          {/* <div className="flex justify-center mb-4">
      <AccountBalanceIcon className="text-gold-color" style={{ fontSize: 60 }} />
    </div> */}

          {/* Connect Wallet Button */}
          <button
            className="w-full bg-gold-color text-black font-semibold py-2 rounded mb-4 hover:bg-white transition"
            onClick={requestAccount}
          >
            Connect Your Wallet
          </button>

          {/* Wallet Info */}
          <div className="bg-gray-700 p-4 rounded-lg text-sm text-white mb-4">
            <div className="mb-2">
              <p className="font-semibold text-gold-color text-center pb-1">Address</p>

              <p className="break-all text-center">
                {walletAddress?.substring(0, 10)}...
                {walletAddress?.substring(walletAddress?.length - 10)}
              </p>
            </div>

            {/* <p className="font-semibold text-gold-color mt-2 mb-1">
              Wallet Balance:
            </p>
            <div className="flex justify-between mb-1">
              <span className="text-gold-color font-medium">BNB:</span>
              <span>{bnb}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gold-color font-medium">USDT (BEP20):</span>
              <span>{Number(no_of_Tokne || 0)?.toFixed(4)}</span>
            </div> */}
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <input
              placeholder="Enter Amount"
              id="inr_value"
              name="inr_value"
              value={fk.values.inr_value}
              onChange={fk.handleChange}
              className="w-full p-2 text-sm rounded-md bg-gray-700 text-white  focus:ring focus:ring-yellow-300 outline-none"
            />
          </div>

          {/* Confirm Button */}
          <button
            className="w-full bg-gold-color text-black font-semibold py-2 rounded-full hover:bg-white transition"
            onClick={sendTokenTransaction}
          >
            Confirm
          </button>

          {/* Transaction Info */}
          <div className="bg-gray-700 p-4 mt-4 rounded-lg text-xs text-white ">
            <div className="mb-2">
              <p className="font-semibold text-gold-color">Transaction Hash:</p>
              <p className="break-words">{transactionHash}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gold-color">Gas Price:</p>
              <p className="font-semibold">{gasprice}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gold-color">Transaction Status:</p>
              <p className="font-semibold">{receiptStatus}</p>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
export default ActivationWithFSTAndPull;
