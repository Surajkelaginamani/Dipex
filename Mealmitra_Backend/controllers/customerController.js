const User = require('../models/User');
const Subscription = require('../models/Subscription');
const DailyMenu = require('../models/DailyMenu');
const Announcement = require('../models/Announcement');

exports.getCustomerDashboard = async (req, res) => {
  try {
    const customerId = req.user.id; 

    // 1. Fetch the customer's active subscription (You probably already have this logic)
    const activeSubscription = await Subscription.findOne({ 
        customerId: customerId, 
        status: 'active' 
    }).populate('vendorId');

    let vendorAnnouncements = [];

    // 2. If they are subscribed to someone, fetch that vendor's announcements
    if (activeSubscription) {
      vendorAnnouncements = await Announcement.find({ 
          vendorId: activeSubscription.vendorId._id 
      })
      .sort({ createdAt: -1 })
      .limit(3); // Only grab the latest 3 so the ticker doesn't get ridiculously long
    }

    // 3. Send everything back to the frontend
    res.status(200).json({
      user: req.user,
      subscription: activeSubscription,
      announcements: vendorAnnouncements, // <-- Add this to your existing response!
      // ... stats, todaysMenu, etc.
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Dashboard fetch failed" });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const customerId = req.user.userId;

    // 1. Get the customer's basic details
    const customer = await User.findById(customerId).select('name email location');

    // 2. Look for an active subscription for this customer
    // We use .populate('vendor') to fetch the vendor's business details at the same time!
    const activeSubscription = await Subscription.findOne({ 
      customer: customerId, 
      status: 'active' 
    }).populate('vendor');

    let todaysMenu = null;
    let announcements = [];

    // 3. If they have a subscription, check what that vendor is cooking today
    if (activeSubscription) {
      // Get today's date (starting at midnight) to search the DB
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      todaysMenu = await DailyMenu.findOne({
        vendor: activeSubscription.vendor._id,
        date: { $gte: today }
      });

      announcements = await Announcement.find({
        vendorId: activeSubscription.vendor._id
      })
      .sort({ createdAt: -1 })
      .limit(5);
    }

    // 4. Send it all back to React in one neat package
    res.status(200).json({
      user: customer,
      subscription: activeSubscription || null,
      todaysMenu: todaysMenu || null,
      announcements,
      stats: {
        totalOrders: 0, // We will calculate these later when we build the Orders model
        monthlySpend: 0
      }
    });

  } catch (error) {
    console.error("Dashboard Data Error:", error);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
};

const VendorProfile = require('../models/VendorProfile'); // Make sure this is imported at the top!

exports.getAllVendors = async (req, res) => {
  try {
    // Find all vendor profiles in the database
    const vendors = await VendorProfile.find();
    
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ message: 'Server error fetching vendors' });
  }
};

// Get a single vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    // req.params.id grabs the ID directly from the URL!
    const vendor = await VendorProfile.findById(req.params.id);
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error fetching vendor details:", error);
    res.status(500).json({ message: 'Server error fetching vendor details' });
  }
};

// Create a new Subscription Request
exports.createSubscriptionRequest = async (req, res) => {
  try {
    const { vendorId, planType, price, specialRequests } = req.body;
    const customerId = req.user.userId; // From the JWT token

    // 1. Check if they already have a pending or active request with this vendor
    const existingSub = await Subscription.findOne({
      customer: customerId,
      vendor: vendorId,
      status: { $in: ['pending', 'active'] }
    });

    if (existingSub) {
      return res.status(400).json({ message: "You already have a request or active subscription with this vendor." });
    }

    // 2. Create the new pending subscription
    // Since we don't know the exact end date until the vendor accepts, we will just set a placeholder or leave it blank for now. We can set it to 30 days from today as a baseline.
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const newSubscription = new Subscription({
      customer: customerId,
      vendor: vendorId,
      planType: planType,
      mealType: 'mix', // You can make this dynamic later based on what they select
      price: price,
      endDate: endDate,
      status: 'pending',
      // You can add specialRequests to your DB schema later if you want to save them!
    });

    await newSubscription.save();

    res.status(201).json({ message: "Request sent successfully! Waiting for vendor approval.", subscription: newSubscription });

  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ message: "Server error while sending request." });
  }
};
// Get all subscriptions for the logged-in customer
exports.getMySubscriptions = async (req, res) => {
  try {
    const customerId = req.user.userId;

    // Find all subscriptions for this user and populate the vendor's business name
    const subscriptions = await Subscription.find({ customer: customerId })
      .populate('vendor', 'businessName') 
      .sort({ createdAt: -1 }); // Shows the newest requests at the top!

    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: 'Server error fetching subscriptions' });
  }
};
