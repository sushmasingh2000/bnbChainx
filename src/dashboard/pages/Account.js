import React from "react";
import { endpoint } from "../../utils/APIRoutes";
import { apiConnectorGet } from "../../utils/APIConnector";
import { useQuery } from "react-query";
import moment from "moment/moment";

const Account = () => {

    const { data:profile } = useQuery(
    ["get_profile"],
    () => apiConnectorGet(endpoint?.profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const user_profile = profile?.data?.result || 0 ;

    return (
        <div className="lg:px-6 pb-10 lg:w-[60%]">
            <div className="bg-[#1e293b] text-white rounded-xl shadow p-6 border border-gray-700">  <h2 className="text-center text-xl font-bold mb-6">Account</h2>
                <div className="space-y-3 text-sm sm:text-base">
                    <Row label="Joining Date:" value={moment(user_profile.Joining_Date)?.format("DD-MM-YYYY")} />
                    <Row label="Login Id :" value={user_profile.Login_Id} highlight />
                    <Row label="Name:" value={user_profile.Associate_Name} highlight />
                    <Row label="Email:" value={user_profile.Email} highlight />
                    <Row label="Mobile No:" value={user_profile.Mobile_No} highlight color="text-green-400" />
                </div>
            </div>
        </div>
    );
};

const Row = ({ label, value, highlight = false, color = "text-yellow-400" }) => (
    <div className="flex justify-between border-b border-gray-600 pb-1">
        <span className="text-white">{label}</span>
        <span className={highlight ? `${color} font-semibold` : "text-white"}>{value}</span>
    </div>
);

export default Account;
