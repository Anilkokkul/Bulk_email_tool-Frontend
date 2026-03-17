import "./App.css";
import Home from "./components/Home";
import "react-quill/dist/quill.snow.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import Dashboard from "./Pages/Dashboard";
import axios from "axios";
import { ThemeProvider } from "./Context/theme.context";

export const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App w-100 min-h-screen transition-colors duration-300">
          <Routes>
            <Route path="/reset-password" element={<ChangePassword />}></Route>
            <Route path="/reset" element={<ForgotPassword />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
