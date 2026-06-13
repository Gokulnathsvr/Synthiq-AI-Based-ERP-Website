import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Bell,
  Box,
  ChevronDown,
  ChevronUp,
  Circle,
  Download,
  Hexagon,
  LayoutDashboard,
  ListFilter,
  MessageSquare,
  MoreHorizontal,
  RefreshCw,
  Search,
  ShoppingCart,
  Truck,
  User,
  Users,
  BarChart2,
  TableProperties,
  CheckCircle2,
  Zap,
  Shield,
  Workflow,
  LineChart,
  Globe,
  Database,
  Slack,
  Figma,
  Github,
  Trello,
  Chrome,
  Mail,
  ArrowRight,
  Plus,
  Minus,
  Check,
  Sparkles,
  Triangle,
  Command,
  Star
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";

type PriorityState = "High" | "Medium" | "Low";

type Customer = {
  id: string;
  name: string;
  address: string;
  time: string;
  price: string;
  payment: string;
  date: string;
  status: "Preparing" | "On Delivery" | "Delivered";
  priority?: PriorityState;
};

const initialCustomers: Customer[] = [
  { id: "1247", name: "Alice Smith", address: "448 Kutch Green Apt. 089", time: "10:15 AM", price: "$15.50", payment: "Online", date: "24/10/04", status: "Preparing", priority: "High" },
  { id: "1248", name: "John Doe", address: "102 Suite, West Cliff Blvd. 512", time: "11:00 AM", price: "$13.50", payment: "Cash", date: "24/10/04", status: "On Delivery", priority: "Medium" },
  { id: "1249", name: "Maria Garcia", address: "302 Unit, Oceanview St. 678", time: "11:12 AM", price: "$17.00", payment: "Online", date: "24/10/04", status: "Delivered", priority: "Low" },
  { id: "1250", name: "Robert King", address: "711 Birchwood Drive, 021", time: "12:30 PM", price: "$24.00", payment: "Online", date: "24/10/04", status: "Preparing", priority: "High" },
  { id: "1251", name: "Sarah Lee", address: "1010 Maple Street, 10B", time: "01:15 PM", price: "$31.00", payment: "Credit Card", date: "24/10/04", status: "Delivered", priority: "Low" },
  { id: "1252", name: "David Chen", address: "45 Industrial Park Rd. 102", time: "02:45 PM", price: "$45.00", payment: "Online", date: "24/10/04", status: "On Delivery", priority: "Medium" },
];

const tabConfigs: Record<string, { key: keyof Customer; label: string }[]> = {
  "Orders": [
    { key: "id", label: "ORDER ID" },
    { key: "name", label: "CUSTOMER" },
    { key: "priority", label: "PRIORITY" },
    { key: "address", label: "ADDRESS" },
    { key: "time", label: "TIME" },
    { key: "price", label: "TOTAL" },
    { key: "payment", label: "PAYMENT" },
    { key: "date", label: "DATE" },
    { key: "status", label: "STATUS" }
  ],
  "Dashboard": [
    { key: "id", label: "WIDGET ID" },
    { key: "name", label: "METRIC" },
    { key: "address", label: "DESCRIPTION" },
    { key: "time", label: "UPDATED" },
    { key: "price", label: "VALUE" },
    { key: "payment", label: "TYPE" },
    { key: "date", label: "DATE" },
    { key: "status", label: "STATUS" }
  ],
  "Delivery": [
    { key: "id", label: "TRACKING ID" },
    { key: "name", label: "DRIVER" },
    { key: "address", label: "DESTINATION" },
    { key: "time", label: "EST. ARRIVAL" },
    { key: "price", label: "FEE" },
    { key: "payment", label: "PAYMENT" },
    { key: "date", label: "DATE" },
    { key: "status", label: "STATUS" }
  ],
  "Customer": [
    { key: "id", label: "CUSTOMER ID" },
    { key: "name", label: "NAME" },
    { key: "address", label: "LOCALE" },
    { key: "time", label: "LAST ACTIVE" },
    { key: "price", label: "LTV" },
    { key: "payment", label: "TIER" },
    { key: "date", label: "JOINED" },
    { key: "status", label: "STATUS" }
  ],
  "Menu": [
    { key: "id", label: "ITEM ID" },
    { key: "name", label: "ITEM NAME" },
    { key: "address", label: "CATEGORY" },
    { key: "time", label: "PREP TIME" },
    { key: "price", label: "PRICE" },
    { key: "payment", label: "ALLERGENS" },
    { key: "date", label: "ADDED" },
    { key: "status", label: "AVAILABILITY" }
  ],
  "Analytics": [
    { key: "id", label: "METRIC ID" },
    { key: "name", label: "REPORT NAME" },
    { key: "address", label: "CATEGORY" },
    { key: "time", label: "GENERATED" },
    { key: "price", label: "VALUE" },
    { key: "payment", label: "TREND" },
    { key: "date", label: "DATE" },
    { key: "status", label: "STATE" }
  ],
  "Reviews": [
    { key: "id", label: "REVIEW ID" },
    { key: "name", label: "REVIEWER" },
    { key: "address", label: "EXCERPT" },
    { key: "time", label: "TIME" },
    { key: "price", label: "RATING" },
    { key: "payment", label: "SOURCE" },
    { key: "date", label: "DATE" },
    { key: "status", label: "STATUS" }
  ]
};

const tabData: Record<string, Customer[]> = {
  "Dashboard": [
     { id: "WGT-01", name: "Total Revenue", address: "Today's gross earnings", time: "05:00 PM", price: "$4,250.00", payment: "Financial", date: "24/10/05", status: "Delivered" },
     { id: "WGT-02", name: "Active Users", address: "Currently online drivers and customers", time: "05:02 PM", price: "1,124", payment: "Engagement", date: "24/10/05", status: "Preparing" },
     { id: "WGT-03", name: "Order Volume", address: "Pending vs delivered ratio", time: "05:05 PM", price: "342 / 890", payment: "Operations", date: "24/10/05", status: "On Delivery" },
  ],
  "Orders": initialCustomers,
  "Delivery": [
    { id: "TRK-501", name: "Daniel Craig", address: "007 MI6 Headquarters, London", time: "08:15 AM", price: "$15.00", payment: "Credit", date: "24/10/05", status: "On Delivery" },
    { id: "TRK-502", name: "Chris Evans", address: "Brooklyn Ave, NY 11201", time: "10:45 AM", price: "$12.50", payment: "Prepaid", date: "24/10/05", status: "Delivered" },
    { id: "TRK-503", name: "Scarlett J.", address: "Black Widow St. 11, LA", time: "12:10 PM", price: "$18.00", payment: "Pending", date: "24/10/05", status: "Preparing" },
    { id: "TRK-504", name: "Mark Ruffalo", address: "Gamma Labs 4A, NM", time: "02:20 PM", price: "$22.90", payment: "Credit", date: "24/10/05", status: "On Delivery" },
    { id: "TRK-505", name: "Jeremy Renner", address: "Farmhouse Road, OH", time: "04:30 PM", price: "$10.00", payment: "Prepaid", date: "24/10/05", status: "Delivered" },
  ],
  "Customer": [
    { id: "CUS-101", name: "Tom Holland", address: "Queens, NY", time: "2 hrs ago", price: "$1,250", payment: "Gold", date: "22/01/15", status: "Delivered" },
    { id: "CUS-102", name: "Zendaya", address: "Los Angeles, CA", time: "5 hrs ago", price: "$3,420", payment: "Platinum", date: "21/11/04", status: "Delivered" },
    { id: "CUS-103", name: "Jacob Batalon", address: "Honolulu, HI", time: "1 day ago", price: "$850", payment: "Silver", date: "23/05/20", status: "Preparing" },
    { id: "CUS-104", name: "Benedict C.", address: "Bleeker St, NY", time: "10 mins ago", price: "$5,100", payment: "Diamond", date: "20/03/10", status: "On Delivery" },
  ],
  "Menu": [
    { id: "MNU-001", name: "Espresso Roast", address: "Beverages", time: "2m 30s", price: "$3.50", payment: "None", date: "23/10/01", status: "Delivered" },
    { id: "MNU-002", name: "Vanilla Latte", address: "Beverages", time: "4m 00s", price: "$4.50", payment: "Dairy", date: "23/10/01", status: "Delivered" },
    { id: "MNU-003", name: "Butter Croissant", address: "Bakery", time: "1m 00s", price: "$3.00", payment: "Gluten, Dairy", date: "23/11/15", status: "Delivered" },
    { id: "MNU-004", name: "Avocado Toast", address: "Food", time: "5m 45s", price: "$8.50", payment: "Gluten", date: "24/01/05", status: "Preparing" },
    { id: "MNU-005", name: "Matcha Frappe", address: "Beverages", time: "3m 20s", price: "$5.50", payment: "Dairy", date: "24/02/10", status: "On Delivery" },
  ],
  "Analytics": [
    { id: "REP-010", name: "Weekly Sales Rev", address: "Financials", time: "09:00 AM", price: "$45,200", payment: "+12.5%", date: "24/10/07", status: "Delivered" },
    { id: "REP-011", name: "User Growth Rate", address: "Acquisition", time: "10:30 AM", price: "1,240", payment: "+8.2%", date: "24/10/07", status: "Delivered" },
    { id: "REP-012", name: "Customer Churn", address: "Retention", time: "02:15 PM", price: "2.4%", payment: "-0.5%", date: "24/10/07", status: "Preparing" },
    { id: "REP-013", name: "App Load Time", address: "Performance", time: "04:00 PM", price: "1.2s", payment: "-0.1s", date: "24/10/07", status: "On Delivery" },
  ],
  "Reviews": [
    { id: "REV-001", name: "Gordon Ramsay", address: "Absolutely brilliant flavors, but the delivery took too long. The temperature was slightly off.", time: "08:20 PM", price: "3.5 / 5", payment: "Google", date: "24/10/06", status: "On Delivery" },
    { id: "REV-002", name: "Guy Fieri", address: "Out of bounds flavor! Definitely coming back for more next weekend.", time: "09:10 PM", price: "5.0 / 5", payment: "Yelp", date: "24/10/06", status: "Delivered" },
    { id: "REV-003", name: "Paul Hollywood", address: "The bake on this pastry was slightly underdone. A bit disappointing.", time: "11:00 AM", price: "2.0 / 5", payment: "App Store", date: "24/10/07", status: "Preparing" },
    { id: "REV-004", name: "Mary Berry", address: "Such a lovely presentation and the taste is quite delightful. Perfect.", time: "01:30 PM", price: "4.8 / 5", payment: "Website", date: "24/10/07", status: "Delivered" },
  ]
};

