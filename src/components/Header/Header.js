import React, { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar/UserAvatar";

import {
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  Badge,
  Input,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Login from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectCurrentUser } from "../../features/user/userSlice";
import {
  selectCartProducts,
  selectCartProductsCount,
} from "../../features/Cart/cartSlice";

const MenuItems = ({ user, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (user)
    return (
      <>
        <MenuItem
          onClick={() => {
            navigate("/me");
            handleClose();
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        {user?.role === "admin" && (
          <MenuItem
            onClick={() => {
              navigate("/dashboard");
              handleClose();
            }}
          >
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            dispatch(logoutUser());
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </>
    );

  return (
    <>
      <MenuItem
        onClick={() => {
          navigate("/auth");
          handleClose();
        }}
      >
        <ListItemIcon>
          <Login fontSize="small" />
        </ListItemIcon>
        Login
      </MenuItem>
    </>
  );
};

function Header() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const cartProductsCount = useSelector(selectCartProductsCount);
  const cartProducts = useSelector(selectCartProducts);

  const [anchorElement, setAnchorElement] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const open = Boolean(anchorElement);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const handleClick = (e) => {
    setAnchorElement(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`/search?searchQuery=${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ width: "100%", gap: "20px" }}>
        <Typography variant="h6" component="div" sx={{ flex: "0.2" }}>
          <a href="/">Elegant Store</a>
        </Typography>
        <form onSubmit={handleSearchFormSubmit} style={{ flex: "0.8" }}>
          <Input
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "0 5px",
            }}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disableUnderline
            placeholder="What are you looking for?"
            variant="outlined"
            startAdornment={<SearchIcon />}
            fullWidth
          />
        </form>
        <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
          <Badge badgeContent={cartProductsCount} color="secondary">
            <ShoppingCartIcon sx={{ color: "#FFF" }} />
          </Badge>
        </IconButton>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-label="account menu of current user"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <UserAvatar user={user} />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorElement}
          open={open}
          onClose={handleClose}
          keepMounted
        >
          <MenuItems user={user} handleClose={handleClose} />
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
