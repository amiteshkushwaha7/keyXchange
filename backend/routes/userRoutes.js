import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import userController from '../controllers/userController.js';  

const router = express.Router();

//User routes
router.use(authMiddleware.protect);

// router.route('/me')
//   .get(userController.getMe)
//   .put(userController.updateProfile)
//   .delete(userController.deleteAccount);

// router.route('/me/orders') 
//   .get(userController.getMyOrders);

// router.route('/me/payment-methods')
//   .post(userController.addPaymentMethod);

// router.route('/me/payment-methods/:id')
//   .delete(userController.removePaymentMethod);

// Admin routes
router.use(authMiddleware.authorize('admin'));

router.route('/')
  .get(userController.getAllUsers);

router.route('/:id')
  .get(userController.getUserById);

export default router;