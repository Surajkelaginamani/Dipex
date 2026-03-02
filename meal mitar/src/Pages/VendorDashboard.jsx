import React, { useState, useEffect } from 'react'; // Added useEffect
import { 
  Users, IndianRupee, ChefHat, ClipboardList, Star, Calendar, UserPlus, MapPin,
  Megaphone, PauseCircle, TrendingUp, ArrowRight,
  CheckCircle, AlertCircle, Bell, ShoppingBag, Plus, Loader // Added Loader
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('deliveries');
  
  // --- NEW: DYNAMIC STATES ---
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentDate = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  // --- FETCH DATA ON LOAD ---
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/vendor/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error("Vendor Dashboard Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (isLoading) {
    return <div className="flex flex-col items-center justify-center min-h-screen text-orange-600"><Loader className="animate-spin mb-4" size={48} /><p className="font-bold">Loading your kitchen...</p></div>;
  }

  // Fallback to empty object if data is missing
  const business = dashboardData?.business || {};
  const menu = dashboardData?.todaysMenu || null;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, <span className="font-semibold text-gray-800">{business.businessName || "Vendor"}</span>!
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-red-200 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-50 hover:border-red-300 transition-all shadow-sm group">
            <PauseCircle size={20} className="group-hover:scale-110 transition-transform" />
            <span>Pause Deliveries</span>
          </button>

          <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
            <Calendar size={18} className="text-orange-500" />
            <span className="text-sm font-medium text-gray-600">{currentDate}</span>
          </div> 
          
          <button onClick={() => navigate('/locations')} className="px-4 py-2 bg-orange-50 text-orange-700 text-sm font-bold rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors flex items-center gap-2 shadow-sm">
            <MapPin size={16} /> Location Summary
          </button>
        </div>
      </div>

      {/* --- Stats Overview --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <button onClick={() => navigate('/CustomerDirectory')} className="text-left">
          <StatsCard title="Active Students" value={dashboardData?.stats?.activeSubscribers || "0"} subtext="Currently subscribed" icon={<Users size={24} className="text-blue-600" />} color="bg-blue-100" />
        </button>
        <div className="text-left cursor-default">
          <StatsCard title="Total Revenue" value={`₹${dashboardData?.stats?.monthlyRevenue || "0"}`} subtext="This Month" icon={<IndianRupee size={24} className="text-green-600" />} color="bg-green-100" />
        </div>
        <button onClick={() => navigate('/locations')} className="text-left">
          <StatsCard title="Today's Deliveries" value={dashboardData?.stats?.todayDeliveries || "0"} subtext="Meals to prepare" icon={<ClipboardList size={24} className="text-orange-600" />} color="bg-orange-100" />
        </button>
        <button onClick={() => navigate("/Reviews")} className="text-left">
          <StatsCard title="Vendor Rating" value={business.rating || "New"} subtext="Customer Feedback" icon={<Star size={24} className="text-yellow-500 fill-yellow-500" />} color="bg-yellow-100" />
        </button>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Delivery & Payments */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-1">
            <button onClick={() => setActiveTab('deliveries')} className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'deliveries' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <ClipboardList size={18} /> Delivery List
            </button>
            <button onClick={() => setActiveTab('payments')} className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'payments' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <IndianRupee size={18} /> Payment Status
            </button>
          </div>

          {/* TAB 1: DELIVERY LIST (Kept static for now until we build the logic!) */}
          {activeTab === 'deliveries' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               {/* ... (Your existing static delivery list code) ... */}
               <div className="p-8 text-center text-gray-500">
                 Delivery list will populate here once you accept requests!
               </div>
            </div>
          )}

          {/* TAB 2: PAYMENT TRACKER (Kept static for now) */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               {/* ... (Your existing static payment list code) ... */}
               <div className="p-8 text-center text-gray-500">
                 Payment tracking will populate here!
               </div>
            </div>
          )}
        </div>

        {/* Right Column: Menu & Actions */}
        <div className="space-y-8">
          
          {/* Daily Menu Card - NOW DYNAMIC! */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <ChefHat className="text-orange-500" size={20} /> Today's Menu
              </h3>
              <button onClick={() => navigate('/menu_management')} className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                Edit
              </button>
            </div>
            
            {menu ? (
              <div className="space-y-3 flex-1">
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <span className="text-xs font-bold text-orange-800 uppercase tracking-wide block mb-1">Lunch ({menu.lunch.time})</span>
                  <p className="text-gray-700 text-sm font-medium">{menu.lunch.items}</p>
                </div>
                {menu.dinner && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1">Dinner ({menu.dinner.time})</span>
                    <p className="text-gray-700 text-sm font-medium">{menu.dinner.items}</p>
                  </div>
                )}
              </div>
            ) : (
              /* EMPTY STATE: No Menu Uploaded */
              <div className="flex-1 flex flex-col items-center justify-center py-6 text-center border-2 border-dashed border-gray-100 rounded-xl">
                <ChefHat className="text-gray-300 mb-2" size={32} />
                <p className="text-gray-500 text-sm font-medium">You haven't set today's menu!</p>
                <button onClick={() => navigate('/menu_management')} className="mt-3 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-200 transition-colors">
                  Add Menu Now
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => navigate('/CustomerDirectory')} className="p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-400 hover:shadow-md transition-all group flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><Users size={20} /></div>
              <span className="text-xs font-semibold text-gray-600">Add Student</span>
            </button>
            <button onClick={() => navigate('/menu_management')} className="p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-400 hover:shadow-md transition-all group flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><Megaphone size={20} /></div>
              <span className="text-xs font-semibold text-gray-600">Announce</span>
            </button>
            
            {/* REQUESTS BUTTON */}
            <button onClick={() => navigate('/students')} className="p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-400 hover:shadow-md transition-all group flex flex-col items-center gap-2 relative">
              {/* If there are pending requests, we can make this dot pulse! */}
              <span className="absolute top-2 right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><UserPlus size={20} /></div>
              <span className="text-xs font-semibold text-gray-600">Requests</span>
            </button>
            
            <button onClick={() => navigate("/Leave_manegment")} className="p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-400 hover:shadow-md transition-all group flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><Calendar size={20} /></div>
              <span className="text-xs font-semibold text-gray-600">Mark Leave</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- EXTRAS STORE (Kept static for now) --- */}
      <div className="pt-6 border-t border-gray-200">
          {/* ... (Your existing Store code) ... */}
      </div>

    </div>
  );
};

// Helper Components
const StatsCard = ({ title, value, subtext, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>{icon}</div>    
  </div> 
); 

export default VendorDashboard;