import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 100,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String,
            required: true,
            trim: true
        },
        contactType: {
            type: String,
            enum: [
                // Inquiry types
                'general', 'technical', 'billing', 'product', 'other',
                // Issue types
                'bug', 'suggestion', 'ui-issue', 'content'
            ],
            required: true,
            default: 'general'
        },
        isResolved: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;