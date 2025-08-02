import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    refreshToken: {
        type: String
    },
    // passwordChangedAt: Date,
    // passwordResetToken: String,
    // passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
    }
}, 
{
    timestamps: true
});

// Password encryption middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) 
        return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Instance method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Update passwordChangedAt when password is modified
// userSchema.pre('save', function (next) {
//     if (!this.isModified('password') || this.isNew) return next();

//     this.passwordChangedAt = Date.now() - 1000;
//     next();
// });



// // Instance method to check if password was changed after token was issued
// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//         return JWTTimestamp < changedTimestamp;
//     }
//     return false;
// };

// // Instance method to create password reset token
// userSchema.methods.createPasswordResetToken = function () {
//     const resetToken = crypto.randomBytes(32).toString('hex');

//     this.passwordResetToken = crypto
//         .createHash('sha256')
//         .update(resetToken)
//         .digest('hex');

//     this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

//     return resetToken;
// };

const User = mongoose.model('User', userSchema);
export default User;