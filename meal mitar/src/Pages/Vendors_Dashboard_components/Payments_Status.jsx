import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Filter, Phone, MessageCircle, 
  CheckCircle, AlertCircle, Calendar, X, Download, Share2 
} from 'lucide-react';
import { useNavigate    } from 'react-router-dom';
const AllCustomers = () => {
    const Navigate = useNavigate();
  // State for Receipt Modal
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock Data
  const unpaidCustomers = [
    { id: 1, name: "Aditya Kumar", amount: "3000", due: "5 Days", hostel: "Hostel A", phone: "9876543210" },
    { id: 2, name: "Raj Malhotra", amount: "3000", due: "Today", hostel: "Hostel C", phone: "9876543211" },
    { id: 3, name: "Vikram Singh", amount: "1500", due: "2 Days", hostel: "Hostel B", phone: "9876543212" },
  ];

  const paidCustomers = [
    { id: 101, name: "Sneha Gupta", amount: "2800", date: "2026-01-15", method: "UPI", hostel: "Hostel A", plan: "Full Meal (Veg)", leaves: 2 },
    { id: 102, name: "Priya Sharma", amount: "3000", date: "2026-01-14", method: "Cash", hostel: "Hostel B", plan: "Full Meal (Non-Veg)", leaves: 0 },
    { id: 103, name: "Rahul Deshmukh", amount: "3000", date: "2026-01-12", method: "UPI", hostel: "Hostel A", plan: "Full Meal (Veg)", leaves: 0 },
    { id: 104, name: "Anjali Mehta", amount: "1500", date: "2026-01-10", method: "GPay", hostel: "Hostel C", plan: "Half Meal (Veg)", leaves: 0 },
  ];

  // Function to handle "View Receipt" click
  const handleViewReceipt = (student) => {
    setSelectedStudent(student);
    setShowReceipt(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* --- Header --- */}
        <div className="flex items-center gap-4">
          <button  onClick={()=> Navigate("/Ven_Dashboard")} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Records</h1>
            <p className="text-gray-500 text-sm">Manage student dues and history</p>
          </div>
        </div>

        {/* --- Search & Filter --- */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or hostel..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 font-medium hover:bg-gray-50">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>

        {/* --- SECTION 1: UNPAID / PENDING --- */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-red-500 rounded-full"></div>
            Pending Dues
            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
              {unpaidCustomers.length} Students
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unpaidCustomers.map((student) => (
              <div key={student.id} className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm flex justify-between items-center group hover:border-red-300 transition-all">
                <div>
                  <h3 className="font-bold text-gray-900">{student.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{student.hostel}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-600">₹{student.amount}</span>
                    <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded font-medium border border-red-100">
                      Due: {student.due}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button className="p-2 bg-green-50 text-green-600 rounded-lg border border-green-100 hover:bg-green-100 transition-colors" title="Message on WhatsApp">
                    <MessageCircle size={20} />
                  </button>
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors" title="Call Student">
                    <Phone size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 2: PAID / CLEARED --- */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-6 bg-green-500 rounded-full"></div>
            Received Payments
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
              Safe & Secure
            </span>
          </h2>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-4">Student</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4 hidden sm:table-cell">Date</th>
                  <th className="p-4 hidden sm:table-cell">Method</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paidCustomers.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-500 sm:hidden">{student.date}</p>
                    </td>
                    <td className="p-4 font-bold text-gray-800">₹{student.amount}</td>
                    <td className="p-4 text-sm text-gray-500 hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {student.date}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500 hidden sm:table-cell">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium border border-gray-200">
                        {student.method}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleViewReceipt(student)}
                        className="text-orange-600 text-xs font-bold hover:underline"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- RECEIPT MODAL --- */}
      {showReceipt && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowReceipt(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            {/* Receipt Header */}
            <div className="bg-orange-600 p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold">Payment Receipt</h2>
              <p className="text-orange-100 text-sm mt-1">Transaction Successful</p>
            </div>

            {/* Receipt Body */}
            <div className="p-8">
              {/* Amount */}
              <div className="text-center mb-8">
                <p className="text-gray-500 text-sm mb-1">Total Amount Paid</p>
                <h3 className="text-4xl font-bold text-gray-900">₹{selectedStudent.amount}</h3>
              </div>

              {/* Details List */}
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Student Name</span>
                  <span className="font-semibold text-gray-900">{selectedStudent.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Hostel / Room</span>
                  <span className="font-semibold text-gray-900">{selectedStudent.hostel}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Plan Type</span>
                  <span className="font-semibold text-gray-900">{selectedStudent.plan}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Leaves Deducted</span>
                  <span className="font-semibold text-red-500">
                    {selectedStudent.leaves > 0 ? `-${selectedStudent.leaves} Days` : "None"}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Payment Date</span>
                  <span className="font-semibold text-gray-900">{selectedStudent.date}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-semibold text-gray-900">{selectedStudent.method}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  <Download size={18} />
                  Download
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 border-t border-gray-100">
              Receipt generated by Annapurna Tiffins • {selectedStudent.date}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AllCustomers;