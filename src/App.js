import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgortPassword from "./components/ForgortPassword";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/reset-password" element={<ChangePassword />}></Route>
          <Route path="/reset" element={<ForgortPassword />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
