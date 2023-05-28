import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { base_url } from "../utils/base_url";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";

const DealersCar = () => {
  const user = useSelector((state) => state.user.user);
  const [cars,setCars]=useState([]);
  useEffect(() => {
    console.log(user);
    axios
      .get( `${base_url}/api/v1/inventory/postedCarByUser/${user._id}`)
      .then((res) => {
        console.log(res.data);
        setCars(res.data.cars)
      })
      .catch((err) => console.log(err));
  },[]);
  return (
    <>
      <Navbar isMain={false} />
      {cars.map(car=><CarCard car={car}/>)}
      <Footer />
    </>
  );
};

export default DealersCar;
