import React from "react";
import { useFormik } from "formik";
import { useSearchParams } from "react-router-dom";
import { ChangePasswordSchema } from "../Schemas/userValidationSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ChangePasswordSchema,
      onSubmit: async (values, { resetForm }) => {
        const newPassword = values.password;

        await axios
          .post(`${process.env.REACT_APP_BASE_URL}/reset-password`, {
            token,
            userId,
            newPassword,
          })
          .then((response) => {
            const data = response.data.message;
            toast.success(data, {
              position: "top-center",
            });
            setTimeout(() => {
              navigate("/login");
            }, 1500);
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
          <h2 className="text-center">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="password">
                <strong>Enter new password</strong>
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
            <div className="m-3">
              <label htmlFor="password">
                <strong>Confirm new password</strong>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-control rounded-1 "
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              ></input>
              {touched.confirmPassword && errors.confirmPassword ? (
                <p className="text-danger">{errors.confirmPassword}</p>
              ) : null}
            </div>
            <button type="submit" className="btn btn-success w-100 rounded ">
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChangePassword;
