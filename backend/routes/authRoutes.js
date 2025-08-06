import express from 'express';
import validate from '../middlewares/validate.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router.route('/register')
    .post(validate.registerInput, authController.register);

router.route('/login')
    .post(validate.loginInput, authController.login);

router.route('/logout')
    .post(authController.protect, authController.logout);

router.route('/update-password')
    .patch(authMiddleware.protect, validate.updatePasswordInput, authController.updatePassword);

// router.post('/forgot-password', authController.forgotPassword);
// router.patch('/reset-password/:token', authController.resetPassword);

router.route('/me')
    .get(authMiddleware.protect, authController.getMe);

router.route('/refresh')
    .get(authController.refreshToken);

export default router;