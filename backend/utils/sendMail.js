import transporter from "../config/mailer.js";

const sendEmail = async (options) => {
    const mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
