import React, { useState } from 'react';
import Navbar from '../dashboard/Navbar';
import Loader from '../Shared/Loader';
import Tree from 'react-d3-tree';
import { FaUser } from 'react-icons/fa';
import { Menu, MenuItem } from '@mui/material';
import { useQuery } from 'react-query';
import { apiConnectorGet } from '../utils/APIConnector';
import { endpoint } from '../utils/APIRoutes';
import WidgetsIcon from '@mui/icons-material/Widgets';

const Team = () => {
  const [loading, setLoading] = useState(false);
  const [verticaa, setVertica] = useState('vertical');
  const [pathfn, setPathFn] = useState('diagonal');
  const [showSidebar, setShowSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data } = useQuery(
    ['tree-data'],
    () => apiConnectorGet(endpoint.tree_data, { lev_id: 6 }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const teamdataa = data?.data?.result || [];
  const dataMap = {};
  teamdataa.forEach((item) => {
    dataMap[item.spon_id] = JSON.parse(item.members);
  });

  const buildTree = (spon_id) => {
    const members = dataMap[spon_id] || [];
    return members.map((member) => ({
      name: member.name,
      mem_id: member.mem_id,
      joining_date: member.joining_date,
      topup_date: member.topup_date,
      curr_wallet: member.current_wallet,
      topup_wallet: member.topup_wallet,
      children: buildTree(Number(member.mem_id)),
    }));
  };

  const rootMember = JSON.parse(
    teamdataa.find((item) => item.spon_id === 0)?.members || '[]'
  )[0];

  const orgChart = {
    name: rootMember?.name,
    mem_id: rootMember?.mem_id,
    joining_date: rootMember?.joining_date,
    topup_date: rootMember?.topup_date,
    curr_wallet: rootMember?.curr_wallet,
    topup_wallet: rootMember?.topup_wallet,
    children: buildTree(1),
  };

  const renderCustomNode = ({ nodeDatum, toggleNode }) => {
    const nodeColor = nodeDatum.color || '#FFFFFF';
    const IconComponent =
      nodeDatum.topup_date === '0' ? (
        <FaUser className="!text-red-600 !text-3xl" />
      ) : (
        <FaUser className="!text-green-600 !text-3xl" />
      );
    return (
      <g onClick={toggleNode} style={{ cursor: 'pointer' }}>
        <circle r={30} fill={nodeColor} />
        <foreignObject x={-20} y={-20} width={40} height={40}>
          <div className="w-full h-full flex justify-center items-center">
            {IconComponent}
          </div>
        </foreignObject>
        <text
          x={0}
          y={50}
          textAnchor="middle"
          fontWeight="bold"
          fontSize="22"
          fill="black"
          stroke="none"
          id="basic-text"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={(e) => {
            setSelectedNode(nodeDatum);
            setAnchorEl(e.currentTarget);
          }}
        >
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  return (
    <>
      <Loader isLoading={loading} />
      <Navbar />
      <div
        className="flex min-h-screen justify-center items-center"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="md:hidden fixed top-4 right-3 z-50">
          <button onClick={() => setShowSidebar(!showSidebar)}>
            <WidgetsIcon className="text-black !text-3xl" />
          </button>
        </div>
        <div
          className={`fixed md:static top-0 right-0 z-40 md:h-screen bg-white shadow-md ease-in-out transition-all transition-duration-300  text-black
             ${
               showSidebar
                 ? 'w-[250px] p-6 space-y-4 pt-[5rem]'
                 : 'w-0 p-0 overflow-hidden'
             }
              md:w-[250px] md:p-6 md:space-y-4 md:pt-[5rem]`}
        >
          <h2 className="text-lg font-bold">Orientation</h2>
          <div className="flex flex-col gap-1">
            <button
              className="px-3 py-1 bg-gray-900 text-white rounded"
              onClick={() => setVertica('horizontal')}
            >
              Horizontal
            </button>
            <button
              className="px-3 py-1 bg-gray-900 text-white rounded "
              onClick={() => setVertica('vertical')}
            >
              Vertical
            </button>
          </div>
          <h2 className="text-lg font-bold">Path Function</h2>
          <div className="flex flex-col gap-1">
            <button
              className="px-3 py-1 bg-gray-900 text-white rounded"
              onClick={() => setPathFn('diagonal')}
            >
              Diagonal
            </button>
            <button
              className="px-3 py-1 bg-gray-900 text-white rounded"
              onClick={() => setPathFn('elbow')}
            >
              Elbow
            </button>
            <button
              className="px-3 py-1 bg-gray-900 text-white rounded"
              onClick={() => setPathFn('straight')}
            >
              Straight
            </button>
            <button
              className="px-3 py-1 bg-gray-900 text-white rounded"
              onClick={() => setPathFn('step')}
            >
              Step
            </button>
          </div>
        </div>
        <div className="flex-1 h-screen flex flex-col justify-center items-center">
          <div id="treeWrapper" className="w-full h-full">
            <Tree
              data={orgChart}
              orientation={verticaa}
              pathFunc={pathfn}
              renderCustomNodeElement={renderCustomNode}
            />
          </div>
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-text',
        }}
      >
        <MenuItem onClick={handleClose}>
          <div className="grid grid-cols-2">
            <p className="px-4 py-2 text-center text-sm border border-gray-700 font-semibold">
              Name
            </p>
            <p className="px-4 py-2 text-sm text-center border border-gray-700">
              {selectedNode?.name}
            </p>
            <p className="px-4 py-2  border border-gray-700">
              <p className="text-sm text-center font-semibold">Joining Date</p>
            </p>
            <p className="px-4 py-2 text-sm text-center border border-gray-700">
              {selectedNode?.joining_date}
            </p>
            <p className="px-4 py-2 text-center text-sm border border-gray-700 font-semibold">
              Topup Date
            </p>
            <p className="px-4 py-2 text-sm text-center border border-gray-700">
              {selectedNode?.topup_date == 0 ? '- -' : selectedNode?.topup_date}
            </p>
            <p className="px-4 py-2 text-center text-sm border border-gray-700 font-semibold">
              Current Wallet
            </p>
            <p className="px-4 py-2 text-sm text-center border border-gray-700">
              {Number(selectedNode?.curr_wallet).toFixed(2)}
            </p>
            <p className="px-4 py-2 text-center text-sm border border-gray-700 font-semibold">
              Topup Wallet
            </p>
            <p className="text-xs py-2 text-center border border-gray-700">
              {Number(selectedNode?.topup_wallet || '0').toFixed(2)}
            </p>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};
export default Team;
