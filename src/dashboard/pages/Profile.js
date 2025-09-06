import React, { useState } from "react";
import { endpoint } from "../../utils/APIRoutes";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import bit from "../../assets/bit.png"
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import moment from "moment";

const Profile = () => {
    const [loding, setLoding] = useState(false);
    const [showWalletModal, setShowWalletModal] = useState(false); // Renamed from showModal to avoid confusion
    const [showPasswordModal, setShowPasswordModal] = useState(false); // Renamed from showPsw
    const [showProfileModal, setShowProfileModal] = useState(false); // New state for Update Profile modal

    const { data: profile, refetch: refetchProfile } = useQuery( // Added refetch
        ["get_profile"],
        () => apiConnectorGet(endpoint?.profile_api),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );
    const user_profile = profile?.data?.result || {}; // Changed to empty object for safer access

    // Formik for Wallet Address
    const fkWallet = useFormik({ // Renamed from fk to fkWallet
        initialValues: {
            wallet_address: user_profile?.wallet_Address || "",
        },
        enableReinitialize: true,
        onSubmit: () => {
            const reqbody = {
                wallet_address: fkWallet.values.wallet_address,
            };
            WalletFn(reqbody);
        }
    });

    async function WalletFn(reqbody) {
        setLoding(true);
        try {
            const res = await apiConnectorPost(endpoint?.add_wallet_address, reqbody);
            toast.success(res?.data?.message); // Changed to toast.success
            if (res?.data?.message === "Wallet Add Successfully") {
                setShowWalletModal(false);
                refetchProfile(); // Refetch profile to update wallet address
            }
            fkWallet.handleReset();
        } catch (e) {
            console.error(e); // Changed to console.error
            toast.error(e?.response?.data?.message || "Failed to update wallet address"); // Display error message
        }
        setLoding(false);
    }

    // Formik for Update Password
    const fkPassword = useFormik({ // Renamed from formik to fkPassword
        initialValues: {
            oldPass: "",
            newPass: "",
        },
        enableReinitialize: true,
        onSubmit: () => {
            const reqbody = {
                oldPass: fkPassword.values.oldPass,
                newPass: fkPassword.values.newPass,
            };
            UpdatePasswordFn(reqbody);
        }
    });

    async function UpdatePasswordFn(reqbody) {
        setLoding(true);
        try {
            const res = await apiConnectorPost(endpoint?.update_user_password, reqbody);
            toast.success(res?.data?.message);
            if (res?.data?.message === "Password Update Successfully") {
                setShowPasswordModal(false);
            }
            fkPassword.handleReset();
        } catch (e) {
            console.error(e);
            toast.error(e?.response?.data?.message);
        }
        setLoding(false);
    }

    const fkProfile = useFormik({
        initialValues: {
            name: user_profile?.Associate_Name || "",
            email: user_profile?.Email || "",
            mobile: user_profile?.Mobile_No || "",
        },
        enableReinitialize: true,
        onSubmit: () => {
            const reqbody = {
                name: fkProfile.values.name,
                email: fkProfile.values.email,
                mobile: fkProfile.values.mobile,
            };
            UpdateProfileFn(reqbody);
        },
    });

    async function UpdateProfileFn(reqbody) {
        setLoding(true);
        try {
            const res = await apiConnectorPost(endpoint?.update_user_profile, reqbody);
            toast.success(res?.data?.message);
            if (res?.data?.success) {
                setShowProfileModal(false);
                refetchProfile();
            }
            fkProfile.handleReset();
        } catch (e) {
            console.error(e);
            toast.error(e?.response?.data?.message || "Failed to update profile.");
        }
        setLoding(false);
    }

    return (
        <>
            <div className=" bg-gray-900 rounded-xl lg:mt-8 text-gray-100 p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-gray-800 p-3 rounded-lg shadow-lg">
                        <div className="flex flex-col items-center mb-6">
                            <img src={bit} alt="Coin Icon" className="w-16 h-16 mb-3" />
                            <h2 className="text-lg font-semibold text-white">General Account Information</h2>
                        </div>

                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Registration Date:</span>
                                <span className="text-gray-100">{user_profile?.Joining_Date_1 || "--"}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Activation Date:</span>
                                <span className="text-gray-100">{user_profile?.TOPDATE ? moment(user_profile?.TOPDATE)?.format("DD-MM-YYYY") : "--"}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Name:</span>
                                <span className="text-gray-100">{user_profile?.Associate_Name || "--"}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Email Id:</span>
                                <span className="text-gray-100">{user_profile?.Email || "--"}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>Mobile Number:</span>
                                <span className="text-gray-100">{user_profile?.Mobile_No || "--"}</span>
                            </div>

                            <div className="flex justify-between py-1 border-b border-gray-700">
                                <span>ID:</span>
                                <span className="text-gray-100">{user_profile?.Login_Id || "--"}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>Account Status:</span>
                                <span className={`font-medium ${user_profile?.or_m_status === 1 ? "text-green-400" : "text-red-400"}`}>
                                    {user_profile?.or_m_status === 1 ? "Active" : "Deactive"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 h-fit p-3 rounded-lg shadow-lg">
                        <div className="flex flex-col items-center mb-6">
                            <img src={bit} alt="Coin Icon" className="w-16 h-16 mb-3" />
                            <h2 className="text-lg font-semibold text-white">Password & Crypto Address</h2>
                            <p className="text-gray-400 text-sm">Manage account settings securely</p>
                        </div>

                        {["Update Profile", "Update Password", "Update Wallet Address"].map((label, index) => (
                            <div key={index} className={`flex justify-between items-center py-2 ${index < 2 ? "border-b border-gray-700" : ""}`}>
                                <span className="text-gray-300">{label}:</span>
                                <button
                                    className="bg-gold-color hover:bg-green-600 text-gray-900 font-semibold py-1.5 px-4 rounded text-xs"
                                    onClick={() => {
                                        if (label === "Update Wallet Address") setShowWalletModal(true);
                                        else if (label === "Update Password") setShowPasswordModal(true);
                                        else if (label === "Update Profile") setShowProfileModal(true); // Open profile modal
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

            {/* Wallet Address Modal */}
            {showWalletModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-white text-lg font-semibold mb-4">
                            {fkWallet.values.wallet_address ? "Update Wallet Address" : "Add Wallet Address"}
                        </h3>
                        <form onSubmit={fkWallet.handleSubmit}>
                            <input
                                type="text"
                                name="wallet_address"
                                placeholder="Enter wallet address"
                                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={fkWallet.values.wallet_address}
                                onChange={fkWallet.handleChange}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                                    onClick={() => {
                                        setShowWalletModal(false);
                                        fkWallet.handleReset();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-gray-900 font-semibold rounded hover:bg-green-600"
                                    disabled={loding}
                                >
                                    {loding ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Change Password
                        </h3>
                        <form onSubmit={fkPassword.handleSubmit}>
                            <input
                                type="password" // Changed to password type
                                name="oldPass"
                                id="oldPass"
                                placeholder="Enter Old Password"
                                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={fkPassword.values.oldPass}
                                onChange={fkPassword.handleChange}
                            />
                            <input
                                type="password" // Changed to password type
                                name="newPass"
                                id="newPass"
                                placeholder="Enter New Password"
                                className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={fkPassword.values.newPass}
                                onChange={fkPassword.handleChange}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        fkPassword.handleReset();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-gray-900 font-semibold rounded hover:bg-green-600"
                                    disabled={loding}
                                >
                                    {loding ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Profile Modal (New) */}
            {showProfileModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto relative text-gray-100"> {/* Adjusted background and width */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">Update Profile</h3>
                            <button
                                className="text-gray-400 hover:text-white"
                                onClick={() => {
                                    setShowProfileModal(false);
                                    fkProfile.handleReset();
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={fkProfile.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={fkProfile.values.name}
                                    onChange={fkProfile.handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={fkProfile.values.email}
                                    onChange={fkProfile.handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={"India (भारत)+91"}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-1">
                                        Mobile <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={fkProfile.values.mobile}
                                        onChange={fkProfile.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-6 py-2 rounded-md font-semibold bg-gray-600 text-white hover:bg-gray-500 transition-colors"
                                    onClick={() => {
                                        setShowProfileModal(false);
                                        fkProfile.handleReset();
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-md font-semibold bg-green-500 text-gray-900 hover:bg-green-600 transition-colors"
                                    disabled={loding}
                                >
                                    {loding ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;