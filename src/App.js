import axios from "axios";
import DealerForm from "./components/DealerForm";
import CarDetails from "./pages/CarDetails";
import DealersCar from "./pages/DealersCar";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import LoginAuth from "./utils/LoginAuth";
import { base_url } from "./utils/base_url";

axios.interceptors.request.use(
  async (request) => {
    if (!Cookies.get("token")) {
      return request;
    }
    request.headers["token"] = Cookies.get("token");
    request.headers["refresh-token"] = Cookies.get("refresh-token");
    const { exp } = jwt_decode(Cookies.get("token"));
    const expDate = new Date(parseInt(exp) * 1000);
    const currentDate = new Date();
    if (currentDate > expDate && Cookies.get("status") == "Y") {
      Cookies.set("status", "N");
      try {
        await axios.get(`${base_url}/api/v1/user/refresh`).then((response) => {
          Cookies.set("token", response.data.token);
          Cookies.set("status", "Y");
        });
        request.headers["token"] = Cookies.get("token");
        request.headers["refresh-token"] = Cookies.get("refresh-token");
      } catch (err) {
        console.log("refreshtoken error", err);
        Cookies.remove("isLoggedIn");
        <Navigate to={"/login"} />;
      }
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginAuth><Main/></LoginAuth>} />
        <Route exact path="/form" element={<LoginAuth><DealerForm/></LoginAuth>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/details" element={<LoginAuth><CarDetails/></LoginAuth>} />
        <Route exact path="/dealersProfile" element={<LoginAuth><DealersCar /></LoginAuth>} />
      </Routes>
    </div>
  );
}

export default App;
