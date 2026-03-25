import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTemplates } from "../Context/templates.context";
import { instance } from "../App";
import CreateTemplate from "./CreateTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, CheckCircle2, Search, FileText, Eye, X } from "lucide-react";

const TemplatesList = ({ handleTemplate }) => {
  const { templates, fetchTemp } = useTemplates();
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);

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
                <div className="absolute top-0 right-0 p-1 flex gap-1">
                  <button 
                    onClick={() => setPreviewTemplate(template)}
                    className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Preview Template"
                  >
                    <Eye size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(template._id)}
                    className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Delete Template"
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
      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">
                      {previewTemplate.subject}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Template Preview</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                   <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 text-slate-700 dark:text-slate-300">
                <div className="ql-snow">
                  <div 
                    className="ql-editor p-0" 
                    dangerouslySetInnerHTML={{ __html: previewTemplate.body }} 
                  />
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                <button
                   onClick={() => setPreviewTemplate(null)}
                   className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
                <button
                   onClick={() => {
                     handleTemplate(previewTemplate);
                     setPreviewTemplate(null);
                   }}
                   className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/20 transition-all active:scale-95"
                >
                  <CheckCircle2 size={16} />
                  Use This Template
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
};

export default TemplatesList;
