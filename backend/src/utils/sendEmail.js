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
//  };




// this will work in localhost, there is some smtp issue in render and that's why it is not working there,
// but the existing code is perfect

/*
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
export const sendEmail = async (to, subject, text) => {
    try {
        console.log("➡️ Sending email to:", to);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // IMPORTANT for port 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 10000, // avoid long hang
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html: text, 
        });

        console.log("✅ Email sent:", info.response);
    } catch (error) {
        console.error("❌ Full Email Error:", error);
    }
};  


// using this function must be called in authcontroller.js where register logic is written 

sendEmail(
    "rehan.gupta.22@aot.edu.in",                       // write user.email
    "Welcome to Notes🎉",                              // this is the header 
    `You have been successfully registered!            // this is entire message 
    <p>Write the notes, tasks and increase your productivity.</p>`
).catch((err) => {
    console.error("Email failed:", err.message);
});

*/

// It is perfect code but it will send email using test email called onboarding@resend.dev
// To add users email you have to buy a domain name and then you can achieve what you want. 
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
      html: text,
    });

    console.log("✅ Email sent:", response);
  } catch (error) {
    console.error("❌ Email Error:", error);
  }
};