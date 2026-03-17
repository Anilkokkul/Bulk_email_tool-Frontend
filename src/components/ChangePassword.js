import React from "react";
import { useFormik } from "formik";
import { useSearchParams } from "react-router-dom";
import { ChangePasswordSchema } from "../Schemas/userValidationSchema";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import { instance } from "../App";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ChangePasswordSchema,
      onSubmit: async (values) => {
        try {
          const response = await instance.post("/reset-password", {
            token,
            userId,
            newPassword: values.password,
          });
          toast.success(response.data.message, { position: "top-center" });
          setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
          toast.error(error.response?.data?.message || "Reset failed", { position: "top-center" });
        }
      },
    });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass dark:bg-slate-900/60 p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800/50 text-center relative overflow-hidden">
          <Link 
            to="/" 
            className="absolute top-6 left-6 text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1 text-sm font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>
          <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl text-white">
            <ShieldCheck size={40} />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Reset Password</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">Create a strong new password for your account</p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input-premium input-with-icon bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
              <div className="relative group">
                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="input-premium pl-12 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-premium w-full py-4 text-lg mt-4 disabled:grayscale disabled:opacity-50"
            >
              {isSubmitting ? "Resetting..." : "Save New Password"}
            </button>
          </form>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
