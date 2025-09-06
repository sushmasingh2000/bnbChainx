import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { candidateName } from "../../Services";
import Company from "./Company";

const AddCompany = () => {

  const client = useQueryClient()
  const [loding, setloding] = useState(false);
  const initialValue = {
    user_id_table: "",
    set_prcnt: "",
    set_per: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      if (!fk.values.set_prcnt || !fk.values.set_per || !fk.values.u_id )
        return toast("Enter All Fields");
      CompanyAdd(fk.values);
    },
  });

  async function CompanyAdd(reqBody) {
    const req = {
         u_id: reqBody?.user_id_table,
        set_prcnt: reqBody?.set_prcnt,
        set_per: reqBody?.set_per,
    };
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS.add_comapany_promoter, req);
      toast.success(res?.data?.msg);
      if (res?.data?.msg === "Status Updated Successfully.") {
      client.refetchQueries("Company_prm")
        fk.handleReset();
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }
  const { data } = useQuery(
    ["getname", fk.values.u_id],
    () => candidateName({ userid: fk.values.u_id}),
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
 <>
    <div className="!flex justify-center items-center w-full">
      <div className="p-5 lg:w-1/2 md:w-3/4 w-full bg-white !bg-opacity-30 !rounded-lg">
        <p className="!text-center font-bold !py-4 text-lg">Company Promoter</p>
        <div className="grid grid-cols-1 gap-[6%] gap-y-4">
          <div>
            <p className="font-bold ">User ID </p>
            <TextField
              fullWidth
              id="u_id"
              name="u_id"
              placeholder="User ID"
              value={fk.values.u_id}
              onChange={fk.handleChange}
            />{" "}
            {fk.values.u_id ? (
              result ? (
                <div className="no-error flex justify-between">
                  <span> Referral From: {result?.full_name}</span>
                </div>
              ) : (
                <div className="error">Invalid Referral Id</div>
              )
            ) : null} 
          </div>
          <div>
            <p className=" font-bold">Percent</p>
            <TextField
            type="number"
              fullWidth
              id="set_prcnt"
              name="set_prcnt"
              placeholder="Percent"
              value={fk.values.set_prcnt}
              onChange={fk.handleChange}
            />
          </div>
          <div>
            <p className=" font-bold">Level</p>
            <TextField
            type="number"
              fullWidth
              id="set_per"
              name="set_per"
              placeholder="Level"
              value={fk.values.set_per}
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
     <Company/>
 </>
  );
};

export default AddCompany;
