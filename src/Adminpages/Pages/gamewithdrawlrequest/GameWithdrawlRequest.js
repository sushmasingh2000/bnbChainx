import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, TablePagination, TextField } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
const GameWithdrawlRequest = () => {
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");

  const withdrawlRequestFunction = async () => {
    setloding(true);
    // if (!from_date || !to_date) return toast("Both date should be selected");
    try {
      const res = await axiosInstance.post(API_URLS?.withdrawl_Request
        , {
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
    setloding(false);
  };
  useEffect(() => {
    withdrawlRequestFunction();
  }, []);


  const changeStatusApprovedFunction = async (id) => {
    try {
      const res = await axiosInstance.get(
        `${API_URLS?.withdrawl_approved}?t_id=${id}`
      );
      if (res) withdrawlRequestFunction();
      toast(res?.data?.msg);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const changeStatusRejectFunction = async (id) => {
    try {
      const res = await axiosInstance.get(
        `${API_URLS?.withdrawl_reject}?t_id=${id}`
      );
      if (res) withdrawlRequestFunction();
      toast(res?.data?.msg);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const tablehead = [
    <span>S.No</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Amount</span>,
    <span>Mobile No</span>,
    <span>Bank Name</span>,
    <span>Account No.</span>,
    <span>IFSC</span>,
    <span>Status</span>,
    <span>Date</span>,
    <span>Action</span>,
  ];

  const tablerow = data?.map((i , index) => {
    return [
      <span>{index+1}</span>,
      <span>{i?.username}</span>,
      <span>{i?.full_name}</span>,
      <span>{Number(i?.tr15_amt)?.toFixed(2)}</span>,
      <span>{i?.mobile}</span>,
      <span>{i?.bank_name}</span>,
      <span>{i?.account}</span>,
      <span>{i?.ifsc}</span>,
      <span className={`${i?.tr15_status==="Pending" ?
        "text-red-600 !font-bold" :
        "text-green-800 !font-bold"
      }`}>
        {i?.tr15_status}
      </span>,
      <span>{moment(i?.tr15_date)?.format("DD-MM-YYYY HH:mm:ss")}</span>,
    
      <div className="flex flex-col gap-1">
        <Button
          variant="contained"
          className="!bg-[#198754]"
          onClick={() => changeStatusApprovedFunction(i?.tr15_id)}
        >
        Approve 
    
        </Button>
        <Button
          variant="contained"
          className="!bg-[#dc3545]"
          onClick={() => changeStatusRejectFunction(i?.tr15_id)}
        >
          Reject
        </Button>
      </div>,
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

export default GameWithdrawlRequest;
