import { FilterAltOutlined } from "@mui/icons-material";
import { Button, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";

const LogInApproval = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [isLoding, setisLoding] = useState(false);
  const candidateName = async () => {
    setisLoding(true);
    try {
      const res = await axiosInstance.get(API_URLS?.get_name_code, {
        params: {
          userid: search,
        },
      });
      setResult(res?.data?.data);
    } catch (e) {
      console.log(e);
    }
    setisLoding(false);
  };

  const browserapprovalStatus = async (id) => {
    try {
      const res = await axiosInstance.get(
        `${API_URLS?.login_approval}?t_id=${id}`
      );
      toast.success(res?.data?.msg);
      setResult([])
    } catch (e) {
      console.log(e);
    }
  };

  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Action</span>,
  ];
  const tablerow = [
    {
      id: result?.id,
      username: result?.username,
      full_name: result?.full_name,
      mobile: result?.mobile,
    },
  ] ?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.username}</span>,
      <span>{i?.full_name}</span>,
      <span>
        <Switch
          className="!text-green-500"
          onClick={() => {
            browserapprovalStatus(i?.id);
          }}
        />
      </span>,
    ];
  });

  return (
    <div>
      <div className="flex px-2 gap-5 !justify-start py-2">
        <TextField
          className="!h-[10%]"
          id="username"
          name="username"
          placeholder="User Id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={candidateName}
          variant="contained"
          endIcon={<FilterAltOutlined />}
        >
          Filter
        </Button>
      </div>
      <CustomTable tablehead={tablehead} tablerow={tablerow}  isLoading={isLoding}/>
    </div>
  );
};

export default LogInApproval;
