import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import { formats, modules } from "./QuillData";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, BookOpen, Trash2, Info, Sparkles, X, Mail } from "lucide-react";

const BulkEmails = (props) => {
  const [list, setList] = useState(props.userList.emails || []);
  const [template, setTemplate] = useState(props.template || {});
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const initialValues = {
    recipients: list || [],
    subject: template.subject || "",
    template: template.body || "",
  };

  useEffect(() => {
    setList(props.userList.emails || []);
    setTemplate(props.template || {});
  }, [props]);

  const { values, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const response = await instance.post("/bulk-email-sending", values);
        toast.success(response.data.message, { position: "top-center" });
        resetForm();
        setList([]);
        setTemplate({});
        props.handleClear();
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to send emails";
        toast.warn(errorMessage, { position: "top-center" });
      }
    },
  });

  const addRecipient = (email) => {
    const trimmed = email.trim();
    if (!trimmed) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      toast.warn(`Invalid email: ${trimmed}`, { position: "bottom-right", autoClose: 2000 });
      return;
    }

    if (!values.recipients.includes(trimmed)) {
      setFieldValue("recipients", [...values.recipients, trimmed]);
    }
    setInputValue("");
  };

  const removeRecipient = (emailToRemove) => {
    setFieldValue("recipients", values.recipients.filter(e => e !== emailToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addRecipient(inputValue);
    } else if (e.key === "Backspace" && !inputValue && values.recipients.length > 0) {
      removeRecipient(values.recipients[values.recipients.length - 1]);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const emails = pastedData.split(/[,\n]/).map(e => e.trim()).filter(e => e);
    
    const validEmails = emails.filter(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    if (validEmails.length < emails.length) {
      toast.warn("Some invalid emails were skipped", { position: "bottom-right", autoClose: 2000 });
    }

    const uniqueNewEmails = validEmails.filter(e => !values.recipients.includes(e));
    setFieldValue("recipients", [...values.recipients, ...uniqueNewEmails]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">Compose Message</h2>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Craft your high-impact bulk email campaign</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-2xl border border-primary-100 dark:border-primary-800/50">
          <Sparkles size={16} className="text-primary-500 dark:text-primary-400" />
          <span className="text-[10px] font-bold text-primary-700 dark:text-primary-300 tracking-wider uppercase">Pro Mode Active</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col min-h-0">
        <div className="grid grid-cols-1 gap-6">
          {/* Enhanced Recipients Multi-select */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={14} className="text-primary-500 dark:text-primary-400" />
                Recipients List
              </div>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-400 font-black">
                {values.recipients.length} Total
              </span>
            </label>
            
            <div 
              onClick={() => inputRef.current?.focus()}
              className="min-h-[100px] p-2 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-inner focus-within:ring-4 focus-within:ring-primary-50 dark:focus-within:ring-primary-900/20 focus-within:border-primary-200 dark:focus-within:border-primary-800 transition-all flex flex-wrap gap-2 items-start cursor-text overflow-y-auto max-h-[200px] custom-scrollbar"
            >
              <AnimatePresence initial={false}>
                {values.recipients.map((email) => (
                  <motion.div
                    key={email}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1.5 rounded-xl border border-primary-100 dark:border-primary-800 text-xs font-bold group"
                  >
                    <Mail size={12} className="text-primary-400 dark:text-primary-500" />
                    {email}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecipient(email);
                      }}
                      className="p-0.5 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-md transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <input
                ref={inputRef}
                className="flex-1 min-w-[200px] bg-transparent border-none outline-none py-2 px-2 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                placeholder={values.recipients.length === 0 ? "Type email and press Enter or paste list..." : ""}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onBlur={() => {
                  if (inputValue) addRecipient(inputValue);
                }}
              />
            </div>
            <div className="flex items-center gap-2 px-1">
              <span className="text-slate-400 dark:text-slate-600"><Info size={12} /></span>
              <p className="text-[10px] text-slate-400 dark:text-slate-600 font-medium italic">
                Tip: Select a campaign from the sidebar or paste a list of emails directly.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 flex items-center gap-2">
              <BookOpen size={14} className="text-primary-500 dark:text-primary-400" />
              Campaign Subject
            </label>
            <input
              type="text"
              name="subject"
              className="input-premium py-3 text-sm font-medium shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-white"
              placeholder="e.g., Exclusive 20% Discount Inside!"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <div className="space-y-2 flex-1 flex flex-col min-h-[350px]">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Message Content</label>
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner focus-within:ring-4 focus-within:ring-primary-50 dark:focus-within:ring-primary-900/20 focus-within:border-primary-200 dark:focus-within:border-primary-800 transition-all flex flex-col">
            <ReactQuill
              theme="snow"
              modules={modules}
              value={values.template}
              formats={formats}
              className="flex-1 bg-white dark:bg-slate-900 h-full overflow-hidden custom-quill dark:text-slate-200"
              placeholder="Start typing your masterpiece..."
              onChange={(content) =>
                handleChange({
                  target: { name: "template", value: content },
                })
              }
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              resetForm();
              props.handleClear();
              setFieldValue("recipients", []);
            }}
            className="flex items-center gap-2 px-6 py-3 text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl font-bold transition-all text-sm group"
          >
            <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
            Discard Draft
          </button>
          
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || !values.recipients.length || !values.subject}
            className="btn-premium flex items-center gap-3 h-14 px-12 shadow-2xl shadow-primary-200 disabled:grayscale disabled:opacity-50 disabled:scale-100 rounded-2xl"
          >
            <Send size={20} className={isSubmitting ? "animate-bounce" : "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"} />
            <span className="text-base font-black uppercase tracking-wider">
              {isSubmitting ? "Dispatching..." : "Send Campaign Now"}
            </span>
          </motion.button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BulkEmails;
