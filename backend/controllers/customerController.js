import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';

const customerController = {

    getAllCustomers: catchAsync(async (req, res) => {
        // Get unique buyer IDs from Orders
        const customerIds = await Order.distinct('buyer');

        if (!customerIds || customerIds.length === 0) {
            throw new ApiError(404, 'No customers found');
        }

        // Fetch full user details, EXCLUDING password, for these buyer IDs
        const customers = await User.find({ _id: { $in: customerIds } }).select('-password -refreshToken');
        new ApiResponse({
            statusCode: 200,
            message: 'Customers fetched successfully',
            data: customers
        }).send(res);
    }),

    // getCustomerWithOrders: catchAsync(async (req, res) => {
    //     const customerId = req.params.id;

    //     // Fetch customer (excluding password)
    //     const customer = await User.findById(customerId).select('-password -refreshToken');

    //     if (!customer) {
    //         throw new ApiError(404, 'Customer not found');
    //     }

    //     // Fetch all orders for this customer
    //     const orders = await Order.find({ buyer: customerId });

    //     // Derive order count and total spent (optional but useful)
    //     const orderCount = orders.length;
    //     const totalSpent = orders.reduce((sum, order) => sum + (order.amountPaid || 0), 0);

    //     // Response structure
    //     new ApiResponse({
    //         statusCode: 200, 
    //         message: 'Customer and orders fetched successfully',
    //         data: {
    //             customer: {
    //                 ...customer.toObject(),
    //                 orderCount,
    //                 totalSpent
    //             },
    //             orders
    //         }
    //     }).send(res);
    // }),

    // getCustomerWithOrders: catchAsync(async (req, res) => {
    //     const customerId = req.params.id;

    //     const customer = await User.findById(customerId).select('-password -refreshToken');

    //     if (!customer) {
    //         throw new ApiError(404, 'Customer not found');
    //     }

    //     // Fetch all orders for this customer and populate the product details
    //     const orders = await Order.find({ buyer: customerId })
    //     .sort({ createdAt: -1 });

    //     // Extract all product IDs from orders
    //     const productIds = orders.map(order => order.product);
    //     console.log('Extracted product IDs:', productIds);

    //     // Fetch all products that this user has bought
    //     const boughtProducts = await Product.find({ _id: { $in: productIds } })

    //     console.log("Fetched customer:", customer); 
    //     console.log("Fetched orders:", orders);
    //     console.log("Fetched bought products:", boughtProducts);

    //     // Calculate order count and total spent
    //     const orderCount = orders.length;
    //     const totalSpent = orders.reduce((sum, order) => sum + (order.amountPaid || 0), 0);

    //     // Response structure
    //     new ApiResponse({
    //         statusCode: 200,
    //         message: 'Customer data fetched successfully',
    //         data: {
    //             customer: {
    //                 ...customer.toObject(),
    //                 orderCount,
    //                 totalSpent
    //             },
    //             orders,
    //             boughtProducts
    //         }
    //     }).send(res);
    // }),

    getCustomerWithOrders: catchAsync(async (req, res) => {
    const customerId = req.params.id;

    const customer = await User.findById(customerId).select('-password -refreshToken');

    if (!customer) {
        throw new ApiError(404, 'Customer not found');
    }

    // Fetch all orders for this customer and populate the product details
    const orders = await Order.find({ buyer: customerId })
        .sort({ createdAt: -1 }) 
        .lean(); // Convert to plain JavaScript objects

    // Extract all unique product IDs from orders
    const productIds = [...new Set(orders.map(order => order.product))];
    console.log('Extracted product IDs:', productIds);

    // Fetch all products that this user has bought
    const boughtProducts = await Product.find({ _id: { $in: productIds } }).lean();

    // Create a map of products for quick lookup
    const productMap = boughtProducts.reduce((map, product) => {
        map[product._id.toString()] = product;
        return map;
    }, {});

    // Augment each order with its corresponding product details
    const ordersWithProducts = orders.map(order => {
        return {
            ...order,
            productDetails: productMap[order.product.toString()] || null
        };
    });

    console.log("Fetched customer:", customer); 
    console.log("Augmented orders:", ordersWithProducts);

    // Calculate order count and total spent
    const orderCount = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + (order.amountPaid || 0), 0);

    // Response structure
    new ApiResponse({
        statusCode: 200,
        message: 'Customer data fetched successfully',
        data: {
            customer: {
                ...customer.toObject(),
                orderCount,
                totalSpent
            },
            orders: ordersWithProducts,
        }
    }).send(res);
}),
}

export default customerController;