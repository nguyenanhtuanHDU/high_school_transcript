const express = require("express");
const { postCreateTeacher } = require("../controller/teacher.controller");
const { postCreatePrincipal } = require("../controller/principal.controller");

const router = express.Router();

router.post("/teacher", postCreateTeacher);
router.post("/principal", postCreatePrincipal);

module.exports = router;
