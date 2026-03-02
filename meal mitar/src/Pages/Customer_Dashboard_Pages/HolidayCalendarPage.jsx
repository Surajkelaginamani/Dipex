import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Info, AlertCircle, X 
} from 'lucide-react';

const HolidayCalendarPage = () => {
  // --- STATE MANAGEMENT ---
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Default: Jan 2026
  const [holidays, setHolidays] = useState([
    "2026-01-26", // Republic Day
    "2026-03-08"  // Holi (Example)
  ]);

  // --- HELPER FUNCTIONS ---
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${month}-${d}`;
  };

  const isHoliday = (day) => {
    return holidays.includes(formatDateKey(day));
  };

  // --- EVENT HANDLERS ---
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const toggleHoliday = (day) => {
    const dateKey = formatDateKey(day);
    if (holidays.includes(dateKey)) {
      setHolidays(holidays.filter(h => h !== dateKey)); // Remove
    } else {
      setHolidays([...holidays, dateKey].sort()); // Add & Sort
    }
  };

  const removeHoliday = (dateString) => {
    setHolidays(holidays.filter(h => h !== dateString));
  };

  // --- CALCULATIONS ---
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
  // Calculate padding for grid alignment
  const paddingDays = Array.from({ length: getFirstDayOfMonth(currentDate) });
  const daysArray = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1);

  // Billing Stats
  const holidaysInCurrentMonth = holidays.filter(h => h.startsWith(`${currentYear}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`)).length;
  const estimatedSavings = holidaysInCurrentMonth * 120; // ₹120 per meal

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Holiday Calendar</h1>
        <p className="text-gray-500 mt-1">Mark your leave days and manage meal deliveries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT COLUMN (Calendar & Info) ================= */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Calendar Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Select Holiday Dates</h3>
            
            {/* Calendar Widget */}
            <div className="max-w-md mx-auto">
              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ChevronLeft size={20} className="text-gray-500" />
                </button>
                <h4 className="font-bold text-lg text-gray-900">{currentMonthName} {currentYear}</h4>
                <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ChevronRight size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 text-center mb-4">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 text-center gap-y-4">
                {/* Blank Padding Days */}
                {paddingDays.map((_, index) => (
                  <div key={`padding-${index}`} />
                ))}
                
                {/* Actual Days */}
                {daysArray.map(day => {
                  const selected = isHoliday(day);
                  return (
                    <button 
                      key={day} 
                      onClick={() => toggleHoliday(day)}
                      className={`
                        text-sm w-8 h-8 mx-auto flex items-center justify-center rounded-full transition-colors
                        ${selected 
                          ? 'bg-[#EA580C] text-white shadow-md shadow-orange-200 font-semibold' 
                          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                        }
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
            <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-blue-900 text-sm mb-2">How it works:</h4>
              <ul className="space-y-1.5 text-blue-800 text-sm list-disc list-inside">
                <li>Mark dates when you won't need meal delivery</li>
                <li>Your subscription billing will automatically adjust</li>
                <li>You'll only pay for the meals you receive</li>
                <li>Mark holidays at least 24 hours in advance</li>
              </ul>
            </div>
          </div>

          {/* All Marked Holidays Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">
              All Marked Holidays ({holidays.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {holidays.length > 0 ? (
                holidays.map(date => (
                  <div key={date} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{new Date(date).toDateString()}</p>
                      <p className="text-gray-500 text-xs">Marked as Holiday</p>
                    </div>
                    <button 
                      onClick={() => removeHoliday(date)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic col-span-2">No holidays marked yet.</p>
              )}
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN (Summary Cards) ================= */}
        <div className="space-y-6">

          {/* Upcoming Holidays (Summary) */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Upcoming Holidays</h3>
            <div className="space-y-6">
              {holidays.slice(0, 3).map(date => (
                <HolidayItem 
                  key={date} 
                  date={new Date(date).toDateString()} 
                  name="Personal Leave" 
                  onRemove={() => removeHoliday(date)}
                />
              ))}
              {holidays.length === 0 && <p className="text-gray-400 text-sm">No upcoming holidays.</p>}
            </div>
          </div>

          {/* Billing Impact */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Billing Impact</h3>
            
            <div className="mb-6">
              <p className="text-gray-500 text-xs mb-1">This Month's Holidays</p>
              <p className="text-3xl font-bold text-orange-600">{holidaysInCurrentMonth}</p>
            </div>
            
            <div className="pt-6 border-t border-gray-100">
              <p className="text-gray-500 text-xs mb-1">Estimated Savings</p>
              <p className="text-2xl font-bold text-green-600">₹{estimatedSavings}</p>
              <p className="text-gray-400 text-xs mt-1">Based on ₹120 per meal</p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-[#FFF7ED] border border-orange-100 rounded-xl p-5 flex items-start gap-3">
            <AlertCircle className="text-orange-600 shrink-0 mt-0.5" size={18} />
            <div>
              <h4 className="font-bold text-orange-800 text-sm mb-1">Important</h4>
              <p className="text-orange-700 text-xs leading-relaxed">
                Mark your holidays at least 24 hours in advance to avoid unnecessary charges.
              </p>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

// --- Helper Components ---

const HolidayItem = ({ date, name, onRemove }) => (
  <div className="flex items-center justify-between group">
    <div>
      <p className="font-bold text-gray-900 text-sm">{date}</p>
      <p className="text-gray-500 text-xs">{name}</p>
    </div>
    <button 
      onClick={onRemove}
      className="text-red-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
    >
      Remove
    </button>
  </div>
);

export default HolidayCalendarPage;