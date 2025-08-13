import Product from '../models/Product.js';
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import cloudinary from '../config/cloudinary.js';

const productController = {

    createProduct: catchAsync(async (req, res) => {
        const {
            title,
            subtitle,
            details,
            howToRedeem,
            termsAndConditions,
            code,
            category,
            company,
            price,
            expiryDate,
            isOneTimeUse,
            usageLimit,
            isSold,
            isActive,
            productLink
        } = req.body;

        // Process images from uploaded files
        const images = req.files?.map(file => ({
            url: file.path,
            public_id: file.filename
        })) || [];

        // Create product with matching fields from schema
        const product = await Product.create({
            title,
            subtitle,
            details,
            howToRedeem,
            termsAndConditions,
            code,
            category,
            company,
            price,
            expiryDate,
            isOneTimeUse,
            usageLimit,
            isSold,
            isActive,
            images,
            productLink,
            uploadedBy: req.user._id
        });

        new ApiResponse({
            statusCode: 201,
            message: 'Product created successfully',
            data: product
        }).send(res);
    }), 

    getAllProducts: catchAsync(async (req, res) => {

        const products = await Product.find().sort({ createdAt: -1 });

        if (!products || products.length === 0) {
            throw new ApiError(404, 'No products found');
        }

        new ApiResponse({
            statusCode: 200,
            data: products
        }).send(res);
    }),

    // READ Single Product by ID
    getProductById: catchAsync(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        new ApiResponse({
            statusCode: 200,
            data: product
        }).send(res);
    }),

    // SEARCH Products
    searchProducts: catchAsync(async (req, res) => {
        const { keyword } = req.query;

        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { code: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },
                { company: { $regex: keyword, $options: 'i' } },
            ],
        };

        const products = await Product.find(query).sort({ createdAt: -1 });

        new ApiResponse({
            statusCode: 200,
            data: products,
        }).send(res);
    }),


    // UPDATE Product
    // updateProduct: catchAsync(async (req, res) => {
    //     const product = await Product.findById(req.params.id);
    //     if (!product) {
    //         throw new ApiError(404, 'Product not found');
    //     }

    //     // Debug: log the entire request to see what's coming in
    //     console.log('Full request:', {
    //         // params: req.params,
    //         body: req,
    //         // files: req.files
    //     });

    //     // Delete old files if new files uploaded
    //     if (req.files && req.files.length > 0) {
    //         for (const file of product.images) {
    //             try {
    //                 await cloudinary.uploader.destroy(file.public_id);
    //             } catch (err) {
    //                 console.warn('Cloudinary delete failed:', file.public_id, err.message);
    //             }
    //         }

    //         product.images = req.files.map(file => ({
    //             url: file.path,
    //             public_id: file.filename
    //         }));
    //     }

    //     // Handle the request body - ensure it exists
    //     const updateData = req.body || {};

    //     const fields = [
    //         'title', 'description', 'code', 'category',
    //         'company', 'price', 'expiryDate',
    //         'isOneTimeUse', 'usageLimit', 'isActive',
    //         'howToUse', 'termsAndConditions'
    //     ];

    //     fields.forEach(field => {
    //         if (Object.prototype.hasOwnProperty.call(updateData, field)) {
    //             // Only update if the field exists in updateData
    //             // Handle boolean fields specifically
    //             if (field === 'isActive' || field === 'isOneTimeUse') {
    //                 product[field] = updateData[field] === 'true' || updateData[field] === true;
    //             } else {
    //                 product[field] = updateData[field];
    //             }
    //         }
    //     }); 

    //     await product.save();

    //     new ApiResponse({
    //         statusCode: 200,
    //         message: 'Product updated successfully',
    //         data: product
    //     }).send(res);
    // }),

    updateProduct: catchAsync(async (req, res) => {
        // const product = await Product.findById(req.params.id);
        // console.log(product);

        // if (!product) {
        //     throw new ApiError(404, 'Product not found');
        // }

        // Delete associated files from Cloudinary
        // for (const file of product.images) {
        //     try {
        //         await cloudinary.uploader.destroy(file.public_id);
        //     } catch (err) {
        //         console.warn('Cloudinary delete failed:', file.public_id, err.message);
        //     }
        // }

        // await Product.findByIdAndDelete(req.params.id);

        // console.log(req);

        // const {
        //     title,
        //     subtitle,
        //     details,
        //     howToRedeem,
        //     termsAndConditions,
        //     code,
        //     category,
        //     company,
        //     price,
        //     expiryDate,
        //     isOneTimeUse,
        //     usageLimit,
        //     isSold,
        //     isActive
        // } = req.body;

        // Process images from uploaded files
        // const images = req.files?.map(file => ({
        //     url: file.path,
        //     public_id: file.filename
        // })) || [];

        // Create product with matching fields from schema
        // const newProduct = await Product.create({
        //     title,
        //     subtitle,
        //     details,
        //     howToRedeem,
        //     termsAndConditions,
        //     code,
        //     category,
        //     company,
        //     price,
        //     expiryDate,
        //     isOneTimeUse,
        //     usageLimit,
        //     isSold,
        //     isActive,
        //     images,
        //     uploadedBy: req.user._id
        // });

        new ApiResponse({
            statusCode: 200,
            message: 'Product updated successfully',
            // data: newProduct
        }).send(res);
    }),

    // DELETE Product
    deleteProduct: catchAsync(async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        // Delete associated files from Cloudinary
        for (const file of product.images) {
            try {
                await cloudinary.uploader.destroy(file.public_id);
            } catch (err) {
                console.warn('Cloudinary delete failed:', file.public_id, err.message);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        new ApiResponse({
            statusCode: 200,
            message: 'Product deleted successfully'
        }).send(res);
    }),

    // GET Similar Product
    getSimilarProducts: catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    // Debug: Log the product details
    console.log('Base product details:', {
        id: product._id,
        company: product.company,
        category: product.category,
        isActive: product.isActive,
        useLimit: product.useLimit,
        isSold: product.isSold
    });

    // Helper function to get fallback products
    const getFallbackProducts = async () => {
        return await Product.find({
            _id: { $ne: product._id },
            isActive: true,
            useLimit: { $gt: 0 },
            isSold: false
        })
        .sort({ createdAt: -1 })
        .limit(7);
    };

    // Get similar by company (with fallback)
    let similarByCompany = await Product.find({
        company: product.company,
        _id: { $ne: product._id },
        isActive: true,
        useLimit: { $gt: 0 },
        isSold: false
    })
    .sort({ createdAt: -1 })
    .limit(7);

    // If empty, try without useLimit filter
    if (similarByCompany.length === 0) {
        similarByCompany = await Product.find({
            company: product.company,
            _id: { $ne: product._id },
            isActive: true,
            isSold: false
        })
        .sort({ createdAt: -1 })
        .limit(7);
    }

    // If still empty, get fallback products
    if (similarByCompany.length === 0) {
        similarByCompany = await getFallbackProducts();
        console.log('Using fallback for company similar products');
    }

    // Get similar by category (with fallback)
    let similarByCategory = await Product.find({
        category: product.category,
        _id: { $ne: product._id },
        isActive: true,
        useLimit: { $gt: 0 },
        isSold: false
    })
    .sort({ createdAt: -1 })
    .limit(7);

    // If empty, try without useLimit filter
    if (similarByCategory.length === 0) {
        similarByCategory = await Product.find({
            category: product.category,
            _id: { $ne: product._id },
            isActive: true,
            isSold: false
        })
        .sort({ createdAt: -1 })
        .limit(7);
    }

    // If still empty, get fallback products
    if (similarByCategory.length === 0) {
        similarByCategory = await getFallbackProducts();
        console.log('Using fallback for category similar products');
    }

    // Debug: Log results
    console.log('Similar by company:', similarByCompany.length);
    console.log('Similar by category:', similarByCategory.length);

    new ApiResponse({
        statusCode: 200,
        message: 'Similar products fetched successfully',
        data: {
            ProductsByCompany: similarByCompany,
            ProductsByCategory: similarByCategory
        }
    }).send(res);
})
};

export default productController; 