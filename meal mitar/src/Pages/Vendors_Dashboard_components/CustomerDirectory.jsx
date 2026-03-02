import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Phone, MessageCircle, 
  MapPin, Package, Clock, X as CloseIcon 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CustomerDirectory = ({ onBack }) => {
    const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Mock Data: Active Customers Only
  const [customers] = useState([
    { 
      id: 101, 
      name: "Rohan Sharma", 
      hostel: "Hostel B", 
      room: "Room 101",
      plan: "Full Meal", 
      type: "Veg",
      phone: "+91 9876543210",
      planDuration: "Monthly",
      startDate: "01 Jan 2026",
      status: "Active"
    },
    { 
      id: 102, 
      name: "Amit Verma", 
      hostel: "Hostel C", 
      room: "Room 205",
      plan: "Half Meal", 
      type: "Non-Veg",
      phone: "+91 9876543211",
      planDuration: "Weekly",
      startDate: "15 Feb 2026",
      status: "Active"
    },
    { 
      id: 103, 
      name: "Sneha Gupta", 
      hostel: "Hostel A", 
      room: "Flat 302",
      plan: "Full Meal", 
      type: "Veg",
      phone: "+91 9876543212",
      planDuration: "Monthly",
      startDate: "10 Jan 2026",
      status: "Paused" 
    }
  ]);

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.hostel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
               onClick={()=> navigate("/Ven_Dashboard")}
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Directory</h1>
              <p className="text-gray-500 text-sm">View and contact your active students</p>
            </div>
          </div>
          
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-xl font-bold border border-green-200">
            {customers.length} Total Active
          </div>
        </div>

        {/* --- Search Bar --- */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by student name or hostel..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        {/* --- Customer List --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredCustomers.map(student => (
              <div 
                key={student.id} 
                onClick={() => setSelectedStudent(student)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-orange-50/50 transition-colors cursor-pointer group"
              >
                {/* Student Basic Info */}
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-700 font-bold text-lg shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.hostel}, {student.room}</p>
                  </div>
                </div>

                {/* Actions & Badges */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pl-16 sm:pl-0">
                  <div className="text-left sm:text-right hidden sm:block">
                    <span className="block text-sm font-bold text-gray-900">{student.plan}</span>
                    <span className={`text-xs font-semibold ${student.type === 'Veg' ? 'text-green-600' : 'text-red-600'}`}>
                      {student.type}
                    </span>
                  </div>

                  {/* COMMUNICATION BUTTONS */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <a 
                      href={`https://wa.me/${student.phone.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2.5 bg-green-50 text-green-600 rounded-lg border border-green-200 hover:bg-green-100 hover:shadow-sm transition-all"
                      title="WhatsApp Student"
                    >
                      <MessageCircle size={20} />
                    </a>
                    <a 
                      href={`tel:${student.phone}`}
                      className="p-2.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-100 hover:shadow-sm transition-all"
                      title="Call Student"
                    >
                      <Phone size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredCustomers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No customers found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* STUDENT DETAILS MODAL (POPUP)             */}
      {/* ========================================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors z-10"
            >
              <CloseIcon size={20} />
            </button>

            {/* Modal Header (Profile Banner) */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-center relative">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-3xl font-bold text-orange-600 shadow-md border-4 border-orange-200/50">
                {selectedStudent.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedStudent.name}</h2>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                selectedStudent.status === 'Active' ? 'bg-green-400/30 text-green-50 border border-green-400/40' : 'bg-gray-800/30 text-gray-50 border border-gray-400/40'
              }`}>
                {selectedStudent.status} Subscription
              </span>
            </div>

            {/* Modal Body (Details) */}
            <div className="p-6">
              
              {/* Quick Contact Buttons inside Modal */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a href={`tel:${selectedStudent.phone}`} className="flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 border border-blue-100 transition-colors">
                  <Phone size={18} /> Call
                </a>
                <a href={`https://wa.me/${selectedStudent.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 bg-green-50 text-green-700 rounded-xl font-bold hover:bg-green-100 border border-green-100 transition-colors">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>

              {/* Information Grid */}
              <div className="space-y-4 text-sm bg-gray-50 p-5 rounded-2xl border border-gray-100">
                
                {/* Delivery Address */}
                <div className="flex items-start gap-3 border-b border-gray-200 pb-3">
                  <MapPin className="text-gray-400 mt-0.5" size={20} />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Delivery Address</p>
                    <p className="font-semibold text-gray-900 text-base">{selectedStudent.hostel}</p>
                    <p className="text-gray-600">{selectedStudent.room}</p>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="flex items-start gap-3 border-b border-gray-200 pb-3">
                  <Phone className="text-gray-400 mt-0.5" size={20} />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Contact Number</p>
                    <p className="font-semibold text-gray-900 text-base">{selectedStudent.phone}</p>
                  </div>
                </div>

                {/* Tiffin Plan */}
                <div className="flex items-start gap-3 border-b border-gray-200 pb-3">
                  <Package className="text-gray-400 mt-0.5" size={20} />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Tiffin Plan</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="font-semibold text-gray-900">{selectedStudent.planDuration}</span>
                      <span className="text-gray-300">•</span>
                      <span className="font-semibold text-gray-900">{selectedStudent.plan}</span>
                      <span className="text-gray-300">•</span>
                      <span className={`font-bold ${selectedStudent.type === 'Veg' ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedStudent.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Joined Date */}
                <div className="flex items-start gap-3">
                  <Clock className="text-gray-400 mt-0.5" size={20} />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Joined Date</p>
                    <p className="font-semibold text-gray-900">{selectedStudent.startDate}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDirectory;