import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import React from "react";


const LoginAuth = ({ children }) => {
  const isLoggedIn = Cookies.get("isLoggedIn")
  return (
    <>
    {isLoggedIn?children:<Navigate to={'/login'}/>}
    </>
  )
};

export default LoginAuth;
