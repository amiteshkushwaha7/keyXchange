// orderController.js
import crypto from 'crypto';
import Order from '../models/Order.js';
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import razorpay from '../config/razorpay.js';

const orderController = {
    getAllOrders: catchAsync(async (req, res) => {
        const orders = await Order.find();
        if (!orders || orders.length === 0) {
            throw new ApiError(404, 'No orders found');
        }

        new ApiResponse({
            statusCode: 200,
            data: orders
        }).send(res);
    }),

    getMyOrders: catchAsync(async (req, res) => {
        const orders = await Order.find({ buyer: req.user._id });
        if (!orders || orders.length === 0) {
            throw new ApiError(404, 'No orders found');
        }

        new ApiResponse({
            statusCode: 200,
            data: orders
        }).send(res);
    }),

    createOrder: catchAsync(async (req, res) => {
        const { productId, quantity, amount } = req.body;

        if (!productId || !amount) {
            throw new ApiError(400, 'Product ID and amount are required');
        }

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `order_${Date.now()}`,
        });

        // Create order in database
        const order = await Order.create({
            buyer: req.user._id,
            product: productId,
            quantity: quantity || 1,
            amountPaid: amount,
            razorpayOrderId: razorpayOrder.id,
            paymentStatus: 'pending', 
            paymentMethod: 'Razorpay'  
        });

        new ApiResponse({
            statusCode: 201,
            message: 'Order created successfully',
            data: {
                order,
                razorpayOrder 
            }
        }).send(res);
    }),

    verifyPayment: catchAsync(async (req, res) => {
        const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

        console.log(req.body);
        
        if (!razorpayPaymentId || !razorpaySignature || !razorpayOrderId) {
            throw new ApiError(400, 'Payment verification details are required');
        }

        // Verify payment with Razorpay
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest('hex');

        if (generatedSignature !== razorpaySignature) {
            throw new ApiError(400, 'Payment verification failed');
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                razorpayPaymentId,
                razorpayOrderId,
                razorpaySignature,
                paymentStatus: 'paid'
            },
            { new: true }
        );

        if (!order) {
            throw new ApiError(404, 'Order not found');
        }

        new ApiResponse({
            statusCode: 200,
            message: 'Payment verified successfully',
            data: order
        }).send(res);
    }),

    deleteOrder: catchAsync(async (req, res) => {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            throw new ApiError(404, 'Order not found');
        }

        cosole.log(`Order with ID ${id} deleted successfully`);

        new ApiResponse({
            statusCode: 200,
            message: 'Order deleted successfully',
            data: order
        }).send(res);
    })
};

export default orderController;