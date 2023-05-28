import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { base_url } from "../utils/base_url";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import { Box } from "@mui/material";

const DealersCar = () => {
  const user = useSelector((state) => state.user.user);
  const [cars, setCars] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    console.log(user);
    setIsDelete(false);
    axios
      .get(`${base_url}/api/v1/inventory/postedCarByUser/${user._id}`)
      .then((res) => {
        console.log(res.data);
        setCars(res.data.cars);
      })
      .catch((err) => console.log(err));
  }, [isDelete]);
  return (
    <>
      <Navbar isMain={false} />
      <Box sx={{ minHeight: "85vh" }}>
        {cars.map((car) => (
          <CarCard car={car} setIsDelete={setIsDelete} />
        ))}
      </Box>
      <Footer />
    </>
  );
};

export default DealersCar;
