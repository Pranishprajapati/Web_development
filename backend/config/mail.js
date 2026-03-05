import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pranishprajapati07@gmail.com",
    pass: "qbfq kwba qwpa pehq", 
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log("Email sent ✅ to", to);
  } catch (err) {
    console.error("Email sending error:", err);
    throw err;
  }
};