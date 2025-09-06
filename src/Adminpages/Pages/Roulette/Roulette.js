import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import SweetAlert from "sweetalert2";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { useSocket } from "../../../shared/socket/SocketContext";

const RouletteResult = () => {
    const socket = useSocket();
    const [one_min_time, setOne_min_time] = useState(0);
    const [amountdata, setAmount] = useState([]);
    const [data, setData] = useState();
    const show_this_one_min_time = String(one_min_time).padStart(2, "0");
    React.useEffect(() => {
        const handleOneMin = (onemin) => {
            setOne_min_time(onemin);
        };

        const handleOneMinAmount = (onemin) => {
            setAmount(JSON.parse(onemin));
        };

        socket.on("oneminrollet", handleOneMin);
        socket.on("oneminrouletteamount", handleOneMinAmount);
        return () => {
            socket.off("oneminrollet", handleOneMin);
            socket.off("oneminrouletteamount", handleOneMinAmount);
        };
    }, []);

    async function manuallyWinningAPI(num_type) {
        const newreqBody = {
            release_no: num_type,
        };
        try {
            const res = await axiosInstance.post(API_URLS.rollet_result, newreqBody);
            toast(res?.data?.msg);
            setData(res?.data?.releaseNo);
            console.log(res?.data?.msg);
        } catch (e) {
            console.log(e);
        }
    }

    {/* <p className="px-1">{(dummy?.find(i => parseInt(i.number) === index) || {})?.amount || "0"}</p> */ }
    const handleImageClick = (index) => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: "You want to release this number!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'custom-confirm',
                cancelButton: 'custom-cancel'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                manuallyWinningAPI(String(index));
            }
        });
    };

    return (
        <div>
            <div className="!flex !justify-between !p-3">
                {React.useMemo(() => {
                    return (
                        <Stack direction="row" className="!text-2xl">
                            <Box className="timerBoxone">0</Box>
                            <Box className="timerBox">0</Box>
                            <Box className={" !font-bold"}>:</Box>
                            <Box className="timerBox">
                                {show_this_one_min_time?.substring(0, 1)}
                            </Box>
                            <Box className="timerBoxfour">
                                {show_this_one_min_time?.substring(1, 2)}
                            </Box>
                        </Stack>
                    );
                }, [show_this_one_min_time])}
                {data && (
                    <div className="font-bold bg-white w-fit py-1 px-2">Number: {data}</div>
                )}
            </div>

            <div className="!mt-5 flex flex-wrap justify-center gap-10">
                {Array?.from(new Array(37))?.map((_, index) => (
                    <div key={index} className="!flex justify-between  !cursor-pointer border border-black  text-center"
                        onClick={() => handleImageClick(index)} >
                        <p className="border-r px-1 border-black">{index}</p>
                        <p className="px-1">{amountdata?.find((i) => Number(i?.number) === index)?.amount || 0}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RouletteResult;
