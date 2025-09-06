import { Switch } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { getCompany } from "../../Services";
import CustomTable from "../../Shared/CustomTable";

const Company = () => {

    const client = useQueryClient()

    const { isLoading, data } = useQuery(
        ["Company_prm"],
        () => getCompany(),
        {
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false
        }
    );
    const company_data = data?.data?.data || [];

    const UpdateCompany = async (id) => {
        try {
            const res = await axiosInstance.get(API_URLS?.update_company_record + id)
            toast(res?.data?.msg, { id: 1 })
            client.refetchQueries("Company_prm");
        }
        catch (e) {
            console.log(e)
        }
    }
    const tablehead = [
        <span>S.No.</span>,
        <span>User Id</span>,
        <span>Name</span>,
        <span>Email</span>,
        <span>Mobile</span>,
        <span>Percent</span>,
        <span>Level</span>,
        <span>Action</span>,
    ];

    const tablerow = company_data?.map((i, index) => {
        return [
            <span>{index + 1}</span>,
            <span>{i?.username}</span>,
            <span>{i?.full_name}</span>,
            <span>{i?.email}</span>,
            <span>{i?.mobile}</span>,
            <span>{Number(i?.x_percent_from_downline)?.toFixed(2)}</span>,
            <span>{Number(i?.company_promotor_level)?.toFixed(0,2)}</span>,
            <span>
                <Switch
                    checked={true}
                    className="!text-green-600"
                    onChange={() => UpdateCompany(i?.id)}
                />
            </span>
        ];
    });

    return (
        <div>
            <CustomTable
                tablehead={tablehead}
                tablerow={tablerow}
                isLoading={isLoading}
            />
        </div>
    );
};

export default Company;
