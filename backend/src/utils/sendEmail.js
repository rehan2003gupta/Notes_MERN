// import nodemailer from "nodemailer";

// export const sendEmail = async (to, subject, text) => {
//     try {
//         console.log("➡️ Sending email to:", to);

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const info = await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             text,
//         });

//         console.log("✅ Email sent:", info.response);
//         console.log("EMAIL_USER:", process.env.EMAIL_USER);
//         console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
//     } catch (error) {
//         console.error("❌ Email error:", error.message);
//     }
// // };
// import nodemailer from "nodemailer";

// export const sendEmail = async (to, subject, text) => {
//     try {
//         console.log("➡️ Sending email to:", to);

//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true, // IMPORTANT for port 465
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//             connectionTimeout: 10000, // avoid long hang
//         });

//         const info = await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             text,
//         });

//         console.log("✅ Email sent:", info.response);
//     } catch (error) {
//         console.error("❌ Full Email Error:", error);
//     }
// };
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, text) => {
  try {
    console.log("➡️ Sending email to:", to);

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // default working sender
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", response);
  } catch (error) {
    console.error("❌ Email Error:", error);
  }
};