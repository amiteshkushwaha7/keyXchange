import crypto from 'crypto';
import User from '../models/User.js';
import getTokens from '../config/jwt.js';
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import sendEmail from '../utils/sendMail.js';

import ms from 'ms';
import dotenv from 'dotenv';
dotenv.config();

const authController = {

    register: catchAsync(async (req, res) => {
        const { name, mobile, email, password, role } = req.body;

        const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
        if (userExists) {
            throw new ApiError(400, 'User already exists with this email or mobile');
        }

        console.log(name, mobile, email, password, role);

        const newUser = await User.create({
            name,
            mobile,
            email,
            password,
            role,
        });


        const createdUser = await User.findById(newUser._id).select('-password');
        if (!createdUser) {
            throw new ApiError(500, 'Internal Server Error: User creation failed!');
        }

        const accessToken = await getTokens.generateAccessToken(newUser);
        const refreshToken = await getTokens.generateRefreshToken(newUser);

        newUser.refreshToken = refreshToken;
        await newUser.save({ validateBeforeSave: false });

        const welcomeMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: newUser.email,
            subject: 'Welcome to KeyXchange!',
            text: `Hello ${newUser.name},\n\nWelcome to KeyXchange! We're excited to have you on board.\n\nBest,\nThe KeyXchange Team`
        }

        await sendEmail(welcomeMailOptions);

        return new ApiResponse({
            statusCode: 201,
            message: 'User created successfully',
            data: {
                accessToken: accessToken,
                user: createdUser,
            }
        }).send(
            res
                .cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    path: "/",
                    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY)
                })
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    path: '/api/v1/auth/refresh',
                    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY)
                })
        );
    }),

    login: catchAsync(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            throw new ApiError(401, 'User does not exist');

        if (!(await user.matchPassword(password))) {
            throw new ApiError(401, 'Incorrect email or password');
        }

        const accessToken = await getTokens.generateAccessToken(user);
        const refreshToken = await getTokens.generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        return new ApiResponse({
            statusCode: 200,
            message: "User logged In Successfully",
            data: {
                accessToken: accessToken,
                user: loggedInUser,
            }
        }).send(
            res
                .cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    path: "/",
                    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY)
                })
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    path: '/api/v1/auth/refresh',
                    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY)
                })
        );
    }),

    logout: catchAsync(async (req, res) => {
        console.log(req.user)
        await User.findByIdAndUpdate(
            req.user._id,
            { $unset: { refreshToken: 1 } },
            { new: true }
        )

        return new ApiResponse({
            statusCode: 200,
            message: "User logged Out"
        }).send(
            res
                .clearCookie("accessToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    path: "/"
                })
                .clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    path: '/api/v1/auth/refresh'
                })
        );
    }),

    getMe: catchAsync(async (req, res) => {
        const user = await User.findById(req.user._id).select("-password -refreshToken");
        return new ApiResponse({
            statusCode: 200,
            message: "User retrieved successfully",
            data: {
                // accessToken: req.headers.authorization?.split(' ')[1] || null,
                accessToken: req.cookies.accessToken || req.headers.authorization?.split(' ')[1],
                user
            }
        }).send(res);
    }),

    refreshToken: catchAsync(async (req, res) => {
        const refreshToken = req.cookies.refreshToken;

        // if (!refreshToken) {
        //     throw new ApiError(401, 'No refresh token provided');
        // }

        if (!refreshToken) {
            // Clear any invalid cookies
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                path: '/api/v1/auth/refresh'
            });
            throw new ApiError(401, 'No refresh token provided');
        }

        // Verify refresh token
        const decoded = await getTokens.verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded._id);

        // console.log('Decoded refresh token:', decoded);
        // console.log('User from refresh token:', user);
        // console.log('User refresh token:', user.refreshToken);
        // console.log('Provided refresh token:', refreshToken);

        // Check if token matches stored token
        // if (user.refreshToken !== refreshToken) {
        //     throw new ApiError(403, 'Invalid refresh token');
        // }

        if (!user || user.refreshToken !== refreshToken) {
            // Clear invalid refresh token from DB and cookies
            await User.findByIdAndUpdate(decoded._id, { $unset: { refreshToken: 1 } });
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                path: '/api/v1/auth/refresh'
            });
            throw new ApiError(403, 'Invalid refresh token');
        }

        // Generate new tokens
        const newAccessToken = await getTokens.generateAccessToken(user);
        // const newRefreshToken = await getTokens.generateRefreshToken(user);

        // Update refresh token in DB
        // user.refreshToken = newRefreshToken;
        // await user.save({ validateBeforeSave: false });

        // Set new refresh token in cookie
        // res.cookie("refreshToken", newRefreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'Strict',
        //     path: "/api/v1/auth/refresh",
        //     maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY)
        // });

        return new ApiResponse({
            statusCode: 200,
            message: "Token refreshed successfully",
            data: {
                accessToken: newAccessToken,
                user: {
                    _id: user._id,
                    name: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role
                }
            }
        }).send(
            res
                .cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    path: "/",
                    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY)
                })
        );
    }),

    updatePassword: catchAsync(async (req, res) => {
        // console.log(req.body);
        const user = await User.findById(req.user._id).select('+password');

        if (!(await user.matchPassword(req.body.currentPassword))) {
            throw new ApiError(401, 'Current password is incorrect');
        }

        user.password = req.body.newPassword;
        await user.save({ validateBeforeSave: false });

        return new ApiResponse({
            statusCode: 200,
            message: "Password updated successfully",
            data: {
                user: await User.findById(user._id).select("-password -refreshToken")
            }
        }).send(res);
    }),

    updateProfile: catchAsync(async (req, res) => {
        const user = await User.findById(req.user._id);

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        user.name = req.body.name || user.name;
        await user.save({ validateBeforeSave: false });

        return new ApiResponse({
            statusCode: 200,
            message: "Profile updated successfully",
            data: {
                user: await User.findById(user._id).select("-password -refreshToken")
            }
        }).send(res);
    }),

    deleteAccount: catchAsync(async (req, res) => {
        const user = await User.findById(req.user._id);
        await user.remove();

        return new ApiResponse({
            statusCode: 200,
            message: "Account deleted successfully"
        }).send(res);
    }),

    forgotPassword: catchAsync(async (req, res) => {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return new ApiResponse({
                statusCode: 200,
                message: "User does not exist with this email"
            }).send(res);
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = Date.now() + ms('10m'); 
        await user.save({ validateBeforeSave: false }); 

        const resetURL = `${process.env.VERCEL_FRONTEND_URL}/reset-password/${resetToken}`;

        const resetMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset Request - KeyXchange',
            html: `
            <h2>Password Reset Request</h2>
            <p>Hello ${user.name},</p>
            <p>You requested to reset your password. Click the link below to proceed:</p>
            <a href="${resetURL}" style="display: inline-block; padding: 10px 20px; background-color: #7C3AED; color: white; text-decoration: none; border-radius: 5px;">
                Reset Password
            </a>
            <p>This link will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <br>
            <p>Best regards,<br>The KeyXchange Team</p>
        `
        };

        try {
            await sendEmail(resetMailOptions);

            return new ApiResponse({
                statusCode: 200,
                message: `A password reset link has been sent to ${user.email}`
            }).send(res);
        } catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });

            throw new ApiError(500, 'Error sending email. Please try again.');
        }
    }),

    resetPassword: catchAsync(async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find user with valid token
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            throw new ApiError(400, 'Invalid or expired reset token');
        }

        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        const confirmationMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset Successful - KeyXchange',
            text: `Hello ${user.name},\n\nYour password has been successfully reset.\n\nIf you didn't make this change, please contact us immediately.\n\nBest regards,\nThe KeyXchange Team`
        };

        await sendEmail(confirmationMailOptions);

        return new ApiResponse({
            statusCode: 200,
            message: "Password reset successfully"
        }).send(res);
    }),
};

export default authController;