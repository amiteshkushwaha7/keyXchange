import User from '../models/User.js';
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';

const userController = {
    getAllUsers: catchAsync(async (req, res) => {
        const users = await User.find().select('-password');
    
        if (!users || users.length === 0) {
            throw new ApiError(404, 'No users found');
        }

        new ApiResponse({ 
            statusCode: 200,
            message: 'Users fetched successfully',
            data: users
        }).send(res);
    }),

    getUserById: catchAsync(async (req, res) => {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        new ApiResponse({
            statusCode: 200,
            message: 'User fetched successfully',
            data: user
        }).send(res);
    }),

    getMe: catchAsync(async (req, res) => {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        new ApiResponse({
            statusCode: 200,
            message: 'User fetched successfully',
            data: user
        }).send(res);
    }),
};

export default userController;