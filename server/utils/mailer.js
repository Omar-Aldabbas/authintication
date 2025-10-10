import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "MyApp",
    link: "https://myapp.example.com/",
  },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  try {
    const email = {
      body: {
        name: username,
        intro: text || "Welcome to MyApp! We're thrilled to have you on board.",
        outro:
          "If you need help, just reply to this email and we'll be happy to assist you.",
      },
    };

    const emailBody = MailGenerator.generate(email);

    const message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: subject || "Welcome to MyApp!",
      html: emailBody,
    };

    await transporter.sendMail(message);

    res.status(200).json({
      status: "success",
      message: "You should receive an email from us shortly.",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Email not sent",
      error: error.message,
    });
  }
};
