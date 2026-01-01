require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// Create transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/send-email", (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    text: `
You have a new contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("❌ Mail Error:", error.toString());
      return res.status(500).json({
        success: false,
        error: error.toString()
      });
    }

    console.log("📬 Email sent successfully!");

    // ALWAYS send JSON
    return res.json({
      success: true,
      message: "Email sent successfully"
    });
  });
});

app.listen(PORT, () => {
  console.log(`📍 Server running at http://localhost:${PORT}`);
});
