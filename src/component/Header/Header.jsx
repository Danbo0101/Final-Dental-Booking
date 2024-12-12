import * as React from "react";
import logo from "../../assets/images/D Dental.png";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import noImage from "../../assets/images/No_Image_Available.jpg"
import { useState } from "react";
import History from "./Modal/History";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));


const Header = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const image = useSelector((state) => state.user.image);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openHistory, setOpenHistory] = useState(null);

  const handleLogout = () => {
    dispatch(doLogout());
    navigate("/login");
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div
      className="flex px-6 mx-10 mt-4 rounded-md drop-shadow bg-sky-300 
            justify-between items-center"
    >
      <div
        className="p-5 cursor-pointer"
        onClick={() => navigate('/')}

      >
        <img src={logo} className="w-36 h-16" />
      </div>
      <div className="flex gap-32 mr-10">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        {isAuthenticated ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {image ?
                  <Avatar alt="image" src={`data:image/jpeg;base64,${image}`} />
                  :
                  <Avatar alt="image" src={noImage} />
                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="History Booking" onClick={() => setOpenHistory(true)}>
                <Typography sx={{ textAlign: 'center', fontSize: "14px", fontFamily: "sans-serif" }}>Lịch sử đặt hẹn</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={() => handleLogout()}>
                <Typography sx={{ textAlign: 'center', fontSize: "14px", fontFamily: "sans-serif" }}>Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </Box>
          :
          <div className="flex gap-3">
            <Button
              variant="text"
              href="/login"
              sx={{
                fontSize: "14px",
                fontFamily: "Roboto Slab, serif",
                fontWeight: "600",
                color: "black",
                borderRadius: "10px",
                "&:hover": {
                  color: "white",
                  background: "#2576d0",
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              href="#outlined-buttons"
              sx={{
                color: "white",
                fontSize: "14px",
                fontFamily: "Roboto Slab, serif",
                fontWeight: "600",
                borderRadius: "10px",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              Sign Up
            </Button>
          </div>
        }
      </div>


      <History
        open={openHistory}
        setOpen={setOpenHistory}
      />
    </div>
  );
};

export default Header;
