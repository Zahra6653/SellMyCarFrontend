import React, { useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  InventoryAction,
  InventorySearchAction,
} from "../redux/InventoryCars/InventoryAction";
import AlertComponent from "../components/AlertComponent";

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cars = useSelector((state) => state.inventoryCars.searchCars);
  const [carsData, setCarsData] = useState([]);
  const dispatch = useDispatch();
  const [alert, showAlert] = useState(false);

  useEffect(() => {
    if (location.state) {
      showAlert(true);
    }
  }, [location.state]);

  useEffect(() => {
    const savedData = localStorage.getItem("myCarsData");
    if (savedData) {
      setCarsData(JSON.parse(savedData));
      const data = JSON.parse(savedData);
      dispatch(InventoryAction(data));
      dispatch(InventorySearchAction(data));
    } else {
      axios.get(`${base_url}/api/v1/inventory/getAllcars`).then((res) => {
        setCarsData(res.data.cars);
        dispatch(InventoryAction(res.data.cars));
        dispatch(InventorySearchAction(res.data.cars));
        localStorage.setItem("myCarsData", JSON.stringify(res.data.cars));
      });
    }
  }, []);

  const detailsHandler = (id) => {
    axios.get(`${base_url}/api/v1/inventory/getDetails/${id}`).then((res) => {
      const data = res.data.carDetails;
      navigate("/details", { state: data });
    });
  };

  return (
    <>
      <Navbar isMain={true} />
      {alert && (
        <AlertComponent
          title="Success"
          message="Car Posted Succesfully"
          duration={2000}
        />
      )}
      <Container
        sx={{
          mt: 4,
          mb: 4,
          borderRadius: "10px",
          minHeight: "90vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Grid container spacing={2}>
          {cars.length > 0 ? (
            <>
              {cars.map((car) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={car._id}>
                  <Card sx={{ mb: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={car.image}
                      alt={car.modelName}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" component="div"  sx={{ whiteSpace: "nowrap" }}gutterBottom>
                        {car.modelName}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        KMs on Odometer: {car.odometerKMs}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Color: {car.color}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button
                        size="small"
                        sx={{ color: "#58c7c2" }}
                        color="primary"
                        onClick={() => detailsHandler(car._id)}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </>
          ) : (
            <Typography
              sx={{
                ml: "27vw",
                mt: "20vw",
                color: "#567189",
                fontSize: "50px",
              }}
            >
              No Cars Found!!
            </Typography>
          )}
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Main;
