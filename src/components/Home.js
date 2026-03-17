import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Zap, Shield, Users, Layout, ChevronRight, Check } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const features = [
    {
      icon: <Zap className="text-amber-500" size={24} />,
      title: "Lightning Fast Sending",
      description: "Proprietary infrastructure allows you to send thousands of emails in seconds without delivery delays."
    },
    {
      icon: <Users className="text-blue-500" size={24} />,
      title: "Smart List Management",
      description: "Organize your audience with advanced campaigns. Import, tag, and segment with ease."
    },
    {
      icon: <Layout className="text-purple-500" size={24} />,
      title: "Premium Templates",
      description: "Visual editor to create stunning, responsive templates that look great on any device."
    },
    {
      icon: <Shield className="text-emerald-500" size={24} />,
      title: "Enterprise Security",
      description: "Your data is encrypted and secure. We prioritize privacy and compliance with global standards."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full glass dark:bg-slate-900/60 border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary-500 text-white group-hover:rotate-12 transition-transform duration-300">
              <Mail size={24} />
            </div>
            <span className="text-xl font-bold text-gradient">MailMegaPro</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-800 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn-premium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-100/50 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-primary-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            New: Smart Template Engine v2.0
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight"
          >
            Next-Gen <span className="text-gradient">Bulk Emailing</span> <br />
            for Modern Teams
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Scale your outreach with powerful automation, stunning design tools, and enterprise-grade reliability. All in one beautiful interface.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/register" className="btn-premium px-10 py-4 text-lg w-full sm:w-auto flex items-center justify-center gap-2 group shadow-primary-200">
              Start Sending Free
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center">
              Watch Demo
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-12 text-sm font-semibold text-slate-400 flex flex-wrap justify-center items-center gap-x-8 gap-y-4"
          >
            <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> No credit card required</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Cancel anytime</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> GDPR Compliant</span>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Experience the Power of Efficiency</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Everything you need to manage your email marketing at scale without the complexity.</p>
          </div>
 
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-primary-100/10 hover:border-primary-100 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mini CTA */}
      <section className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden bg-slate-900 text-white shadow-2xl shadow-primary-200"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-600/20 blur-[100px]" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to boost your conversion?</h2>
            <p className="text-slate-400 max-w-lg mx-auto md:text-lg">Join thousands of businesses already using MailMegaPro to grow their audience.</p>
            <div className="pt-4">
              <Link to="/register" className="btn-premium px-12 py-4 text-lg inline-flex items-center gap-2">
                Create Free Account
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary-500 text-white">
              <Mail size={16} />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">MailMegaPro</span>
          </div>
           
          <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Contact Support</a>
          </div>
 
          <div className="text-sm text-slate-400 dark:text-slate-500">
            © 2026 MailMegaPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
