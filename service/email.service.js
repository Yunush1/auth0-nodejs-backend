const nodemailer = require('nodemailer')
require('dotenv').config(); // Load environment variables
const emailTemplate = require('./email-template')
/**
 * Configure the email transporter with SMTP credentials from environment variables.
 */
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587, // Default to 587 if not set
    secure: process.env.SMTP_PORT === "465", // `true` for port 465 (SSL), `false` for others
    auth: {
        user: "devs762001@gmail.com",
        pass: "ykcp kbwr daqv hhky",
    },
});

/**
 * Sends an email using Nodemailer.
 * @param to - Recipient email address.
 * @param subject - Subject of the email.
 * @param content - Content of the email (HTML or plain text).
 * @param isHtml - Whether the email content is in HTML format.
 * @returns Promise<void>
 */
const sendEmail = async (
    user,
    subject,
    content,
    isHtml = false
) => {
    try {
        const mailOptions = {
            from: `"Auth System" <${process.env.EMAIL_USER}>`, // Sender email
            to:user?.email,
            subject,
            text: isHtml ? undefined :content , // Plain text version
            html: isHtml ? emailTemplate(user,content): undefined, // HTML version
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📩 Email sent successfully: ${info.messageId}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = {sendEmail}