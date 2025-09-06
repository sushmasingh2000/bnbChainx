import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button, MenuItem, TextField } from "@mui/material";
import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";


const TrxReport = () => {
    const [loding, setloding] = useState(false);
    const [data, setData] = useState([]);
    const [from_date, setFrom_date] = useState("");
    const [to_date, setTo_date] = useState("");
    const [game_id, setGame_id] = useState("1");
    const value =
        (localStorage.getItem("logindataen") &&
            CryptoJS.AES.decrypt(
                localStorage.getItem("logindataen"),
                "anand"
            )?.toString(CryptoJS.enc.Utf8)) ||
        null;
    const user_id = value && JSON.parse(value)?.UserID;
    const TrxReportFunction = async () => {
        setloding(true);
        try {
            const res = await axiosInstance.post(API_URLS?.get_trx_report,
                {
                    start_date: from_date,
                    end_date: to_date,
                    game_id: game_id,
                    user_id: user_id,
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
        TrxReportFunction();
    }, []);



    const tablehead = [
        <span>S.No.</span>,
        <span>User Id</span>,
        <span>Name</span>,
        <span>Winning Amount</span>
    ];

    const tablerow = data?.map((i, index) => {
        return [
            <span>{index + 1}</span>,
            <span>{i?.username}</span>,
            <span>{i?.full_name}</span>,
            <span>{i?.winning_amount}</span>,
           
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
                 <span className="font-bold">Select Game:</span>
                 <TextField
                    select
                    size="small"
                    value={game_id}
                    onChange={(e) => 
                        setGame_id(e.target.value)
                        
                    }
                >
                    <MenuItem value="1">One Min</MenuItem>
                    <MenuItem value="2">Two Min</MenuItem>
                    <MenuItem value="3">Three Min</MenuItem>
                </TextField>
                <Button
                    onClick={() => TrxReportFunction()}
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

export default TrxReport;
