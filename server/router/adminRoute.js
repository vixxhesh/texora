const express = require("express");
const {
  getPendingUsers,
  approveUser,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/pending-users", getPendingUsers);
router.post("/approve-users", approveUser);

module.exports = router;
