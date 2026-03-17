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
import { Lock, CheckCircle2, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Home />
      
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass p-10 rounded-3xl shadow-2xl border border-white text-center">
          <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl text-white">
            <ShieldCheck size={40} />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Reset Password</h2>
          <p className="text-slate-500 mb-10 font-medium">Create a strong new password for your account</p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input-premium pl-12"
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
              <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
              <div className="relative group">
                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="input-premium pl-12"
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
