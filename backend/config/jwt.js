import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const getTokens = {
    generateAccessToken: function (user) {
        return jwt.sign(
            {
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                password: user.password,
                role: user.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
    },

    generateRefreshToken: function (user) {
        return jwt.sign(
            {
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                password: user.password,
                role: user.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
    },

    verifyAccessToken: function (token) {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    },

    verifyRefreshToken: function (token) {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
};

export default getTokens;
 