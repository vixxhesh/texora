const User = require("../models/userModel");
const hashPassword = require("../utils/hashedPassword");
const PendingRegistration = require("../models/pendingRegistrationModel");

exports.getPendingUsers = async (req, res) => {
  try {
    // Retrieve all pending users who are not approved
    const pendingUsers = await PendingRegistration.find({ isApproved: false });

    // Return pending users if found
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error("Error fetching pending users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.approveUser = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const pendingUser = await PendingRegistration.findById(userId);

    if (!pendingUser) {
      return res
        .status(404)
        .json({ message: "Pending registration not found" });
    }

    // Generate a random 8-character password
    const generatedPassword = Math.random().toString(36).slice(-8);
    console.log("Generated Password:", generatedPassword);
    console.log("Hashed Password:", await hashPassword(generatedPassword));

    // Create a new user using the pending registration details
    const newUser = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      phoneNumber: pendingUser.phoneNumber,
      role,
      password: await hashPassword(generatedPassword),
      isApproved: true,
    });

    // Save the new user to the database
    await newUser.save();

    // Delete the pending registration after approval
    await PendingRegistration.findByIdAndDelete(userId);

    // Send success response with the generated password
    res.status(200).json({
      message: "User approved and created successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      password: generatedPassword,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error approving user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
