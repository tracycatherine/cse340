const { validationResult } = require("express-validator");
const reviewModel = require("../models/reviewModel");

async function postReview(req, res, next) {
  try {
    const errors = validationResult(req);
    const { vehicle_id, review_text } = req.body;
    const account_id = req.session.account_id || req.account_id;

    if (!errors.isEmpty()) {
      // Re-render the vehicle detail page with errors
      // Fetch vehicle and reviews as needed for the view
      return res.render("inventory/detail", {
        errors: errors.array(),
        vehicle_id,
        review_text,
        // ...other data needed for the view
      });
    }

    await reviewModel.addReview(vehicle_id, account_id, review_text);
    res.redirect(`/inventory/detail/${vehicle_id}`);
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
}

module.exports = { postReview };