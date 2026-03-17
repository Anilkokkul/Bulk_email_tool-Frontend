import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { instance } from "../App";
import { loginSchema } from "../Schemas/userValidationSchema";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Lock, Mail as MailIcon } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          await instance.post("/login", values);
          toast.success("User logged in Successfully", {
            position: "top-center",
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } catch (error) {
          console.log(error);
          const errorMessage = error.response?.data?.message || "Something went wrong";
          toast.warn(errorMessage, {
            position: "top-center",
          });
        }
        resetForm();
      },
    });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <Home />
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass dark:bg-slate-900/60 p-8 rounded-3xl shadow-2xl space-y-8 border border-white/20 dark:border-slate-800/50">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Welcome Back</h2>
              <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors">
                    <MailIcon size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="input-premium pl-11 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-xs text-red-500 ml-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                  <Link to="/reset" className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input-premium pl-11 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.password && errors.password && (
                  <p className="text-xs text-red-500 ml-1">{errors.password}</p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-premium w-full flex justify-center items-center h-12"
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="pt-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-bold decoration-2 underline-offset-4 hover:underline">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
