import React, { useState } from "react";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import "../../css/AuthPage/AuthPage.css";
import { loginUser, signupUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const initialFormData = { name: "", email: "", password: "" };

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSignup) {
      dispatch(signupUser(formData))
        .unwrap()
        .then((res) => {
          setLoading(false);
          setFormData(initialFormData);
          navigate(-1);
        });
    } else {
      dispatch(loginUser(formData))
        .unwrap()
        .then((res) => {
          setLoading(false);
          setFormData(initialFormData);
          navigate(-1);
        });
    }
  };

  const switchMode = (e) => {
    setIsSignup(!isSignup);
  };

  return (
    <section className="authPage">
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {isSignup ? "Sign up" : "Sign in"}
      </Typography>
      <form className="authPage-form" onSubmit={handleFormSubmit}>
        {isSignup && (
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleFormChange}
            autoFocus
            fullWidth
          />
        )}
        <TextField
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleFormChange}
          type="email"
          fullWidth
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleFormChange}
          value={formData.password}
          fullWidth
        />
        <LoadingButton
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </LoadingButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </section>
  );
};

export default AuthPage;
