import express from 'express';
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from '../controllers/paymentController.js';

const router = express.Router();

// Create payment order
router.post('/create-order', createRazorpayOrder);

// Verify payment
router.post('/verify', verifyRazorpayPayment);

export default router;