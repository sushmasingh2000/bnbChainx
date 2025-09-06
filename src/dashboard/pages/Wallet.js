import React, { useState } from 'react';
import qr from "../../assets/qr.png";
import { apiConnectorGet } from '../../utils/APIConnector';
import { endpoint } from '../../utils/APIRoutes';
import { useQuery } from 'react-query';

const Wallet = () => {

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(user_profile?.wallet_Address)
      .then(() => {
        alert('Wallet Address copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };
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
    <div className="p-2 min-h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white border border-gray-700 mb-6 flex flex-col  justify-between items-start md:items-center gap-6">
        <div className="bg-gray-700 p-4 rounded-md flex flex-col items-center justify-center ">
          <img src={"qr"} alt='' className=''/>
        </div>
          <div className="flex p-1 bg-gray-700 items-center">
            <p className='px-2'>  Wallet Address <span className="text-red-500">*</span></p>
            <input
              type="text"
              id="walletAddressDisplay"
              value={user_profile?.wallet_Address}
              readOnly
              className="flex-grow bg-gray-600 text-white border border-gray-500 rounded-l-md py-2 px-3 text-sm cursor-text focus:outline-none"
            />
            <button
              onClick={handleCopyAddress}
              className="bg-green-500 hover:bg-green-700 px-4 py-3 rounded-r-md text-white text-sm"
            >
              Copy
            </button>
          </div>
      </div>
      
    </div>
  );
};

export default Wallet;
