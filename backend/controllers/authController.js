import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { sendEmail } from "../config/mail.js";


export const registerUser = async (req, res) => {
  const { name, email, password, phone, gender } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    const existingUser = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
    if (existingUser.rows.length > 0) return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, phone, gender, role)
       VALUES ($1,$2,$3,$4,$5,'user')
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, phone, gender]
    );

    res.status(201).json({ message: "Registration successful", user: result.rows[0] });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (userResult.rows.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};



// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});


export const sendForgotPasswordCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!userRes.rows.length) return res.status(404).json({ message: "User not found" });

    const code = crypto.randomInt(100000, 999999); 
    const expiry = new Date(Date.now() + 15 * 60 * 1000); 

    await pool.query(
      "UPDATE users SET reset_token=$1, reset_token_expiry=$2 WHERE email=$3",
      [code, expiry, email]
    );


    await sendEmail(
      email,
      "Futsilo Password Reset Code",
      `<p>Your password reset code is: <b>${code}</b></p>
       <p>It expires in 15 minutes.</p>`
    );

    res.json({ message: "Verification code sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const resetPasswordWithCode = async (req, res) => {
  const { email, code, password } = req.body;
  if (!email || !code || !password)
    return res.status(400).json({ message: "Email, code, and new password required" });

  try {
    const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!userRes.rows.length) return res.status(404).json({ message: "User not found" });

    const user = userRes.rows[0];
    if (!user.reset_token || user.reset_token !== code.toString())
      return res.status(400).json({ message: "Invalid verification code" });

    if (new Date(user.reset_token_expiry) < new Date())
      return res.status(400).json({ message: "Verification code expired" });

   
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "UPDATE users SET password=$1, reset_token=NULL, reset_token_expiry=NULL WHERE email=$2",
      [hashed, email]
    );

    res.json({ message: "Password updated successfully. You can now login." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};