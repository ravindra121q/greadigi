import { Alert, Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Topbar = () => {
  const theme = useTheme();
  const light = theme.palette.mode == "light";

  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleLogoutFn = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Logout ?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("token");
        console.log("logout");
        navigate("/login");
      }
    });
  };
  // const changeHandler = () => {};

const [searchInp,setSearchInp]=useState();

const handleChange=(e)=>{
  setSearchInp(e.target.value);
}

const handleSearch=()=>{
  localStorage.setItem("searchInp",searchInp);
}

  return (
    <Box
      display="flex"
      backgroundColor={light ? "orange" : null}
      justifyContent="space-between"
      p={2}
    >
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={light ? "orange" : colors.primary[400]}
        border={light ? "1px solid black" : null}
        borderRadius={light ? "15px" : "3px"}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" value={searchInp} onChange={(e)=>handleChange} />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box> */}
      <Box></Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton 
        // onClick={changeHandler} 
        onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogoutFn}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
