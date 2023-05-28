import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { base_url } from "../utils/base_url";
import axios from "axios";
import carPoster from "../images/carPoster.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkFormData } from "../utils/LoginValidator";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/User/UserAction";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [helperText, setHelperText] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();
  const [err, setErr] = useState(false);
  const [errorVal, setErrorVal] = useState("");
  const [severity, setSeverity] = useState("error");
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      setErr(location.state);
      setErrorVal("Account Created Successfully!");
      setSeverity("success");
    }
  }, [location.state]);

  const inputUpdateHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setHelperText({
      email: "",
      password: "",
    });
    setErr(false);
    const validationResult = checkFormData(formData);
    if (Object.keys(validationResult).length > 0) {
      setHelperText({ ...validationResult });
    } else {
      try {
        axios
          .post(`${base_url}/api/v1/user/login`, formData)
          .then((response) => {
            setFormData({
              email: "",
              password: "",
            });
            Cookies.set("token", response.data.token);
            Cookies.set("refresh-token", response.data.refresh_token);
            Cookies.set("status", "Y");
            Cookies.set("isLoggedIn", "true");
            Cookies.set("user", JSON.stringify(response.data.user));
            dispatch(userActions(response.data.user));
            navigate("/", { replace: true });
          })
          .catch((error) => {
            setErr(true);
            setErrorVal(error.response.data.message);
            setSeverity("error");
          });
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <Box sx={{ bgcolor: "#58c7c2" }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          background: `url(${carPoster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 8,
            marginRight: "35vw",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
          }}
        >
          {err && (
            <Alert
              severity={severity}
              onClose={() => {
                setErr(false);
              }}
            >
              {errorVal}
            </Alert>
          )}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "#359e99", fontWeight: "600", marginBottom: "1rem" }}
          >
            Login
          </Typography>

          <TextField
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            value={formData.email}
            onChange={inputUpdateHandler}
            helperText={helperText.email}
            fullWidth
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            name="password"
            margin="normal"
            autoComplete="current-password"
            value={formData.password}
            onChange={inputUpdateHandler}
            helperText={helperText.password}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#58c7c2",
              "&:hover": {
                bgcolor: "#449b98",
              },
            }}
            fullWidth
          >
            Sign In
          </Button>

          <Box sx={{ mt: 2 }}>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Don't have an account?{"   "}
                </Typography>
              </Grid>
              <Grid item sx={{ ml: 2 }}>
                <Link to="/signup" color={"secondary"}>
                  SignUp
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
