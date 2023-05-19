import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { getProfileData } from "../../Redux/Auth/Get/action";
import { useDispatch, useSelector } from "react-redux";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const theme1 = localStorage.getItem("mode");
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((store) => store.getUser);
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();
  // const image = require("./gradigi.png");
  const token = JSON.parse(localStorage.getItem("token"));
  const light = theme.palette.mode == "light";
  const theme1=localStorage.getItem("mode");
  useEffect(() => {
    dispatch(getProfileData());
  }, []);

  const isAdmin = token?.isAdmin;

  return (
    <Box
      style={{ backgroundColor: light ? "#ff6a4c" : null }}
      sx={{
        "& .pro-sidebar-inner": {
          background: `${light ? "#f99244" : colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        // height: "700px",
      }}
    >
      <ProSidebar
        style={{ backgroundColor: light ? "#ff6a4c" : null }}
        collapsed={isCollapsed}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  src={require(light ? "./gradigi_black.png" : "./gradigi.png")}
                  width={"131px"}
                  height={"48px"}
                  alt="logo"
                />
                <Typography variant="h2" color={colors.grey[100]}>
                  {/* GRADIGI */}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <Avatar>A</Avatar>
                 */}
                <InsertEmoticonIcon style={{color:theme1=="light"?"black":"white", height:"50", width:"50"}}/>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={light ? "black" : colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {data.name}
                </Typography>
                {isAdmin ? (
                  <Typography
                    variant="h5"
                    color={light ? "black" : colors.greenAccent[500]}
                  >
                    Admin
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    color={light ? "black" : colors.greenAccent[500]}
                  >
                    User
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* {isAdmin && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Data
              </Typography>
            )} */}

            {isAdmin && (
              <Item
                title="Presentation Management"
                to="/manage"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            {isAdmin && (
              <Item
                title="Grading Assignments"
                to="/grading"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography> */}
            {isAdmin && (
              <Item
                title="Schedule Presentation"
                to="/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="#"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