function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <motion.header 
      initial={{ backgroundColor: "rgba(9, 9, 11, 0)", borderBottomColor: "rgba(39, 39, 42, 0)", paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
      animate={{ 
        backgroundColor: isScrolled ? "rgba(9, 9, 11, 0.8)" : "rgba(9, 9, 11, 0)", 
        borderBottomColor: isScrolled ? "rgba(39, 39, 42, 1)" : "rgba(39, 39, 42, 0)",
        paddingTop: isScrolled ? "1rem" : "1.5rem",
        paddingBottom: isScrolled ? "1rem" : "1.5rem",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)"
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center border-b"
    >
      <nav className="w-full max-w-[1200px] px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="flex gap-[2px]">
            <div className="w-[10px] h-[18px] rounded-full border-[2.5px] border-white border-r-0 rounded-r-none" />
            <div className="w-[10px] h-[18px] rounded-full border-[2.5px] border-white border-l-0 rounded-l-none" />
          </div>
          <span className="text-[22px] font-medium tracking-tight">Synthiq</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { name: "Features", path: "/features" },
            { name: "Integrations", path: "/integrations" },
            { name: "Pricing", path: "/pricing" },
            { name: "Case Studies", path: "/case-studies" }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative text-[15px] font-medium transition-colors group ${location.pathname === item.path ? 'text-white' : 'text-[#A1A1AA] hover:text-white'}`}
            >
              {item.name}
              <span className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-6 py-2.5 rounded-full bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] transition-colors text-sm font-medium text-white shadow-sm"
        >
          Start Now
        </motion.button>
      </nav>
    </motion.header>
  );
}

function Features() {
  const features = [
    { title: "Real-time Analytics", desc: "Monitor your customer behavior and system performance in real-time.", icon: <LineChart className="w-6 h-6 text-[#A1A1AA]"/> },
    { title: "Smart Automation", desc: "Automate repetitive tasks and workflows to save time and reduce errors.", icon: <Zap className="w-6 h-6 text-[#A1A1AA]"/> },
    { title: "Enterprise Security", desc: "Bank-grade security protocols to keep your data safe and compliant.", icon: <Shield className="w-6 h-6 text-[#A1A1AA]"/> },
    { title: "Global Reach", desc: "Deploy your applications worldwide with our global edge network.", icon: <Globe className="w-6 h-6 text-[#A1A1AA]"/> },
    { title: "Custom Workflows", desc: "Build tailored workflows that match your exact business processes.", icon: <Workflow className="w-6 h-6 text-[#A1A1AA]"/> },
    { title: "Advanced Database", desc: "Highly scalable database solutions for modern applications.", icon: <Database className="w-6 h-6 text-[#A1A1AA]"/> }
  ];

  return (
    <div className="w-full max-w-[1200px] px-6 mt-16 md:mt-24 mb-32 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-[48px] md:text-[64px] font-semibold tracking-tight leading-[1.05] text-center"
      >Powerful Features</motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-[18px] text-[#A1A1AA] max-w-[650px] leading-relaxed text-center"
      >Everything you need to scale your business.</motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-16">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-8 rounded-3xl border border-[#27272A] bg-[#09090B] hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] transition-all group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div 
               whileHover={{ rotate: 360, scale: 1.15 }}
               transition={{ duration: 0.8, type: "spring" }}
               className="w-14 h-14 rounded-2xl border border-[#27272A] bg-[#18181B] group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_0_rgba(52,211,153,0)] group-hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300"
            >
              <div className="text-[#A1A1AA] group-hover:text-emerald-400 transition-colors duration-300">
                {feature.icon}
              </div>
            </motion.div>
            <h3 className="text-[20px] font-medium text-white mb-3 relative z-10">{feature.title}</h3>
            <p className="text-[15px] text-[#A1A1AA] leading-relaxed relative z-10">{feature.desc}</p>
            <div className="mt-8 flex items-center text-[#A1A1AA] group-hover:text-emerald-400 transition-colors cursor-pointer text-[14px] font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 !duration-300 relative z-10">
              Explore Feature <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full mt-32 flex flex-col items-center"
      >
        <h2 className="text-[32px] font-semibold text-white mb-16">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full relative">
           <div className="hidden md:block absolute top-[28px] left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-[#27272A] to-transparent z-0" />
           {[
             { step: "01", title: "Connect", desc: "Link your existing tools and databases in just a few clicks." },
             { step: "02", title: "Configure", desc: "Set up your custom workflows using our intuitive visual builder." },
             { step: "03", title: "Automate", desc: "Let our AI engine handle the rest while you focus on growth." }
           ].map((s, i) => (
              <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2, duration: 0.5 }}
                 className="flex flex-col items-center text-center relative z-10 group"
              >
                 <motion.div 
                   whileHover={{ scale: 1.1, rotate: 180 }}
                   transition={{ duration: 0.4 }}
                   className="w-14 h-14 rounded-full bg-[#09090B] border-2 border-[#27272A] group-hover:border-[#34D399] flex items-center justify-center text-[16px] font-bold text-white mb-6 relative overflow-hidden"
                 >
                    <motion.div whileHover={{ rotate: -180 }} transition={{ duration: 0.4 }}>{s.step}</motion.div>
                 </motion.div>
                 <h4 className="text-[20px] font-medium text-white mb-3">{s.title}</h4>
                 <p className="text-[15px] text-[#A1A1AA] leading-relaxed max-w-[280px]">{s.desc}</p>
              </motion.div>
           ))}
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full mt-32 flex flex-col items-center"
      >
        <h2 className="text-[32px] font-semibold text-white mb-16 text-center leading-[1.2]">Designed for scale.<br/><span className="text-[#A1A1AA]">Engineered for speed.</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-[600px]">
           {/* Big left card */}
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 0.99 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 md:row-span-2 rounded-[32px] border border-[#27272A] bg-gradient-to-br from-[#18181B] to-[#09090B] p-8 flex flex-col relative overflow-hidden group"
           >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none" />
              <h3 className="text-[24px] font-medium text-white mb-2 relative z-10">Advanced Analytics</h3>
              <p className="text-[15px] text-[#A1A1AA] max-w-[280px] relative z-10">Visualize your workflow performance in real-time with our custom dashboards.</p>
              
              <div className="flex-1 mt-8 relative rounded-2xl border border-[#27272A]/50 bg-black/50 overflow-hidden flex items-end justify-center gap-2 p-6">
                 {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                    <motion.div 
                       key={i}
                       initial={{ height: 0 }}
                       whileInView={{ height: `${h}%` }}
                       transition={{ duration: 0.7, delay: i * 0.1, type: "spring" }}
                       className="w-full max-w-[40px] bg-emerald-500/20 rounded-t-lg relative group-hover:bg-emerald-500/40 transition-colors duration-500"
                    >
                       <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-emerald-500/50 to-transparent" />
                    </motion.div>
                 ))}
              </div>
           </motion.div>
           
           {/* Top right card */}
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 rounded-[32px] border border-[#27272A] bg-gradient-to-br from-[#18181B] to-[#09090B] p-8 flex items-center justify-between relative overflow-hidden group"
           >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none" />
              <div className="relative z-10">
                 <h3 className="text-[22px] font-medium text-white mb-2">Automated Rules</h3>
                 <p className="text-[15px] text-[#A1A1AA] max-w-[200px]">Set it and forget it. Our triggers handle the rest.</p>
              </div>
              <div className="relative z-10 w-24 h-24">
                 <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30 group-hover:border-emerald-500/60 transition-colors"
                 />
                 <div className="absolute inset-2 rounded-full border border-[#27272A] bg-[#09090B] flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-emerald-400" />
                 </div>
              </div>
           </motion.div>

           {/* Bottom right card */}
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 rounded-[32px] border border-[#27272A] bg-gradient-to-br from-[#18181B] to-[#09090B] p-8 relative overflow-hidden group flex flex-col justify-between"
           >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none" />
              <div className="relative z-10">
                 <h3 className="text-[22px] font-medium text-white mb-2">Enterprise Security</h3>
                 <p className="text-[15px] text-[#A1A1AA]">Bank-grade encryption for all your connected workflows.</p>
              </div>
              <div className="relative z-10 flex items-center mt-6 gap-2">
                 {['SOC2', 'GDPR', 'HIPAA'].map(badge => (
                    <div key={badge} className="px-3 py-1.5 rounded-lg border border-[#27272A] bg-[#09090B] text-[12px] font-semibold text-emerald-400 tracking-wider">
                       {badge}
                    </div>
                 ))}
                 <Shield className="w-6 h-6 ml-auto text-[#27272A] group-hover:text-emerald-400 transition-colors duration-500" />
              </div>
           </motion.div>

        </div>
      </motion.div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
         className="mt-24 w-full p-12 rounded-[32px] border border-[#27272A] bg-gradient-to-br from-[#18181B] to-[#09090B] flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent pointer-events-none" />
        <div className="mb-8 md:mb-0 relative z-10 text-center md:text-left">
           <h2 className="text-[32px] font-semibold tracking-tight text-white mb-2">Ready to transform?</h2>
           <p className="text-[16px] text-[#A1A1AA]">Join thousands of companies using Synthiq.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 px-8 py-4 rounded-xl bg-white text-black font-semibold text-[15px] shadow-xl hover:bg-gray-100 transition-colors"
        >
          Start your free trial
        </motion.button>
      </motion.div>
    </div>
  );
}

function Integrations() {
  const [connected, setConnected] = useState<Record<string, boolean>>({"slack": true});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleConnection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConnected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const integrations = [
    { id: "slack", name: "Slack", desc: "Get notifications in your channels.", icon: <Slack className="w-8 h-8 text-[#E01E5A]" />, color: "from-[#E01E5A]/20 to-[#36C5F0]/20", cat: "communication" },
    { id: "github", name: "GitHub", desc: "Sync your repositories seamlessly.", icon: <Github className="w-8 h-8 text-white" />, color: "from-white/20 to-gray-500/20", cat: "development" },
    { id: "figma", name: "Figma", desc: "Import your design assets directly.", icon: <Figma className="w-8 h-8 text-[#F24E1E]" />, color: "from-[#F24E1E]/20 to-[#A259FF]/20", cat: "design" },
    { id: "trello", name: "Trello", desc: "Manage tasks automatically.", icon: <Trello className="w-8 h-8 text-[#0052CC]" />, color: "from-[#0052CC]/20 to-[#00B8D9]/20", cat: "productivity" },
    { id: "mail", name: "Mailchimp", desc: "Sync mailing lists and campaigns.", icon: <Mail className="w-8 h-8 text-[#FFE01B]" />, color: "from-[#FFE01B]/20 to-[#000000]/20", cat: "marketing" },
    { id: "chrome", name: "Chrome", desc: "Use our powerful extension.", icon: <Chrome className="w-8 h-8 text-[#4285F4]" />, color: "from-[#4285F4]/20 to-[#34A853]/20", cat: "productivity" },
  ];

  const categories = ["all", "communication", "development", "design", "productivity", "marketing"];
  const [activeCat, setActiveCat] = useState("all");

  const filteredIntegrations = integrations.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCat === "all" || i.cat === activeCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full max-w-[1200px] px-6 mt-16 md:mt-24 mb-32 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-[48px] md:text-[64px] font-semibold tracking-tight leading-[1.05] text-center"
      >Seamless Integrations</motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-[18px] text-[#A1A1AA] max-w-[650px] leading-relaxed text-center"
      >Connect Synthiq with your favorite tools and streamline your entire workflow seamlessly.</motion.p>
      
      <motion.div 
         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
         className="w-full max-w-md mt-10 relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
        <input 
          type="text" 
          placeholder="Search integrations..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#18181B] border border-[#27272A] rounded-full pl-12 pr-6 py-3 text-[15px] focus:outline-none focus:border-[#3F3F46] focus:bg-[#202024] transition-all text-white placeholder:text-[#71717A]"
        />
      </motion.div>

      <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
         className="flex flex-wrap items-center justify-center gap-2 mt-6"
      >
         {categories.map(c => (
           <button 
             key={c}
             onClick={() => setActiveCat(c)}
             className={`px-4 py-1.5 rounded-full text-[13px] font-medium capitalize transition-colors ${activeCat === c ? "bg-white text-black" : "bg-[#18181B] border border-[#27272A] text-[#A1A1AA] hover:text-white"}`}
           >
             {c}
           </button>
         ))}
      </motion.div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12 min-h-[400px] items-start content-start">
        <AnimatePresence mode="popLayout">
          {filteredIntegrations.map((integration) => (
            <motion.div
              layout
              key={integration.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="p-8 rounded-3xl border border-[#27272A] bg-[#09090B] flex flex-col group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-0`} />
              <div className="relative z-10 flex items-start justify-between mb-6">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 rounded-[20px] bg-[#18181B] border border-[#27272A] flex items-center justify-center shadow-lg group-hover:shadow-white/5 transition-all bg-black/50 backdrop-blur-sm"
                >
                  {integration.icon}
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                  onClick={(e: React.MouseEvent) => toggleConnection(integration.id, e)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border flex items-center gap-2 overflow-hidden ${
                    connected[integration.id] 
                      ? "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/30 hover:bg-[#34D399]/20" 
                      : "bg-[#27272A] hover:bg-[#3F3F46] border-[#3F3F46] text-white"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {connected[integration.id] ? (
                      <motion.div key="connected" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="flex items-center gap-1.5 whitespace-nowrap">
                        <Check className="w-3.5 h-3.5" /> Connected
                      </motion.div>
                    ) : (
                      <motion.div key="connect" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="flex items-center gap-1.5 whitespace-nowrap">
                        Connect
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              <h3 className="text-[20px] font-medium text-white mb-2 relative z-10">{integration.name}</h3>
              <p className="text-[15px] text-[#A1A1AA] leading-relaxed relative z-10">{integration.desc}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredIntegrations.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-[#A1A1AA]">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>No integrations found matching "{searchTerm}"</p>
          </div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full mt-24 p-[1px] rounded-[32px] bg-gradient-to-r from-transparent via-[#27272A] to-transparent overflow-hidden"
      >
        <div className="w-full rounded-[32px] bg-[#09090B] px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between relative group hover:bg-[#141418] transition-colors duration-500">
           {/* Abstract moving background light */}
           <motion.div 
             animate={{ x: ["-100%", "200%"] }}
             transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 bottom-0 w-[300px] bg-white/5 blur-3xl rounded-full skew-x-[-30deg] pointer-events-none"
           />
           
           <div className="flex flex-col mb-8 md:mb-0 relative z-10">
              <h2 className="text-[28px] font-semibold text-white mb-2">Don't see your tool?</h2>
              <p className="text-[16px] text-[#A1A1AA] max-w-[400px]">We're constantly adding new integrations. Let us know what you'd like to see next.</p>
           </div>
           
           <div className="relative z-10 flex w-full md:w-auto">
              <input 
                 type="text" 
                 placeholder="e.g. Salesforce..." 
                 className="bg-[#18181B] border border-[#27272A] rounded-l-xl px-5 py-3.5 focus:outline-none focus:border-[#3F3F46] text-white w-full md:w-[250px]"
              />
              <motion.button 
                 whileHover={{ borderBottomRightRadius: "8px", borderTopRightRadius: "8px" }}
                 whileTap={{ scale: 0.98 }}
                 className="bg-white text-black font-semibold px-6 py-3.5 rounded-r-xl transition-all border border-white"
              >
                 Request
              </motion.button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    { name: "Starter", priceMonth: "29", priceYear: "24", desc: "Perfect for small teams and individuals.", features: ["Up to 5 Users", "Basic Analytics", "24hr Support Response", "Standard Integrations"] },
    { name: "Pro", priceMonth: "99", priceYear: "79", desc: "Ideal for growing businesses and companies.", features: ["Unlimited Users", "Advanced Analytics", "1hr Support Response", "All Integrations", "Custom Workflows", "API Access"], highlighted: true },
    { name: "Enterprise", priceMonth: "Custom", priceYear: "Custom", desc: "For large scale organizations and enterprises.", features: ["Unlimited Everything", "Dedicated Success Manager", "24/7 Phone Support", "SSO Authentication", "Custom Contracts", "On-Premise Deployment"] }
  ];

  const faqs = [
    { q: "Can I switch plans later?", a: "Absolutely. You can upgrade or downgrade your plan at any time. Prorated charges will be applied automatically." },
    { q: "What constitutes a 'User'?", a: "A user is any team member who needs to log into the dashboard to view data, manage settings, or export reports." },
    { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for all new subscriptions. No questions asked." }
  ];

  return (
    <div className="w-full max-w-[1200px] px-6 mt-16 md:mt-24 mb-32 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-[48px] md:text-[64px] font-semibold tracking-tight leading-[1.05] text-center"
      >Simple, Transparent Pricing</motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-[18px] text-[#A1A1AA] max-w-[650px] leading-relaxed text-center"
      >Choose the perfect plan for your business needs.</motion.p>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-10 relative flex items-center gap-1 bg-[#18181B] border border-[#27272A] rounded-full p-1.5 z-10 cursor-pointer overflow-hidden isolate" onClick={() => setAnnual(!annual)}>
        <motion.div 
          className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-[#27272A] rounded-full -z-10 shadow-sm"
          animate={{ x: annual ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <div className={`px-6 py-2 rounded-full text-[14px] font-medium transition-colors duration-300 flex-1 text-center select-none ${!annual ? "text-white" : "text-[#A1A1AA] hover:text-white"}`}>Monthly</div>
        <div className={`px-6 py-2 rounded-full text-[14px] font-medium transition-colors duration-300 flex-1 text-center select-none ${annual ? "text-white" : "text-[#A1A1AA] hover:text-white"}`}>Annually <span className="text-[#34D399] ml-1 text-[12px] font-bold">(-20%)</span></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-16 items-center perspective-1000">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotateX: 5 }} 
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }} 
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -12, scale: plan.highlighted ? 1.08 : 1.02 }}
            className={`p-8 rounded-[32px] border flex flex-col relative group transition-all duration-400 cursor-pointer ${
              plan.highlighted 
                ? "border-emerald-500/50 bg-[#141414] shadow-[0_0_40px_rgba(52,211,153,0.15)] hover:shadow-[0_0_60px_rgba(52,211,153,0.3)] md:scale-105 z-10 hover:border-emerald-400" 
                : "border-[#27272A] bg-[#09090B] hover:border-emerald-500/30 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]"
            }`}
          >
            <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-b ${plan.highlighted ? 'from-emerald-500/10' : 'from-emerald-500/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none`} />
            
            {plan.highlighted && (
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                 <div className="relative">
                   <div className="absolute inset-0 bg-emerald-400 blur-md opacity-40 rounded-full" />
                   <div className="relative bg-emerald-400 text-black px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide uppercase shadow-lg">Most Popular</div>
                 </div>
               </div>
            )}
            <h3 className="text-[22px] font-medium text-white mb-2 relative z-10">{plan.name}</h3>
            <p className="text-[14px] text-[#A1A1AA] mb-6 min-h-[40px] relative z-10">{plan.desc}</p>
            <div className="flex items-end gap-1 mb-8 overflow-hidden h-[46px] relative z-10">
               <AnimatePresence mode="wait">
                  {plan.priceMonth === "Custom" ? (
                      <motion.span key="custom" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="text-[46px] font-bold leading-[1]">Custom</motion.span>
                  ) : (
                    <div className="flex items-end gap-1" key={annual ? "year" : "month"}>
                      <span className="text-[46px] font-bold leading-[1]">$</span>
                      <motion.span 
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-[46px] font-bold leading-[1] tracking-tight"
                      >
                         {annual ? plan.priceYear : plan.priceMonth}
                      </motion.span>
                    </div>
                  )}
               </AnimatePresence>
               {plan.priceMonth !== "Custom" && (
                  <span className="text-[15px] text-[#A1A1AA] mb-2 font-medium">/mo</span>
               )}
            </div>
            {plan.priceMonth !== "Custom" && annual && (
                <div className="mb-6 -mt-4 text-[13px] text-[#34D399] font-medium">Billed ${parseInt(plan.priceYear) * 12} yearly</div>
            )}
            <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className={`w-full py-3.5 rounded-2xl font-medium text-[15px] transition-colors mb-8 ${plan.highlighted ? "bg-white text-black hover:bg-gray-200 shadow-xl" : "bg-[#27272A] text-white border border-[#3F3F46] hover:bg-[#3F3F46]"}`}
            >
              Get Started
            </motion.button>
            <div className="flex flex-col gap-4 flex-1">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#34D399] drop-shadow-[0_0_8px_rgba(52,211,153,0.3)] group-hover:text-[#34D399] transition-colors" />
                  <span className="text-[14px] font-medium text-[#E4E4E7]">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enterprise Custom Banner */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6 }}
         className="w-full max-w-[1000px] mt-24 relative rounded-[32px] p-[1px] overflow-hidden group cursor-pointer"
      >
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#000000_50%,#3F3F46_100%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" 
         />
         <div className="w-full bg-[#09090B] rounded-[32px] p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-6 mb-8 md:mb-0">
               <div className="w-16 h-16 rounded-2xl bg-[#18181B] border border-[#27272A] flex items-center justify-center">
                  <Shield  className="w-8 h-8 text-white" />
               </div>
               <div>
                  <h3 className="text-[24px] font-semibold text-white mb-2">Need a custom enterprise setup?</h3>
                  <p className="text-[15px] text-[#A1A1AA] max-w-[400px]">Get dedicated support, custom SLAs, and advanced security configurations tailored to your needs.</p>
               </div>
            </div>
            <motion.button 
               whileHover={{ x: 5 }}
               className="px-6 py-3 rounded-xl bg-[#27272A] text-white font-semibold text-[15px] flex items-center gap-2 hover:bg-[#3F3F46] transition-colors shrink-0"
            >
               Contact Sales <ArrowRight className="w-4 h-4" />
            </motion.button>
         </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
         className="w-full max-w-[800px] mt-32 flex flex-col items-center"
      >
         <h2 className="text-[32px] font-semibold text-white mb-10 text-center">Frequently Asked Questions</h2>
         <div className="w-full flex flex-col gap-4">
             {faqs.map((faq, idx) => (
                <motion.div 
                  key={idx}
                  className="w-full border border-[#27272A] rounded-2xl bg-[#141414] overflow-hidden cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                   <div className="p-6 flex items-center justify-between text-white font-medium hover:text-white transition-colors">
                      {faq.q}
                      <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }}>
                         {openFaq === idx ? <Minus className="w-5 h-5 text-[#A1A1AA]" /> : <Plus className="w-5 h-5 text-[#A1A1AA]" />}
                      </motion.div>
                   </div>
                   <AnimatePresence>
                      {openFaq === idx && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="px-6 text-[15px] text-[#A1A1AA] leading-relaxed"
                         >
                            <div className="pb-6">
                               {faq.a}
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </motion.div>
             ))}
         </div>
      </motion.div>
    </div>
  );
}

function CaseStudies() {
  const cases = [
    { company: "Acme Corp", metric: "+300%", metricLabel: "Conversion Rate", desc: "Synthiq completely transformed our sales funnel, allowing us to hit record growth and expand our market significantly.", author: "Jane Doe, CMO", color: "from-blue-500/20 to-emerald-500/20" },
    { company: "TechFlow", metric: "-45%", metricLabel: "Support Tickets", desc: "The automated workflows reduced our customer support burden by nearly half while improving resolution times.", author: "John Smith, CTO", color: "from-emerald-500/20 to-blue-500/20" },
    { company: "Global Retail", metric: "10x", metricLabel: "Faster Deployments", desc: "We deploy our localized campaigns across 20 countries in minutes instead of days, driving massive efficiency.", author: "Sarah Lee, Lead Eng.", color: "from-slate-500/20 to-zinc-500/20" },
  ];

  return (
    <div className="w-full max-w-[1200px] px-6 mt-16 md:mt-24 mb-32 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="text-[48px] md:text-[64px] font-semibold tracking-tight leading-[1.05] text-center"
      >Customer Success Stories</motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-[18px] text-[#A1A1AA] max-w-[650px] leading-relaxed text-center"
      >See how leading companies use Synthiq to transform their operations.</motion.p>
      
      {/* Featured Hero Case Study */}
      <motion.div 
         initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
         className="w-full mt-16 rounded-[40px] bg-[#09090B] border border-[#27272A] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative group"
      >
         <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         <div className="flex-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-[13px] font-medium mb-8">
               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
               Featured Story
            </div>
            <h2 className="text-[36px] md:text-[48px] font-semibold text-white leading-[1.1] mb-6">
               How <span className="text-emerald-400">NextGen Corp</span> scaled 10x with Synthiq.
            </h2>
            <p className="text-[18px] text-[#A1A1AA] leading-relaxed mb-10 max-w-[500px]">
               NextGen Corp replaced their entire legacy stack with our AI workflows, reducing overhead by 60% and empowering their team to focus on innovation.
            </p>
            <div className="flex flex-wrap gap-6">
               <div className="flex flex-col">
                  <span className="text-[32px] font-bold text-white">60%</span>
                  <span className="text-[14px] text-[#A1A1AA]">Cost Reduction</span>
               </div>
               <div className="w-[1px] bg-[#27272A]" />
               <div className="flex flex-col">
                  <span className="text-[32px] font-bold text-white">10x</span>
                  <span className="text-[14px] text-[#A1A1AA]">Faster Delivery</span>
               </div>
            </div>
            <motion.button 
               whileHover={{ scale: 1.05, gap: "12px" }}
               whileTap={{ scale: 0.95 }}
               className="mt-10 px-6 py-3 rounded-xl bg-white text-black font-semibold text-[15px] flex items-center gap-2 transition-all hover:bg-gray-100 shadow-xl"
            >
               Read full study <ArrowRight className="w-4 h-4" />
            </motion.button>
         </div>
         <div className="flex-1 w-full relative z-10 flex items-center justify-center">
            {/* Visual Abstract representation of the case study */}
            <div className="w-full max-w-[400px] aspect-square rounded-[32px] bg-[#0A0A0A] border border-[#27272A] relative overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#3F3F46] transition-colors duration-500">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-[#0A0A0A] to-[#0A0A0A]" />
               
               <div className="w-full h-full relative p-6 flex flex-col items-center justify-center">
                   
                   {/* Background floating element */}
                   <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-12 right-6 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"
                   />

                   <div className="relative w-full max-w-[280px]">
                       {/* Main Dashboard Card Mockup */}
                       <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.7 }}
                         className="relative z-10 w-full bg-[#18181B]/95 backdrop-blur-xl border border-[#27272A] rounded-2xl p-5 shadow-2xl flex flex-col gap-4 bg-gradient-to-b from-white/[0.03] to-transparent"
                       >
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-inner">
                                    <Box className="w-5 h-5 text-emerald-400" />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-[14px] font-semibold text-white leading-tight mb-0.5">Automations</span>
                                    <span className="text-[12px] text-[#A1A1AA]">Active Tasks</span>
                                 </div>
                              </div>
                              <div className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold rounded-full border border-emerald-500/20">+124%</div>
                           </div>
                           
                           {/* Activity Graph */}
                           <div className="h-20 flex items-end gap-1.5 mt-2">
                              {[30, 45, 25, 60, 40, 80, 50, 90, 70, 100].map((h, i) => (
                                 <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="flex-1 bg-emerald-500/10 rounded-[3px] border border-emerald-500/20 relative overflow-hidden"
                                 >
                                    <motion.div 
                                       className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-500/80 to-emerald-400/80 rounded-[3px]"
                                       initial={{ height: 0 }}
                                       whileInView={{ height: '100%' }}
                                       transition={{ duration: 0.5, delay: 0.3 + (i * 0.05) }}
                                    />
                                 </motion.div>
                              ))}
                           </div>
                       </motion.div>

                       {/* Secondary Info Card Overlapping */}
                       <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.7, delay: 0.4 }}
                         className="absolute -bottom-6 -right-6 z-20 w-[180px] bg-[#09090B] border border-[#27272A] p-4 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex items-center justify-between"
                       >
                         <div className="flex flex-col">
                            <span className="text-[10px] text-[#A1A1AA] mb-1 uppercase tracking-widest font-bold">Time Saved</span>
                            <span className="text-[20px] font-bold text-white leading-none">45h/wk</span>
                         </div>
                         <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                            <div className="absolute inset-0 rounded-full border-[3px] border-[#27272A]" />
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-full border-[3px] border-emerald-500 border-r-transparent border-t-transparent"
                            />
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
                         </div>
                       </motion.div>
                   </div>
               </div>
            </div>
         </div>
      </motion.div>

      <div className="w-full flex items-center justify-between mt-24 mb-8 border-b border-[#27272A] pb-4">
         <h3 className="text-[24px] font-medium text-white">More Success Stories</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {cases.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative p-8 rounded-3xl border border-[#27272A] bg-[#09090B] hover:border-[#3F3F46] group transition-all duration-300 flex flex-col gap-8 overflow-hidden cursor-pointer shadow-none hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
            style={{ transformPerspective: 1000 }}
          >
             {/* Subtle top glare/gradient */}
             <div className={`absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b ${c.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none blur-xl`} />
             
             <div className="flex items-center justify-between relative z-10">
                <div className="text-[20px] font-bold text-white tracking-wide">{c.company}</div>
                <div className="w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] group-hover:border-[#3F3F46] group-hover:bg-[#27272A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                   <ArrowRight className="w-4 h-4 text-white" />
                </div>
             </div>

             <div className="flex flex-col gap-1 relative z-10">
                <div className="text-[56px] font-semibold text-white tracking-tighter leading-none mb-1">{c.metric}</div>
                <div className="text-[13px] font-medium uppercase tracking-wider text-emerald-400">{c.metricLabel}</div>
             </div>

             <p className="text-[16px] text-[#A1A1AA] leading-relaxed flex-1 relative z-10">
               "{c.desc}"
             </p>

             <div className="flex items-center gap-3 pt-6 border-t border-[#27272A] relative z-10">
               <div className="w-9 h-9 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center">
                 <User className="w-4 h-4 text-[#A1A1AA]" />
               </div>
               <span className="text-[14px] font-medium text-[#E4E4E7]">{c.author}</span>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const { scrollYProgress } = useScroll();
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scaleMockup = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);
  const rotateXMockup = useTransform(scrollYProgress, [0, 0.4], [15, 0]);

  const [sortConfig, setSortConfig] = useState<{key: keyof Customer, direction: 'asc' | 'desc'} | null>(null);
  const [activeTab, setActiveTab] = useState("Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState("All");
  const [tableDataState, setTableDataState] = useState<Record<string, Customer[]>>(tabData);

  useEffect(() => {
    setSearchQuery("");
    setSelectedIds(new Set());
    setStatusFilter("All");
  }, [activeTab]);

  const handleUpdateCustomer = (id: string, field: keyof Customer, value: string) => {
    setTableDataState(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const handleBulkAction = (action: string) => {
    if (action === "delete") {
      setTableDataState(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(c => !selectedIds.has(c.id))
      }));
      setSelectedIds(new Set());
    } else if (action === "mark_delivered") {
      setTableDataState(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(c => selectedIds.has(c.id) ? { ...c, status: "Delivered" } : c)
      }));
      setSelectedIds(new Set());
    }
  };

  const handleExport = () => {
    const headers = ["ID", "Name", "Address", "Time", "Price", "Payment", "Date", "Status"];
    const rows = sortedCustomers.map(c => [c.id, c.name, c.address, c.time, c.price, c.payment, c.date, c.status]);
    const csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + rows.map(e => e.map(String).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === sortedCustomers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedCustomers.map(c => c.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };


  const requestSort = (key: keyof Customer) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCustomers = useMemo(() => {
    const activeData = tableDataState[activeTab] || tableDataState["Orders"];
    let sortableItems = [...activeData];

    if (activeTab === "Orders" && statusFilter !== "All") {
      sortableItems = sortableItems.filter(c => c.status === statusFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      sortableItems = sortableItems.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.address.toLowerCase().includes(q) || 
        c.id.includes(q) ||
        c.status.toLowerCase().includes(q) ||
        c.payment.toLowerCase().includes(q)
      );
    }

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: any = a[sortConfig.key] || '';
        let bValue: any = b[sortConfig.key] || '';
        
        if (sortConfig.key === 'price') {
          aValue = parseFloat(String(aValue).replace(/[$,]/g, '')) || 0;
          bValue = parseFloat(String(bValue).replace(/[$,]/g, '')) || 0;
        } else if (sortConfig.key === 'date') {
          const parseDate = (dStr: string) => {
            const parts = dStr.split('/');
            if (parts.length === 3) return new Date(`20${parts[0]}-${parts[1]}-${parts[2]}`).getTime();
            return 0;
          };
          aValue = parseDate(aValue as string);
          bValue = parseDate(bValue as string);
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tableDataState, activeTab, searchQuery, sortConfig, statusFilter]);

  const SortableHeader = ({ label, sortKey }: { label: string, sortKey: keyof Customer }) => {
    return (
      <th 
        className="px-6 py-4 font-medium uppercase tracking-wider cursor-pointer hover:text-white transition-colors select-none"
        onClick={() => requestSort(sortKey)}
      >
        <div className="flex items-center gap-1.5">
          {label}
          <div className="flex flex-col text-[#71717A]">
            {sortConfig?.key === sortKey ? (
              sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3 text-white" /> : <ChevronDown className="w-3 h-3 text-white" />
            ) : (
              <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            )}
          </div>
        </div>
      </th>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
           animate={{
             scale: [1, 1.2, 1],
             opacity: [0.3, 0.5, 0.3],
             rotate: [0, 90, 0]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-emerald-800/5 to-transparent blur-[100px]"
        />
        <motion.div
           animate={{
             scale: [1, 1.5, 1],
             opacity: [0.2, 0.4, 0.2],
             x: [0, 100, 0],
             y: [0, 50, 0]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-emerald-800/10 to-transparent blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#09090B]/80 to-[#09090B]" />
        
        {/* Floating particles abstract effect */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            className="absolute rounded-full bg-emerald-400"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              boxShadow: "0 0 10px rgba(52,211,153,0.5)"
            }}
          />
        ))}
      </div>
      <motion.main style={{ y: yHeroText }} className="w-full max-w-[1000px] px-6 mt-12 md:mt-16 flex flex-col items-center text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-md text-emerald-400 text-[13px] font-medium shadow-[0_0_15px_rgba(52,211,153,0.15)] cursor-pointer hover:bg-emerald-500/20 transition-colors">
            <Sparkles className="w-4 h-4" />
            <span>Synthiq AI 2.0 is now in public beta</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-[48px] md:text-[76px] font-semibold tracking-tight leading-[1.05] max-w-[850px]"
        >
          Transforming Businesses<br />with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Power of AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-6 text-[18px] text-[#A1A1AA] max-w-[650px] leading-relaxed"
        >
          Manage customers effortlessly, boost productivity, and drive growth with<br />AI solutions tailored for your business
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-2xl bg-white hover:bg-gray-100 transition-colors text-black font-semibold text-[15px] shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Start for free
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(52,211,153,0.2)", borderColor: "rgba(52,211,153,0.5)", color: "rgba(52,211,153,1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-2xl bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] transition-all text-white font-medium text-[15px]"
          >
            Book Demo
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 flex items-center justify-center gap-5 p-2 pr-6 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md"
        >
          <div className="flex -space-x-3">
             <img src="https://i.pravatar.cc/100?img=33" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#09090B] relative z-10 object-cover" />
             <img src="https://i.pravatar.cc/100?img=10" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#09090B] relative z-20 object-cover" />
             <img src="https://i.pravatar.cc/100?img=12" alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#09090B] relative z-30 object-cover" />
             <div className="w-10 h-10 rounded-full border-2 border-[#09090B] bg-[#18181B] flex items-center justify-center text-[12px] font-medium text-emerald-400 relative z-40">
                10k+
             </div>
          </div>
          <div className="flex flex-col items-start justify-center">
             <div className="flex items-center gap-1.5 mb-1">
               <div className="flex items-center gap-[2px]">
                 {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />)}
               </div>
             </div>
             <span className="text-[13px] text-[#A1A1AA] leading-none">Joined by 10,000+ teams</span>
          </div>
        </motion.div>
      </motion.main>

      {/* Trusted By Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-32 mb-24 w-full flex flex-col items-center relative"
      >
        <p className="text-[14px] font-semibold text-[#71717A] mb-12 uppercase tracking-widest relative">
          <span className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent to-[#71717A]" />
          Trusted By Forward-Thinking Businesses Worldwide
          <span className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gradient-to-l from-transparent to-[#71717A]" />
        </p>
        
        {/* Infinite Marquee Container */}
        <div className="w-full relative flex overflow-hidden max-w-[1200px]">
          {/* Edge fades */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
             animate={{ x: ["0%", "-50%"] }} 
             transition={{ duration: 40, ease: "linear", repeat: Infinity }}
             className="flex items-center gap-16 md:gap-32 pr-16 md:pr-32 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 will-change-transform whitespace-nowrap w-max"
          >
            {/* Logos Repeated twice for seamless marquee */}
            {[...new Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-3 font-bold text-3xl text-white cursor-pointer transition-opacity opacity-80 hover:opacity-100 shrink-0">
                  <Triangle className="w-9 h-9 fill-white" /> Vercel
                </div>
                <div className="flex items-center gap-3 font-bold text-3xl text-white cursor-pointer transition-opacity opacity-80 hover:opacity-100 mt-1 shrink-0">
                  <Figma className="w-9 h-9" /> Figma
                </div>
                <div className="flex items-center gap-3 font-bold text-3xl text-white cursor-pointer transition-opacity opacity-80 hover:opacity-100 shrink-0">
                  <Command className="w-9 h-9" /> Linear
                </div>
                <div className="flex items-center font-bold text-4xl tracking-tight text-white cursor-pointer transition-opacity opacity-80 hover:opacity-100 shrink-0">
                  Stripe
                </div>
                <div className="flex items-center gap-3 font-bold text-3xl text-white cursor-pointer transition-opacity opacity-80 hover:opacity-100 shrink-0">
                  <Github className="w-10 h-10 fill-white" /> GitHub
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ perspective: 1200 }}
        className="w-full max-w-[1240px] px-6 pb-32"
      >
        <motion.div 
          style={{ scale: scaleMockup, rotateX: rotateXMockup }}
          className="w-full rounded-2xl border border-[#27272A] bg-[#09090B] overflow-hidden shadow-2xl flex flex-col h-[700px] relative"
        >
          {/* Glow behind mockup container */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          {/* Mockup Header - The Inner Nav */}
          <div className="h-[60px] border-b border-[#27272A] flex items-center justify-between px-6 bg-[#18181B] relative z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-[2px] opacity-90 scale-[0.8]">
                <div className="w-[10px] h-[18px] rounded-full border-[2.5px] border-white border-r-0 rounded-r-none" />
                <div className="w-[10px] h-[18px] rounded-full border-[2.5px] border-white border-l-0 rounded-l-none" />
              </div>
              <span className="text-[15px] font-medium tracking-wide">Synthiq</span>
            </div>
            <div className="flex items-center gap-5 text-[#A1A1AA]">
              <div className="flex items-center gap-1 text-[13px] font-medium hover:text-white cursor-pointer transition-colors">
                English <ChevronDown className="w-4 h-4 ml-1" />
              </div>
              <div className="w-[1px] h-4 bg-[#27272A]" />
              <Bell className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <div className="w-8 h-8 rounded-full border border-[#27272A] bg-[#09090B] flex items-center justify-center cursor-pointer hover:bg-[#27272A] transition-colors ml-1">
                <User className="w-4 h-4 text-[#D4D4D8]" />
              </div>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden relative z-10">
            {/* Sidebar */}
            <div className="w-[260px] border-r border-[#27272A] bg-[#141414] p-4 flex flex-col gap-6 overflow-y-auto hidden md:flex shrink-0">
              <div className="mt-2">
                 <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} />
              </div>
              
              <div>
                <div className="text-[11px] font-semibold text-[#71717A] tracking-wider mb-3 px-3 uppercase">
                  Orders & Customers
                </div>
                <div className="flex flex-col gap-1">
                  <NavItem icon={<ShoppingCart />} label="Orders" active={activeTab === "Orders"} onClick={() => setActiveTab("Orders")} />
                  <NavItem icon={<Truck />} label="Delivery" active={activeTab === "Delivery"} onClick={() => setActiveTab("Delivery")} />
                  <NavItem icon={<Users />} label="Customer" active={activeTab === "Customer"} onClick={() => setActiveTab("Customer")} />
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-[#71717A] tracking-wider mb-3 px-3 uppercase">
                  Menu & Analytics
                </div>
                <div className="flex flex-col gap-1">
                  <NavItem icon={<TableProperties />} label="Menu" active={activeTab === "Menu"} onClick={() => setActiveTab("Menu")} />
                  <NavItem icon={<BarChart2 />} label="Analytics" active={activeTab === "Analytics"} onClick={() => setActiveTab("Analytics")} />
                  <NavItem icon={<MessageSquare />} label="Reviews" active={activeTab === "Reviews"} onClick={() => setActiveTab("Reviews")} />
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 bg-[#101012] relative overflow-hidden flex flex-col p-8">
               
              <h2 className="text-[22px] font-medium mb-6">{activeTab}</h2>

              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-[360px] flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#18181B] border border-[#27272A] rounded-xl pl-10 pr-4 py-2 text-[14px] text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#3F3F46] transition-colors"
                    />
                  </div>
                  {activeTab === "Orders" && (
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="bg-[#18181B] border border-[#27272A] rounded-xl px-3 py-2 text-[14px] text-white focus:outline-none focus:border-[#3F3F46] cursor-pointer"
                    >
                      <option value="All">All Status</option>
                      <option value="Preparing">Preparing</option>
                      <option value="On Delivery">On Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  )}
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedIds.size > 0 && (
                    <div className="flex items-center gap-2 mr-2 border-r border-[#27272A] pr-4">
                       <span className="text-[13px] text-[#A1A1AA]">{selectedIds.size} selected</span>
                       <button onClick={() => handleBulkAction("mark_delivered")} className="px-3 py-1.5 rounded-lg bg-[#34D399]/10 text-[#34D399] text-[13px] font-medium hover:bg-[#34D399]/20 transition-colors">
                         Mark Delivered
                       </button>
                       <button onClick={() => handleBulkAction("delete")} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-[13px] font-medium hover:bg-red-500/20 transition-colors">
                         Delete
                       </button>
                    </div>
                  )}

                  <button onClick={handleExport} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl border border-[#27272A] text-[14px] font-medium text-white hover:bg-[#18181B] transition-colors bg-[#09090B] active:scale-95 transition-transform">
                    <Download className="w-4 h-4 text-[#A1A1AA]" /> Export
                  </button>
                </div>
              </div>

              {/* Table Container */}
              <div className="border border-[#27272A] rounded-xl bg-[#09090B] overflow-auto flex-1 shadow-sm">
                <table className="w-full text-left text-[14px] whitespace-nowrap">
                  <thead className="bg-[#141414] text-[12px] text-[#A1A1AA] font-medium border-b border-[#27272A]">
                    <tr>
                      <th className="px-6 py-4 w-12 text-center">
                        <button onClick={toggleSelectAll} className={`w-[18px] h-[18px] rounded-[5px] border ${selectedIds.size > 0 && selectedIds.size === sortedCustomers.length ? 'bg-emerald-500 border-emerald-500' : 'border-[#3F3F46] bg-[#09090B]'} hover:border-[#71717A] transition-colors inline-flex items-center justify-center align-middle`}>
                          {selectedIds.size > 0 && selectedIds.size === sortedCustomers.length && <Check className="w-3.5 h-3.5 text-black" />}
                        </button>
                      </th>
                      {(tabConfigs[activeTab] || tabConfigs["Orders"]).map(col => (
                        <SortableHeader key={col.key} label={col.label} sortKey={col.key} />
                      ))}
                      <th className="px-6 py-4 w-12 text-center">
                        <span className="sr-only">Actions</span>
                        <RefreshCw className="w-4 h-4 inline-block text-[#A1A1AA]" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#18181B] bg-[#09090B]">
                    {sortedCustomers.map((customer) => (
                      <TableRow
                        key={customer.id}
                        customer={customer}
                        activeTab={activeTab}
                        selected={selectedIds.has(customer.id)}
                        onSelect={() => toggleSelect(customer.id)}
                        onUpdate={handleUpdateCustomer}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Extensions - Features */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1240px] px-6 pb-32 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="md:col-span-2 bg-[#09090B] border border-[#27272A] rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-[#3F3F46] transition-colors flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[350px]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-[#18181B] border border-[#27272A] flex items-center justify-center mb-8 shadow-lg shadow-black/50">
              <Workflow className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-[28px] font-semibold mb-4 leading-tight">AI-Powered Orchestration</h3>
            <p className="text-[#A1A1AA] text-[16px] leading-relaxed">
              Automatically route tasks, analyze incoming requests, and deploy intelligent agents without writing a single line of code. Our visual builder makes it effortless.
            </p>
          </div>
          
          {/* Visual element */}
          <div className="relative w-full md:w-[400px] shrink-0 rounded-2xl border border-[#27272A]/50 bg-[#101012] overflow-hidden flex items-center justify-center p-6 shadow-2xl">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.08)_0%,transparent_70%)] pointer-events-none" />
             <div className="flex flex-col w-full gap-4 relative z-10">
               <motion.div 
                 initial={{ opacity: 0.5, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                 className="w-full px-4 py-3 rounded-xl bg-[#18181B] border border-[#27272A] text-[13px] font-medium flex items-center justify-between text-[#A1A1AA]"
               >
                 <span>New Customer Data</span>
                 <ArrowRight className="w-4 h-4 text-emerald-500/50" />
               </motion.div>
               <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent my-1" />
               <motion.div
                 initial={{ opacity: 0.8, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                 className="w-full px-4 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[14px] font-medium flex items-center gap-3 text-white shadow-[0_0_20px_rgba(52,211,153,0.15)]"
               >
                 <Sparkles className="w-5 h-5 text-emerald-400" />
                 Analyzing Intent...
               </motion.div>
               <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent my-1" />
               <motion.div 
                 initial={{ opacity: 0.5, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
                 className="w-full px-4 py-3 rounded-xl bg-[#18181B] border border-[#27272A] text-[13px] font-medium flex items-center justify-between text-[#A1A1AA]"
               >
                 <ArrowRight className="w-4 h-4 text-emerald-500/50" />
                 <span>Route to Sales Pipeline</span>
               </motion.div>
             </div>
          </div>
        </div>

        <div className="bg-[#09090B] border border-[#27272A] rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:border-[#3F3F46] transition-colors flex flex-col justify-between min-h-[350px]">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center text-center h-full">
             <div className="w-12 h-12 rounded-2xl bg-[#18181B] border border-[#27272A] flex items-center justify-center mb-6 shadow-lg shadow-black/50 mx-auto group-hover:-translate-y-1 transition-transform duration-500 hover:shadow-emerald-500/20">
               <Zap className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-500" />
             </div>
             <h3 className="text-[22px] font-semibold mb-3">Real-time Sync</h3>
             <p className="text-[#A1A1AA] text-[15px] leading-relaxed mb-auto">
               Changes propagate instantly across all your connected internal systems.
             </p>
             
             <div className="relative aspect-square w-full max-w-[200px] mt-8 rounded-2xl border border-[#27272A]/50 bg-[#101012] overflow-hidden flex items-center justify-center shadow-2xl shrink-0 mx-auto">
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#3F3F46] to-transparent top-1/2 -translate-y-1/2" />
                <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#3F3F46] to-transparent left-1/2 -translate-x-1/2" />
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border border-dashed border-[#3F3F46] opacity-60 group-hover:border-emerald-500/50 group-hover:opacity-100 transition-all duration-700" 
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div 
                    animate={{ rotate: -360 }} 
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full border border-solid border-emerald-500/20 group-hover:border-emerald-500/60 group-hover:scale-110 transition-all duration-700" 
                  />
                </div>
                
                <div className="w-14 h-14 rounded-full bg-[#18181B] border border-[#3F3F46] flex items-center justify-center z-10 shadow-[0_0_30px_rgba(52,211,153,0.15)] relative group-hover:shadow-[0_0_40px_rgba(52,211,153,0.3)] transition-shadow duration-500">
                   <RefreshCw className="w-6 h-6 text-emerald-400 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.05] bg-[#09090B] pb-8 pt-20 z-10 relative mt-auto">
      <div className="max-w-[1200px] w-full mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16 mb-16">
          <div className="col-span-2 lg:col-span-2 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <div className="flex gap-[2px]">
                <div className="w-[10px] h-[18px] rounded-full border-[2.5px] border-white border-r-0 rounded-r-none" />
                <div className="w-[10px] h-[18px] rounded-full border-[2.5px] border-white border-l-0 rounded-l-none" />
              </div>
              <span className="text-[22px] font-medium tracking-tight text-white">Synthiq</span>
            </Link>
            <p className="text-[#A1A1AA] text-[14px] leading-relaxed max-w-[280px]">
              The intelligent operating system for modern logistics and order management. Built for speed, scaled for trust.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-[15px] font-medium mb-5">Product</h3>
            <ul className="flex flex-col gap-3 text-[14px] text-[#A1A1AA]">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-[15px] font-medium mb-5">Company</h3>
            <ul className="flex flex-col gap-3 text-[14px] text-[#A1A1AA]">
              <li><Link to="/case-studies" className="hover:text-white transition-colors">Customers</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-[15px] font-medium mb-5">Legal</h3>
            <ul className="flex flex-col gap-3 text-[14px] text-[#A1A1AA]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#A1A1AA] text-[13px]">
            &copy; {new Date().getFullYear()} Synthiq. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[#A1A1AA]">
            <a href="#" className="hover:text-white transition-colors hover:scale-110 active:scale-95 transform"><span className="sr-only">Twitter</span><svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.964H5.078z" /></svg></a>
            <a href="#" className="hover:text-white transition-colors hover:scale-110 active:scale-95 transform"><span className="sr-only">GitHub</span><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg></a>
            <a href="#" className="hover:text-white transition-colors hover:scale-110 active:scale-95 transform"><span className="sr-only">LinkedIn</span><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#09090B] text-white overflow-hidden font-sans selection:bg-white/20 flex flex-col">
        <motion.div style={{ y: yGrid }} className="absolute inset-0 z-0 bg-grid-pattern pointer-events-none [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] flex-1" />
        
        <div className="relative z-10 flex flex-col items-center pt-[120px] flex-1">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/case-studies" element={<CaseStudies />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[14px] transition-colors font-medium ${
        active
          ? "bg-[#27272A] text-white shadow-sm"
          : "text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
      }`}
    >
      <div className={`w-5 h-5 flex items-center justify-center ${active ? "opacity-100" : "opacity-80"} transition-opacity`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-[18px] h-[18px]' })}
      </div>
      <span>{label}</span>
    </motion.div>
  );
}

function TableRow({
  customer,
  activeTab,
  selected = false,
  onSelect,
  onUpdate
}: {
  customer: Customer;
  activeTab: string;
  selected?: boolean;
  onSelect?: () => void;
  onUpdate?: (id: string, field: keyof Customer, value: string) => void;
}) {
  const statusStyles = {
    Preparing: "text-[#FB923C] bg-[#FB923C]/10 border-[#FB923C]/20",
    "On Delivery": "text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20",
    Delivered: "text-[#34D399] bg-[#34D399]/10 border-[#34D399]/20",
  };

  const priorityStyles = {
    High: "text-red-500 bg-red-500/10",
    Medium: "text-amber-500 bg-amber-500/10",
    Low: "text-blue-500 bg-blue-500/10",
  };

  const columns = tabConfigs[activeTab] || tabConfigs["Orders"];

  return (
    <motion.tr 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: "#141414", scale: 1.002, originX: 0 }}
      transition={{ duration: 0.2 }}
      className={`group cursor-pointer border-b border-[#18181B] last:border-none ${selected ? 'bg-[#141414]' : ''}`}
      onClick={() => {
        if (onSelect) onSelect();
      }}
    >
      <td className="px-6 py-4 text-center">
        <button 
          onClick={(e) => { e.stopPropagation(); if (onSelect) onSelect(); }}
          className={`w-[18px] h-[18px] rounded-[5px] border ${selected ? 'bg-emerald-500 border-emerald-500' : 'border-[#3F3F46] bg-[#09090B]'} group-hover:border-[#71717A] transition-colors inline-flex items-center justify-center align-middle`}
        >
          {selected && <Check className="w-3.5 h-3.5 text-black" />}
        </button>
      </td>
      {columns.map(col => {
        const value = customer[col.key];
        
        if (col.key === 'id') {
          return <td key={col.key} className="px-6 py-4 text-[#A1A1AA] font-medium">{value}</td>;
        }
        if (col.key === 'name') {
           return <td key={col.key} className="px-6 py-4 text-[#F4F4F5] font-medium">{value}</td>;
        }
        if (col.key === 'address') {
           return (
             <td key={col.key} className="px-6 py-4 text-[#A1A1AA] truncate max-w-[200px]" title={value as string}>
               <input 
                 type="text" 
                 value={value as string} 
                 onChange={(e) => onUpdate?.(customer.id, 'address', e.target.value)} 
                 onClick={(e) => e.stopPropagation()} 
                 className="bg-transparent border-none outline-none focus:bg-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#3F3F46] rounded px-1 -ml-1 text-inherit truncate w-full"
               />
             </td>
           );
        }
        if (col.key === 'price') {
           return (
             <td key={col.key} className="px-6 py-4 text-[#F4F4F5] font-medium">
               <input 
                 type="text" 
                 value={value as string} 
                 onChange={(e) => onUpdate?.(customer.id, 'price', e.target.value)} 
                 onClick={(e) => e.stopPropagation()} 
                 className="bg-transparent border-none outline-none focus:bg-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#3F3F46] rounded px-1 -ml-1 text-inherit w-20 cursor-text"
               />
             </td>
           );
        }
        if (col.key === 'status') {
           return (
             <td key={col.key} className="px-6 py-4">
                <span className={`px-3 py-1 text-[12px] font-medium rounded-md border ${statusStyles[value as keyof typeof statusStyles]}`}>
                  {value}
                </span>
             </td>
           );
        }
        if (col.key === 'priority') {
           return (
             <td key={col.key} className="px-6 py-4 relative">
               <select 
                 value={value as string || "Medium"} 
                 onChange={(e) => onUpdate?.(customer.id, 'priority', e.target.value)}
                 onClick={(e) => e.stopPropagation()}
                 className={`px-2 py-1 text-[12px] font-medium rounded-md border-none outline-none cursor-pointer appearance-none text-center ${priorityStyles[value as keyof typeof priorityStyles] || priorityStyles["Medium"]}`}
               >
                 <option value="High" className="bg-[#18181B] text-white">High</option>
                 <option value="Medium" className="bg-[#18181B] text-white">Medium</option>
                 <option value="Low" className="bg-[#18181B] text-white">Low</option>
               </select>
             </td>
           );
        }

        return <td key={col.key} className="px-6 py-4 text-[#A1A1AA]">{value as string}</td>;
      })}
      <td className="px-6 py-4 text-center">
        <button className="text-[#A1A1AA] hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="w-5 h-5 mx-auto" />
        </button>
      </td>
    </motion.tr>
  );
}
