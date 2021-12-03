const express = require("express");
const router = express.Router();
const auth = require("../controler/auth")
const is_auth = require("../controler/is_auth")

router.post("/login", auth.Login)

router.post("/logout",is_auth, auth.Logout)

module.exports = router;