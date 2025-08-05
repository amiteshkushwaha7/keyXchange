import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import customerController from '../controllers/customerController.js' 

const router = express.Router();

router.use(authMiddleware.protect);
router.use(authMiddleware.authorize('admin'));

router.route('/')
  .get(customerController.getAllCustomers);

router.route('/:id')
  .get(customerController.getCustomerWithOrders);

export default router;