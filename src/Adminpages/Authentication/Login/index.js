import { useFormik } from 'formik';
import React, { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { API_URLS } from '../../config/APIUrls';
import axiosInstance from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LogIn = () => {
  const [loding, setloding] = useState(false);
  const navigate = useNavigate();
  const initialValue = {
    username: '',
    password: '',
  };

  const fk = useFormik({
    initialValues: initialValue,
    enableReinitialize: true,
    onSubmit: () => {
      const reqBody = {
        username: fk.values.username,
        password: fk.values.password,
      };
      loginFunction(reqBody);
    },
  });

  const loginFunction = async (reqBody) => {
    setloding(true);
    try {
      const response = await axiosInstance.post(API_URLS.admin_login, reqBody);
      toast(response?.data?.message);
       if (response?.data?.message === "Login Successfully") {
        localStorage.setItem("logindataen", response?.data?.result?.[0]?.token);
        navigate("/admindashboard");
        window.location.reload();
        // navigate('/Qrgenerator');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setloding(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-[#397EF3] via-[#060C95] to-[#00008B]">
      {/* <CustomCircularProgress isLoading={loding} /> */}
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 py-10 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
          Welcome Back
        </h2>
        <form onSubmit={fk.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-white mb-1 ml-1">
              Username
            </label>
            <div className="flex items-center bg-white/20 border border-white/30 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-purple-500">
              <input
                type="text"
                name="username"
                value={fk.values.username}
                onChange={fk.handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-2 bg-transparent text-white placeholder-white/70 outline-none"
              />
              <div className="p-2 text-white/80">
                <AiOutlineMail size={24} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-white mb-1 ml-1">
              Password
            </label>
            <div className="flex items-center bg-white/20 border border-white/30 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-purple-500">
              <input
                type="password"
                name="password"
                value={fk.values.password}
                onChange={fk.handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-transparent text-white placeholder-white/70 outline-none"
              />
              <div className="p-2 text-white/80">
                <AiFillLock size={24} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-t from-[#1E3C94] to-[#7D85FE] hover:bg-[#1E3C94] text-white py-2 rounded-full font-semibold shadow-md transition-all duration-200"
          >
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
