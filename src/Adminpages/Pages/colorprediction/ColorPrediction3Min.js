import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SweetAlert from "sweetalert2";
import { useSocket } from "../../../shared/socket/SocketContext";
import pr0 from "../../Assets/number/0.png";
import pr1 from "../../Assets/number/11.png";
import pr2 from "../../Assets/number/22.png";
import pr3 from "../../Assets/number/33.png";
import pr4 from "../../Assets/number/4.png";
import pr5 from "../../Assets/number/5.png";
import pr6 from "../../Assets/number/6.png";
import pr7 from "../../Assets/number/7.png";
import pr8 from "../../Assets/number/8.png";
import pr9 from "../../Assets/number/9.png";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";

const ColorPrediction3Min = () => {
  const image_array = [
    pr0, pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8, pr9
  ]
  let preValue=0;
  const socket = useSocket();
  const [amount, setAmount] = useState([]);
  const [data, setData] = useState();
  const [three_min_time, setThree_min_time] = useState("0_0");
  const show_this_three_min_time_sec = React.useMemo(
    () => String(three_min_time?.split("_")?.[1]).padStart(2, "0"),
    [three_min_time]
  );

  const show_this_three_min_time_min = React.useMemo(
    () => String(three_min_time?.split("_")?.[0]).padStart(2, "0"),
    [three_min_time]
  );


  React.useEffect(() => {
    const handleFiveMin = (onemin) => {
      const t = Number(String(onemin)?.split("_")?.[1]);
      const min = Number(String(onemin)?.split("_")?.[0]);
      const time_to_be_intro = t > 0 ? 60 - t : t;
      let fivemin = `${
        4 - (Number(t === 0 ? preValue : min) % 5)
      }_${time_to_be_intro}`;
      preValue = min;
      setThree_min_time(fivemin);
    };
    const handleFiveMinAmount = (fivemin) => {
      setAmount(JSON.parse(fivemin))
    };

    socket.on("onemin", handleFiveMin);
    socket.on("oneminwingoamountfivemin", handleFiveMinAmount);

    return () => {
      socket.off("onemin", handleFiveMin);
      socket.on("oneminwingoamountfivemin", handleFiveMinAmount);

    };
  }, []);


  async function manuallyWinningAPI(num_type) {
    const newreqBody = {
      gid: 3,
      release_no: num_type,
    };
    try {
      const res = await axiosInstance.post(API_URLS.wingo_result_api, newreqBody);
      toast(res?.data?.msg);
      setData(res?.data?.releaseNo)
      console.log(res?.data?.msg)
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
        {React.useMemo(() => {
          return (
            <Stack direction="row" className="!text-2xl">
              <Box className="timerBoxone">
                {show_this_three_min_time_min?.substring(0, 1)}
              </Box>
              <Box className="timerBox">
                {show_this_three_min_time_min?.substring(1, 2)}
              </Box>
              <Box className={"!font-bold"}>:</Box>
              <Box className="timerBox">
                {show_this_three_min_time_sec?.substring(0, 1)}
              </Box>
              <Box className="timerBoxfour">
                {show_this_three_min_time_sec?.substring(1, 2)}
              </Box>
            </Stack>
          );
        }, [show_this_three_min_time_sec])}

        {data && (
          <div className="font-bold bg-white w-fit py-1 px-2">Number: {data}</div>
        )}
      </div>
      <div className="!mt-5 flex justify-center gap-10">
        {image_array?.map((item, index) => {
          return <>
            <div >
              <img src={item} alt="" className="w-[70px] !cursor-pointer"
               onClick={() => handleImageClick(index)}/>
              <p className="border-black border  mt-5 text-center">{amount?.[index]?.mid_amount || 0}</p></div>
          </>
        })}
      </div>

      <div className=" !mt-10 !flex-wrap flex justify-center gap-10">
        {["Big", "Small", "Green", "Violet", "Red"]?.map((item, index) => {
          return <>
            <div >
              <button className={` text-white p-2 text-xl px-5   font-bold ${item === "Big" ? "!bg-yellow-500" : item === "Small" ? "!bg-blue-500" :
                item === "Green" ? "bg-green-600" : item === "Violet" ? "bg-violet-500" : item === "Red" ? "bg-red-600" : ""}`}
              >{item}</button>
              <p className="border-black border mt-5 text-center">{amount?.[index + 10]?.mid_amount || 0}</p></div>
          </>
        })}
      </div>

    </div>
  );
};

export default ColorPrediction3Min;
