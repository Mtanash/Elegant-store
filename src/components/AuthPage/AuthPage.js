import { useState } from "react";

import {
  Alert,
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";

import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  signupUser,
  updateUserAvatar,
} from "../../features/user/userSlice";

import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "react-google-login";

import "../../css/AuthPage/AuthPage.css";

const initialFormData = { name: "", email: "", password: "" };

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const authError = useSelector((state) => state.user.error);

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
        .then(() => {
          setFormData(initialFormData);
          navigate(-1);
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    } else {
      dispatch(loginUser(formData))
        .unwrap()
        .then(() => {
          setFormData(initialFormData);
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };

  const switchMode = (e) => {
    setIsSignup(!isSignup);
  };

  const googleFailure = (e) => {
    console.log(e);
  };
  const googleSuccess = async (res) => {
    const { name, email, googleId: password, imageUrl } = res.profileObj;
    dispatch(
      signupUser({
        name,
        email,
        password,
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(updateUserAvatar({ avatar: imageUrl }));
        navigate(-1);
      })
      .catch((e) => {
        dispatch(
          loginUser({
            email,
            password,
          })
        )
          .unwrap()
          .then((res) => navigate(-1))
          .catch((e) => console.log(e));
      });
  };

  return (
    <section className="authPage">
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {isSignup ? "Sign up" : "Sign in"}
      </Typography>
      {authError && (
        <Alert sx={{ width: "100%" }} severity="error">
          {authError}
        </Alert>
      )}
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
        <GoogleLogin
          clientId="203406370220-3gj58q2161jl5b0u07kgc681r4ppgaab.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              variant="contained"
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<GoogleIcon />}
            >
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={"single_host_origin"}
        />
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
