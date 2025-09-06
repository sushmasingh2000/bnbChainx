import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { endpoint } from "../utils/APIRoutes";
import logo from "../assets/favicon.png";
import { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import { apiConnectorPost } from "../utils/APIConnector";
import body from "../assets/body-bg.png";


const Registration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referralId = searchParams.get("referral_id");
  const [data, setData] = useState("");
  // const [walletAddress, setWalletAddress] = useState("");
  const [loding, setLoading] = useState(false);
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
  //       setWalletAddress(userAccount);
  //       setLoading(false);
  //     } catch (error) {
  //       toast("Error connecting...", error);
  //       setLoading(false);
  //     }
  //   } else {
  //     toast("MetaMask not detected.");
  //     setLoading(false);
  //   }
  // }

  const initialValue = {
    full_name: "",
    email: "",
    mobile: "",
    password: "",
    referral_id: referralId || "",
  };
  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,

    onSubmit: () => {
      const reqbody = {
        // wallet_address: walletAddress,
        full_name: fk.values.full_name,
        email: fk.values.email,
        mobile: fk.values.mobile,
        password: fk.values.password,
        referral_id: fk.values.referral_id,
      };
      RegistrationFn(reqbody);
    },
  });
  const RegistrationFn = async (reqbody) => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint?.registration_api, reqbody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      toast(response?.data?.message);
      setLoading(false);
      if (response?.data?.message === "Registration Successfully") {
        fk.handleReset();
        localStorage.setItem("logindataen", response?.data?.result?.[0]?.token);
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const Customerfunction = async () => {
    const reqbody = {
      user_id: fk.values.referral_id,
    };
    try {
      const res = await apiConnectorPost(endpoint?.customer_api, reqbody);
      setData(res?.data?.result?.[0]);
    } catch (e) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    Customerfunction();
  }, [fk.values.referral_id]);

  return (
    <>
      <Loader isLoading={loding} />
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
            <img src={logo} alt="Logo" className="h-14 w-16" />
          </div>
          <h2 className="text-sm font-bold text-center text-white mb-6">
            You might have already account ?
            <span
              className="text-black text-sm px-2 font-bold underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </h2>
          {/* <button
              style={{
                backgroundImage:
                  "linear-gradient(225deg, rgba(0, 170, 216, 1) 0%, rgba(20, 20, 20, 1) 61%)",
              }}
              className="w-full py-3 text-white border-2 border-border-color-green font-semibold rounded-full hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition duration-300 ease-in-out transform hover:scale-105"
              onClick={requestAccount}
            >
              Connect Your Wallet
            </button>
            <div className="flex flex-wrap gap-2 items-center justify-center !text-white">
              <span className="!font-bold">Address : </span>{" "}
              <span className="!text-sm"> {walletAddress} </span>
            </div> */}
          <form onSubmit={fk.handleSubmit}>
            <div className="grid grid-cols-2 place-items-center gap-2">
              <div className="mb-4">
                <input
                  placeholder="Email Id"
                  type="email"
                  id="email"
                  name="email"
                  value={fk.values.email}
                  onChange={fk.handleChange}
                  className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-border-color-green transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  placeholder="Full Name"
                  id="full_name"
                  name="full_name"
                  value={fk.values.full_name}
                  onChange={fk.handleChange}
                  className="w-full p-3 mt-1 border text-black placeholder:text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-border-color-green transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  placeholder="Mobile"
                  id="mobile"
                  name="mobile"
                  value={fk.values.mobile}
                  onChange={fk.handleChange}
                  className="w-full p-3 mt-1 border text-black placeholder:text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-border-color-green transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  placeholder="Refferral Id"
                  id="referral_id"
                  name="referral_id"
                  value={fk.values.referral_id}
                  onChange={fk.handleChange}
                  className="w-full p-3 mt-1 border text-black placeholder:text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-border-color-green transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
                <span className="text-white !px-2">{data?.jnr_name}</span>
              </div>
              <div className="mb-6">
                <input
                  placeholder="Password"
                  id="password"
                  value={fk.values.password}
                  onChange={fk.handleChange}
                  className="w-full p-3 mt-1 border text-black placeholder:text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-border-color-green transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>
            </div>


            <button
              type="submit"
              // style={{
              //   backgroundImage:
              //     "linear-gradient(225deg, rgba(0, 170, 216, 1) 0%, rgba(20, 20, 20, 1) 61%)",
              // }}
              className="w-full py-3 text-white border-2 border-border-color-green font-semibold rounded-full hover:bg-black bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition duration-300 ease-in-out transform hover:scale-105"
              onClick={fk.handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
