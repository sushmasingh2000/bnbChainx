import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../assets/favicon.png";
import body from "../assets/body-bg.png";
import { endpoint } from "../utils/APIRoutes";
import Loader from "../Shared/Loader";
import Tilt from "react-parallax-tilt";

const Login = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // async function requestAccount() {
  //   setLoading(true);
  //   if (window.ethereum) {
  //     try {
  //       await window.ethereum.request({
  //         method: "wallet_switchEthereumChain",
  //         params: [{ chainId: "0x38" }], // Chain ID for Binance Smart Chain Mainnet
  //       });
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       const userAccount = accounts[0];
  //       const reqBody = { wallet_address: userAccount };
  //       const response = await axios.post(endpoint?.wallet_api, reqBody);
  //       if (response?.data?.message === "Wallet Address Not Found") {
  //         navigate("/register");
  //       }
  //       setWalletAddress(userAccount);
  //       setLoading(false);
  //     } catch (error) {
  //       toast.error("Error connecting to wallet.");
  //       setLoading(false);
  //     }
  //   } else {
  //     toast.error("MetaMask not detected.");
  //     setLoading(false);
  //   }
  // }

  // const WalletAvailabilityCheckFn = async () => {
  //   if (!walletAddress) {
  //     toast.error("Please connect your wallet first.");
  //     return false;
  //   }
  //   setLoading(true);
  //   const reqBody = { wallet_address: walletAddress };
  //   try {
  //     const response = await axios.post(endpoint?.wallet_api, reqBody);
  //     toast(response?.data?.message);
  //     setLoading(false);
  //     if (response?.data?.message === "Wallet Address Not Found") {
  //       navigate("/register");
  //       return false;
  //     }
  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Error checking wallet availability.");
  //     setLoading(false);
  //     return false;
  //   }
  // };

  const initialValues = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // const isWalletAvailable = await WalletAvailabilityCheckFn();
      // if (isWalletAvailable) {
      const reqBody = {
        username: values.username,
        password: values.password,
      };
      loginFn(reqBody);
      // }
    },
  });

  const loginFn = async (reqBody) => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint?.login_api, reqBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      toast(response?.data?.message);
      setLoading(false);
      if (response?.data?.message === "Login Successfully") {
        localStorage.setItem("logindataen", response?.data?.result?.[0]?.token);
        navigate("/dashboard");
        window.location.reload();
        // if (response?.data?.result?.[0]?.user_type === "Admin") {
        //   navigate("/admindashboard");
        //   window.location.reload();
        // } else {
        //   if (response?.data?.result?.[0]?.user_type === "User") {
        //     navigate("/dashboard");
        //     window.location.reload();
        //   }
        // }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error during login.");
      setLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={loading} />
      <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${body})`, // Use the imported variable here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
          <div
           className="w-full max-w-lg lg:p-6 p-4 border-border-color-green border rounded-xl shadow-2xl"
            // style={{
            //   backgroundImage:
            //     "linear-gradient(225deg, rgba(0, 170, 216, 1) 0%, rgba(20, 20, 20, 1) 61%)",
            // }}
          >
            <div className="flex justify-center my-2">
              <img src={logo} alt="Logo" className="h-20  " />
            </div>
            <h2 className="text-xl font-bold text-center text-white mb-6">
              Login to Your Account
            </h2>
            {/* <button
              style={{
                backgroundImage:
                  "linear-gradient(225deg, rgba(0, 170, 216, 1) 0%, rgba(20, 20, 20, 1) 61%)",
              }}
              className="w-full py-3 text-white border-2 border-[#008eff] font-semibold rounded-full hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition duration-300 ease-in-out transform hover:scale-105"
              onClick={requestAccount}
            >
              Connect Your Wallet
            </button> */}
            {/* <div className="flex flex-wrap gap-2 items-center justify-center text-white">
              <span className="font-bold">Address:</span>
              <span className="text-sm">{walletAddress}</span>
            </div> */}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <input
                  placeholder="Username"
                  type="text"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008eff] transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  placeholder="Password"
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008eff] transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>
              <button
                type="submit"
                // style={{
                //   backgroundImage:
                //     "linear-gradient(225deg, rgba(0, 170, 216, 1) 0%, rgba(20, 20, 20, 1) 61%)",
                // }}
                className="w-full py-3 text-white border-2 border-border-color-green font-semibold rounded-full hover:bg-black bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>
            </form>
            <div className="">
              <p className="text-white text-sm text-right py-2 mx-4 hover:underline cursor-pointer" 
              onClick={()=>navigate('/forgot')}>Forget Password ?</p>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">
                Don't have an account?{" "}
                <span
                  className="text-white cursor-pointer hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
      
      </div>
    </>
  );
};

export default Login;
