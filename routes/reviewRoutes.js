const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post(
  "/add",
  body("review_text")
    .trim()
    .isLength({ min: 3, max: 500 })
    .withMessage("Review must be between 3 and 500 characters."),
  reviewController.postReview
);

module.exports = router;