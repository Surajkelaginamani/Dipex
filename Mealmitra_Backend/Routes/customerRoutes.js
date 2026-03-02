const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/customer/dashboard
// This route is protected! Only logged-in users with a token can access it.
router.get('/dashboard', authMiddleware, customerController.getDashboardData);
// GET /api/customer/vendors
router.get('/vendors', authMiddleware, customerController.getAllVendors);
// GET /api/customer/vendors/:id
// The ":id" makes this a dynamic URL parameter
router.get('/vendors/:id', authMiddleware, customerController.getVendorById);
// POST /api/customer/subscribe
router.post('/subscribe', authMiddleware, customerController.createSubscriptionRequest);
// GET /api/customer/subscriptions
router.get('/subscriptions', authMiddleware, customerController.getMySubscriptions);
module.exports = router;