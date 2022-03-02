import {
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BeenhereIcon from "@mui/icons-material/Beenhere";

import { useNavigate, Outlet } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      maxWidth="lg"
      sx={{
        minHeight: "calc(100vh - 124px)",
        display: "flex",
      }}
    >
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
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("favorite-products");
            }}
          >
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText>Favorite Products</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("orders");
            }}
          >
            <ListItemIcon>
              <BeenhereIcon />
            </ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
      <Box
        sx={{
          flex: "1",
          padding: "20px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProfilePage;
