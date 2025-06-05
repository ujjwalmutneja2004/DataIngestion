
const express = require("express");
const router = express.Router();
const { getStatus } = require("../controllers/statusController");

router.get("/:id", getStatus);

module.exports = router;
