require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= MAIL TRANSPORT ================= */
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

/* ================= API ================= */
app.post("/send-enquiry", async (req, res) => {
  try {
    const { name, company, email, phone, services } = req.body;

    if (!name || !company || !email || !services || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const mailOptions = {
      from: `"Website Enquiry" <${process.env.MAIL_USER}>`,
      to: process.env.RECEIVER_MAIL,
      subject: "📩 New Enquiry Received",
      html: `
        <h2>New Enquiry Details</h2>
        <p><strong>Full Name:</strong> ${name}</p>
        <p><strong>Company Name:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>
        <p><strong>Services Required:</strong></p>
        <ul>
          ${services.map(s => `<li>${s}</li>`).join("")}
        </ul>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Enquiry mail sent successfully"
    });

  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

/* ================= SERVER ================= */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
