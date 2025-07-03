import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert, Stack, useTheme } from "@mui/material";
import { SnackbarContext } from "./snackBarContext";

const SnackBarProvider = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("This is default");
  const [messageType, setMessageType] = useState("success");

  const closeSnackBar = () => {
    setOpen(false);
  };

  const openSnackBar = useCallback((snackBarMessage, snackBarMessageType) => {
    setOpen(true);
    setMessage(snackBarMessage);
    setMessageType(snackBarMessageType);
  }, []);

  return (
    <SnackbarContext.Provider value={openSnackBar}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={closeSnackBar}>
          <Alert
            variant="filled"
            onClose={closeSnackBar}
            severity={messageType}
            autoHideDuration={2000}
            sx={{
              width: "100%",
              backgroundColor:
                theme.palette[messageType].main || theme.palette.success.main,
              color:
                theme.palette[messageType].contrastText ||
                theme.palette.success.contrastText,
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
      {children}
    </SnackbarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SnackBarProvider;
