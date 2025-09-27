import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { apiConnectorPost } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { deCryptData, enCryptData } from "../../utils/Secret";
import Swal from "sweetalert2";
import Loader from "../../Shared/Loader";

const ClaimTopUp = () => {
  const [loding, setloding] = useState(false);

  const initialValue = {
    hash_number: "",
    // description: "",
    req_amount: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (!fk.values.hash_number || !fk.values.req_amount)
        return toast("Please Enter All Fields ");
      FundAdd(fk.values);
    },
  });

  async function FundAdd(reqBody) {
    const req = {
      //   description: reqBody?.description,
      hash_address: reqBody?.hash_number,
      req_amount: reqBody?.req_amount,
    };
    setloding(true);
    try {
      const res = await apiConnectorPost(endpoint.check_real_transaction, {
        payload: enCryptData(req),
      });
      Swal.fire({
        icon: res?.data?.success ? "success" : "error",
        title: res?.data?.success ? "Success" : "Error",
        text: res?.data?.msg || "Something happened",
      });

      if (res?.data?.success) {
        fk.handleReset();
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }

  return (
    <>
      <Loader isLoading={loding} />
      <div className="!flex justify-center items-center w-full bg-gray-900">
        <div className="px-5  w-full lg:w-[50%] bg-gray-800  !text-white lg:!my-20 py-4 !rounded-lg">
          <p className="!text-center font-bold !py-4  text-lg">Claim TopUp </p>
          <div className="grid grid-cols-1 gap-[6%]  gap-y-4">
            {/* <div>
              <p className="font-bold  ">Description </p>
              <input
             className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                fullWidth
                id="description"
                name="description"
                placeholder="Description"
                value={fk.values.description}
                onChange={fk.handleChange}
              />
            </div> */}
            <div>
              <div>
                <p className="font-bold"> Amount</p>
                <input
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  fullWidth
                  id="req_amount"
                  name="req_amount"
                  placeholder="Enter Amount"
                  value={fk.values.req_amount}
                  onChange={fk.handleChange}
                />
              </div>
              <p className="font-bold mt-2"> Hash Address</p>
              <textarea
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={4}
                id="hash_number"
                name="hash_number"
                placeholder="Enter Hash Address"
                value={fk.values.hash_number}
                onChange={fk.handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 !mt-5">
            <Button
              onClick={() => fk.handleReset()}
              variant="contained"
              className="!bg-[#E74C3C]"
            >
              Clear
            </Button>
            <Button
              onClick={() => fk.handleSubmit()}
              variant="contained"
              className="!bg-[#6d6fed]"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimTopUp;
