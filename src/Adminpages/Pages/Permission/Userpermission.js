import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { candidateName } from "../../Services";



const UserPermission = () => {
const client = useQueryClient()
  const [loding, setloding] = useState(false);
  const initialValue = {
    user_id: "",
    user_id_table: "",
    profile_type: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (!fk.values.profile_type  || !fk.values.profile_type)
        return toast("Everything is required")
      ChangeUserPermission(fk.values)
    },
  });

  const ChangeUserPermission = async (reqBody) => {
    setloding(true);
    const req = {
      user_id: reqBody?.user_id_table,
      profile_type: reqBody?.profile_type
    }
    try {
      const res = await axiosInstance.post(
        API_URLS.user_permission,
        req
      );
      toast.success(res?.data?.msg);
      if (res?.data?.msg === "Profile Updated Successfully.") {
        client.refetchQueries("getname")
       
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
    fk.setFieldValue("user_id_table", result?.id)
  }, [result])
  if (loding)
    return (
      <div className="w-[100%] h-[100%] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  return (
    <div className="!flex justify-center items-center w-full">
      <div className="p-5 lg:w-1/2 md:w-3/4 w-full bg-white !bg-opacity-30 !rounded-lg">

        <p className="!text-center font-bold !py-4 text-lg">Change User Permission</p>
        <div className="grid grid-cols-1 gap-[6%] gap-y-4">

          <div>
            <p className="font-bold mt-5">User ID </p>
            <TextField
              fullWidth
              id="user_id"
              name="user_id"
              placeholder="User ID"
              value={fk.values.user_id}
              onChange={fk.handleChange}
            /> {fk.values.user_id ? (
              result ? (
                <div className="no-error">Referral From: {result?.full_name}<span className="!text-black"> ({result?.user_type})</span></div>
              ) : (
                <div className="error">Invalid Referral Id</div>
              )
            ) : null}
            <p className="font-bold mt-5">Select Profile Type</p>
            <TextField
              fullWidth
              select
              size="small"
              id="profile_type"
              name="profile_type"
              placeholder="Profile Type"
              value={fk.values.profile_type}
              onChange={fk.handleChange}
            >
              <MenuItem value={4}>Dummy User</MenuItem>
              <MenuItem value={1}>User</MenuItem>
              <MenuItem value={2}>Admin</MenuItem>
              <MenuItem value={3}>Super Admin</MenuItem>
              <MenuItem value={5}>Support Agent</MenuItem>

            </TextField>
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

export default UserPermission;

