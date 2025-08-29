import Contact from '../models/Contact.js'
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import sendEmail from '../utils/sendMail.js';

import dotenv from 'dotenv';
dotenv.config();

const contactController = {
    getAllContacts: catchAsync(async (req, res) => {
        const contacts = await Contact.find().sort('-createdAt');

        new ApiResponse({
            statusCode: 200,
            message: 'Contacts retrieved successfully',
            data: contacts
        }).send(res);
    }),

    getContactById: catchAsync(async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            throw new ApiError('Contact not found', 404);
        }
        new ApiResponse({
            statusCode: 200,
            message: 'Contact retrieved successfully',
            data: contact
        }).send(res);
    }),

    createContact: catchAsync(async (req, res) => {
        const { name, email, inquiryType, issueType, message } = req.body;

        const newContact = await Contact.create({
            name,
            email,
            message,
            inquiryType,
            issueType
        });

        const contactMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: newContact.email,
            subject: `Thank You for Contacting ${process.env.COMPANY_NAME || 'Our Team'}`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
                    <h1 style="margin: 0; font-size: 24px;">Thank You for Reaching Out</h1>
                </div>
                <div style="padding: 30px; background: #f9fafb;">
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        Dear <strong>${newContact.name}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        Thank you for contacting us. We have received your message and appreciate you taking the time to write to us.
                    </p>
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        Our team typically responds within <strong>48 business hours</strong>. During peak times, it may take slightly longer, but we will get back to you as soon as possible.
                    </p>
                    <div style="background: #e5e7eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; font-size: 14px; color: #4b5563;">
                            <strong>Reference:</strong> #${newContact._id.toString().slice(-8).toUpperCase()}<br>
                            <strong>Submitted:</strong> ${new Date().toLocaleDateString()}
                        </p>
                    </div>
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        If your inquiry is urgent, please don't hesitate to reach out to us directly at 
                        <a href="mailto:amiteshkushwaha2020@gmail.com" style="color: #667eea; text-decoration: none;">amiteshkushwaha2020@gmail.com</a>.
                    </p>
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        Best regards,<br>
                        <strong>The ${process.env.COMPANY_NAME || 'Customer Success'} Team</strong>
                    </p>
                </div>
                <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                    <p style="margin: 0;">
                        This is an automated message. Please do not reply to this email.<br>
                        © ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Our Company'}. All rights reserved.
                    </p>
                </div>
            </div>`,
            text: `Thank you for contacting us, ${newContact.name}. We have received your message and will respond within 24 business hours. Reference: #${newContact._id.toString().slice(-8).toUpperCase()}. For urgent matters, please contact amiteshkushwaha2020@gmail.com.`
        };

        await sendEmail(contactMailOptions);

        new ApiResponse({
            statusCode: 201,
            message: 'Contact created successfully',
            data: newContact
        }).send(res);
    }),

    updateContact: catchAsync(async (req, res) => {
        const { id } = req.params;

        console.log(id);

        const contact = await Contact.findById(id);

        if (!contact) {
            return new ApiResponse({
                statusCode: 404,
                message: 'Contact not found' 
            }).send(res);
        }

        const resolutionMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: contact.email,
            subject: `Your Inquiry Has Been Resolved | ${process.env.COMPANY_NAME || 'Our Team'}`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%); padding: 30px; text-align: center; color: white;">
                    <h1 style="margin: 0; font-size: 24px;">Your Inquiry Has Been Resolved</h1>
                </div>
                <div style="padding: 30px; background: #f9fafb;">
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        Dear <strong>${contact.name}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        Thank you for your patience. We're pleased to inform you that your inquiry has been successfully resolved.
                    </p>
                    <div style="background: #e5e7eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; font-size: 14px; color: #4b5563;">
                            <strong>Reference ID:</strong> #${contact._id.toString().slice(-8).toUpperCase()}<br>
                            <strong>Inquiry Type:</strong> ${contact.contactType}<br>
                            <strong>Resolved On:</strong> ${new Date().toLocaleDateString()}
                        </p>
                    </div>
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        If you have any further questions or need additional assistance, please don't hesitate to reach out to us directly at <a href="mailto:amiteshkushwaha2020@gmail.com" style="color: #667eea; text-decoration: none;">amiteshkushwaha2020@gmail.com</a>.
                    </p>
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        We value your feedback and would appreciate it if you could take a moment to share your experience with us.
                    </p>
                    <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                        Best regards,<br>
                        <strong>The ${process.env.COMPANY_NAME || 'Customer Success'} Team</strong>
                    </p>
                </div>
                <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                    <p style="margin: 0;">
                        This is an automated message. Please do not reply to this email.<br>
                        © ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Our Company'}. All rights reserved.
                    </p>
                </div>
            </div>`,
            text: `Dear ${contact.name}, your inquiry (Reference: #${contact._id.toString().slice(-8).toUpperCase()}) has been resolved on ${new Date().toLocaleDateString()}. If you have further questions, please contact us.`
        };

        await sendEmail(resolutionMailOptions);
        await Contact.findByIdAndUpdate(contact._id, { isResolved: true });

        new ApiResponse({
            statusCode: 200,
            message: 'Contact updated successfully',
            data: contact
        }).send(res);
    }),

    deleteContact: catchAsync(async (req, res) => {
        const { id } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return new ApiResponse({
                statusCode: 404,
                message: 'Contact not found'
            }).send(res);
        }

        new ApiResponse({
            statusCode: 200,
            message: 'Contact deleted successfully',
            data: deletedContact
        }).send(res);
    }),

    deleteAllContacts: catchAsync(async (req, res) => {
        await Contact.deleteMany({});
        new ApiResponse({
            statusCode: 200,
            message: 'All contacts deleted successfully'
        }).send(res);
    }),
}

export default contactController;
