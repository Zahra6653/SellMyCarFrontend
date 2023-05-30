import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { base_url } from "../utils/base_url";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import { Box, Typography } from "@mui/material";

const DealersCar = () => {
  const user = useSelector((state) => state.user.user);
  const [cars, setCars] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [flag, setFlag] = useState(true);
 

  useEffect(() => {
    setIsDelete(false);
    axios
      .get(`${base_url}/api/v1/inventory/postedCarByUser/${user._id}`)
      .then((res) => {
        setCars(res.data.cars);
      
      })
      .catch((err) => console.log(err));
  }, [isDelete]);
  return (
    <>
      <Navbar isMain={false} />
      <Box sx={{ minHeight: "85vh" }}>
        {cars.length==0 ? (
          <Box display="flex" alignItems="center" justifyContent="center"  minHeight="85vh" >
            <Typography
              variant="h3"
              sx={{
                color: "#359e99",
                textAlign:"center"
              }}
            >
              You haven't posted any cars yet!!
            </Typography>
          </Box>
        ) : (
          <>
            {cars.map((car, index) => (
              <CarCard
                car={car}
                key={index}
                setIsDelete={setIsDelete}
                carId={car._id}
              />
            ))}
          </>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default DealersCar;
