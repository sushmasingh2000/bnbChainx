import { FilterAlt, Lock } from "@mui/icons-material";
import { Button, Switch, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import moment from "moment";
import SweetAlert from "sweetalert2";

const INRPending = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [loding, setloding] = useState(false);

  const INRPendingFunction = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.inr_manually, {
        start_date: from_date,
        end_date: to_date,
        username: search,
        payout_type: 1,
      });
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

  const changeStatusApprovedFunction = async (id) => {
    try {
      const res = await axiosInstance.post(API_URLS?.inr_manually_Approve, {
        t_id: id,
        status_type: 2,
      });
      if (res) INRPendingFunction();
      toast(res?.data?.msg);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (id) => {
    SweetAlert.fire({
      title: "Are you sure?",
      text: "You want to Approve this Amount!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "custom-confirm",
        cancelButton: "custom-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        changeStatusApprovedFunction(id);
      }
    });
  };
  const changeStatusRejectFunction = async (id) => {
    try {
      const res = await axiosInstance.post(API_URLS?.inr_manually_Approve, {
        t_id: id,
        status_type: 3,
      });
      if (res) INRPendingFunction();
      toast(res?.data?.msg);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRejectSubmit = (id) => {
    SweetAlert.fire({
      title: "Are you sure?",
      text: "You want to Approve this Amount!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "custom-confirm",
        cancelButton: "custom-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        changeStatusRejectFunction(id);
      }
    });
  };
  useEffect(() => {
    INRPendingFunction();
  }, []);

  const tablehead = [
    <span>S.No</span>,
    <span>Name</span>,
    <span>User Id</span>,
    <span>Mobile</span>,
    <span>Amount</span>,
    <span>Status</span>,
    <span>UTR Number</span>,
    <span>Req Date</span>,
    <span>Success Date</span>,
    <span>Action</span>,
  ];

  const tablerow = data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.full_name}</span>,
      <span>{i?.username}</span>,
      <span>{i?.mobile}</span>,
      <span>{Number(i?.tr15_amt)?.toFixed(2)}</span>,
      <span>{i?.tr15_status}</span>,
      <span className="">{i?.tr15_trans}</span>,
      <span className="">
        {moment(i?.tr15_date)?.format("DD-MM-YYYY HH:mm:ss")}
      </span>,
      <span className="">
        {i?.tr15_status === "Pending"
          ? "--"
          : moment(i?.success_date).format("DD-MM-YYYY HH:mm:ss")}
      </span>,

      <span>
        {i?.tr15_status === "Pending" ? (
          <Button
            variant="contained"
            className="!bg-[#198754]"
            onClick={() => handleSubmit(i?.tr15_id)}
          >
            Approve
          </Button>
        ) : (
          <Lock />
        )}
        <br />
        {i?.tr15_status === "Pending" ? (
          <Button
            variant="contained"
            className="!bg-[#e65b5b] !mt-1"
            onClick={() => handleRejectSubmit(i?.tr15_id)}
          >
            Reject
          </Button>
        ) : (
          <Lock />
        )}
      </span>,
    ];
  });

  return (
    <div>
      <div className="flex px-2 gap-5 !justify-start py-2">
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
        <TextField
          type="search"
          placeholder="Search by user id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => INRPendingFunction()}
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
      />
    </div>
  );
};

export default INRPending;
