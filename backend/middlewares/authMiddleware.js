import User from '../models/User.js';
import getTokens from '../config/jwt.js';
import catchAsync from './catchAsync.js';
import ApiError from '../utils/apiError.js';

const authMiddleware = {
    protect: catchAsync(async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.accessToken) {
            token = req.cookies.accessToken;
        }

        console.log('Token from middleware:', token);

        if (!token) {
            throw new ApiError(401, 'You are not logged in! Please log in to get access.');
        }

        try {
            const decoded = getTokens.verifyAccessToken(token);
            const currentUser = await User.findById(decoded._id);

            if (!currentUser) {
                throw new ApiError(401, 'The user belonging to this token does not exist.');
            }

            req.user = currentUser;
            res.locals.user = currentUser;
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                // Let the client handle token refresh
                throw new ApiError(401, 'Token expired. Please refresh your token.');
            }
            throw new ApiError(401, 'Invalid token');
        }
    }),

    authorize: (...roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                throw new ApiError(403, `User role ${req.user.role} is not authorized to access this route`);
            }
            next();
        };
    },
}

export default authMiddleware;