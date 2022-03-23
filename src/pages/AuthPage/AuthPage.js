import { useEffect, useState } from "react";

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
import { selectCurrentUser, userLoggedIn } from "../../features/user/userSlice";

import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";

import { GoogleLogin } from "react-google-login";

import "../../css/AuthPage/AuthPage.css";

const initialFormData = { name: "", email: "", password: "" };

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [isSignup, setIsSignup] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const user = useSelector(selectCurrentUser);

  const [, authDataLoading, , fetchAuthData] = useAxios();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      fetchAuthData({
        axiosInstance: publicAxios,
        method: "POST",
        url: "/users",
        requestConfig: {
          ...formData,
          withCredentials: true,
        },
      })
        .then((response) => {
          setErrorMessage(null);
          setFormData(initialFormData);
          dispatch(userLoggedIn(response));
          navigate(from, { replace: true });
        })
        .catch((error) => {
          if (!error?.data?.message)
            return setErrorMessage("No server response!");
          setErrorMessage(error?.data?.message);
        });
    } else {
      fetchAuthData({
        axiosInstance: publicAxios,
        method: "POST",
        url: "/users/login",
        requestConfig: {
          ...formData,
          withCredentials: true,
        },
      })
        .then((response) => {
          setErrorMessage(null);
          setFormData(initialFormData);
          dispatch(userLoggedIn(response));
          navigate(from, { replace: true });
        })
        .catch((error) => {
          if (!error?.data?.message)
            return setErrorMessage("No server response!");
          setErrorMessage(error?.data?.message);
        });
    }
  };

  const switchMode = (e) => {
    setIsSignup(!isSignup);
  };

  const googleFailure = (e) => {
    console.log(e);
  };
  const googleSuccess = (res) => {
    const { name, email, googleId: password, imageUrl } = res.profileObj;

    fetchAuthData({
      axiosInstance: publicAxios,
      method: "POST",
      url: "/users/googleAuth",
      requestConfig: {
        name,
        email,
        password,
        imageUrl,
      },
    })
      .then((response) => {
        setErrorMessage(null);
        dispatch(userLoggedIn(response));
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (!error?.data?.message)
          return setErrorMessage("No server response!");
        setErrorMessage(error?.data?.message);
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
      {errorMessage && (
        <Alert sx={{ width: "100%" }} severity="error">
          {errorMessage}
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
          loading={authDataLoading}
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
