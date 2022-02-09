import React, { useEffect, useState } from "react";

import {
  IconButton,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  Badge,
  // Stack,
  // Button,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Login from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectCurrentUser } from "../../features/user/userSlice";
import {
  selectCartProducts,
  selectCartProductsCount,
} from "../../features/Cart/cartSlice";

const MenuItems = ({ userExist, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (userExist)
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
  const currentUser = useSelector(selectCurrentUser);
  const userExist = Boolean(currentUser?.user);
  const cartProductsCount = useSelector(selectCartProductsCount);
  const cartProducts = useSelector(selectCartProducts);

  const [anchorElement, setAnchorElement] = useState(null);
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

  return (
    <AppBar position="static">
      <Toolbar sx={{ width: "100%", gap: "20px" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a href="/">Elegant Store</a>
        </Typography>
        {/* <Stack direction="row" spacing={3} sx={{ flexGrow: 0.3 }}>
          <Button sx={{ color: "#fff" }} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button
            sx={{ color: "#fff" }}
            onClick={() => navigate("/create-product")}
          >
            Create Product
          </Button>
        </Stack> */}
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
          {currentUser?.user?.avatar ? (
            <Avatar src={currentUser?.user?.avatar} size="small" />
          ) : (
            <Avatar size="small">{currentUser?.user?.name[0] || null}</Avatar>
          )}
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorElement}
          open={open}
          onClose={handleClose}
          keepMounted
        >
          <MenuItems userExist={userExist} handleClose={handleClose} />
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
