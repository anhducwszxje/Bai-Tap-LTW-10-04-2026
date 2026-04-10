const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const { getDashboard } = require("../controllers/admin.controller");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getDashboard);

module.exports = router;
