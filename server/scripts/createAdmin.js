const mongoose = require("mongoose");
const User = require("../models/userModel");
const hashPassword = require("../utils/hashedPassword");

(async function createAdmin() {
  try {
    mongoose.connect(
      "mongodb+srv://vishesh:tXrexK2agGY6Apcl@cluster0.ds1rv.mongodb.net/jd?retryWrites=true&w=majority&appName=Cluster0"
    );

    const adminExists = await User.findOne({ email: "pranav123@gmail.com" });
    if (adminExists) {
      console.log("Admin user already exists");
      return;
    }
    //abc
    const admin = new User({
      name: "Admin",
      email: "pranav123@gmail.com",
      phoneNumber: 1234567890,
      role: "admin",
      password: await hashPassword("12345"),
      isApproved: true,
    });

    await admin.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  } finally {
    mongoose.connection.close();
  }
})();
