import Contact from '../models/Contact.js'
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/apiError.js';
import ApiResponse from '../utils/apiResponse.js';
import sendEmail from '../utils/sendMail.js';

const contactController = {
    getAllContacts: catchAsync(async (req, res) => {
        const contacts = await Contact.find().sort('-createdAt');

        new ApiResponse({
            statusCode: 200,
            message: 'Contacts retrieved successfully',
            data: contacts
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
            subject: 'Contact Form Submission',
            text: `Thank you for reaching out, ${newContact.name}. We will get back to you soon!`
        };

        await sendEmail(contactMailOptions);

        new ApiResponse({
            statusCode: 201,
            message: 'Contact created successfully',
            data: newContact
        }).send(res);
    })
}

export default contactController;