const express = require("express");
const router = new express.Router();
const errorController = require("../controllers/errorcontroller");

// Intentional error route
router.get("/trigger-error", errorController.triggerError); // Ensure the callback is defined and used correctly

module.exports = router;