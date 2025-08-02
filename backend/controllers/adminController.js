import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import sendEmail from '../utils/sendMail.js'; 

const adminController = {

  getDashboardStats: catchAsync(async (req, res, next) => {
    // Get counts
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const userCount = await User.countDocuments({ role: 'user' });

    // Get recent orders
    const recentOrders = await Order.find()
      .sort('-createdAt')
      .limit(5)
      .populate('user', 'name email')
      .populate('product', 'name price');

    // Calculate revenue (simplified)
    const orders = await Order.find({ status: 'paid' });
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

    // Get sales data for chart (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          status: 'paid'
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalSales: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProducts: productCount,
        totalOrders: orderCount,
        totalCustomers: userCount,
        totalRevenue,
        recentOrders,
        salesData
      }
    });
  }),

  // Product
  getAllProducts: catchAsync(async (req, res, next) => {
    const products = await Product.find().sort('-createdAt');

    res.status(200).json({ 
      success: true,
      count: products.length,
      data: products
    });
  }),

  // Order
  getAllOrders: catchAsync(async (req, res, next) => {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('product', 'name price')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  }),

  updateOrderStatus: catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(
        new ApiError(`Order not found with id of ${req.params.id}`, 404)
      );
    }

    order.status = req.body.status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  }),

  // Users

  // Customer
  getAllCustomers: catchAsync(async (req, res, next) => {
    const customers = await User.find({ role: 'user' })
      .select('-password')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers
    });
  }),
}

export default adminController;