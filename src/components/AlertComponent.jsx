import React, { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";

const AlertComponent = ({ title, message, duration }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <>
      {showAlert && (
        <Alert severity="success">
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;
