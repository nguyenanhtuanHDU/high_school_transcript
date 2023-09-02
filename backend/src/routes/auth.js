const express = require("express");
const { signIn } = require("../controller/auth.controller");

const router = express.Router();

router.post("/sign-in", signIn);

module.exports = router;
