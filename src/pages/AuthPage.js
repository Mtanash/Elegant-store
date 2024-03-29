import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAuthWithGoogleMutation,
  useCreateUserMutation,
  useLoginUserMutation,
} from "../features/api/usersApiSlice";
import { selectCurrentUser, userLoggedIn } from "../features/user/userSlice";
import useErrorHandler from "../hooks/useErrorHandler";

const initialFormData = { name: "", email: "", password: "" };

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialFormData);
  const [isSignup, setIsSignup] = useState(false);

  const user = useSelector(selectCurrentUser);

  const { handleError } = useErrorHandler();

  const [createUser, createUserResult] = useCreateUserMutation();

  const [loginUser, loginUserResult] = useLoginUserMutation();

  const [authWithGoogle, authWithGoogleResult] = useAuthWithGoogleMutation();

  useEffect(() => {
    let isMounted = true;
    if (user && isMounted) {
      navigate(-1);
    }

    return () => {
      isMounted = false;
    };
  }, [user, navigate]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      createUser(formData)
        .unwrap()
        .then((response) => {
          setFormData(initialFormData);
          dispatch(userLoggedIn(response));
          navigate(from, { replace: true });
        })
        .catch((error) => {
          handleError(error);
        });
    } else {
      loginUser(formData)
        .unwrap()
        .then((response) => {
          setFormData(initialFormData);
          dispatch(userLoggedIn(response));
          navigate(from, { replace: true });
        })
        .catch((error) => {
          handleError(error);
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

    authWithGoogle({ name, email, imageUrl, password })
      .unwrap()
      .then((response) => {
        dispatch(userLoggedIn(response));
        navigate(from, { replace: true });
      });
  };

  return (
    <section className="min-h-[calc(100vh_-_theme(headerAndFooterHeight))] grid place-items-center">
      <div className="container mx-auto rounded-lg bg-white drop-shadow-2xl p-6 py-8 flex flex-col items-center justify-center">
        <p className="text-3xl font-semibold mb-10 text-center">
          {!isSignup ? "Sign in to your account" : "Sign up a new account"}
        </p>
        {(loginUserResult.error ||
          createUserResult.error ||
          authWithGoogleResult.error) && (
          <div className="p-1 rounded-sm bg-pale-white">
            <p className="text-red text-center">
              {loginUserResult.error?.message ||
                createUserResult.error?.message ||
                authWithGoogleResult.error?.message}
            </p>
          </div>
        )}
        <form
          className="flex flex-col gap-4 w-11/12 sm:w-8/12 lg:w-7/12 xl:w-5/12"
          onSubmit={handleFormSubmit}
        >
          {isSignup && (
            <div className="flex flex-col items-start gap-1">
              <label className="font-semibold" htmlFor="name">
                Name
              </label>
              <input
                className="w-full rounded-sm text-lg p-1.5 outline-none bg-white border-[1px] border-grey border-opacity-50"
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                autoFocus
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
          )}
          <div className="flex flex-col items-start gap-1">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-sm text-lg p-1.5 outline-none bg-white border-[1px] border-grey border-opacity-50 "
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <label className="font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-sm text-lg p-1.5 outline-none bg-white border-[1px] border-grey border-opacity-50"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleFormChange}
              value={formData.password}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-deep-orange text-white font-semibold p-2 px-4 hover:opacity-90 transition-opacity ease-in-out duration-200 flex items-center justify-center h-11 disabled:cursor-not-allowed"
            disabled={
              createUserResult.isLoading ||
              loginUserResult.isLoading ||
              authWithGoogleResult.isLoading
            }
          >
            {createUserResult.isLoading || loginUserResult.isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button>
          <GoogleLogin
            clientId="203406370220-3gj58q2161jl5b0u07kgc681r4ppgaab.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="w-full rounded-md bg-blue text-white font-semibold p-2 px-4 hover:opacity-90 transition-opacity ease-in-out duration-200 flex items-center justify-center gap-2 h-11 disabled:cursor-not-allowed"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="w-7 h-7" />
                {authWithGoogleResult.isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Google Sign In"
                )}
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <button
            type="button"
            className="font-semibold p-2"
            onClick={switchMode}
          >
            {isSignup
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AuthPage;
