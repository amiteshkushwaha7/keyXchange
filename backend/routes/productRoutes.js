import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';
import productController from '../controllers/productController.js';

const router = express.Router();

router.route('/')
    .get(productController.getAllProducts);

router.route('/new') 
    .post(authMiddleware.protect, 
        authMiddleware.authorize('admin'),
        upload.array('images', 5),
        productController.createProduct
    ); 

router.route('/:id')
    .get(productController.getProductById)
    .delete(authMiddleware.protect, 
            authMiddleware.authorize('admin'), 
            productController.deleteProduct
    )
    .post(authMiddleware.protect, 
        authMiddleware.authorize('admin'), 
        upload.array('images', 5),
        productController.updateProduct
    );

router.route('/:id/similar').get(productController.getSimilarProducts);

router.route('/search').get(productController.searchProducts);

export default router;
