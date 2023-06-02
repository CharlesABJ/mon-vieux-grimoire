const express = require("express");
const router = express.Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);

module.exports = router;
