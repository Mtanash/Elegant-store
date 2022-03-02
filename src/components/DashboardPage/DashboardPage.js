import {
  Box,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddIcon from "@mui/icons-material/Add";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "calc(100vh - 124px)", display: "flex" }}>
      <Paper
        square
        variant="outlined"
        sx={{
          padding: "10px 0",
        }}
      >
        <MenuList sx={{ "&>li": { padding: "15px 10px" } }}>
          <MenuItem
            onClick={() => {
              navigate("info");
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("orders");
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("create-product");
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>Add Product</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("products");
            }}
          >
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText>Products</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
      <Box
        sx={{
          flex: "1",
          display: "grid",
          placeItems: "center",
          padding: "20px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardPage;
