/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const utilities = require("./utilities/");

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Static Files Middleware
 *************************/
// Serve static files (CSS, JS, images) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

/* ***********************
 * Routes
 *************************/

// Index route
app.get("/", async (req, res) => {
  res.render("index", {
    title: "Home",
    nav: await utilities.getNav(),
  });
});

// Add more routes here (e.g., About, Inventory) as needed

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);

  const message =
    err.status == 404
      ? err.message
      : "Oh no! There was a crash. Maybe try a different route?";

  // Render the error view. Make sure this file exists!
  res.status(err.status || 500).render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav,
  });
});

/* ***********************
 * Server Setup
 *************************/
const port = process.env.PORT || 8000;
// Use the HOST environment variable or default to "localhost"
const host = process.env.HOST || "localhost";

// Start the server
app.listen(port, () => {
  console.log(`App listening on http://${host}:${port}`);
});
