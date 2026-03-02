import React, { useState } from 'react';
import { 
  CheckCircle, Clock, Download, CreditCard, Plus, Info, Wallet 
} from 'lucide-react';

const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments & Billing</h1>
        <p className="text-gray-500 mt-1">Manage your payment history and billing</p>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Paid */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm mb-2">Total Paid</p>
          <h3 className="text-3xl font-bold text-green-600">₹3120</h3>
          <p className="text-gray-400 text-xs mt-1">2 transactions</p>
        </div>

        {/* Pending */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm mb-2">Pending</p>
          <h3 className="text-3xl font-bold text-orange-600">₹100</h3>
          <p className="text-gray-400 text-xs mt-1">1 pending</p>
        </div>

        {/* This Month */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm mb-2">This Month</p>
          <h3 className="text-3xl font-bold text-orange-600">₹3220</h3>
          <p className="text-gray-400 text-xs mt-1">Current month</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 p-1 rounded-lg inline-flex mb-8">
        {['all', 'paid', 'pending'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2 rounded-md text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab} {tab === 'all' ? '(3)' : tab === 'paid' ? '(2)' : '(1)'}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-6 mb-10">
        
        {/* Card 1: Paid Subscription */}
        {(activeTab === 'all' || activeTab === 'paid') && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Maharaja Tiffin Service</h3>
                <p className="text-gray-500 text-sm">Subscription • #S1</p>
              </div>
              <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                <CheckCircle size={12} /> Paid
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="w-full md:w-auto">
                <p className="text-gray-400 text-xs mb-1">Payment Date</p>
                <p className="font-semibold text-gray-900 text-sm">1 Jan 2026</p>
              </div>
              <div className="w-full md:w-auto">
                <p className="text-gray-400 text-xs mb-1">Payment Method</p>
                <div className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                  <CreditCard size={16} className="text-gray-400" /> Upi
                </div>
              </div>
              <div className="w-full md:w-auto text-left md:text-right">
                <p className="text-gray-400 text-xs mb-1">Amount</p>
                <p className="text-2xl font-bold text-orange-600 mb-2">₹3000</p>
                <button className="flex items-center justify-center gap-2 w-full md:w-auto border border-gray-200 px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">
                  <Download size={14} /> Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: Pending Order */}
        {(activeTab === 'all' || activeTab === 'pending') && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">South Indian Express</h3>
                <p className="text-gray-500 text-sm">Order • #O2</p>
              </div>
              <span className="flex items-center gap-1 bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                <Clock size={12} /> Pending
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="w-full md:w-auto">
                <p className="text-gray-400 text-xs mb-1">Payment Date</p>
                <p className="font-semibold text-gray-900 text-sm">4 Jan 2026</p>
              </div>
              <div className="w-full md:w-auto">
                <p className="text-gray-400 text-xs mb-1">Payment Method</p>
                <div className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                  <CreditCard size={16} className="text-gray-400" /> Card
                </div>
              </div>
              <div className="w-full md:w-auto text-left md:text-right">
                <p className="text-gray-400 text-xs mb-1">Amount</p>
                <p className="text-2xl font-bold text-orange-600 mb-2">₹100</p>
                <button className="bg-[#EA580C] text-white px-6 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors shadow-sm w-full md:w-auto">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card 3: Paid Order */}
        {(activeTab === 'all' || activeTab === 'paid') && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">Maharaja Tiffin Service</h3>
                <p className="text-gray-500 text-sm">Order • #O1</p>
              </div>
              <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                <CheckCircle size={12} /> Paid
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="w-full md:w-auto">
                <p className="text-gray-400 text-xs mb-1">Payment Date</p>
                <p className="font-semibold text-gray-900 text-sm">3 Jan 2026</p>
              </div>
              <div className="w-full md:w-auto">
                <p className="text-gray-400 text-xs mb-1">Payment Method</p>
                <div className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
                  <Wallet size={16} className="text-gray-400" /> Cash
                </div>
              </div>
              <div className="w-full md:w-auto text-left md:text-right">
                <p className="text-gray-400 text-xs mb-1">Amount</p>
                <p className="text-2xl font-bold text-orange-600 mb-2">₹120</p>
                <button className="flex items-center justify-center gap-2 w-full md:w-auto border border-gray-200 px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors">
                  <Download size={14} /> Receipt
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Saved Payment Methods */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Saved Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Saved Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">UPI</p>
                <p className="text-gray-500 text-xs">user@paytm</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
              Default
            </span>
          </div>

          {/* Add New Button */}
          <button className="bg-white border border-dashed border-gray-300 rounded-xl p-6 flex items-center justify-center gap-2 text-gray-600 font-semibold hover:border-orange-400 hover:text-orange-600 transition-colors">
            <Plus size={20} />
            Add Payment Method
          </button>

        </div>
      </div>

      {/* Payment Information Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">Payment Information</h3>
        <ul className="space-y-2 text-gray-600 text-sm list-disc list-inside">
          <li>All transactions are secure and encrypted</li>
          <li>Automatic billing for subscriptions on the 1st of each month</li>
          <li>Download receipts for tax purposes anytime</li>
          <li>Refunds are processed within 5-7 business days</li>
        </ul>
      </div>
    </>
  );
};

export default PaymentsPage;