import { useState } from "react";
import ReactQuill from "react-quill";
import { formats, modules } from "../Pages/QuillData";
import { instance } from "../App";
import { useTemplates } from "../Context/templates.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X, FilePlus, Save, Layout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function CreateTemplate() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { fetchTemp } = useTemplates();
  const [isSaving, setIsSaving] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTitle("");
    setContent("");
  };
  const handleShow = () => setShow(true);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.warn("Please fill all fields", { position: "top-center" });
      return;
    }

    setIsSaving(true);
    try {
      const response = await instance.post("/templates", { subject: title, body: content });
      fetchTemp();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1500,
      });
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Save failed", {
        position: "top-center",
        autoClose: 1500,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        className="btn-premium w-full py-4 flex items-center justify-center gap-3 group shadow-lg shadow-primary-500/10 active:scale-95 transition-all"
        onClick={handleShow}
      >
        <FilePlus size={20} className="group-hover:scale-110 group-hover:rotate-6 transition-transform" />
        <span className="font-bold uppercase tracking-wider text-sm">Create New Template</span>
      </button>

      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-3xl glass dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500" />

              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    <Layout size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white">New Design</h2>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email Blueprint</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Template Subject</label>
                  <input
                    type="text"
                    placeholder="e.g., Seasonal Collection 2026 🌿"
                    className="input-premium py-4 font-semibold text-base bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2 flex flex-col h-64">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Blueprint Body</label>
                  <div className="flex-1 bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner focus-within:ring-4 focus-within:ring-primary-50 dark:focus-within:ring-primary-900/20 focus-within:border-primary-200 dark:focus-within:border-primary-800 transition-all flex flex-col">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      value={content}
                      onChange={setContent}
                      className="flex-1 bg-white dark:bg-slate-900 h-full custom-quill dark:text-slate-200"
                      placeholder="Describe your design or paste HTML structure here..."
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-8 py-4 rounded-2xl font-black text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800 uppercase tracking-widest text-xs"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-[2] btn-premium flex items-center justify-center gap-3 py-4 shadow-2xl shadow-primary-200 dark:shadow-primary-900/20"
                  >
                    <Save size={20} className={isSaving ? "animate-spin" : ""} />
                    <span className="text-base font-black uppercase tracking-wider">
                      {isSaving ? "Finalizing..." : "Save Template"}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </>
  );
}

export default CreateTemplate;
