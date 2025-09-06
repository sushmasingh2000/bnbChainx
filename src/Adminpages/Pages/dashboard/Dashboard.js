import React from "react";
import { useQuery } from "react-query";
import { apiConnectorGet } from "../../../utils/APIConnector";
import { dollar, endpoint } from "../../../utils/APIRoutes";

const Dashboard = () => {
  const { data } = useQuery(
    ['get_admin'],
    () => apiConnectorGet(endpoint?.admin_dashboard),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.error("Error fetching dashboard data:", err),
    }
  );

  const dashboard = data?.data?.result || {};

  const stats = [
    { label: "Total Members", value: dashboard?.tot_id || 0 },
    { label: "Active Members", value: dashboard?.active_id || 0 },
    { label: "Deactive Members", value: dashboard?.deactive_id || 0 },
    { label: "Current Topup Amount", value: `${dollar} ${dashboard?.curr_topup || 0}` },
    { label: "Total Topup Amount", value: `${dollar} ${dashboard?.total_topup_amt || 0}` },
    { label: "Total Topup", value: dashboard?.total_topup || 0 },
    { label: "Total Withdrawal", value: `${dollar} ${dashboard?.total_withdrawal || 0}` },
    { label: "Level Income", value: `${dollar} ${dashboard?.levelinc || 0}` },
    { label: "Direct Income", value: `${dollar} ${dashboard?.direct_inc || 0}` },
    { label: "Stacking Bonus", value: `${dollar} ${dashboard?.satcking_bonus || 0}` },
    { label: "Total Paid Members", value: dashboard?.total_paid_mem || 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white/80 rounded-lg shadow-md p-4 border border-gray-300 backdrop-blur-sm"
        >
          <p className="text-sm text-gray-500">{item.label}</p>
          <h3 className="text-lg font-bold text-blue-900">{item.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
