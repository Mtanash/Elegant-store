import React from "react";
import "../../css/CreateProduct/CreateProduct.css";
import { selectCurrentUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../AddProductForm/AddProductForm";

const CreateProduct = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="createProduct">
        <Box
          sx={{
            paddingTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h4" component="p" align="center">
            Please, Login first.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/auth")}>
            Login
          </Button>
        </Box>
      </div>
    );
  return (
    <div className="createProduct">
      <AddProductForm />
    </div>
  );
};

export default CreateProduct;
