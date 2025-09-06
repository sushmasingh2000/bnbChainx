import { Notifications } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { IoColorPalette } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import BreadCrumbs from '../Shared/BreadCrumbs';
import CustomDialogBox from '../Shared/CustomDialogBox';
import Sidebar from '../Shared/Sidebar';
import MobileNavigation from '../Shared/Sidebar/MobileNavigation';
const AdminLayout = ({ component, navItem, navLink, id }) => {
  const isMediumScreen = useMediaQuery({ maxWidth: 1000 });

  // const [user_exist, setuser_exist] = useState("");
  const usertype = localStorage.getItem('user_type');
  const user = localStorage.getItem('erp_username');
  const background = localStorage.getItem('background_url');
  const [color, setcolor] = useState(
    background ||
      'https://cdn.neowin.com/news/images/uploaded/2023/11/1699098103_windows_10_and_windows_11_story.jpg'
  );
  // const user1 = localStorage.getItem("role_user");
  const [openCustomDialogBox, setopenCustomDialogBox] = useState(false);
  const colorsData = [
    {
      HEX: 'https://aaraerp.s3.amazonaws.com/media/background_image/background4_VxrVIay_02MDQXY_J8Ld4WR.webp',
    },
    {
      HEX: 'https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/nature-theme-background_MJviyZ9d_SB_PM.jpg',
    },
    {
      HEX: 'https://wallpapers.com/images/hd/light-color-pink-and-blue-background-8zrww1yggwb8mbh3.jpg',
    },
    {
      HEX: 'https://wallpapers.com/images/hd/laptop-lock-screen-8r4ntp5agah1y579.jpg',
    },
    {
      HEX: 'https://wallpaper.forfun.com/fetch/a8/a81b19c83d77ea9e48fd5e92d7705f38.jpeg',
    },
    {
      HEX: 'https://cdn.neowin.com/news/images/uploaded/2023/11/1699098103_windows_10_and_windows_11_story.jpg',
    },
    {
      HEX: 'https://preview.redd.it/lobabzkewaf91.jpg?width=640&crop=smart&auto=webp&s=c7d5e001fd1af54104fc1a169cf4a03699561695',
    },
    {
      HEX: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSk3QceFZDYBnNpGD94Opz6Fb_JQUhKfw3o9JRdXGMXgIQTfJVcTgG1GW9TDG7al2IjH4&usqp=CAU',
    },
    {
      HEX: 'https://tackexinh.com/wp-content/uploads/2020/09/hinh-win-10-don-gian-37-scaled.jpg',
    },
  ];

  // useEffect(() => {
  //   setuser_exist(user1);
  // }, [user1]);

  return (
    <div
      style={{
        backgroundImage: `url(${color})`,
        backgroundSize: 'cover',
      }}
      className={`!bg-white lg:flex lg:h-screen h-[110vh] !w-[100vw] !overflow-x-hidden`}
    >
      {!isMediumScreen ? <Sidebar /> : <MobileNavigation />}
      <div className="flex flex-col gap-3 h-screen lg:!w-[calc(100vw-16vw)] w-full !overflow-x-auto  lg:p-5 !bg-white !bg-opacity-50">
        {!isMediumScreen && (
          <div className="flex flex-col h-[24vh] w-full">
            <div className="flex w-full mb-4 items-center rounded justify-between">
              <p className="text-xl font-semibold">{navItem}</p>
              <div className="flex items-center gap-5">
                <IoColorPalette
                  onClick={() => {
                    setopenCustomDialogBox(true);
                  }}
                  className="text-2xl text-blue-700 cursor-pointer"
                />

                <div className="flex items-center gap-3  p-3 ">
                  <Avatar
                    alt={user?.user_name}
                    src={'https://mui.com/static/images/avatar/3.jpg'}
                  />
                  <span className="flex flex-col">
                    <p className="text-xs text-blue-700 capitalize">
                      {usertype}
                    </p>
                  </span>
                  <IconButton>
                    <Notifications />
                  </IconButton>
                </div>
              </div>
            </div>
            {!isMediumScreen && (
              <div className=" w-[95%] overflow-x-hidden">
                <BreadCrumbs navItem={navItem} navLink={navLink} id={id} />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col overflow-y-auto w-full lg:h-[83vh] !h-[100vh] glass lg:!p-1 !rounded-md">
          {component}
        </div>

        {/* {!isMediumScreen && (
          <span className="flex text-secondary px-2  justify-end">
            <p>
              All Rights reserved to{' '}
              <span className="!font-bold">BEST TRADING WEBSITE 2025</span>
            </p>

          </span>
        )} */}
      </div>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setopenCustomDialogBox}
          component={
            <div className="grid grid-cols-4 gap-4">
              {colorsData.map((i) => {
                return (
                  <div
                    className="!cursor-pointer"
                    onClick={() => {
                      localStorage.setItem('background_url', i?.HEX);
                      setcolor(i?.HEX);
                    }}
                  >
                    <img className="!h-32 !w-32" src={i?.HEX} />
                  </div>
                );
              })}
            </div>
          }
          title="Choose background"
        />
      )}
    </div>
  );
};

export default AdminLayout;
