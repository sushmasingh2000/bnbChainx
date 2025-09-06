import { Box, Button, CircularProgress, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { candidateName } from "../../Services";
import { FilterAlt } from "@mui/icons-material";
import moment from "moment";

const Fund = () => {
  const [loding, setloding] = useState(false);
  const [dataa, setData] = useState([]);
  const [search, setSearch] = useState("");


  const initialValue = {
    wallet_type: "Select Wallet Type",
    user_id_table: "",
    u_req_amount: "",
    u_utr_no: "",
    fund_type: "1",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (!fk.values.u_req_amount || !fk.values.wallet_type)
        return toast("Select amount ");
      FundAdd(fk.values);
    },
  });

  async function FundAdd(reqBody) {
    const req = {
      user_id: reqBody?.user_id_table,
      u_req_amount: reqBody?.u_req_amount,
      wallet_type: reqBody?.wallet_type,
      u_utr_no: reqBody?.u_utr_no,
      fund_type: reqBody?.fund_type,
    };
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS.add_fund, req);
      toast.success(res?.data?.msg);
      if (res?.data?.msg === "Amount Added successfully.") {
        fk.handleReset();
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }
  const INRPayingFunction = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.inr_payingdata, {
        start_date: "",
        end_date: "",
        username: search,
      });
      setData(res?.data?.data?.[0] || []);

      if (res) {
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };

  const { data } = useQuery(
    ["getname", fk.values.user_id],
    () => candidateName({ userid: fk.values.user_id }),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false
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
    <>
      <div className="flex px-2 gap-5 !justify-start py-2">
        <TextField
          type="search"
          placeholder="Search by user id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => INRPayingFunction()}
          variant="contained"
          startIcon={<FilterAlt />}
        >
          Filter
        </Button>
      </div>
      {dataa && dataa?.full_name && (
        <div className="px-5">
          <p className="">Name : {dataa?.full_name}</p>
          <p>UserId : {dataa?.username}</p>
          <p>Mobile No : {dataa?.mobile}</p>
          <p>Amount : ₹{Number(dataa?.tr15_amt)?.toFixed(2)}</p>
          <p>Req. Date : {moment(dataa?.tr15_date)?.format("DD-MM-YYYY HH:mm:ss")}</p>
          <p>Suc. Date : {moment(dataa?.success_date)?.format("DD-MM-YYYY HH:mm:ss")}</p>
        </div>
      )}
      <div className="!flex justify-center items-center w-full">
        <div className="px-5  w-full bg-white !bg-opacity-30 !rounded-lg">
          <p className="!text-center font-bold !py-4  text-lg">Credit Fund</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6%]  gap-y-4">
            <div>
              <p className="font-bold "> Type</p>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={fk.values.fund_type}
                  onChange={(e) => fk.setFieldValue("fund_type", e.target.value)}
                >
                  <Box display="flex" flexDirection="row" gap={2}>
                    <FormControlLabel value="1" control={<Radio />} label="Manually" />
                    <FormControlLabel value="2" control={<Radio />} label="Gateway" />
                  </Box>
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <p className="font-bold  ">User ID </p>
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

            </div>
            <div>
              <p className="font-bold">Wallet Type</p>
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
            {fk.values.fund_type === "2" && <div>
              <p className=" font-bold">UTR NO</p>
              <TextField
                fullWidth
                id="u_utr_no"
                name="u_utr_no"
                placeholder="UTR No"
                value={fk.values.u_utr_no}
                onChange={fk.handleChange}
              />
            </div>}

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
    </>
  );
};

export default Fund;
