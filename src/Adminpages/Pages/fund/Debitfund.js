import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { candidateName } from "../../Services";

const DebitFund = () => {
  const [loding, setloding] = useState(false);
  const initialValue = {
    wallet_type: "Select Wallet Type",
    user_id_table: "",
    u_req_amount: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (!fk.values.u_req_amount || !fk.values.wallet_type)
        return toast("Select amount ");
      Funddebitfn(fk.values);
    },
  });

  async function Funddebitfn(reqBody) {
    const req = {
      user_id: reqBody?.user_id_table,
      u_req_amount: reqBody?.u_req_amount,
      wallet_type: reqBody?.wallet_type,
    };
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS.debit_fund, req);
      toast.success(res?.data?.msg);
      if (res?.data?.msg === "Amount Added successfully.") {
        fk.handleReset();
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }
  const { data } = useQuery(
    ["getname", fk.values.user_id],
    () => candidateName({ userid: fk.values.user_id }),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus:false
    }
  );
  const result = data?.data?.data;
  useEffect(() => {
    fk.setFieldValue("user_id_table", result?.id);
  }, [result]);
  if (loding)
    return (
      <div className="w-[100%] h-[100%] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  return (
    <div className="!flex justify-center items-center w-full">
      <div className="p-5 lg:w-1/2 md:w-3/4 w-full bg-white !bg-opacity-30 !rounded-lg">
        <p className="!text-center font-bold !py-4 text-lg">Debit Fund</p>
        <div className="grid grid-cols-1 gap-[6%] gap-y-4">
          <div>
            <p className="font-bold ">User ID </p>
            <TextField
              fullWidth
              id="user_id"
              name="user_id"
              placeholder="User ID"
              value={fk.values.user_id}
              onChange={fk.handleChange}
            />{" "}
            {fk.values.user_id ? (
              result ? (
                <div className="no-error flex justify-between">
                  <span> Referral From: {result?.full_name}</span>
                  {(String(fk.values.wallet_type) === "2" && (
                    <span> Winning Wallet: {result?.winning_wallet}</span>
                  )) ||
                    (String(fk.values.wallet_type) === "1" && (
                      <span> Main Wallet: {result?.wallet}</span>
                    ))}
                </div>
              ) : (
                <div className="error">Invalid Referral Id</div>
              )
            ) : null}
            <p className="font-bold mt-5">Wallet Type</p>
            <TextField
              fullWidth
              select
              size="small"
              id="wallet_type"
              name="wallet_type"
              placeholder="Wallet Type"
              value={fk.values.wallet_type}
              onChange={fk.handleChange}
            >
              <MenuItem value={"Select Wallet Type"}>
                Select Wallet Type
              </MenuItem>
              <MenuItem value={1}>Main Wallet</MenuItem>
              <MenuItem value={2}>Winning Wallet</MenuItem>
            </TextField>
          </div>
          <div>
            <p className=" font-bold">Amount</p>
            <TextField
              fullWidth
              id="u_req_amount"
              name="u_req_amount"
              placeholder="Amount"
              value={fk.values.u_req_amount}
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
            className="!bg-[#07BC0C]"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DebitFund;
