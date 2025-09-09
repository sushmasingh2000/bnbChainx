import { FilterAlt } from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import moment from "moment";
import { endpoint } from "../../../utils/APIRoutes";
import CustomTable from "../../../Adminpages/Shared/CustomTable";
import { apiConnectorPost } from "../../../utils/APIConnector";
const DownlineTeams = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState("upline");
  const [search, setSearch] = useState("");

  const UserBonusFn = async (page) => {
    setloding(true);
    try {
      const res = await apiConnectorPost(
        type === "downline"
          ? endpoint?.get_downline_team
          : endpoint?.get_upline_team,
        {
          userid: search,
        }
      );
      setData(res?.data?.result || []);
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };

  const tablehead = [
    <span>S.No.</span>,
    <span>Level</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>First Topup</span>,
    <span>FT Date</span>,
    <span>FT By</span>,
    <span>Spon Id</span>,
    <span>Sp. Name</span>,
    <span>Sp. Mobile</span>,
    <span>Sp. Email</span>,
  ];

  const tablerow = data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.level_id}</span>,

      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.lgn_real_name || "--"}</span>,
      <span>{i?.lgn_real_mob || "--"}</span>,
      <span>{i?.lgn_real_email || "--"}</span>,
      <span>{Number(i?.topup_real_amount)?.toFixed(2) || "--"}</span>,
      <span>{moment(i?.topup_date)?.format("DD-MM-YYYY HH:mm:ss") || "--"}</span>,
      <span>{i?.topup_through || "--"}</span>,
      <span>{i?.sponsor_cust_id}</span>,
      <span>{i?.sponsor_name || "--"}</span>,
      <span>{i?.sponsor_mob || "--"}</span>,
      <span>{i?.sponsor_email || "--"}</span>,
    ];
  });

  return (
    <div>
      <div className="flex flex-wrap gap-4 p-4 items-center">
        {/* <TextField
          fullWidth
          sx={{ maxWidth: { xs: "100%", sm: 250 } }}
          type="search"
          placeholder="Search by user id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}

        <RadioGroup
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex flex-row gap-2"
          size={"small"}
        >
          <FormControlLabel
            value="upline"
            control={<Radio size="small" />}
            label="Upline"
          />
          <FormControlLabel
            value="downline"
            control={<Radio size="small" />}
            label="Downline"
          />
        </RadioGroup>

        <Button
          onClick={UserBonusFn}
          variant="contained"
          startIcon={<FilterAlt />}
        >
          Filter
        </Button>
      </div>
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
        isPagination={false}
      />
      {/* <div className="flex justify-center mt-6">
        <CustomToPagination setPage={setPage} page={page} data={data} />
      </div> */}
    </div>
  );
};

export default DownlineTeams;
