import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { FaUser } from 'react-icons/fa';
import { Menu, MenuItem } from '@mui/material';
import { useQuery } from 'react-query';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { endpoint } from '../../../utils/APIRoutes';
import { apiConnectorGet } from '../../../utils/APIConnector';
import moment from 'moment/moment';

const Team = () => {
  const [verticaa, setVertica] = useState('vertical');
  const [pathfn, setPathFn] = useState('diagonal');
  const [showSidebar, setShowSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const open = Boolean(anchorEl);
  const treeContainerRef = useRef(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data } = useQuery(
    ['tree-downline'],
    () => apiConnectorGet(endpoint.team_downline_user),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const flatData = data?.data?.result || [];

  const buildTreeFromFlatData = (data) => {
    const map = {};
    const rootNodes = [];

    data.forEach((item) => {
      map[item.User_Id] = {
        name: item.User_Name,
        mem_id: item.User_Id,
        joining_date: item.Joining_Date,
        topup_date: item.Topup_Date || '0',
        email: item.Email,
        mobile: item.Mobile,
        introducer: item.Introducer_Id,
        children: [],
      };
    });

    data.forEach((item) => {
      const node = map[item.User_Id];
      if (item.Level_id === 0 || !item.Introducer_Id || !map[item.Introducer_Id]) {
        rootNodes.push(node);
      } else {
        map[item.Introducer_Id].children.push(node);
      }
    });

    return rootNodes[0];
  };

  const orgChart = buildTreeFromFlatData(flatData);

  // 🧠 Dynamically center the tree
  useEffect(() => {
    if (treeContainerRef.current) {
      const dimensions = treeContainerRef.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 6,
      });
    }
  }, [orgChart, verticaa]);

  const renderCustomNode = ({ nodeDatum, toggleNode }) => {
    const nodeColor = '#FFFFFF';
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
          <div className="w-full h-full flex justify-center items-center">{IconComponent}</div>
        </foreignObject>
        <text
          x={0}
          y={50}
          textAnchor="middle"
          fontWeight="bold"
          fontSize="12"
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
      <div className="flex min-h-screen justify-center items-center ">
        {/* Sidebar Toggle for Mobile */}
        <div className="md:hidden fixed top-4 right-3 z-50">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 bg-white rounded-full shadow-lg"
          >
            <WidgetsIcon className="text-black !text-3xl" />
          </button>
        </div>
        {/* Sidebar only developer change  
        <div
          className={`fixed md:static top-0 right-0 z-40 md:h-screen bg-white shadow-md ease-in-out transition-all transition-duration-300 text-black ${
            showSidebar ? 'w-[250px] p-6 space-y-4 ' : 'w-0 p-0 overflow-hidden'
          } md:w-[250px] md:p-6 md:space-y-4 md:pt-[5rem]`}
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
              className="px-3 py-1 bg-gray-900 text-white rounded"
              onClick={() => setVertica('vertical')}
            >
              Vertical
            </button>
          </div>
          <h2 className="text-lg font-bold">Path Function</h2>
          <div className="flex flex-col gap-1">
            {['diagonal', 'elbow', 'straight', 'step'].map((type) => (
              <button
                key={type}
                className="px-3 py-1 bg-gray-900 text-white rounded"
                onClick={() => setPathFn(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
*/}
        {/* Tree Chart */}
        <div
          className={`flex-1  h-screen flex  flex-col justify-center items-center ${showSidebar ? 'pl-[250px]' : 'pl-0'
            }`}
        >
          <div ref={treeContainerRef} id="treeWrapper" className="w-full h-full "
            style={{ maxHeight: '100vh' }} >
            {orgChart && (
              <Tree
                data={orgChart}
                orientation={verticaa}
                pathFunc={pathfn}
                renderCustomNodeElement={renderCustomNode}
                zoomable={false}
                translate={translate}
              />
            )}
          </div>
        </div>
      </div>

      {/* Node Details Menu */}
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
            <p className="px-4 py-2 text-center font-semibold border border-gray-700">
              Joining Date
            </p>
            <p className="px-4 py-2 text-sm text-center border border-gray-700">
              {selectedNode?.joining_date}
            </p>
            <p className="px-4 py-2 text-center font-semibold border border-gray-700">
              Topup Date
            </p>
            <p className="px-4 py-2 text-sm text-center border border-gray-700">
              {selectedNode?.topup_date === '0' ? '--' : moment(selectedNode?.topup_date)?.format("DD-MM-YYYY")}
            </p>
            {/*    <p className="px-4 py-2 text-center font-semibold border border-gray-700">
              Email
            </p>
            <p className="px-4 py-2 text-sm text-center border border-gray-700">
              {selectedNode?.email}
            </p>
            <p className="px-4 py-2 text-center font-semibold border border-gray-700">
              Mobile
            </p>
            <p className="px-4 py-2 text-sm text-center border border-gray-700">
              {selectedNode?.mobile}
            </p> */}
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Team;
