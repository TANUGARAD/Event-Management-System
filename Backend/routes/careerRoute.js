// careerRoute.js
const express = require("express");
const router = express.Router(); // ✅ define router
const multer = require("multer");
const nodemailer = require("nodemailer");

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const { fullname, email, phone, role, portfolio, experience } = req.body;

    if (!fullname || !email || !phone || !role) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: "New Career Application",
      html: `
        <p><b>Name:</b> ${fullname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> +91 ${phone}</p>
        <p><b>Role:</b> ${role}</p>
        <p><b>Experience:</b> ${experience}</p>
        <p><b>Portfolio:</b> ${portfolio || "N/A"}</p>
      `,
      attachments: req.file
        ? [{
            filename: req.file.originalname,
            content: req.file.buffer
          }]
        : []
    });

    res.json({ success: true });

  } catch (error) {
    console.error("MAIL ERROR:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router; // ✅ export router
