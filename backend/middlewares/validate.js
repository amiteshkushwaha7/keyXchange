import ApiError from '../utils/apiError.js';

const validate = {
    registerInput: (req, res, next) => {
        const { name, email, mobile, password, role } = req.body;
        const errors = {};

        if (!name || name.trim() === '')
            errors.name = 'Name is required';
        else if (name.length > 50 || name.length < 3)
            errors.name = 'Name length must between 3 to 50';

        if (!email || email.trim() === '')
            errors.email = 'Email is required';
        else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email))
                errors.email = 'Email is invalid';
        }

        if (!mobile || mobile.trim() === '')
            errors.mobile = 'Mobile number is required';
        else {
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(mobile))
                errors.mobile = 'Mobile number must be a valid 10-digit number';
        }

        if (!password || password.trim() === '')
            errors.password = 'Password is required';
        else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!passwordRegex.test(password))
                errors.password = 'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character';
        }

        const allowedRoles = ['user', 'admin'];
        if (role && !allowedRoles.includes(role))
            errors.role = 'Role must be either user or admin';

        if (Object.keys(errors).length > 0) {
            // console.log(errors);
            return next(new ApiError(400, 'Validation Error', errors));
        }

        next();
    },

    loginInput: (req, res, next) => {
        const { email, password } = req.body;
        const errors = {};

        if (!email || email.trim() === '')
            errors.email = 'Email is required';

        if (!password || password.trim() === '')
            errors.password = 'Password is required';

        if (Object.keys(errors).length > 0) {
            // console.log(errors);
            return next(new ApiError(400, 'Validation Error', errors));
        }
        next();
    },
};

export default validate; 