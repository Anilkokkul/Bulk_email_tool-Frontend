import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import MailingLists from "../components/MailingLists";
import { useState } from "react";
import BulkEmails from "./BulkEmails";
import TemplatesList from "../components/Templates";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  LayoutDashboard, 
  Send, 
  Users, 
  FileText, 
  Mail, 
  Zap, 
  Clock, 
  X, 
  BarChart3, 
  Settings, 
  Menu, 
  HelpCircle 
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const Dashboard = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [template, setTemplate] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("composer");

  const handleLogout = () => {
    instance
      .get("/logout")
      .then((response) => {
        toast.info(response.data.message, { position: "top-center", autoClose: 1500 });
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Logout failed", { position: "top-center" });
      });
  };

  const stats = [
    { label: "Emails Sent", value: "12.8k", icon: <Mail className="text-blue-500" size={18} />, trend: "+12%" },
    { label: "Open Rate", value: "24.5%", icon: <Zap className="text-amber-500" size={18} />, trend: "+5.2%" },
    { label: "Active Lists", value: "8", icon: <Users className="text-purple-500" size={18} />, trend: "Stable" },
    { label: "Avg Delivery", value: "1.2s", icon: <Clock className="text-emerald-500" size={18} />, trend: "-0.3s" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300 flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed lg:static inset-y-0 left-0 z-[60] w-72 glass-dark bg-[#0f172a] text-white p-6 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary-500 text-white shadow-lg shadow-primary-500/20">
                  <Mail size={22} />
                </div>
                <span className="text-xl font-bold tracking-tight">MailMegaPro</span>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              <SidebarLink 
                icon={<LayoutDashboard size={20} />} 
                label="Overview" 
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
              />
              <SidebarLink 
                icon={<Send size={20} />} 
                label="Email Composer" 
                active={activeTab === "composer"}
                onClick={() => setActiveTab("composer")}
              />
              <SidebarLink 
                icon={<Users size={20} />} 
                label="Campaigns" 
                active={activeTab === "campaigns"}
                onClick={() => setActiveTab("campaigns")}
              />
              <SidebarLink 
                icon={<FileText size={20} />} 
                label="Templates" 
                active={activeTab === "templates"}
                onClick={() => setActiveTab("templates")}
              />
              <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
                <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Analytics</div>
                <SidebarLink icon={<BarChart3 size={20} />} label="Reporting" />
                <SidebarLink icon={<Settings size={20} />} label="Settings" />
              </div>
            </nav>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-red-500/10 transition-all font-medium group"
              >
                <LogOut size={20} className="group-hover:text-red-500 transition-colors" />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Menu size={20} className="dark:text-slate-300" />
              </button>
            )}
            <h1 className="font-bold text-slate-800 dark:text-white text-lg hidden sm:block">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
              <HelpCircle size={20} className="text-slate-500 dark:text-slate-400" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900 dark:text-white">John Doe</div>
                <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Pro Plan Member</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex items-center justify-center font-bold text-primary-700 dark:text-primary-400">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#f8fafc] dark:bg-slate-950 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      stat.trend.startsWith('+') ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 
                      stat.trend === 'Stable' ? 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Main Grid Components */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10">
              
              {/* Sidebar Tabs (Campaigns & Templates) */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                      <button 
                        onClick={() => setActiveTab('campaigns')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          activeTab === 'campaigns' ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                      >
                        Campaigns
                      </button>
                      <button 
                        onClick={() => setActiveTab('templates')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          activeTab === 'templates' ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                      >
                        Templates
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-6 overflow-y-auto">
                    {activeTab === 'campaigns' || activeTab === 'composer' ? (
                      <MailingLists updateList={setList} />
                    ) : (
                      <TemplatesList handleTemplate={setTemplate} />
                    )}
                  </div>
                </div>
              </div>

              {/* Primary Content (Composer or Overview) */}
              <div className="lg:col-span-8 h-full min-h-[600px]">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col overflow-hidden relative">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500" />
                  <div className="p-8 flex-1">
                    <BulkEmails
                      userList={list}
                      template={template}
                      handleClear={() => { setList([]); setTemplate({}); }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

const SidebarLink = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
      active 
        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" 
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default Dashboard;
