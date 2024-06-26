import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import { instance } from "../App";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      instance
        .post("/forgot-password", {
          email,
        })
        .then((response) => {
          const data = response.data.message;

          toast.success(data, {
            position: "top-center",
          });
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          toast.warn(errorMessage, {
            position: "top-center",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Home />
      <div className="d-flex justify-content-center align-items-center w-100 bg-primary login-page">
        <div className="bg-white p-3 rounded  w-25 ">
          <h2 className="text-center">Forgot Password ?</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">
                <strong>Type your email here</strong>
              </label>
              <p>We will send a password set-up link on your email</p>
              <input
                type="email"
                placeholder="Enter email"
                className="form-control rounded-1 "
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <button type="submit" className="btn btn-success rounded mt-3">
              Send email
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
