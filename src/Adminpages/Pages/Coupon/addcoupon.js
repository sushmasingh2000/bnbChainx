import { Button, Checkbox, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";

const AddCoupon = () => {
  const [loding, setloding] = useState(false);
  const navigate = useNavigate();
  const client = useQueryClient();

  const initialValue = {
    coupon_limit: "",
    coupon_code: "",
    coupon_amount: "",
    isCheckedForPrediction: "1",
  };

  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      adduserCoupon(fk.values);
    },
  });

  async function adduserCoupon(reqBody) {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS.add_coupon, reqBody);
      toast.success(res?.data?.msg);
      if (res?.data?.msg === "Coupon Added Successfully") {
        client.refetchQueries("coupon");
        navigate("/coupon");
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }

  if (loding)
    return (
      <div className="w-[100%] h-[100%] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  return (
    <div className="!flex justify-center items-center w-full">
      <div className="p-5  lg:w-1/2 md:w-3/4 w-full bg-white !bg-opacity-30 rounded-lg">
        <p className="!text-center font-bold !py-4 !pb-10 text-lg">
          Add Coupon
        </p>
        <div className="grid grid-cols-1  gap-[6%] gap-y-4">
          <div>
            <p className="font-bold">Coupon Code</p>
            <TextField
              fullWidth
              id="coupon_code"
              name="coupon_code"
              placeholder="Coupon Code"
              value={fk.values.coupon_code}
              onChange={fk.handleChange}
            />
            {/* {fk.touched.referral_user_id && fk.errors.referral_user_id && (
            <div className="error">{fk.errors.referral_user_id}</div>
          )} */}
          </div>
          <div>
            <p className="font-bold">Coupon Amount</p>
            <TextField
              fullWidth
              id="coupon_amount"
              name="coupon_amount"
              placeholder="Coupon Amount"
              value={fk.values.coupon_amount}
              onChange={fk.handleChange}
            />
            {/* {fk.values.referral_user_id && (
            <div className="error">{!name && "Invalid Referral Code"}</div>
          )} */}
          </div>
          <div>
            <p className="font-bold">Coupon Limit</p>
            <TextField
              fullWidth
              id="coupon_limit"
              name="coupon_limit"
              placeholder="Coupon Limit"
              value={fk.values.coupon_limit}
              onChange={fk.handleChange}
            />
            {/* {fk.touched.full_name && fk.errors.full_name && (
            <div className="error">{fk.errors.full_name}</div>
          )} */}
          </div>
          <div className="flex  items-center">
            <Checkbox
              color="secondary"
              checked={String(fk.values.isCheckedForPrediction) === "1"}
              onChange={() => {
                fk.setFieldValue(
                  "isCheckedForPrediction",
                  Number(fk.values.isCheckedForPrediction) === 0 ? 1 : 0
                );
              }}
            />
            <p className="font-bold">Coupon For Games</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-5">
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
            className="!bg-[#07BC0C]"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;
