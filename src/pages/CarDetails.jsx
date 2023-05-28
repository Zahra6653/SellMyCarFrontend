import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const CarDetails = () => {
  const location = useLocation();
  const car = location.state;

  return (
    <>
      <Navbar isMain={false} />
      <Grid container justifyContent="center" spacing={0}>
        <Grid item xs={12} md={8}>
          <Box sx={{ m: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                minHeight: "75vh",
                backgroundColor: "#f5f5f5",
                borderRadius: "20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h4" align="center" sx={{ color: "#567189" }}>
                {car.model.modelName}
              </Typography>
              <Grid
                container
                justifyContent="center"
                rowSpacing={2}
                columnSpacing={3}
                sx={{ marginTop: "16px" }}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <img
                    src={car.image}
                    alt={car.modelName}
                    width="100%"
                    height="auto"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <Typography variant="body1" sx={{ color: "#567189" }}>
                    {car.description}
                  </Typography>
                </Grid>
                <Grid item auto></Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: "#d2e9e9",
                      textAlign: "center",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      color: "#567189",
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Color:</strong> {car.color}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: "#d2e9e9",
                      textAlign: "center",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      color: "#567189",
                    }}
                  >
                    <Typography variant="body2">
                      <strong>KMs on Odometer:</strong> {car.odometerKMs}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item auto></Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: "#d2e9e9",
                      borderRadius: "4px",
                      textAlign: "center",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      color: "#567189",
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Major Scratches:</strong>{" "}
                      {car.majorScratches ? <>Yes</> : <>No</>}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: "#d2e9e9",
                      borderRadius: "4px",
                      textAlign: "center",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      color: "#567189",
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Original Paint:</strong>{" "}
                      {car.originalPaint ? <>Yes</> : <>No</>}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: "#d2e9e9",
                      textAlign: "center",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      color: "#567189",
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Registration Place:</strong>{" "}
                      {car.registrationPlace}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: "#d2e9e9",
                      textAlign: "center",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      color: "#567189",
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Number of previous buyers:</strong>{" "}
                      {car.previousBuyers}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      padding: 2,
                      backgroundColor: "#d2e9e9",
                      textAlign: "center",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      color: "#567189",
                    }}
                  >
                    <Typography variant="body2">
                      <strong>Number of accidents reported:</strong>{" "}
                      {car.accidentsReported}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {/* OEM pecification table */}
        <Grid item xs={12} md={4}>
          <Typography variant="h4" sx={{ mt: 7, mb: 2, color: "#567189" }}>
            OEM Specifications
          </Typography>
          <Box sx={{ marginRight: 7 }}>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "20px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Table>
                <TableHead sx={{ background: "#d2e9e9" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: "#567189",
                      }}
                    >
                      Specification
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#567189",
                        fontSize: "20px",
                      }}
                    >
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      Model Name
                    </TableCell>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      {car.model.modelName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      Year of Model
                    </TableCell>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      {car.model.yearOfModel}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      Price
                    </TableCell>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      {car.model.price}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      Available Colors
                    </TableCell>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      {car.model.colors.join(", ")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      Mileage
                    </TableCell>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      {car.model.mileage}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      Power
                    </TableCell>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      {car.model.power}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      Max Speed
                    </TableCell>
                    <TableCell sx={{ color: "#567189", textAlign: "center" }}>
                      {car.model.maxSpeed}Kmph
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default CarDetails;
