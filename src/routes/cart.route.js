const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const {
  getCart,
  addItemToCart,
  removeItemFromCart
} = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/items", authMiddleware, addItemToCart);
router.delete("/items/:productId", authMiddleware, removeItemFromCart);

module.exports = router;
