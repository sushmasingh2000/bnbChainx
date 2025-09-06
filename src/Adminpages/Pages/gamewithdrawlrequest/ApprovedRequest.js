import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
    Button,
    TablePagination,
    TextField
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import  toast  from "react-hot-toast";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
const ApprovedRequest = () => {
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const client = useQueryClient();
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");

  const withdrawlRequestFunction = async () => {
    setloding(true)
   //if (!from_date || !to_date) return toast("Both date should be selected");
    try {
      const res = await axiosInstance.post(
        API_URLS?.withdrawl_approved_list,
        {
          start_date: from_date,
          end_date: to_date,
        }
      );
      setData(res?.data?.data || []);
      if (res) {
        setTo_date("");
        setFrom_date("");
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false)
  };

  useEffect(()=>{
    withdrawlRequestFunction()
  },[])

  const tablehead = [
    <span>S.No</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Amount</span>,
    <span>Mobile No.</span>,
    <span>Account No</span>,
    <span>IFSC</span>,
    <span>Status</span>,
    <span>Date/Time</span>,
  ];

  const tablerow = data?.map((i , index) => {
    return [
      <span>{index+1}</span>,
      <span>{i?.username}</span>,
      <span>{i?.full_name}</span>,
      <span>{i?.tr15_amt}</span>,
      <span>{i?.mobile}</span>,
      <span>{i?.account}</span>,
      <span>{i?.ifsc}</span>,
      <span className="text-green-800">
        {i?.tr15_status}
      </span>,
      <span>{moment(i?.tr15_date)?.format("DD-MM-YYYY")}</span>
     
    ];
  });

  return (
    <div>
      <div className="flex px-2 !justify-start py-2 gap-2 !place-items-center">
        <span className="font-bold">From:</span>
        <TextField
          type="date"
         
          value={from_date}
          onChange={(e) => setFrom_date(e.target.value)}
        />
        <span className="font-bold">To:</span>
        <TextField
          type="date"
         
          value={to_date}
          onChange={(e) => setTo_date(e.target.value)}
        />
        <Button
          onClick={() => withdrawlRequestFunction()}
          variant="contained"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </div>
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />
     
    </div>
  );
};

export default ApprovedRequest;
