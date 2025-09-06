import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from "../assets/favicon.png";
import body from "../assets/body-bg.png";
import { useNavigate } from 'react-router-dom';
import { apiConnectorPost } from '../utils/APIConnector';
import { endpoint } from '../utils/APIRoutes';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const forgotemailFn = async () => {
        try {
            const res = await apiConnectorPost(endpoint?.forgot_email, { email });
            toast.success(res.data.message);
            if (res?.data?.msg === "Password has sent") {
                navigate("/login")
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };
    return (
        <div>
            {/* <Loader isLoading={loading} /> */}
            <div
                className="flex justify-center items-center min-h-screen"
                style={{
                    backgroundImage: `url(${body})`, // Use the imported variable here
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className="w-full max-w-lg lg:p-6 p-4 border-border-color-green border rounded-xl shadow-2xl"  >
                    <div className="flex justify-center my-2">
                        <img src={logo} alt="Logo" className="h-20  " />
                    </div>
                    <h2 className="text-xl font-bold text-center text-white mb-6">
                        Forgot Password
                    </h2>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        forgotemailFn();
                    }}>
                        <div className="mb-4">
                            <input
                                placeholder="Enter Email"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008eff] transition duration-300 ease-in-out transform hover:scale-105"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 text-white border-2 border-border-color-green font-semibold rounded-full hover:bg-black bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Send
                        </button>
                    </form>
                    <div className="mx-6 my-1 text-right">
                        <p className="text-sm  text-gray-400">
                            Go To
                            <span
                                className="text-white ml-2 cursor-pointer underline "
                                onClick={() => navigate("/login")}
                            >
                                Login ?
                            </span>
                        </p>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default ForgotPassword;
