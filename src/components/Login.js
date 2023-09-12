import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../Schemas/userValidationSchema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, { resetForm }) => {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}/login`, values)
          .then((response) => {
            toast.success("User logged in Successfully", {
              position: "top-center",
            });
          })
          .catch((error) => {
            const errorMessage = error.response.data.message;
            toast.warn(errorMessage, {
              position: "top-center",
            });
          });
        resetForm();
      },
    });

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 bg-primary vh-100">
        <div className="bg-white p-3 rounded  w-25 ">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-control rounded-1 "
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.email && errors.email ? (
                <p className="text-danger">{errors.email}</p>
              ) : null}
            </div>
            <div className="m-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-control rounded-1 "
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.password && errors.password ? (
                <p className="text-danger">{errors.password}</p>
              ) : null}
            </div>
            <button type="submit" className="btn btn-success w-100 rounded ">
              Login
            </button>
          </form>
          <div className="mt-2 ">
            Forgot password ?<Link to={"/reset"}>Click here</Link>
          </div>
          <Link
            to={"/register"}
            className="btn mt-3 btn-outline-success rounded text-decoration-none w-100 rounded-2"
          >
            Create Account
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
