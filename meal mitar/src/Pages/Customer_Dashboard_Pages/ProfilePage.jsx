import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Lock, Bell, CreditCard, 
  LogOut, Trash2, HelpCircle, ChevronRight 
} from 'lucide-react';

const ProfilePage = () => {
  // --- STATE ---
  const [toggles, setToggles] = useState({
    orderUpdates: true,
    paymentReminders: true,
    promos: false,
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and preferences</p>
      </div>

      <div className="space-y-8 pb-10">
        
        {/* ================= SECTION 1: Personal Information ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <form className="space-y-6">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User size={16} className="text-gray-400" /> Full Name
              </label>
              <input 
                type="text" 
                defaultValue="suraj" 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Mail size={16} className="text-gray-400" /> Email Address
              </label>
              <input 
                type="email" 
                defaultValue="suraj@example.com" 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Phone size={16} className="text-gray-400" /> Phone Number
              </label>
              <input 
                type="tel" 
                defaultValue="+91 9876543210" 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition-all"
              />
            </div>

            {/* Delivery Address */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin size={16} className="text-gray-400" /> Delivery Address
              </label>
              <input 
                type="text" 
                defaultValue="123 Main Street, Mumbai, Maharashtra 400001" 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition-all"
              />
            </div>

            {/* Food Preferences */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Food Preferences</label>
              <textarea 
                rows="2"
                defaultValue="Vegetarian preferred, no onion/garlic" 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition-all resize-none"
              />
            </div>

            {/* Save Button */}
            <button type="button" className="bg-[#EA580C] hover:bg-orange-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm">
              Save Changes
            </button>

          </form>
        </div>

        {/* ================= SECTION 2: Security ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Security</h2>
          
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 shadow-sm border border-gray-100">
                <Lock size={18} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Password</p>
                <p className="text-gray-500 text-xs">Last changed 3 months ago</p>
              </div>
            </div>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors shadow-sm">
              Change Password
            </button>
          </div>
        </div>

        {/* ================= SECTION 3: Notification Preferences ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h2>
          
          <div className="space-y-4">
            <ToggleRow 
              icon={<Bell size={18} />}
              title="Order Updates"
              subtitle="Get notified about order status"
              isOn={toggles.orderUpdates}
              onToggle={() => handleToggle('orderUpdates')}
            />
            <ToggleRow 
              icon={<CreditCard size={18} />}
              title="Payment Reminders"
              subtitle="Billing and payment notifications"
              isOn={toggles.paymentReminders}
              onToggle={() => handleToggle('paymentReminders')}
            />
            <ToggleRow 
              icon={<Mail size={18} />}
              title="Promotional Emails"
              subtitle="Special offers and updates"
              isOn={toggles.promos}
              onToggle={() => handleToggle('promos')}
            />
          </div>
        </div>

        {/* ================= SECTION 4: Account Statistics ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Account Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Active Subscriptions" value="1" color="bg-orange-50 text-orange-600" />
            <StatCard label="Total Orders" value="15" color="bg-blue-50 text-blue-600" />
            <StatCard label="Total Spent" value="₹3,220" color="bg-green-50 text-green-600" />
          </div>
        </div>

        {/* ================= SECTION 5: Danger Zone ================= */}
        <div className="bg-white border border-red-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-red-600 mb-6">Danger Zone</h2>
          
          <div className="space-y-4">
            {/* Logout Row */}
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
              <div>
                <p className="font-bold text-gray-900 text-sm">Logout</p>
                <p className="text-gray-500 text-xs">Sign out from your account</p>
              </div>
              <button className="flex items-center gap-2 border border-red-100 text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors">
                <LogOut size={16} /> Logout
              </button>
            </div>

            {/* Delete Account Row */}
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
              <div>
                <p className="font-bold text-gray-900 text-sm">Delete Account</p>
                <p className="text-gray-500 text-xs">Permanently delete your account and data</p>
              </div>
              <button className="border border-red-100 text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* ================= SECTION 6: Need Help? ================= */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            Need Help?
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            If you have any questions or need assistance with your account, please contact our support team.
          </p>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Contact Support
          </button>
        </div>

      </div>
    </>
  );
};

// --- HELPER COMPONENTS ---

const ToggleRow = ({ icon, title, subtitle, isOn, onToggle }) => (
  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="text-gray-400">
        {icon}
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm">{title}</p>
        <p className="text-gray-500 text-xs">{subtitle}</p>
      </div>
    </div>
    
    {/* Custom Toggle Switch */}
    <button 
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
        isOn ? 'bg-green-500' : 'bg-gray-200'
      }`}
    >
      <span 
        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${
          isOn ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

const StatCard = ({ label, value, color }) => (
  <div className={`rounded-xl p-6 text-center ${color}`}>
    <h3 className="text-3xl font-bold mb-1">{value}</h3>
    <p className="text-xs font-medium uppercase tracking-wide opacity-80">{label}</p>
  </div>
);

export default ProfilePage;