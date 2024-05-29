// import express from "express";
// import expressAsyncHandler from "express-async-handler";
const express = require("express");
const { createTransport } = require("nodemailer");

// import dotenv from "dotenv"
// import Contact from "../models/contactModel.js";

// dotenv.config();

const mssgRouter = express.Router();

mssgRouter.post("/", (req, res) => {
  // console.log(req.body);
  const { name, email, msg } = req.body;
  // console.log(name);
  console.log(email);
  console.log(msg);

  // Create a transporter using your email service (e.g., Gmail)
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "saurabhworks890@gmail.com", // your email
      pass: "tpjg mkmx dnln jxyi", // your email password or an app-specific password
    },
  });

  // Set up email data
  const mailOptions = {
    from: "saurabhworks890@gmail.com",
    cc: email,
    to: email, // recipient's email
    subject: `Thank you, ${name} for ordering `,
    text: msg,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

module.exports = mssgRouter;
