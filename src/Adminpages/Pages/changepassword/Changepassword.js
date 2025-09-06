import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { candidateName } from "../../Services";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomCircularProgress from "../../../shared/CustomDialogBox";

const Changepassword = () => {
  const [loding, setloding] = useState(false);

  const initialValue = {
    user_id: "",
    new_password : "",
  };
  const fk = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      Changepassword(fk.values);
    },
  });
  async function Changepassword(reqBody) { 
    const req = {
      username: reqBody?.user_id,
      new_password : reqBody?.new_password ,
    }
    setloding(true);
    try {
      const res = await axiosInstance.post(
        API_URLS.Change_Password,
        req
      );
      toast.success(res?.data?.msg);
      if (res?.data?.msg === "Password Updated Successfully.") {
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


  return (
    <div className="w-[100%]   flex justify-center items-center">
      <div className="!bg-white !bg-opacity-20 lg:w-1/2 p-4">
      <p className="!text-center font-bold !py-4 text-lg">Change Password</p>
        <div className="grid grid-cols-1 gap-[6%] gap-y-4 w-full">
          <div className="">
          <p className="font-bold ">User ID </p>
            <TextField
              fullWidth
             
              id="user_id"
              name="user_id"
              placeholder="User ID"
              value={fk.values.user_id}
              onChange={fk.handleChange}
            /> {fk.values.user_id ? (
              result ? (
                <div className="text-blue-400  text-sm">Referral From: {result?.full_name}</div>
              ) : (
                <div className="error">Invalid Referral Id</div>
              )
            ) : null}
          </div>
          <div>
            <p className="font-bold">New Password</p>
            <TextField
              fullWidth
             
              id="new_password"
              name="new_password"
              placeholder="New Password"
              value={fk.values.new_password}
              onChange={fk.handleChange}
            />
            {fk.touched.new_password  && fk.errors.new_password  && (
              <div className="error">{fk.errors.new_password }</div>
            )}
          </div>
          <div className="flex justify-end gap-3">
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
          <CustomCircularProgress isLoading={loding}/>
        </div>
      </div>
    </div>
  );
};

export default Changepassword;
