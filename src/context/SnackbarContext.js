import { createContext, useState } from "react";

const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const openSnackbar = (message) => {
    setMessage(message);
    setSnackbarOpen(true);
  };

  const onSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <SnackbarContext.Provider
      value={{ snackbarOpen, message, openSnackbar, onSnackbarClose }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
