import express from 'express';
import validate from '../middlewares/validate.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authController from '../controllers/authController.js';
 
const router = express.Router();

router.post('/register', validate.registerInput, authController.register); // router.route('/register').post(validate.registerInput, authController.register);
router.post('/login', validate.loginInput, authController.login); // router.route('/login').post(validate.loginInput, authController.login);
router.post('/logout', authMiddleware.protect, authController.logout); // router.route('/logout').post(authController.logout);
// router.patch('/update-password', authMiddleware.protect, validate.updatePasswordInput, authController.updatePassword); // router.route('/update-password').patch(authMiddleware.protect, validate.updatePasswordInput, authController.updatePassword);
// router.post('/forgot-password', authController.forgotPassword);
// router.patch('/reset-password/:token', authController.resetPassword);
router.get('/me', authMiddleware.protect, authController.getMe); // router.route('/me').get(authMiddleware.protect, authController.getMe);
router.get('/refresh', authController.refreshToken); // router.route('/refresh').get(authController.refreshToken);



// Protect all routes after this middleware
// router.use(authController.protect);

// router.patch('/update-my-password', authController.updatePassword);

export default router;