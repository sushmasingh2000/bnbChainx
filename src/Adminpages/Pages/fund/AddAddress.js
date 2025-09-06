import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { apiConnectorGet, apiConnectorPost } from "../../../utils/APIConnector";
import { endpoint } from "../../../utils/APIRoutes";
import CustomTable from "../../Shared/CustomTable";
import { useQuery, useQueryClient } from "react-query";

const AddAddress = () => {
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const client = useQueryClient()
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setQrCodeBase64(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!qrCodeBase64.trim() || !walletAddress.trim()) {
      return toast.error("Please select a QR image and enter wallet address");
    }

    setLoading(true);
    try {
      const res = await apiConnectorPost(endpoint.admin_upload_qr, {
        upload_qr: qrCodeBase64.trim(),
        wallet_add: walletAddress.trim(),
      });

      if (res?.data?.message) {
        toast.success(res?.data?.message);
        client.refetchQueries("get_address_admin")
        setQrCodeBase64("");
        setWalletAddress("");
        setPreview(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to upload QR");
    }
    setLoading(false);
  };
  const { data, isLoading } = useQuery(
    ['get_address_admin'],
    () =>
      apiConnectorGet(endpoint?.get_admin_upload_qr),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.error("Error fetching level data:", err),
    }
  );

  const address = data?.data?.result || [];

  const tablehead = [
    <span>S.No.</span>,
    <span>Wallet Address</span>,
    <span>Coin</span>,
    <span>QR </span>


  ];
  const tablerow = address?.map((row, index) => {
    return [
      <span> {index + 1}</span>,
      <span>{row.m39_add}</span>,
      <span>{row.m39_coin}</span>,
      <span><img src={row.m39_qr} alt={`QR code ${index + 1}`} style={{ maxWidth: "80px", height: "auto" }} /></span>

    ];
  });
  return (
    <>
      <Box
        sx={{
          maxWidth: 500,
          margin: "auto",
          p: 4,
          mb: 5,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontSize: "0.85rem" }}>
          Upload Wallet Address
        </Typography>

        <TextField
          fullWidth
          label="Wallet Address"
          variant="outlined"
          value={"USDT.BEP20"}
          InputLabelProps={{ style: { fontSize: "0.75rem" } }}
          inputProps={{ style: { fontSize: "0.85rem" } }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Wallet Address"
          variant="outlined"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          InputLabelProps={{ style: { fontSize: "0.75rem" } }}
          inputProps={{ style: { fontSize: "0.85rem" } }}
        />

        <input
          className="border border-gray-300 rounded-md w-full p-2"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: 10 }}
        />

        {preview && (
          <Box mt={2}>
            <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
              Preview:
            </Typography>
            <img
              src={preview}
              alt="QR Preview"
              style={{ maxWidth: "100%", height: "auto", marginTop: 8 }}
            />
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Upload"}
          </Button>
        </Box>
      </Box>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={isLoading}
      />

    </>

  );
};

export default AddAddress;
