import {
  AppBar,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import React, { useState } from "react";
import { all_Data } from "../../mockdata/MockData";

export default function MobileNavigation() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openCollapse, setOpenCollapse] = useState({});

  const handleToggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleCollapse = (navLink) => {
    setOpenCollapse((prevState) => ({
      ...prevState,
      [navLink]: !prevState[navLink],
    }));
  };

  return (
    <>
      {/* AppBar */}
      <AppBar position="static" className="!bg-white !bg-opacity-50">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            onClick={handleToggleDrawer}
            sx={{ mr: 2, color: "#1e3a8a" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="!text-blue-800"
          >
            Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer Sidebar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleToggleDrawer}
        
          className= "!w-[150px] glass !bg-white !bg-opacity-50 backdrop-blur-lg"
      
      >
        <List className="!p-6">
          {all_Data?.map((nav) => (
            <React.Fragment key={nav.id}>
              <ListItemButton
                onClick={() => {
                  if (nav.subcomponent?.length > 0) {
                    handleCollapse(nav.navLink);
                  } else {
                    navigate(nav.navLink);
                    setDrawerOpen(false);
                  }
                }}
                className={classNames(
                  "!rounded-lg !p-2",
                  window.location.pathname === nav.navLink && "!text-[#0561FC]"
                )}
              >
                <ListItemText primary={nav.navItem} />
                {nav.subcomponent?.length > 0 &&
                  (openCollapse[nav.navLink] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {/* Submenu */}
              <Collapse in={openCollapse[nav.navLink]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {nav.subcomponent?.map((subNav) => (
                    <ListItemButton
                      key={subNav.id}
                      onClick={() => {
                        navigate(subNav.navLink);
                        setDrawerOpen(false);
                      }}
                      className={classNames(
                        "!rounded-lg",
                        window.location.pathname === subNav.navLink &&
                          "!text-[#0561FC]"
                      )}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={subNav.navItem} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}

          {/* Logout Button */}
          <ListItemButton
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/");
            }}
          >
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
