import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Package, Navigation, 
  ChevronDown, ChevronUp, Leaf, Drumstick 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const LocationSummary = ({ onBack }) => {
    const navigate = useNavigate();
  // Mock Data: Aggregated by Location
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Sanjivani Boys Hostel",
      type: "Hostel",
      totalTiffins: 15,
      breakdown: { vegFull: 10, vegHalf: 2, nonVegFull: 3 },
      isExpanded: true,
      students: [
        { name: "Rohan Sharma", room: "Room 101", type: "Veg Full" },
        { name: "Amit Verma", room: "Room 105", type: "Non-Veg Full" },
        { name: "Karan Singh", room: "Room 112", type: "Veg Half" }
      ]
    },
    {
      id: 2,
      name: "Sunrise PG (Girls)",
      type: "PG",
      totalTiffins: 8,
      breakdown: { vegFull: 8, vegHalf: 0, nonVegFull: 0 },
      isExpanded: false,
      students: [
        { name: "Priya Patel", room: "Flat 201", type: "Veg Full" },
        { name: "Neha Gupta", room: "Flat 202", type: "Veg Full" }
      ]
    },
    {
      id: 3,
      name: "TechHub Office Complex",
      type: "Office",
      totalTiffins: 12,
      breakdown: { vegFull: 5, vegHalf: 5, nonVegFull: 2 },
      isExpanded: false,
      students: [
        { name: "Vikram Desai", room: "4th Floor, HR Dept", type: "Veg Full" },
        { name: "Rahul M.", room: "2nd Floor, IT", type: "Non-Veg Full" }
      ]
    }
  ]);

  // Toggle dropdown for student list
  const toggleExpand = (id) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { ...loc, isExpanded: !loc.isExpanded } : loc
    ));
  };

  const totalDeliveriesToday = locations.reduce((sum, loc) => sum + loc.totalTiffins, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
              <h1 className="text-2xl font-bold text-gray-900">Location Summary</h1>
              <p className="text-gray-500 text-sm">Pack and route your deliveries</p>
            </div>
          </div>
          
          <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-xl font-bold flex items-center gap-2 border border-orange-200">
            <Package size={20} />
            {totalDeliveriesToday} Total Tiffins
          </div>
        </div>

        {/* --- Location Cards --- */}
        <div className="space-y-4">
          {locations.map((loc) => (
            <div key={loc.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              
              {/* Card Header (Clickable to expand) */}
              <div 
                onClick={() => toggleExpand(loc.id)}
                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{loc.name}</h2>
                    <p className="text-sm text-gray-500 font-medium">{loc.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Delivery Breakdown Badges */}
                  <div className="flex gap-2">
                    {loc.breakdown.vegFull > 0 && (
                      <span className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs font-bold">
                        <Leaf size={12} /> {loc.breakdown.vegFull} Full
                      </span>
                    )}
                    {loc.breakdown.vegHalf > 0 && (
                      <span className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs font-bold">
                        <Leaf size={12} /> {loc.breakdown.vegHalf} Half
                      </span>
                    )}
                    {loc.breakdown.nonVegFull > 0 && (
                      <span className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded text-xs font-bold">
                        <Drumstick size={12} /> {loc.breakdown.nonVegFull} Full
                      </span>
                    )}
                  </div>

                  {/* Total Drop-offs */}
                  <div className="text-right flex items-center gap-3 border-l border-gray-200 pl-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Drop-offs</p>
                      <p className="text-2xl font-black text-gray-900">{loc.totalTiffins}</p>
                    </div>
                    {loc.isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </div>
                </div>
              </div>

              {/* Card Body (Expanded Student List) */}
              {loc.isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-700">Detailed Packing List</h3>
                    <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                      <Navigation size={14} /> Open in Maps
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {loc.students.map((student, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{student.room}</p>
                          <p className="text-xs text-gray-500">{student.name}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                          student.type.includes('Veg') && !student.type.includes('Non') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LocationSummary;