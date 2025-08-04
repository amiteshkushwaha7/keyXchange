// orderController.js
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';

import crypto from 'crypto';
import razorpay from '../config/razorpay.js';
import sendEmail from '../utils/sendMail.js';

import dotenv from 'dotenv';
dotenv.config();

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
    }),

    updateOrderStatus: catchAsync(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        console.log('order id', id);
        console.log('order status', status);

        // Find the order and populate the products and user
        const order = await Order.findById(id);

        if (!order) {
            throw new ApiError(404, 'Order not found');
        }

        const product = await Product.findById(order.product);

        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        const buyer = await User.findById(order.buyer);

        if (!buyer) {
            throw new ApiError(404, 'Buyer/User not found');
        }

        console.log('order', order);
        console.log('product', product);
        console.log('buyer', buyer);

        // If status is completed, send the products to the user
        let emailText = `Dear ${buyer.name},\n\n`;
        if (status === 'completed') {
            // Format the email content with all product details
            emailText += 'Your order has been successfully completed. Below are your product details:\n\n';
            emailText += `Order ID: ${order._id}\n`;
            emailText += `Order Date: ${order.createdAt.toDateString()}\n\n`;
            emailText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
            emailText += `Title: ${product.title}\n`;
            emailText += `Description: ${product.description}\n`;
            emailText += `Product Code: ${product.code}\n`;
            emailText += `Category: ${product.category}\n`;
            emailText += `Company: ${product.company}\n`;
            emailText += `Price: ₹${product.price}\n`;
            emailText += `Expiry Date: ${new Date(product.expiryDate).toDateString()}\n`;

            if (product.images && product.images.length > 0) {
                emailText += `\nProduct Images:\n`;
                product.images.forEach((image, imgIndex) => {
                    emailText += `Image ${imgIndex + 1}: ${image.url}\n`;
                });
            }

            if (product.howToUse) {
                emailText += `\nHow to Use:\n${product.howToUse}\n`;
            }

            if (product.termsAndConditions) {
                emailText += `\nTerms & Conditions:\n${product.termsAndConditions}\n`;
            }

            emailText += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
        }

        console.log(emailText);

        // Send the email
        await sendEmail({
            from: process.env.SENDER_EMAIL,
            to: buyer.email,
            subject: 'Your Order is Completed - Product Details',
            text: emailText
        });

        order.isDelivered = true;
        await order.save({ validateBeforeSave: false });

        product.isSold = true;
        product.usageLimit = product.usageLimit - 1;
        product.save({ validateBeforeSave: false });

        return new ApiResponse({
            statusCode: 200,
            message: 'Order completed successfully',
            data: {
                order: order,
                product: product,
                buyer: buyer
            }
        }).send(res);
    }),
};

export default orderController;