import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgortPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/forgot-password`, {
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
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 bg-primary vh-100">
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

export default ForgortPassword;
