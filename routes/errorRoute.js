const express = require("express");
const router = new express.Router();
const errorController = require("../controllers/errorcontroller");

// Intentional error route
router.get("/trigger-error", errorController.triggerError);

module.exports = router;