import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import SweetAlert from "sweetalert2";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { useSocket } from "../../../shared/socket/SocketContext";

const GaliResult = () => {
    const socket = useSocket();
    const [one_min_time, setOne_min_time] = useState(0);
    const [amountdata, setAmount] = useState([]);
    const [data, setData] = useState();
    const [minut, setMinut] = useState(0);


    React.useEffect(() => {
        const handleOneMin = (onemin) => {
            const t = Number(String(onemin)?.split("_")?.[1]);
            const min = Number(String(onemin)?.split("_")?.[0]);
            const time_to_be_intro = t > 0 ? 60 - t : t;
            const time_to_be_intro_mid_min = min > 0 ? 60 - min : min;
      
            const time_to_be_intro_min = time_to_be_intro_mid_min >= 30 ? time_to_be_intro_mid_min - 30 : time_to_be_intro_mid_min
            setOne_min_time(time_to_be_intro);
            setMinut(time_to_be_intro_min)
        };

        const handleOneMinAmount = (onemin) => {
            setAmount(JSON.parse(onemin));
        };

        socket.on("onemin", handleOneMin);
        socket.on("oneminsattagaliamount", handleOneMinAmount);
        return () => {
            socket.off("onemin", handleOneMin);
            socket.off("oneminsattagaliamount", handleOneMinAmount);
        };
    }, []);

    async function manuallyWinningAPI(num_type) {
        const newreqBody = {
            gid: 3,
            release_no: num_type,
        };
        try {
            const res = await axiosInstance.post(API_URLS.satka_matka_result, newreqBody);
            toast(res?.data?.msg);
            setData(res?.data?.releaseNo);
            console.log(res?.data?.msg);
        } catch (e) {
            console.log(e);
        }
    }


    const handleImageClick = (index) => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: "You want to release this number!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'custom-confirm', // Custom class for OK button
                cancelButton: 'custom-cancel'    // Custom class for Cancel button
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
            <Stack direction="row" className="!text-2xl">
                            <Box className="timerBox">
                            {String(minut)?.padStart(2, "0")}
                            </Box>
                            <Box className={" !font-bold"}>:</Box>
                            <Box className="timerBoxfour">
                            {String(one_min_time)?.padStart(2, "0")}
                            </Box>
                        </Stack>
                {data && (
                    <div className="font-bold bg-white w-fit py-1 px-2">Number: {data}</div>
                )}
            </div>

            <div className="!mt-5 flex flex-wrap justify-center gap-10">
                {Array?.from(new Array(100))?.map((_, index) => (
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

export default GaliResult;
