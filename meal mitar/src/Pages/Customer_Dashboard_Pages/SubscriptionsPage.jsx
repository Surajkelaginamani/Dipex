import React, { useState, useEffect } from 'react';
import { Calendar, Pause, X, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionsPage = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH SUBSCRIPTIONS ON LOAD ---
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/customer/subscriptions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSubscriptions(data);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, [navigate]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500 font-bold">Loading Subscriptions...</div>;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Subscriptions</h1>
        <p className="text-gray-500 mt-1">Manage your active and pending tiffin subscriptions</p>
      </div>

      {/* --- MAP THROUGH DATABASE SUBSCRIPTIONS --- */}
      {subscriptions.length > 0 ? (
        subscriptions.map((sub) => (
          <div key={sub._id} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Image Section */}
              <div className="shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Tiffin Service"
                  className="w-full md:w-64 h-48 object-cover rounded-xl"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1">
                
                {/* Top Row: Title, Status, Price */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {sub.vendor ? sub.vendor.businessName : 'Unknown Vendor'}
                    </h2>
                    
                    {/* DYNAMIC STATUS BADGE */}
                    {sub.status === 'pending' && (
                      <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1 inline-flex">
                        <Clock size={12} /> Pending Approval
                      </span>
                    )}
                    {sub.status === 'active' && (
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide inline-flex">
                        Active
                      </span>
                    )}
                    {(sub.status === 'cancelled' || sub.status === 'expired') && (
                      <span className="bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide inline-flex">
                        {sub.status}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 sm:mt-0 text-left sm:text-right">
                    <p className="text-gray-500 text-xs mb-1">Total Amount</p>
                    <h3 className="text-3xl font-bold text-orange-600">₹{sub.price}</h3>
                    <p className="text-gray-400 text-xs capitalize">{sub.planType.replace('_', ' ')}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Plan Details</p>
                    <p className="font-semibold text-gray-900 text-base capitalize">{sub.planType.replace('_', ' ')}</p>
                    <p className="text-gray-500 text-sm capitalize">Meal Type: {sub.mealType}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Request Date
                    </p>
                    {/* Safely format the date it was created */}
                    <p className="font-semibold text-gray-900 text-base">
                      {new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* DYNAMIC ACTION BUTTONS */}
                {/* Only show Pause/Cancel if the subscription is actually active! */}
                {sub.status === 'active' && (
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-black transition-colors shadow-sm">
                      <Pause size={16} /> Pause Subscription
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-red-100 bg-white text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm">
                      <X size={16} /> Cancel Subscription
                    </button>
                  </div>
                )}
                
                {/* If pending, just show a message instead of buttons */}
                {sub.status === 'pending' && (
                  <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg text-sm text-gray-600">
                    The vendor is reviewing your request. You will be notified once they accept it.
                  </div>
                )}

              </div>
            </div>
          </div>
        ))
      ) : (
        /* EMPTY STATE: No subscriptions found */
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Subscriptions Yet</h2>
          <p className="text-gray-500 mb-6">You haven't requested any tiffin services. Start exploring to get delicious meals delivered!</p>
          <button onClick={() => navigate('/dashboard/browse')} className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition-colors">
            Browse Tiffins
          </button>
        </div>
      )}

      {/* Benefits Section */}
      <div className="bg-[#FFF7ED] border border-orange-100 rounded-xl p-8 mt-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Subscription Benefits</h3>
        <ul className="space-y-3 text-gray-600 text-sm">
          <BenefitItem text="Save up to 20% with monthly subscriptions" />
          <BenefitItem text="Pause your subscription anytime during holidays" />
          <BenefitItem text="Get priority delivery and customer support" />
          <BenefitItem text="Flexible meal customization options" />
        </ul>
      </div>
    </>
  );
};

const BenefitItem = ({ text }) => (
  <li className="flex items-start gap-3">
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
    <span>{text}</span>
  </li>
);

export default SubscriptionsPage;