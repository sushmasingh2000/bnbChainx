import React from 'react';
import { FaUserCircle, FaRegFileAlt } from 'react-icons/fa'; 
import logo from "../../../assets/favicon.png";
import { useQuery } from 'react-query';
import { apiConnectorGet } from '../../../utils/APIConnector';
import { endpoint } from '../../../utils/APIRoutes';


const Navbar = () => {
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
    <nav className="bg-[#1e293b] text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-50 ">
      <div className="flex items-center space-x-4">
        <button className="lg:hidden text-white text-2xl focus:outline-none">
          ☰
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-xl" /> 
          <span className="font-semibold text-base">{user_profile?.Associate_Name}</span> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;