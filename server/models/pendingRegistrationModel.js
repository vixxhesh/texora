const mongoose = require("mongoose");

const pendingRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const PendingRegistration = mongoose.model(
  "PendingRegistration",
  pendingRegistrationSchema
);

module.exports = PendingRegistration;
