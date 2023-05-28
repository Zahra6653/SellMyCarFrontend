import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import NoCrashSharpIcon from "@mui/icons-material/NoCrashSharp";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InventorySearchAction } from "../redux/InventoryCars/InventoryAction";
import Cookies from "js-cookie";

function Navbar({ isMain }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const inventoryCars = useSelector(
    (state) => state.inventoryCars.inventoryCars
  );
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (flag) {
        search(searchTerm);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, flag]);

  const search = (query) => {
    const result = inventoryCars?.filter(
      (car) =>
        car.modelName.toLowerCase().includes(query.toLowerCase()) ||
        car.model.mileage == query ||
        car.color.toLowerCase().includes(query.toLowerCase()) ||
        car.model.price == query
    );
    setSearchResults(result);
    dispatch(InventorySearchAction(result));
  };

  const handleSearchChange = (e) => {
    setFlag(true);
    if (e.target.value == "") {
      setFlag(false);
      dispatch(InventorySearchAction(inventoryCars));
    } else {
      setSearchTerm(e.target.value);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/dealersProfile");
  };

  const handleLogout = () => {
    handleClose();
    Cookies.remove("token");
    Cookies.remove("refresh-token");
    Cookies.remove("status");
    Cookies.remove("isLoggedIn");
    Cookies.remove("user");
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#58c7c2" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={() => navigate("/")}
        >
          <NoCrashSharpIcon />
        </IconButton>
        <Typography variant="h6" component="div" width={"10vw"}>
          SellMyCar
        </Typography>
        {isMain && (
          <TextField
            placeholder="Search cars..."
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <SearchIcon style={{ marginRight: 8, color: "white" }} />
              ),

              onChange: handleSearchChange,
              inputProps: {
                "aria-label": "search",
                style: { color: "white" },
              },
            }}
          />
        )}

        <Box sx={{ flexGrow: 1 }} />
        {isMain && (
          <Button
            onClick={() => navigate("/form")}
            sx={{
              color: "white",
              bgcolor: "#58c7c2",
              "&:hover": {
                bgcolor: "#449b98",
              },
            }}
          >
            Sell Car
          </Button>
        )}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfile}>
            <Avatar /> My account
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
