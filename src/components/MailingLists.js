import React from "react";
import { useState, useEffect } from "react";
import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, CheckCircle2, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MailingLists = (props) => {
  const [mailingLists, setMailingLists] = useState([]);
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get("/mailing-list")
      .then((response) => {
        setMailingLists(response.data.Mailing_List || []);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Failed to fetch lists";
        toast.warn(errorMessage, { position: "top-center" });
        if (error.response?.status === 401) navigate("/login");
      });
  }, [navigate]);

  const handleDelete = (id) => {
    instance
      .delete(`/mailing-list/${id}`)
      .then((response) => {
        setMailingLists(mailingLists.filter((list) => list._id !== id));
        toast.success(response.data.message, { position: "top-center", autoClose: 1500 });
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Delete failed", { position: "top-center", autoClose: 1500 });
      });
  };

  const createMailingList = () => {
    if (!name || !emails) {
      toast.warn("Please fill all fields", { position: "top-center" });
      return;
    }
    setIsLoading(true);
    instance
      .post("/mailing-list", { name, emails: emails.split(",").map(e => e.trim()) })
      .then((response) => {
        setMailingLists([...mailingLists, response.data.Mailing_List]);
        setName("");
        setEmails("");
        toast.info("Campaign created!", { position: "top-center", autoClose: 1500 });
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Creation failed", { position: "top-center" });
      })
      .finally(() => setIsLoading(false));
  };

  const filteredLists = mailingLists.filter(list => 
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Create Campaign Box */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-4 shadow-inner">
        <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1">New Campaign</h4>
        <div className="space-y-3">
          <input
            className="input-premium py-2 text-sm bg-white dark:bg-slate-900 dark:border-slate-700"
            type="text"
            placeholder="Campaign Name (e.g., Summer Newsletter)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="input-premium py-2 text-sm h-24 resize-none bg-white dark:bg-slate-900 dark:border-slate-700"
            placeholder="Recipient Emails (comma separated)"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
          <button 
            onClick={createMailingList} 
            disabled={isLoading}
            className="btn-premium w-full py-2.5 flex items-center justify-center gap-2 text-sm shadow-md"
          >
            <Plus size={16} />
            {isLoading ? "Creating..." : "Create Campaign"}
          </button>
        </div>
      </div>

      {/* Search and List */}
      <div className="flex-1 flex flex-col min-h-0 space-y-4">
        <div className="relative group shrink-0">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs dark:text-slate-200 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredLists.map((list) => (
              <motion.div
                key={list._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-3 hover:shadow-lg dark:hover:shadow-primary-900/10 hover:border-primary-100 dark:hover:border-primary-800 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-1">
                  <button 
                    onClick={() => handleDelete(list._id)}
                    className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">{list.name}</h5>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 italic">
                      {list.emails.join(", ")}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/20" />
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {list.emails.length} contacts
                      </span>
                    </div>
                    <button
                      onClick={() => props.updateList(list)}
                      className="flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-white dark:hover:text-white hover:bg-primary-600 dark:hover:bg-primary-500 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-xl transition-all active:scale-95"
                    >
                      <CheckCircle2 size={14} />
                      Select
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredLists.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-400 dark:text-slate-500 text-xs italic">No campaigns found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailingLists;
