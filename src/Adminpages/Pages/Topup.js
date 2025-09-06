import { Button, CircularProgress, Radio, RadioGroup, FormControlLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";

const TopUp = () => {
  const [loding, setLoding] = useState(false);
  const [data, setData] = useState("");

  const initialValues = {
    user_id: "",
    topup_type: "RealTopup",
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      const reqbody = {
        // pack_id: fk.values.topup_type === "special" ? 11000 : 1100, // ✅ set pack_id based on selection
        pack_id: 1,
        user_id: fk.values.user_id,
        topup_type: fk.values.topup_type==="RealTopup"? 2 : 3
      };
      TopUpFn(reqbody);
    },
  });

  async function TopUpFn(reqbody) {
    try {
      setLoding(true);
      const res = await apiConnectorPost(endpoint?.admin_fund_memeber, reqbody);
      toast(res?.data?.message);
      fk.handleReset();
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  const Customerfunction = async () => {
    const reqbody = {
      user_id: fk.values.user_id,
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
  }, [fk.values.user_id]);

  if (loding)
    return (
      <div className="w-[100%] h-[100%] flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  return (
    <div className="!flex justify-center items-center w-full">
      <div className="p-5 lg:w-1/2 md:w-3/4 w-full bg-white !bg-opacity-30 rounded-lg">
        <p className="!text-center font-bold !py-4 !pb-10 text-lg">Add TopUp</p>

        <div className="grid grid-cols-1 gap-[6%] gap-y-4">
          {/* ✅ Radio Button Group */}
          <div>
            <p className="my-2 font-bold">TopUp Type</p>
            <RadioGroup
              row
              name="topup_type"
              value={fk.values.topup_type}
              onChange={fk.handleChange}
            >
              <FormControlLabel value="RealTopup" control={<Radio />} label="Real TopUp" />
              <FormControlLabel value="Special Topup" control={<Radio />} label="Special TopUp" />
            </RadioGroup>
          </div>
          <div>
            <p className="my-2 font-bold">Package Amount</p>
            <TextField
              fullWidth
              id="pack_id"
              name="pack_id"
              value="1100"
              disabled
            />
          </div>

          {/* ✅ User ID Input */}
          <div>
            <p>UserID</p>
            <TextField
              fullWidth
              id="user_id"
              name="user_id"
              value={fk.values.user_id}
              onChange={fk.handleChange}
            />
            <span className="text-red-800 !px-2">{data?.jnr_name}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Button onClick={() => fk.handleReset()} variant="contained" className="!bg-[#E74C3C]">
            Clear
          </Button>
          <Button onClick={() => fk.handleSubmit()} variant="contained" className="!bg-[#07BC0C]">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
