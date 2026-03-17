import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock } from "lucide-react";

import { registerSchema } from "../Schemas/userValidationSchema";
import Home from "./Home";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values, action) => {
        try {
          await instance.post("/register", values);
          toast.success("You have Successfully Registered", {
            position: "top-center",
          });
          action.resetForm();
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Registration failed";
          toast.warn(errorMessage, {
            position: "top-center",
          });
        }
      },
    });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <Home />
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <div className="glass dark:bg-slate-900/60 p-8 md:p-10 rounded-3xl shadow-2xl space-y-8 border border-white/20 dark:border-slate-800/50">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Create Account</h2>
              <p className="text-slate-500 dark:text-slate-400">Join MailMegaPro and start sending bulk emails</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input-premium pl-11 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-xs text-red-500 ml-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="john@example.com"
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
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Mobile Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    placeholder="+1 234 567 890"
                    className="input-premium pl-11 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.mobileNumber && errors.mobileNumber && (
                  <p className="text-xs text-red-500 ml-1">{errors.mobileNumber}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
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
                className="btn-premium w-full md:col-span-2 flex justify-center items-center h-12 mt-2"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="pt-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-bold decoration-2 underline-offset-4 hover:underline">
                  Log in
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

export default Register;
