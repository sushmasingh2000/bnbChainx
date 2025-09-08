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

  const dashboard = data?.data?.data?.[0] || {};

  const stats = [
    { label: "Total Members", value: dashboard?.total_mem || 0 },
    { label: "Active Members", value: dashboard?.active_mem || 0 },
    { label: "Deactive Members", value: (dashboard?.total_mem || 0) - (dashboard?.active_mem || 0) },
    { label: "Today Topup Amount", value: `${dollar} ${dashboard?.today_topup_amnt || 0}` },
    { label: "Total Topup Amount", value: `${dollar} ${dashboard?.total_topup_amnt || 0}` },
    { label: "Total Withdrawal", value: `${dollar} ${dashboard?.total_with_amnt || 0}` },
    { label: "Level Income", value: `${dollar} ${dashboard?.total_level_income || 0}` },
    { label: "Direct Income", value: `${dollar} ${dashboard?.total_direct_income || 0}` },
    { label: "ROI Bonus", value: `${dollar} ${dashboard?.total_roi_income || 0}` },
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
