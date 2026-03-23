import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTemplates } from "../Context/templates.context";
import { instance } from "../App";
import CreateTemplate from "./CreateTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, CheckCircle2, Search, FileText } from "lucide-react";

const TemplatesList = ({ handleTemplate }) => {
  const { templates, fetchTemp } = useTemplates();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTemp();
  }, [fetchTemp]);

  const handleDelete = (id) => {
    instance
      .delete(`/deleteTemplate/${id}`)
      .then((response) => {
        fetchTemp();
        toast.warn(response.data.message, { position: "top-center", autoClose: 1500 });
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Delete failed", { position: "top-center", autoClose: 1500 });
      });
  };

  const filteredTemplates = templates?.filter(template => 
    template.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="shrink-0">
        <CreateTemplate />
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-4">
        <div className="relative group shrink-0">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs dark:text-slate-200 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredTemplates?.map((template) => (
              <motion.div
                key={template._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-3 hover:shadow-lg dark:hover:shadow-primary-900/10 hover:border-primary-100 dark:hover:border-primary-800 transition-all group relative overflow-hidden border-l-4 border-l-primary-500"
              >
                <div className="absolute top-0 right-0 p-1">
                  <button 
                    onClick={() => handleDelete(template._id)}
                    className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-primary-400 shrink-0" />
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-1">{template.subject}</h5>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed h-8 border-l border-slate-100 dark:border-slate-800 pl-2 italic">
                    {template.body.replace(/<[^>]*>?/gm, '')}
                  </div>

                  <div className="flex justify-end mt-2 pt-3 border-t border-slate-50 dark:border-slate-800">
                    <button
                      onClick={() => handleTemplate(template)}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-primary-600 dark:text-primary-400 hover:text-white dark:hover:text-white hover:bg-primary-600 dark:hover:bg-primary-500 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-xl transition-all active:scale-95"
                    >
                      <CheckCircle2 size={12} />
                      Use Template
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {(!filteredTemplates || filteredTemplates.length === 0) && (
            <div className="text-center py-10">
              <p className="text-slate-400 dark:text-slate-500 text-xs italic">No templates found.</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TemplatesList;
