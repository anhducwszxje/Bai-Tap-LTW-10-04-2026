const products = require("../data/products.data");

/**
 * Ensures the session cart has a valid in-memory array.
 *
 * @param {import("express-session").Session & { cart?: Array<{ productId: number, quantity: number }> }} session
 * @returns {Array<{ productId: number, quantity: number }>}
 */
function ensureCart(session) {
  if (!Array.isArray(session.cart)) {
    session.cart = [];
  }

  return session.cart;
}

/**
 * Builds cart output with product details and totals.
 *
 * @param {Array<{ productId: number, quantity: number }>} cart
 * @returns {{ items: Array<{ productId: number, name: string, price: number, quantity: number, subtotal: number }>, totalItems: number, totalAmount: number }}
 */
function buildCartResponse(cart) {
  const items = cart
    .map((entry) => {
      const product = products.find((item) => item.id === entry.productId);

      if (!product) {
        return null;
      }

      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: entry.quantity,
        subtotal: product.price * entry.quantity
      };
    })
    .filter(Boolean);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    items,
    totalItems,
    totalAmount
  };
}

/**
 * Returns current user's cart.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function getCart(req, res) {
  if (!req.session) {
    return res.status(500).json({
      message: "Session is not available."
    });
  }

  const cart = ensureCart(req.session);

  return res.status(200).json({
    data: buildCartResponse(cart)
  });
}

/**
 * Adds a product to current session cart.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function addItemToCart(req, res) {
  if (!req.session) {
    return res.status(500).json({
      message: "Session is not available."
    });
  }

  const productId = Number.parseInt(req.body ? req.body.productId : NaN, 10);
  const quantity = req.body && req.body.quantity !== undefined
    ? Number.parseInt(req.body.quantity, 10)
    : 1;

  if (!Number.isInteger(productId) || productId <= 0 || !Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({
      message: "productId và quantity phải là số nguyên dương."
    });
  }

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm."
    });
  }

  const cart = ensureCart(req.session);
  const existingItem = cart.find((item) => item.productId === productId);
  const nextQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

  if (nextQuantity > product.stock) {
    return res.status(400).json({
      message: "Số lượng vượt quá tồn kho."
    });
  }

  if (existingItem) {
    existingItem.quantity = nextQuantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }

  return res.status(200).json({
    message: "Đã thêm sản phẩm vào giỏ hàng.",
    data: buildCartResponse(cart)
  });
}

/**
 * Removes a product from current session cart.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function removeItemFromCart(req, res) {
  if (!req.session) {
    return res.status(500).json({
      message: "Session is not available."
    });
  }

  const productId = Number.parseInt(req.params.productId, 10);

  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      message: "productId không hợp lệ."
    });
  }

  const cart = ensureCart(req.session);
  const itemIndex = cart.findIndex((item) => item.productId === productId);

  if (itemIndex < 0) {
    return res.status(404).json({
      message: "Sản phẩm chưa có trong giỏ hàng."
    });
  }

  cart.splice(itemIndex, 1);

  return res.status(200).json({
    message: "Đã xóa sản phẩm khỏi giỏ hàng.",
    data: buildCartResponse(cart)
  });
}

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart
};
