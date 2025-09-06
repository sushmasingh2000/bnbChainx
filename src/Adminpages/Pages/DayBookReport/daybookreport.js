import { Button, MenuItem, TablePagination, TextField } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { candidateName } from "../../Services";
import CustomTable from "../../Shared/CustomTable";


const DayBookReport = () => {
    const [loding, setloding] = useState(false);
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const [game_id, setGame_id] = useState("1");
    const [day_book, setDay_book] = useState(" ");


    const initialValue = {
        username: "",
        date_time: "",
        game_id: "",
        day_book_type: ""
    };

    const fk = useFormik({
        initialValues: initialValue,
        enableReinitialize: true,
        onSubmit: () => {
            DayBookReportFunction(fk.values)
        },
    });
    const DayBookReportFunction = async (reqBody) => {
        setloding(true);
        const req = {
            username: reqBody?.user_name_table,
            date_time: date,
            game_id: game_id,
            day_book_type: day_book,
        }
        try {
            const res = await axiosInstance.post(API_URLS?.day_book_report,
                req
            );
            toast.success(res?.data?.msg);
            fk.handleReset();
            setData(res?.data?.data || []);
        } catch (e) {
            console.log(e);
        }
        setloding(false);
    };

    const { data: name } = useQuery(
        ["getname", fk.values.username],
        () => candidateName({ userid: fk.values.username }),
        {
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus:false
        }
    );
    const result = name?.data?.data;
    useEffect(() => {
        fk.setFieldValue("user_name_table", result?.username)
    }, [result])

    

    const tablehead = [
        <span>S.No.</span>,
        <span>User Id</span>,
        <span>Name</span>,
        <span>Betting Amount</span>,
        <span>Winning Amount</span>,
        <span>Date</span>,
    ];

    const tablerow = data?.map((i, index) => {
        return [
            <span>{index + 1}</span>,
            <span>{i?.username}</span>,
            <span>{i?.full_name}</span>,
            <span>{i?.betting_amount}</span>,
            <span>{i?.winning_amount}</span>,
            <span>{moment(i?.createdAt)?.format("DD-MM-YYYY HH:mm:ss")}</span>,

        ];
    });

    return (
        <div>
            <div className="flex px-2 !justify-start py-2 gap-2 !place-items-center">
                <span className="font-bold">User ID:</span>
               <div>
               <TextField
                    className="!h-[10%] "
                  
                    id="username"
                    name="username"
                    placeholder="User Id"
                    value={fk.values.username}
                    onChange={fk.handleChange}
                /> 
              
                {/* {fk.values.username ? (
                    result ? (
                        <div className="no-error !-mt-4"> From: {result?.full_name}</div>
                    ) : (
                        <div className="error">Invalid Referral Id</div>
                    )
                ) : null} */}
            
               </div>
                <span className="font-bold">Date:</span>
                <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <span className="font-bold">Select Game:</span>
                <TextField
                className="!w-[10%]"
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
                <span className="font-bold">Day Book :</span>
                <TextField
                className="!w-[10%]"
                    select
                    size="small"
                    value={day_book}
                    onChange={(e) =>
                        setDay_book(e.target.value)
                    }
                >
                    <MenuItem value="wingo">Wingo</MenuItem>
                    <MenuItem value="trx">Trx </MenuItem>
                    <MenuItem value="aviator">Aviator</MenuItem>
                    <MenuItem value="leser">Leser</MenuItem>
                </TextField>
                <Button
                    onClick={() => fk.handleSubmit()}
                    variant="contained"
                    className="!bg-[#07BC0C]"
                >
                    Submit
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

export default DayBookReport;
