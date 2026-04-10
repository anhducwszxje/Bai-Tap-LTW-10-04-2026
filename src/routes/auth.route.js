const express = require("express");

const {
  getCurrentUser,
  login,
  logout
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentUser);

module.exports = router;
