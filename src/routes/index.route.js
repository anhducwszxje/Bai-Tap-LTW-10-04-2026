const express = require("express");

const { getApiInfo, getHealth } = require("../controllers/index.controller");

const router = express.Router();

router.get("/", getApiInfo);
router.get("/api/health", getHealth);

module.exports = router;
