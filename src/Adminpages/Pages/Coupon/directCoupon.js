import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { candidateName, getCoupon } from "../../Services";

const DirectCoupon = () => {
    const [loding, setloding] = useState(false);

    const { data: coupon } = useQuery(
        ["coupon"],
        () => getCoupon(),
        {
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus:false

        }
    );
    const coupon_data = coupon?.data?.data || [];


    const initialValue = {
        u_id: "",
        c_id: "Select Coupon Code / Amount",
    };

    const fk = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        onSubmit: () => {
            directadduserCoupon(fk.values);
        },
    });

    async function directadduserCoupon(reqBody) {
        const req = {
            u_id: reqBody?.user_id_table,
            c_id: reqBody?.c_id,
        };
        setloding(true);
        try {
            const res = await axiosInstance.post(API_URLS.add_coupon_user, req);
            toast.success(res?.data?.msg);
            if (res?.data?.msg === "Coupon Added successfully.") {
                fk.handleReset();
            }
        } catch (e) {
            console.log(e);
        }
        setloding(false);
    }
    const { data } = useQuery(
        ["getname", fk.values.u_id],
        () => candidateName({ userid: fk.values.u_id }),
        {
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus:false
        }
    );
    const result = data?.data?.data;
    useEffect(() => {
        fk.setFieldValue("user_id_table", result?.id);
    }, [result]);

    if (loding)
        return (
            <div className="w-[100%] h-[100%] flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    return (
        <div className="!flex justify-center items-center w-full">
            <div className="p-5 lg:w-1/2 md:w-3/4 w-full bg-white !bg-opacity-30 !rounded-lg">
                <p className="!text-center font-bold !py-4 text-lg">Add Coupon To User</p>
                <div className="grid grid-cols-1 gap-[6%] gap-y-4">
                    <p className="font-bold mt-5">Coupon Code / Amount</p>
                    <TextField
                        fullWidth
                        select
                        size="small"
                        id="c_id"
                        name="c_id"
                        value={fk.values.c_id}
                        onChange={fk.handleChange}
                    >
                        <MenuItem value={"Select Coupon Code / Amount"}>
                            Select Coupon Code / Amount
                        </MenuItem>
                        {coupon_data?.filter(item => item?.coupon_status === "Active" && item?.coupon_limit>item?.coupon_uses)?.map(item => {
                            return (
                                <MenuItem key={item?.id} value={item?.id}>
                                    {item?.coupon_code}
                                    <span className="text-blue-500 !font-bold !ml-1">
                                        ({item?.coupon_amount})
                                    </span>
                                </MenuItem>
                            );
                        })}
                    </TextField>
                    <div>
                        <p className="font-bold ">User ID </p>
                        <TextField
                            fullWidth
                            id="u_id"
                            name="u_id"
                            placeholder="User ID"
                            value={fk.values.u_id}
                            onChange={fk.handleChange}
                        />{" "}
                        {fk.values.u_id ? (
                            result ? (
                                <div className="no-error flex justify-between">
                                    <span> Referral From: {result?.full_name}</span>
                                </div>
                            ) : (
                                <div className="error">Invalid Referral Id</div>
                            )
                        ) : null}
                    </div>

                </div>
                <div className="flex justify-end gap-3 !mt-5">
                    <Button
                        onClick={() => fk.handleReset()}
                        variant="contained"
                        className="!bg-[#E74C3C]"
                    >
                        Clear
                    </Button>
                    <Button
                        onClick={() => fk.handleSubmit()}
                        variant="contained"
                        className="!bg-[#07BC0C]"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DirectCoupon;
