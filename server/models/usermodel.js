const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: { type: String },
  isApproved: { type: Boolean, default: false },
  lastLogIn: { type: Date },
  lastLogOut: { type: Date },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
