import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import SnackbarContext from "../../context/SnackbarContext";

const SnackbarAlert = () => {
  const { onSnackbarClose, snackbarOpen, message } =
    useContext(SnackbarContext);

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onSnackbarClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={snackbarOpen}
      onClose={onSnackbarClose}
      autoHideDuration={4000}
      action={action}
    >
      <Alert onClose={onSnackbarClose} variant="filled" severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
