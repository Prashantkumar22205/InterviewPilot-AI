const express = require("express");
const router = express.Router();

const {googleLoginController} = require("../controllers/googleAuth.controller");

router.post("/google", googleLoginController);

module.exports = router; 