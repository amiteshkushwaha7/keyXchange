import express from 'express';
import adminController from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// const upload = require('../utils/upload');

const router = express.Router();

// Admin middleware
router.use(authMiddleware.protect);
router.use(authMiddleware.authorize('admin'));

// Dashboard 
router.route('/dashboard')
  .get(adminController.getDashboardStats);

// Products
router.route('/products')
  .get(adminController.getAllProducts)
  .post(upload.single('image'), createProduct);

router.route('/products/:id')
  .get(adminController.getProduct)
  .put(upload.single('image'), adminController.updateProduct)
  .delete(adminController.deleteProduct);

// Orders 
router.route('/orders')
  .get(adminController.getAllOrders);

router.route('/orders/:id/status')
  .patch(adminController.updateOrderStatus);

// Customers
router.route('/customers')
  .get(adminController.getAllCustomers);

module.exports = router;