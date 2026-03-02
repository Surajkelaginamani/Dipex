const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  // Links the specific customer to the specific vendor
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'VendorProfile', required: true },
  
  // Plan Details (Matching your UI text like "Full Meal (Veg) - Monthly")
  planType: { type: String, enum: ['monthly_full', 'monthly_half', 'single_trial'], required: true },
  mealType: { type: String, enum: ['veg', 'nonveg', 'mix'], required: true },
  
  // Billing and Dates
  price: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  
  // Status controls that "Active" badge on your UI
  // Change this line to include 'pending' and set it as the default!
  status: { 
    type: String, 
    enum: ['pending', 'active', 'paused', 'cancelled', 'expired'], 
    default: 'pending' 
  },
  // THE "SKIP TODAY" FEATURE LOGIC: 
  // We store an array of dates the user skipped, so the vendor knows not to deliver, 
  // and we can calculate refunds/credits at the end of the month!
  skippedDates: [{ type: Date }] 

}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);