import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupSchemaValidataon } from "../../../services/validation";
import { candidateName } from "../../Services";
import { useQuery } from "react-query";
import { endpoint } from "../../../services/urls";
import { apiConnectorPost } from "../../../services/apiconnector";
import CustomCircularProgress from "../../../shared/CustomDialogBox";
import toast from "react-hot-toast";
import { ClientJS } from 'clientjs';



const SignUp = () => {
  const client = new ClientJS();
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const [visitorId, setVisitorId] = useState(null);

  const initialValue = {
    email: "",
    mobile: "",
    name: "",
    pass: "",
    confirmpass: "",
    refid: "",
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    validationSchema: signupSchemaValidataon,
    onSubmit: () => {
      if (fk.values.pass !== fk.values.confirmpass)
        return toast("Password and confirm password should be same.");

      const reqBody = {
        email: fk.values.email,
        mobile: String(fk.values.mobile) || "",
        pass: fk.values.pass,
        confirmpass: fk.values.confirmpass,
        refid: result?.id,
        name: fk.values.name,
        u_finger_id:visitorId,
        through:1,

      }

      signupFunction(reqBody);
    },
  });
  const signupFunction = async (reqBody) => {
    setloding(true);
    try {
        const response = await apiConnectorPost(endpoint.signup, reqBody);
        if ("Registration Successful." === response?.data?.msg) {
            toast(response?.data?.msg)
           fk.handleReset();
        } else {
            toast(response?.data?.msg);
        }
    } catch (e) {
        console.log(e);
    }
    setloding(false);
}
useEffect(() => {
  // Initialize FingerprintJS and fetch the visitor ID
  const fetchVisitorId = async () => {
    const fingerprint = client.getFingerprint();
    // const result = await fp.get();
    setVisitorId(fingerprint);
    // console.log(fingerprint);
  };


  fetchVisitorId().catch(console.error);
}, []);

  const { data } = useQuery(
    ["getname", fk.values.refid],
    () => candidateName({ userid: fk.values.refid }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const result = data?.data?.data;
  return (

    <div className="w-[100%]   flex justify-center items-center">
      <div className=" lg:w-full p-4">
      <p className="!text-center font-bold !py-4 text-lg">Registration</p>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[6%] gap-y-8 pt-5 w-full">
        <div className=""> 
            <p className="font-bold">Name</p>
            <TextField
              fullWidth
             
              id="name"
              name="name"
              placeholder="name"
              value={fk.values.name}
              onChange={fk.handleChange}
            />
            {fk.touched.name && fk.errors.name && (
              <div className="error">{fk.errors.name}</div>
            )}
          </div>
          <div className=""> 
            <p className="font-bold"> Phone number</p>
            <TextField
              fullWidth
             
              type="number"
              id="mobile"
              name="mobile"
              placeholder="mobile"
              value={fk.values.mobile}
              onChange={fk.handleChange}
            />
            {fk.touched.mobile && fk.errors.mobile && (
              <div className="error">{fk.errors.mobile}</div>
            )}
          </div>
          <div className=""> 
            <p className="font-bold">Email</p>
            <TextField
              fullWidth
             
              id="email"
              name="email"
              placeholder="Email"
              value={fk.values.email}
              onChange={fk.handleChange}
            />
            {fk.touched.email && fk.errors.email && (
              <div className="error">{fk.errors.email}</div>
            )}
          </div>
          <div>
            <p className="font-bold">Set Password</p>
            <TextField
              fullWidth
             
              id="pass"
              name="pass"
              placeholder="Old Password"
              value={fk.values.pass}
              onChange={fk.handleChange}
            />
            {fk.touched.pass && fk.errors.pass && (
              <div className="error">{fk.errors.pass}</div>
            )}
          </div>
          <div className=""> 
            <p className="font-bold">Confirm password</p>
            <TextField
              fullWidth
             
              id="confirmpass"
              name="confirmpass"
              placeholder="confirmpass"
              value={fk.values.confirmpass}
              onChange={fk.handleChange}
            />
            {fk.touched.confirmpass && fk.errors.confirmpass && (
              <div className="error">{fk.errors.confirmpass}</div>
            )}
          </div>
          <div>
            <p className="font-bold"> Referral Code</p>
            <TextField
              fullWidth
             
              id="refid"
              name="refid"
              placeholder=" Referral Code"
              value={fk.values.refid}
              onChange={fk.handleChange}
            />
          {fk.touched.refid && fk.errors.refid ? (
                  <div className="error">{fk.errors.refid}</div>
                ) : fk.values.refid ? (
                  result ? (
                    <div className="text-blue-500">Referral From: {result?.full_name}</div>
                  ) : (
                    <div className="error">Invalid Referral Id</div>
                  )
                ) : null}
          </div>
          <div className="flex justify-start !mt-5 gap-3">
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
          <CustomCircularProgress isLoading={loding} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
