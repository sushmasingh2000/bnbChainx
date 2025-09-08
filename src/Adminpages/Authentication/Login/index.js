import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { endpoint } from '../../../utils/APIRoutes';
import axios from 'axios';
import Loader from '../../../Shared/Loader';
import logo from "../../../assets/logo.png"

const LogIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    otp: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const reqbody = {
        otp: formik.values.otp,
      };
      loginFn(reqbody);
    },
  });

  const loginFn = async (reqBody) => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint?.very_fy_OTP, reqBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      // console.log(response?.data);
      toast(response?.data?.message);
      setLoading(false);

      if (response?.data?.message === "Login Successfully") {
        localStorage.setItem("logindataen", response?.data?.result?.[0]?.token);
        localStorage.setItem(
          "login_user",
          response?.data?.result?.[0]?.user_type
        );

        localStorage.setItem("uid", "ADMIN");
        localStorage.setItem("username", "ADMIN");
        if (response?.data?.result?.[0]?.user_type === "Admin") {
          navigate("/admindashboard");
          window.location.reload();
        } else {
          navigate("/home");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error during login.");
      setLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={loading} />

      <div className="flex justify-center items-center h-screen overflow-y-scroll bg-gray-800">
        <div className="w-full max-w-lg lg:p-6 p-4 border-[#008eff] border rounded-xl shadow-2xl">
          <div className="bg-glassy">
            <div className="flex justify-center my-2">
              <img src={logo} alt="Logo" className="" />
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <input
                  placeholder="Hey! Enter your OTP"
                  type="text"
                  id="otp"
                  name="otp"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008eff] transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>

              <button
                type="submit"

                className="w-full py-3 text-white  font-semibold rounded-full bg-gold-color transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
