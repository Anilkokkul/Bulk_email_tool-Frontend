import { instance } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import MailingLists from "../components/MailingLists";
import { useState, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState("composer");
  const [user, setUser] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    instance.get("/user")
      .then((response) => {
        setUser(response.data?.user);
      })
      .catch((error) => {
        toast.error("Please login to access dashboard");
        navigate("/login");
      });

    instance.get("/api/history/stats")
      .then((res) => setDashboardStats(res.data))
      .catch((err) => console.error(err));

    instance.get("/api/history")
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);
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
    { label: "Total Campaigns", value: dashboardStats ? dashboardStats.totalCampaigns : "0", icon: <LayoutDashboard className="text-blue-500" size={18} />, trend: "Stable" },
    { label: "Emails Sent", value: dashboardStats ? dashboardStats.totalEmailsSent : "0", icon: <Mail className="text-amber-500" size={18} />, trend: "Stable" },
    { label: "Total Accepted", value: dashboardStats ? dashboardStats.totalAccepted : "0", icon: <Send className="text-emerald-500" size={18} />, trend: "Stable" },
    { label: "Total Rejected", value: dashboardStats ? dashboardStats.totalRejected : "0", icon: <X className="text-red-500" size={18} />, trend: "Stable" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300 flex flex-col">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary-500 text-white shadow-lg shadow-primary-500/20">
              <Mail size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">MailMegaPro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <TopNavLink icon={<LayoutDashboard size={16} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <TopNavLink icon={<Send size={16} />} label="Composer" active={activeTab === 'composer'} onClick={() => setActiveTab('composer')} />
            <TopNavLink icon={<Users size={16} />} label="Campaigns" active={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} />
            <TopNavLink icon={<FileText size={16} />} label="Templates" active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} />
            <TopNavLink icon={<BarChart3 size={16} />} label="Reporting" active={activeTab === 'reporting'} onClick={() => setActiveTab('reporting')} />
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <button className="hidden sm:flex p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
            <Settings size={20} className="text-slate-500 dark:text-slate-400" />
          </button>
          
          <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200 dark:border-slate-800">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-900 dark:text-white">{user ? user.name : "Loading..."}</div>
              <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{user ? user.email : ""}</div>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 flex items-center justify-center font-bold text-primary-700 dark:text-primary-400 uppercase text-xs sm:text-sm">
              {user && user.name ? user.name.substring(0, 2) : "US"}
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors ml-1" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#f8fafc] dark:bg-slate-950 custom-scrollbar relative">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-2 custom-scrollbar">
            <TopNavLink icon={<LayoutDashboard size={14} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <TopNavLink icon={<Send size={14} />} label="Composer" active={activeTab === 'composer'} onClick={() => setActiveTab('composer')} />
            <TopNavLink icon={<Users size={14} />} label="Campaigns" active={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} />
            <TopNavLink icon={<FileText size={14} />} label="Templates" active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} />
            <TopNavLink icon={<BarChart3 size={14} />} label="Reporting" active={activeTab === 'reporting'} onClick={() => setActiveTab('reporting')} />
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <span className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                      stat.trend === 'Stable' ? 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>
                    {stat.trend}
                  </span>
                </div>
                <div className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-semibold text-slate-400 dark:text-slate-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Main Grid Components */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-10">

            {/* Sidebar Tabs (Campaigns & Templates) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
                    <button
                      onClick={() => setActiveTab('campaigns')}
                      className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'campaigns' ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                      Campaigns
                    </button>
                    <button
                      onClick={() => setActiveTab('templates')}
                      className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'templates' ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
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

            {/* Primary Content (Reporting or Defaults) */}
            <div className="lg:col-span-8 h-full min-h-[600px]">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col overflow-hidden relative">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500" />
                <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                  {activeTab === 'reporting' ? (
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Recent Campaigns</h2>
                      {history.length === 0 ? (
                        <div className="text-center text-slate-500 py-10">No campaigns found.</div>
                      ) : (
                        <div className="space-y-4">
                          {history.map((item) => (
                            <div key={item._id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <h3 className="font-semibold text-slate-800 dark:text-white">{item.subject || "No Subject"}</h3>
                                <div className="text-xs text-slate-500 mt-1">{new Date(item.createdAt).toLocaleString()}</div>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-center">
                                  <div className="text-xs text-slate-500">Recipients</div>
                                  <div className="font-bold text-slate-800 dark:text-white">{item.recipientsCount}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs text-slate-500">Accepted</div>
                                  <div className="font-bold text-emerald-600">{item.acceptedCount}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs text-slate-500">Status</div>
                                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                    item.status === 'Success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                    item.status === 'Failed' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                  }`}>
                                    {item.status || "Unknown"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <BulkEmails
                      userList={list}
                      template={template}
                      handleClear={() => { setList([]); setTemplate({}); }}
                    />
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

const TopNavLink = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${active
        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
      }`}
  >
    {icon}
    {label}
  </button>
);

export default Dashboard;
