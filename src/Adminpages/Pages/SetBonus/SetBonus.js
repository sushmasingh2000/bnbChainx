import {
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
} from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { API_URLS } from '../../config/APIUrls';
import axiosInstance from '../../config/axios';
import { apiConnectorGet } from '../../../services/apiconnector';
import { endpoint } from '../../../services/urls';
import { useQuery, useQueryClient } from 'react-query';
import { enCryptData } from '../../../shared/secret';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
    padding: '10px 8px !important',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const SetBonus = () => {
  const client = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [amounts, setAmounts] = useState({});
  const [key, setKeys] = useState({});
  const [image, setImage] = useState(null);
  const fileReader = new FileReader();
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImage(fileReader.result);
      };
      fileReader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      fileReader.readAsDataURL(file);
    }
  };
  const uploadHandler = async () => {
    if (!image) {
      toast.error('Please upload an image before submitting.');
      client.refetchQueries('status_of_uploaded image');
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_URLS?.set_upload, {
        image,
      });
      toast(response?.data?.msg || 'Image uploaded successfully!');
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setAmounts({}); // Reset amounts state to clear inputs
  };
  const setBonusFunction = async (id) => {
    setLoading(true);
    const req = {
      t_id: id,
      zp_amount: Number(amounts[id]) || 0,
    };

    try {
      const res = await axiosInstance.post(`${API_URLS?.zp_Amount}`, req);
      toast.success(res?.data?.msg);
      if (res?.data?.msg === 'Updated successfully.') {
        client.refetchQueries('address_own');
        handleReset();
      }
      console.log(res);
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.msg || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };
  const { data: walletaddress } = useQuery(
    ['address_own'],
    () => apiConnectorGet(endpoint?.zp_own_address),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const ownaddress = walletaddress?.data?.data?.[0];

  const setPrivateKeyFunction = async (id) => {
    setLoading1(true);
    const reqbody = {
      t_id: id,
      pvt_key: String(key[id]) || 0,
    };
    try {
      const res = await axiosInstance.post(`${API_URLS?.private_key_data}`, {
        payload: enCryptData(reqbody),
      });
      toast.success(res?.data?.msg);
      if (res?.data?.msg === 'Updated Successfully.') {
        handleReset();
      }
      console.log(res);
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.msg || 'An error occurred.');
    } finally {
      setLoading1(false);
    }
  };

  const setBonusData = [
    {
      id: 1,
      name: 'ZP Token',
    },
    {
      id: 2,
      name: 'Private Key',
    },
    {
      id: 3,
      name: 'Popup',
    },
  ];

  const tableHead = ['S.No.', 'Token', 'Amount', 'Enter Amount/Key', 'Action'];

  const tableRow = setBonusData?.map((item, index) => (
    <StyledTableRow
      key={item.id}
      className="hover:!bg-purple-200 cursor-pointer"
    >
      <StyledTableCell
        component="th"
        scope="row"
        className="capitalize !text-center !py-[10px]"
      >
        {index + 1}
      </StyledTableCell>
      <StyledTableCell
        component="th"
        scope="row"
        className="capitalize !text-center !py-[10px]"
      >
        {item.name}
      </StyledTableCell>
      {[1].includes(item?.id) ? (
        <StyledTableCell
          component="th"
          scope="row"
          className="capitalize !text-center !py-[10px]"
        >
          {Number(ownaddress?.token_amnt)?.toFixed(4)}
        </StyledTableCell>
      ) : (
        <StyledTableCell
          component="th"
          scope="row"
          className="capitalize !text-center !py-[10px]"
        >
          --
        </StyledTableCell>
      )}
      {[1].includes(item?.id) ? (
        <StyledTableCell
          component="th"
          scope="row"
          className="capitalize !text-center !py-[10px]"
        >
          <TextField
            type="number"
            value={amounts[item?.id] || ''}
            onChange={(e) =>
              setAmounts({ ...amounts, [item?.id]: e.target.value })
            }
          />
        </StyledTableCell>
      ) : item?.id === 2 ? (
        <StyledTableCell
          component="th"
          scope="row"
          className="capitalize !text-center !py-[10px]"
        >
          <TextField
            type="text"
            value={key[item?.id] || ''}
            onChange={(e) => setKeys({ ...key, [item?.id]: e.target.value })}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell
          component="th"
          scope="row"
          className=" !py-[10px] !w-[209px] !h-[33px] "
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            value={key[item?.id] || ''}
            className="!ml-[52px]"
          />
        </StyledTableCell>
      )}
      {[1].includes(item?.id) ? (
        <StyledTableCell
          component="th"
          scope="row"
          className="capitalize !text-center !py-[10px]"
        >
          <Button
            variant="contained"
            className="!bg-[#198754] !text-white"
            onClick={() => setBonusFunction(item.id)}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </StyledTableCell>
      ) : item?.id === 2 ? (
        <StyledTableCell
          component="th"
          scope="row"
          className="capitalize !text-center !py-[10px]"
        >
          <Button
            variant="contained"
            className="!bg-[#198754] !text-white"
            onClick={() => setPrivateKeyFunction(item.id)}
            disabled={loading1} // Disable button while loading
          >
            {loading1 ? 'Submitting...' : 'Submit'}
          </Button>
        </StyledTableCell>
      ) : (
        <StyledTableCell
          component="th"
          scope="row"
          className="capitalize !text-center !py-[10px]"
        >
          <Button
            variant="contained"
            className="!bg-[#198754] !text-white"
            onClick={uploadHandler}
            disabled={loading}
          >
            {loading1 ? 'Submitting...' : 'Submit'}
          </Button>
          {image && (
            <img
              src={image}
              alt="Preview"
              className="max-w-xs rounded shadow"
            />
          )}
        </StyledTableCell>
      )}
    </StyledTableRow>
  ));

  return (
    <div>
      <TableContainer>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHead.map((column, index) => (
                <StyledTableCell
                  key={index}
                  className="!text-black !font-bold !bg-white !bg-opacity-50 !text-center"
                >
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array?.from(new Array(4))?.map((_, i) => (
                <StyledTableRow key={i}>
                  {tableHead.map((_, index) => (
                    <StyledTableCell key={index}>
                      <Skeleton />
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : tableRow?.length === 0 ? (
              <TableRow>
                <StyledTableCell colSpan={tableHead.length} align="center">
                  No data Found
                </StyledTableCell>
              </TableRow>
            ) : (
              tableRow
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SetBonus;
