import DealerForm from "./components/DealerForm";
import CarDetails from "./pages/CarDetails";
import DealersCar from "./pages/DealersCar";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/form" element={<DealerForm />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/details" element={<CarDetails />} />
        <Route exact path="/dealersProfile" element={<DealersCar />} />
      </Routes>
    </div>
  );
}

export default App;
