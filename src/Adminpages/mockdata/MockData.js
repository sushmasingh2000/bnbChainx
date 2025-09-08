import {
  ColorizeRounded, Compare,
  DownhillSkiing,
  Games,
  LoginOutlined,
  MonetizationOn,
  Money,
  RowingSharp,
  SelfImprovement,
  WheelchairPickupOutlined
} from "@mui/icons-material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
export const all_Data = [
  // {
  //   id: 1,
  //   navLink: "/master",
  //   navItem: "Master",
  //   navIcon: (
  //     <span>
  //       <LeaderboardSharp color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [],
  // },
  {
    id: 2,
    navLink: "/admindashboard",
    navItem: "Dashboard",
    navIcon: (
      <span>
        <DashboardCustomizeIcon color="#15317E" fontSize="medium" />
      </span>
    ),
    subcomponent: [],
  },


  // {
  //   id: 2,
  //   navLink: "/player",
  //   navItem: "Player",
  //   navIcon: (
  //     <span>
  //       <SportsEsportsIcon color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [
  //     {
  //       id: 2.2,
  //       navLink: "/player",
  //       navItem: "All Player",
  //       navIcon: (
  //         <span>
  //           <Diversity1Icon color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 2.3,
  //       navLink: "/loginApproval",
  //       navItem: "LogIn Approval",
  //       navIcon: (
  //         <span>
  //           <LoginSharp color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //   ],
  // },

  {
    id: 6,
    navLink: "/levelBonus",
    navItem: "Income",
    navIcon: (
      <span>
        <CardGiftcardIcon color="#15317E" fontSize="medium" />
      </span>
    ),
    subcomponent: [

      {
        id: 6.3,
        navLink: "/levelBonus",
        navItem: "Level Bonus",
        navIcon: (
          <span>
            <SelfImprovement color="#15317E" fontSize="medium" />
          </span>
        ),
      },
      // {
      //   id: 6.4,
      //   navLink: "/matching",
      //   navItem: "Matching Bonus",
      //   navIcon: (
      //     <span>
      //       <RowingSharp color="#15317E" fontSize="medium" />
      //     </span>
      //   ),
      // },

      // {
      //   id: 8.5,
      //   navLink: "/salarybonus",
      //   navItem: "Booster Bonus",
      //   navIcon: (
      //     <span>
      //       <WheelchairPickupOutlined color="#15317E" fontSize="medium" />
      //     </span>
      //   ),
      // },

      {
        id: 8.5,
        navLink: "/giftBonus",
        navItem: "DIRECT Bonus",
        navIcon: (
          <span>
            <WheelchairPickupOutlined color="#15317E" fontSize="medium" />
          </span>
        ),
      },
      // {
      //   id: 8.5,
      //   navLink: "/weeklybonus",
      //   navItem: "Weekly Recovery",
      //   navIcon: (
      //     <span>
      //       <WheelchairPickupOutlined color="#15317E" fontSize="medium" />
      //     </span>
      //   ),
      // },
      {
        id: 8.6,
        navLink: "/vipbonus",
        navItem: "ROI Bonus",
        navIcon: (
          <span>
            <WheelchairPickupOutlined color="#15317E" fontSize="medium" />
          </span>
        ),
      },

    ],
  },
  // {
  //   id: 38,
  //   navLink: "/set_bonus",
  //   navItem: "Set ZP Amount",
  //   navIcon: (
  //     <span>
  //       <BoltRounded color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [],
  // },
  // {
  //   id: 38,
  //   navLink: "/coupon",
  //   navItem: "Coupon",
  //   navIcon: (
  //     <span>
  //       <ContactSupportOutlined color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [],
  // },
  // {
  //   id: 8,
  //   navLink: "/fund",
  //   navItem: "Fund",
  //   navIcon: (
  //     <span>
  //       <Money color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [
  //     {
  //       id: 8.1,
  //       navLink: "/fund",
  //       navItem: "Credit Fund",
  //       navIcon: (
  //         <span>
  //           <MonetizationOn color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 8.5,
  //       navLink: "/debit_fund",
  //       navItem: "Debit Fund",
  //       navIcon: (
  //         <span>
  //           <MonetizationOn color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 8.2,
  //       navLink: "/fund/transfer-fund-history",
  //       navItem: "Credit Fund Transfer History",
  //       navIcon: (
  //         <span>
  //           <Transcribe color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 8.2,
  //       navLink: "/fund/debited-transfer-fund-history",
  //       navItem: "Debit Fund Transfer History",
  //       navIcon: (
  //         <span>
  //           <Transcribe color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 8.2,
  //       navLink: "/fund/p2p-history",
  //       navItem: "P2P History",
  //       navIcon: (
  //         <span>
  //           <Transcribe color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },

  //   ],
  // },


  // {
  //   id: 11,
  //   navLink: "/color-prediction-1-min",
  //   navItem: "Wingo",
  //   navIcon: (
  //     <span>
  //       <Games color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [
  //     {
  //       id: 11.1,
  //       navLink: "/color-prediction-1-min",
  //       navItem: "Wingo 1 Min",
  //       navIcon: (
  //         <span>
  //           <PlayCircleFilledSharp color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 11.2,
  //       navLink: "/color-prediction-2-min",
  //       navItem: "Wingo 2 Min",
  //       navIcon: (
  //         <span>
  //           <ColorizeRounded color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 11.3,
  //       navLink: "/color-prediction-3-min",
  //       navItem: "Wingo 3 Min",
  //       navIcon: (
  //         <span>
  //           <HistoryEdu color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },

  //   ],
  // },
  // {
  //   id: 55,
  //   navLink: "/roulette_result",
  //   navItem: "Roulette",
  //   navIcon: (
  //     <span>
  //       <Ballot color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [],
  // },
  // {
  //   id: 111,
  //   navLink: "/satta_desawar",
  //   navItem: "Satta Matka",
  //   navIcon: (
  //     <span>
  //       <Games color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [
  //     {
  //       id: 111.1,
  //       navLink: "/satta_desawar",
  //       navItem: "Desawar",
  //       navIcon: (
  //         <span>
  //           <PlayCircleFilledSharp color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 111.2,
  //       navLink: "/satta_gali",
  //       navItem: "Gali",
  //       navIcon: (
  //         <span>
  //           <ColorizeRounded color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 111.3,
  //       navLink: "/satta_faridabad",
  //       navItem: "Faridabad",
  //       navIcon: (
  //         <span>
  //           <HistoryEdu color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 111.4,
  //       navLink: "/satta_ghaziyabad",
  //       navItem: "Ghaziabad",
  //       navIcon: (
  //         <span>
  //           <HistoryEdu color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //   ],
  // },

  //  {
  //   id: 11,
  //   navLink: "/inr_Paying",
  //   navItem: "Fund Request",
  //   navIcon: (
  //     <span>
  //       <Games color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [],
  // },
  // {
  //   id: 111,
  //   navLink: "/inr_Pending",
  //   navItem: "INR Manually",
  //   navIcon: (
  //     <span>
  //       <Games color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [
  //     {
  //       id: 111.1,
  //       navLink: "/inr_Pending",
  //       navItem: "Pending",
  //       navIcon: (
  //         <span>
  //           <PlayCircleFilledSharp color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 111.4,
  //       navLink: "/inr_Approve",
  //       navItem: "Processing",
  //       navIcon: (
  //         <span>
  //           <ColorizeRounded color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 111.2,
  //       navLink: "/inr_Success",
  //       navItem: "Success",
  //       navIcon: (
  //         <span>
  //           <PlayCircleFilledSharp color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 111.3,
  //       navLink: "/inr_reject",
  //       navItem: "Reject",
  //       navIcon: (
  //         <span>
  //           <ColorizeRounded color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //   ],
  // },
  // {
  //   id: 11,
  //   navLink: "/zp_token",
  //   navItem: "Zp Token",
  //   navIcon: (
  //     <span>
  //       <Games color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [
  //     {
  //       id: 11.1,
  //       navLink: "/zp_token",
  //       navItem: "Paying",
  //       navIcon: (
  //         <span>
  //           <PlayCircleFilledSharp color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 11.2,
  //       navLink: "/zp_token_payout",
  //       navItem: "Payout",
  //       navIcon: (
  //         <span>
  //           <ColorizeRounded color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },

  //   ],
  // },
  // {
  //   id: 11,
  //   navLink: "/bankdata",
  //   navItem: "Bank",
  //   navIcon: (
  //     <span>
  //       <Games color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [
  //     {
  //       id: 111.1,
  //       navLink: "/bankdata",
  //       navItem: "Bank",
  //       navIcon: (
  //         <span>
  //           <PlayCircleFilledSharp color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },



  //   ],
  // },
  // {
  //   id: 22,
  //   navLink: "/upline_team",
  //   navItem: "Team",
  //   navIcon: (
  //     <span>
  //       <People color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [
  //     {
  //       id: 22.1,
  //       navLink: "/upline_team",
  //       navItem: "Upline Team",
  //       navIcon: (
  //         <span>
  //           <UpcomingSharp color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 22.2,
  //       navLink: "/down_team",
  //       navItem: "Downline Team",
  //       navIcon: (
  //         <span>
  //           <DownhillSkiing color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //   ],
  // },
  // {
  //   id: 13,
  //   navLink: "/aviator_report",
  //   navItem: "Report",
  //   navIcon: (
  //     <span>
  //       <Report color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [
  //     {
  //       id: 13.1,
  //       navLink: "/aviator_report",
  //       navItem: "Aviator Report",
  //       navIcon: (
  //         <span>
  //           <ReportProblem color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 13.2,
  //       navLink: "/wingo_report",
  //       navItem: "Wingo Report",
  //       navIcon: (
  //         <span>
  //           <ReportOff color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //     {
  //       id: 13.3,
  //       navLink: "/trx_report",
  //       navItem: "Trx Report",
  //       navIcon: (
  //         <span>
  //           <ReportGmailerrorred color="#15317E" fontSize="medium" />
  //         </span>
  //       ),
  //     },
  //   ],
  // },
  // {
  //   id: 17,
  //   navLink: "/daybook_report",
  //   navItem: "DayBook Report",
  //   navIcon: (
  //     <span>
  //       <Book color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  // },
  {
    id: 11,
    navLink: "/inr_Payout",
    navItem: "Payout",
    navIcon: (
      <span>
        <Games color="#15317E" fontSize="medium" />
      </span>
    ),
    subcomponent: [],
  },
  {
    id: 22.2,
    navLink: "/down_team",
    navItem: "Downline Team",
    navIcon: (
      <span>
        <DownhillSkiing color="#15317E" fontSize="medium" />
      </span>
    ),
    subcomponent: [],
  },
  {
    id: 31,
    navLink: "/topup",
    navItem: "Top Up",
    navIcon: (
      <span>
        <LoginOutlined color="#15317E" fontSize="medium" />
      </span>
    ),
    subcomponent: [],
  },
  {
    id: 44,
    navLink: "/top_up",
    navItem: "Top Up Detail",
    navIcon: (
      <span>
        <Compare color="#15317E" fontSize="medium" />
      </span>
    ),
    subcomponent: [],
  },
  //  {
  //     id: 8,
  //     navLink: "/admin_fund",
  //     navItem: "Upload Qr",
  //     navIcon: (
  //       <span>
  //         <Money color="#15317E" fontSize="medium" />
  //       </span>
  //     ),
  //     subcomponent: [],
  //   },
  {
    id: 14,
    navLink: "/user_detail",
    navItem: "User Details",
    navIcon: (
      <span>
        <AddToPhotosIcon color="#15317E" fontSize="medium" />
      </span>
    ),
    subcomponent: [],
  },


  // {
  //   id: 12,
  //   navLink: "/dashboard",
  //   navItem: "User Panel",
  //   navIcon: (
  //     <span>
  //       <ViewCarouselIcon color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  // },
  // {
  //   id: 8,
  //   navLink: "/change-password",
  //   navItem: "Change Password",
  //   navIcon: (
  //     <span>
  //       <LockResetIcon color="#15317E" fontSize="medium" />
  //     </span>
  //   ),
  //   subcomponent: [],
  // },


];
