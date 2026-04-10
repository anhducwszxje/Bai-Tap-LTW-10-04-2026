const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const sessionConfig = require("./src/config/session.config");

const indexRoute = require("./src/routes/index.route");
const authRoute = require("./src/routes/auth.route");
const productRoute = require("./src/routes/product.route");
const cartRoute = require("./src/routes/cart.route");
const adminRoute = require("./src/routes/admin.route");

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionConfig));

app.use("/", indexRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/admin", adminRoute);

/**
 * Handles unknown routes.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function notFoundHandler(req, res) {
  return res.status(404).json({
    message: "Route not found."
  });
}

/**
 * Handles unhandled runtime errors.
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err);

  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({
    message: "Internal server error."
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
