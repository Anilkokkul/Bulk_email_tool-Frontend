import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerSchema } from "../Schemas/userValidationSchema";
import axios from "axios";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values, action) => {
        await axios
          .post(`${process.env.REACT_APP_BASE_URL}/register`, values)
          .then((response) => {
            toast.success("You have Successfully Registered", {
              position: "top-center",
            });
          })
          .catch((error) => {
            const errorMessage = error.response.data.message;
            toast.warn(errorMessage, {
              position: "top-center",
            });
          });

        action.resetForm();
      },
    });
  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 bg-primary vh-100">
        <div className="bg-white p-3 rounded  w-25 ">
          <h2 className="text-center">Register</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="email">
                <strong>Name</strong>
              </label>
              <input
                type="name"
                placeholder="Enter Name"
                className="form-control rounded-1 "
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.name && errors.name ? (
                <p className="text-danger">{errors.name}</p>
              ) : null}
            </div>
            <div className="m-3">
              <label htmlFor="mobileNumber">
                <strong>Mobile Number</strong>
              </label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="form-control rounded-1 "
                name="mobileNumber"
                value={values.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.mobileNumber && errors.mobileNumber ? (
                <p className="text-danger">{errors.mobileNumber}</p>
              ) : null}
            </div>
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
              Create Account
            </button>
          </form>
          <Link
            to={"/login"}
            className="btn mt-4 btn-outline-success rounded text-decoration-none w-100 rounded"
          >
            Login
          </Link>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
