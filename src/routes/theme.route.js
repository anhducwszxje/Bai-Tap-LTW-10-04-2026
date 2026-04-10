const express = require("express");

const { setTheme } = require("../controllers/theme.controller");

const router = express.Router();

router.get("/set-theme/:theme", setTheme);

module.exports = router;
