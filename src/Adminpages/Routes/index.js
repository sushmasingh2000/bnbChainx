
import Changepassword from "../Pages/changepassword/Changepassword";
import ColorPrediction1Min from "../Pages/colorprediction/ColorPrediction1Min";
import ColorPrediction2Min from "../Pages/colorprediction/ColorPrediction2Min";
import ColorPrediction3Min from "../Pages/colorprediction/ColorPrediction3Min";
import Dashboard from "../Pages/dashboard/Dashboard";
import Fund from "../Pages/fund/Fund";
import FundHistory from "../Pages/fund/FundHistory";
import ApprovedRequest from "../Pages/gamewithdrawlrequest/ApprovedRequest";
import GameWithdrawlRequest from "../Pages/gamewithdrawlrequest/GameWithdrawlRequest";
import RejectRequest from "../Pages/gamewithdrawlrequest/RejectRequest";
import DownLine from "../Pages/genealogy/DownLine";
import Genealogy from "../Pages/genealogy/Genealogy";
import AddPlayer from "../Pages/player/AddPlayer";
import Player from "../Pages/player/Player";

export const routes = [ 
  {
    id: 1,
    path: "/dashboard",
    component: <Dashboard />,
    navItem: "Dashboard",
  },

  {
    id: 3,
    path: "/player",
    component: <Player />,
    navItem: "Player",
  },
 
  {
    id: 5,
    path: "/game-withdrawl-request",
    component: <GameWithdrawlRequest />,
    navItem: "Game Withdrawl Request",
  },
  {
    id: 6,
    path: "/genealogy",
    component: <Genealogy />,
    navItem: "Direct",
  },
  
  {
    id: 7,
    path: "/genealogy/downline",
    component: <DownLine />,
    navItem: "Downline",
  },
  
  {
    id: 9,
    path: "/fund",
    component: <Fund/>,
    navItem: "Fund",
  },
  {
    id: 10,
    path: "/player/add-player",
    component: <AddPlayer/>,
    navItem: "Add Player",
  },
  {
    id: 11,
    path: "/change-password",
    component: <Changepassword/>,
    navItem: "Change Password",
  },
  {
    id: 12,
    path: "/game-withdrawl-request/approved-request",
    component: <ApprovedRequest/>,
    navItem: "Approved Request",
  },
  {
    id: 13,
    path: "/game-withdrawl-request/reject-request",
    component: <RejectRequest/>,
    navItem: "Reject Request",
  },

 
 
  {
    id: 23,
    path: "/color-prediction-1-min",
    component: <ColorPrediction1Min/>,
    navItem: "Color Prediction 1 Min",
  },
  {
    id: 24,
    path: "/color-prediction-2-min",
    component: <ColorPrediction2Min/>,
    navItem: "Color Prediction 2 Min",
  },
  {
    id: 25,
    path: "/color-prediction-3-min",
    component: <ColorPrediction3Min/>,
    navItem: "Color Prediction 3 Min",
  },
  {
    id: 26,
    path: "/fund/transfer-fund-history",
    component: <FundHistory/>,
    navItem: "Fund History",
  },

];

// UpdatePermissions