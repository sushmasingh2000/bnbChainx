
import Dashboard from "../Adminpages/Pages/dashboard/Dashboard";
import AddAddress from "../Adminpages/Pages/fund/AddAddress";
import { default as BoosterBonus, default as MatchingBonus } from "../Adminpages/Pages/genealogy/BoosterBonus";
import DirectBonus from "../Adminpages/Pages/genealogy/DirectBonus";
import LevelBonus from "../Adminpages/Pages/genealogy/LevelBonus";
import ROIBonus from "../Adminpages/Pages/genealogy/ROIBonus";
import WeeklyBonus from "../Adminpages/Pages/genealogy/WeeklyBonus";
import INRPaying from "../Adminpages/Pages/INRPayment/INRPaying";
import INRPayout from "../Adminpages/Pages/INRPayment/INRPayout";
import UserDetail from "../Adminpages/Pages/Team/User";
import TopUp from "../Adminpages/Pages/Topup";
import TopUpDetail from "../Adminpages/Pages/TopUP/TopUpDetail";
import DownlineTeams from "../dashboard/pages/Team/DownlineTeams";


export const adminroutes = [ 

  {
    id: 2,
    path: "/admindashboard",
    component: <Dashboard />,
    navItem: "Dashboard",
  },
  {
    id: 17,
    path: "/giftBonus",
    component: <DirectBonus/>,
    navItem: "Direct Bonus",
  },
  {
    id: 41,
    path: "/salarybonus",
    component: <BoosterBonus/>,
    navItem: "Booster Bonus",
  },
  {
    id: 42,
    path: "/weeklybonus",
    component: <WeeklyBonus/>,
    navItem: "Weekly Recovery",
  },
  {
    id: 42,
    path: "/vipbonus",
    component: <ROIBonus/>,
    navItem: "ROI Bonus",
  },
  {
    id: 19,
    path: "/levelBonus",
    component: <LevelBonus/>,
    navItem: "Team Trading Bonus",
  },
  {
    id: 19,
    path: "/matching",
    component: <MatchingBonus/>,
    navItem: "Matching Bonus",
  },
  {
    id: 42,
    path: "/inr_Paying",
    component: <INRPaying/>,
    navItem: "INR Paying",
  },
  {
    id: 43,
    path: "/inr_Payout",
    component: <INRPayout/>,
    navItem: "INR Payout",
  },
  {
    id: 43,
    path: "/top_up",
    component: <TopUpDetail/>,
    navItem: "TopUp Detail",
  },
  {
    id: 43,
    path: "/user_detail",
    component: <UserDetail/>,
    navItem: "User Detail",
  },
    {
    id: 43,
    path: "/down_team",
    component: <DownlineTeams/>,
    navItem: "Downline Team",
  },
  {
    id: 44,
    path: "/topup",
    component: <TopUp/>,
    navItem: "Top Up",
  },
    {
    id: 45,
    path: "/admin_fund",
    component: <AddAddress/>,
    navItem: "Fund",
  },
  
  
];