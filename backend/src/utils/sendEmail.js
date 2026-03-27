import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
    try {
        console.log("➡️ Sending email to:", to);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });

        console.log("✅ Email sent:", info.response);
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
    } catch (error) {
        console.error("❌ Email error:", error.message);
    }
};
