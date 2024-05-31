import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-quill/dist/quill.snow.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import Dashboard from "./Pages/Dashboard";
import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

function App() {
  return (
    <BrowserRouter>
      <div className="App w-100">
        <Routes>
          <Route path="/reset-password" element={<ChangePassword />}></Route>
          <Route path="/reset" element={<ForgotPassword />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
