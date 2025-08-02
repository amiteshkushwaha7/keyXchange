import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    //   service: "Gmail", // or use host, port, and secure for custom SMTP
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
    },
});

export default transporter;
