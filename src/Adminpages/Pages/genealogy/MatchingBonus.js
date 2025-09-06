import { FilterAlt } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";

const VipBonus = () => {
    const [loding, setloding] = useState(false);
    const [data, setData] = useState([]);
    const [from_date, setFrom_date] = useState("");
    const [to_date, setTo_date] = useState("");
    const [search, setSearch] = useState("");

    const VipBonusFn = async () => {
        setloding(true);
        try {
            const res = await axiosInstance.post(API_URLS?.weekly_bonus_data, {
                start_date: from_date,
                end_date: to_date,
                username: search,
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
    useEffect(() => {
        VipBonusFn()
    }, [])
    const tablehead = [
        <span>S.No.</span>,
        <span>User Id</span>,
        <span>Name</span>,
        <span>Mobile</span>,
        <span>Email</span>,
        <span>Amount</span>,
        <span>Date/Time</span>,
        <span>Description</span>,
    ];

    const tablerow = data?.map((i, index) => {
        return [
            <span>{index + 1}</span>,
            <span>{i?.username}</span>,
            <span>{i?.full_name}</span>,
            <span>{i?.mobile}</span>,
            <span>{i?.email}</span>,
            <span>{i?.l01_amount}</span>,
            <span>{moment(i?.l01_date).format("DD-MM-YYYY HH:mm:ss")}</span>,
            <span>{i?.l01_transection_type}</span>,
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
                    onClick={() => VipBonusFn()}
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

export default VipBonus;
