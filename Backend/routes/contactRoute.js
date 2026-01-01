// contactRoute.js
const express = require("express");
const router = express.Router(); // ✅ define router
const nodemailer = require("nodemailer");

router.post("/send", async (req, res) => {
  try {
    console.log("CONTACT BODY:", req.body);

    const { name, email, mobile, message } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({
        success: false,
        message: "Missing fields"
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS // Gmail App Password
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: "New Contact Message",
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${mobile}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>
      `
    });

    return res.json({ success: true });

  } catch (err) {
    console.error("CONTACT ERROR:", err);
    return res.status(500).json({ success: false });
  }
});

module.exports = router; // ✅ export router
