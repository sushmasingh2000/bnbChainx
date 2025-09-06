import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/APIConnector";
import { endpoint } from "../../../utils/APIRoutes";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Fund = () => {
  const [amount, setAmount] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const client = useQueryClient();
  const navigate = useNavigate();
  const handleFundRequestSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !receiptFile) {
      toast("Please enter amount and upload receipt.");
      return;
    }
    try {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file); // includes prefix
          reader.onload = () => resolve(reader.result); // send full data URL
          reader.onerror = (error) => reject(error);
        });

      const receiptBase64 = await toBase64(receiptFile);
      const payload = {
        tr09_req_amount: amount,
        tr09_req_curr_type: 2,
        tr09_req_recipt: receiptBase64,
      };
      const res = await apiConnectorPost(
        endpoint?.add_user_fund_request,
        payload
      );
      toast(res.data?.message);
      if (res.data?.message === "Request Successfully Done") {
        navigate("/fund-tranfer");
        client.refetchQueries("get_fund_request");
        setAmount("");
        setReceiptFile(null);
      } else {
        toast(res.data?.message || "Failed to submit fund request.");
      }
    } catch (err) {
      console.error("Error submitting fund request:", err);
      toast("Something went wrong while submitting the fund request.");
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(address?.m39_add || "")
      .then(() => toast("Wallet Address copied to clipboard!"))
      .catch((err) => console.error("Failed to copy address:", err));
  };

  const { data } = useQuery(
    ["get_address_user"],
    () => apiConnectorGet(endpoint?.get_user_upload_qr),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.error("Error fetching level data:", err),
    }
  );

  const address = data?.data?.result || {};

  return (
    <div className="p-2 min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white border border-gray-700 ">
        <div className="flex flex-col md:flex-row gap-10 w-full">
          <form
            onSubmit={handleFundRequestSubmit}
            className="flex flex-col gap-4 w-full "
          >
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-sm font-medium text-gray-300 mb-1"
              >
                Crypto Address
              </label>
              <input
                value={address?.m39_coin || ""}
                readOnly
                className="bg-gray-700 border border-gray-600 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fundAmount"
                className="text-sm font-medium text-gray-300 mb-1"
              >
                Amount($)<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="fundAmount"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-700 border border-gray-600 py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="receipt"
                className="text-sm font-medium text-gray-300 mb-1"
              >
                Receipt
              </label>
              <label className="bg-gray-700 text-white border border-gray-600 py-2 px-3 cursor-pointer hover:bg-gray-600 block text-center">
                {receiptFile ? receiptFile.name : "Choose File"}
                <input
                  type="file"
                  id="receipt"
                  onChange={(e) => setReceiptFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-gray-900 font-semibold hover:bg-gold-color focus:outline-none focus:ring-2 focus:ring-green-500 self-end"
            >
              Submit
            </button>
          </form>

          <div className="bg-gray-700 p-4 flex flex-col items-start w-full  rounded-md">
            <label
              htmlFor="walletAddressDisplay"
              className="text-sm font-medium text-gray-300 mb-2"
            >
              QR Address <span className="text-red-500">*</span>
            </label>
            <img
              src={address?.m39_qr}
              alt=""
              className="p-4 w-[250px] h-[250px]"
            />
            <label
              htmlFor="walletAddressDisplay"
              className="text-sm font-medium text-gray-300 mb-2"
            >
              Wallet Address <span className="text-red-500">*</span>
            </label>
            <div className="flex w-full items-center">
              <input
                type="text"
                id="walletAddressDisplay"
                value={address?.m39_add || ""}
                readOnly
                className="flex-grow bg-gray-600 text-white border border-gray-500 rounded-md py-2 px-3 text-sm cursor-text focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleCopyAddress}
              className="mt-3 px-4 py-1 text-sm bg-green-500 text-black rounded hover:bg-gold-color transition"
            >
              Copy Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fund;
