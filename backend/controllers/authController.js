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

    // Add this refresh token endpoint (uncomment and modify your existing one)
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

    // isLoggedIn: async (req, res, next) => {
    //     if (req.cookies.jwt) {
    //         try {
    //             const decoded = await promisify(jwt.verify)(
    //                 req.cookies.jwt,
    //                 process.env.JWT_SECRET
    //             );

    //             const currentUser = await User.findById(decoded.id);
    //             if (!currentUser || currentUser.changedPasswordAfter(decoded.iat)) {
    //                 return next();
    //             }

    //             res.locals.user = currentUser;
    //             return next();
    //         } catch (err) {
    //             return next();
    //         }
    //     }
    //     next();
    // },

    // restrictTo: (...roles) => {
    //     return (req, res, next) => {
    //         if (!roles.includes(req.user.role)) {
    //             return next(
    //                 new ApiError('You do not have permission to perform this action', 403)
    //             );
    //         }

    //         next();
    //     };
    // },

    // forgotPassword: catchAsync(async (req, res) => {
    //     const user = await User.findOne({ email: req.body.email });
    //     if (!user) {
    //         return next(new ApiError('There is no user with this email address.', 404));
    //     }

    //     const resetToken = user.createPasswordResetToken();
    //     await user.save({ validateBeforeSave: false });

    //     const resetURL = `${req.protocol}://${req.get(
    //         'host'
    //     )}/api/v1/users/resetPassword/${resetToken}`;

    //     const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    //     try {
    //         await sendEmail({
    //             email: user.email,
    //             subject: 'Your password reset token (valid for 10 min)',
    //             message,
    //         });

    //         res.status(200).json({
    //             status: 'success',
    //             message: 'Token sent to email!',
    //         });
    //     } catch (err) {
    //         user.passwordResetToken = undefined;
    //         user.passwordResetExpires = undefined;
    //         await user.save({ validateBeforeSave: false });

    //         return next(
    //             new ApiError('There was an error sending the email. Try again later!', 500)
    //         );
    //     }
    // }),

    // resetPassword: catchAsync(async (req, res, next) => {
    //     const hashedToken = crypto
    //         .createHash('sha256')
    //         .update(req.params.token)
    //         .digest('hex');

    //     const user = await User.findOne({
    //         passwordResetToken: hashedToken,
    //         passwordResetExpires: { $gt: Date.now() },
    //     });

    //     if (!user) {
    //         return next(new ApiError('Token is invalid or has expired', 400));
    //     }

    //     user.password = req.body.password;
    //     user.passwordConfirm = req.body.passwordConfirm;
    //     user.passwordResetToken = undefined;
    //     user.passwordResetExpires = undefined;
    //     await user.save();

    //     createSendToken(user, 200, res);
    // }),

    updatePassword: catchAsync(async (req, res) => {
        const user = await User.findById(req.user._id).select('+password');

        if (!(await user.matchPassword(req.body.currentPassword))) {
            throw new ApiError(401, 'Current password is incorrect');
        }

        user.password = req.body.newPassword;
        user.passwordConfirm = req.body.newPasswordConfirm;
        await user.save();

        return new ApiResponse({
            statusCode: 200,
            message: "Password updated successfully",
            data: {
                user: await User.findById(user._id).select("-password -refreshToken")
            }
        }).send(res);
    }),
};

export default authController;