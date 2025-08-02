import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/')
  .get(authMiddleware.authorize('admin'), orderController.getAllOrders);

router.route('/:id')
  .delete(authMiddleware.authorize('admin'), orderController.deleteOrder);

router.route('/my-orders')
  .get(orderController.getMyOrders);

router.route('/create')
  .post(orderController.createOrder);

router.route('/verify-payment')
  .post(orderController.verifyPayment);

// router.route('/:id')
//   .get(authMiddleware.protect, orderController.getOrderById)
//   .put(authMiddleware.protect, authMiddleware.authorize('admin'), orderController.updateOrder)
//   .delete(authMiddleware.protect, authMiddleware.authorize('admin'), orderController.deleteOrder)
//   .patch(authMiddleware.protect, authMiddleware.authorize('admin'), orderController.updateOrderStatus);

export default router;