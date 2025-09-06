import { Add, CopyAllSharp, CopyAllTwoTone } from "@mui/icons-material";
import copy from "clipboard-copy";
import { Button, Switch, TablePagination } from "@mui/material";
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { getCoupon } from "../../Services";
import CustomTable from "../../Shared/CustomTable";

const Coupon = () => {

    const functionTOCopy = (value) => {
        copy(value);
        toast.success("Copied to clipboard!");
    };
    const client = useQueryClient()
    const navigate = useNavigate();

    const { isLoading, data } = useQuery(
        ["coupon"],
        () => getCoupon(),
        {
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false
        }
    );
    const coupon_data = data?.data?.data || [];

    const UpdateCoupon = async (id) => {
        try {
            const res = await axiosInstance.get(API_URLS?.update_coupon_record + id)
            toast(res?.data?.msg, { id: 1 })
            client.refetchQueries("coupon");
        }
        catch (e) {
            console.log(e)
        }
    }

    const tablehead = [
        <span>S.No.</span>,
        <span>Coupon Code</span>,
        <span>Amount</span>,
        <span>Status</span>,
        <span>Limit</span>,
        <span>No. of Uses</span>,
        <span>Date/Time</span>,
        <span>Action</span>,

    ];

    const tablerow = coupon_data?.map((i, index) => {
        return [
            <span>{index + 1}</span>,
            <span>{i?.coupon_code} <CopyAllTwoTone className="!text-green-800 !text-lg"
                onClick={() => {
                    functionTOCopy(
                        `${i?.coupon_code}`
                    );
                }} /></span>,
            <span>{i?.coupon_amount}</span>,
            <span>{i?.coupon_status}</span>,
            <span>{i?.coupon_limit}</span>,
            <span>{i?.coupon_uses}</span>,
            <span>{moment(i?.created_at).format("DD-MM-YYYY HH:mm:ss")}</span>,
            <span>
                <Switch
                    checked={i?.coupon_status === "Active" ? true : false}
                    className="!text-green-600"
                    onChange={() => UpdateCoupon(i?.id)}
                />
            </span>
        ];
    });

    return (
        <div>
            <div className="!flex !justify-between">
                <Button
                    className="!my-5 !bg-white"
                    onClick={() => navigate('/addcouponuser')}
                    endIcon={<Add />}
                >
                    Coupon To User
                </Button>
                <Button
                    className="!my-5 !bg-white"
                    onClick={() => navigate('/addcoupon')}
                    endIcon={<Add />}
                >
                    Add Coupon
                </Button>
            </div>
            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
                isLoading={isLoading}
            />
        </div>
    );
};

export default Coupon;
