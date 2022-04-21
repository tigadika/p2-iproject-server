const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

router.post("/register", AuthController.registerHandler);
router.post("/login", AuthController.loginHandler);

// router.post("/google-auth", CustAuthController.googleHandler);

module.exports = router;
