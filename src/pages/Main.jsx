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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  InventoryAction,
  InventorySearchAction,
} from "../redux/InventoryCars/InventoryAction";

const Main = () => {
  const navigate = useNavigate();
  const cars = useSelector((state) => state.inventoryCars.searchCars);
  const [carsData, setCarsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {

    const savedData = localStorage.getItem('myCarsData');
    if (savedData) {
      console.log("refreshed")
      
      setCarsData(JSON.parse(savedData));
      const data=JSON.parse(savedData)
      console.log(data)
      dispatch(InventoryAction(data));
      dispatch(InventorySearchAction(data));
    } else {
      // Fetch data from the API if no saved data exists
      axios.get(`${base_url}/api/v1/inventory/getAllcars`).then((res) => {
        setCarsData(res.data.cars);
        // Save the data to Local Storage
        dispatch(InventoryAction(res.data.cars));
        dispatch(InventorySearchAction(res.data.cars));
        localStorage.setItem('myCarsData', JSON.stringify(res.data.cars));
      });
    }
    // axios.get(`${base_url}/api/v1/inventory/getAllcars`).then((res) => {
    //   setCarsData(res.data.cars);
    //   dispatch(InventoryAction(res.data.cars));
    //   dispatch(InventorySearchAction(res.data.cars));
    // });
  }, []);

  const detailsHandler = (id) => {
    console.log(id);
    axios.get(`${base_url}/api/v1/inventory/getDetails/${id}`).then((res) => {
      const data = res.data.carDetails;
      navigate("/details", { state: data });
    });
  };
  return (
    <>
      <Navbar isMain={true} />
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
                <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
                  <Card sx={{ mb: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={car.image}
                      alt={car.modelName}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" component="div" gutterBottom>
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
