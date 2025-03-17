const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/hashedPassword");
const secretKey = "this is secret";
const PendingRegistration = require("../models/pendingRegistrationModel");

exports.signup = async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  try {
    // Validate input
    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists in pending or approved users
    const existingUser = await User.findOne({ email });
    const existingPendingUser = await PendingRegistration.findOne({ email });
    if (existingUser || existingPendingUser) {
      return res
        .status(409)
        .json({ message: "User already exists or pending approval" });
    }

    // Save to pending registrations
    const pendingUser = new PendingRegistration({ name, email, phoneNumber });
    await pendingUser.save();

    res
      .status(200)
      .json({ message: "Registration submitted. Await admin approval." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isApproved)
      return res.status(403).json({ message: "Account not approved" });

    console.log("Password is ", password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid, -"Is valid??");
    if (!isPasswordValid) {
      console.error(
        "Password mismatch. Please ensure that the password is hashed correctly."
      );
    }

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
      expiresIn: "1h",
    });
    user.lastLogIn = new Date();
    await user.save();

    res
      .status(200)
      .json({ message: "Login successful", token, role: user.role,userData:user }); // Include role
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
