function getApiInfo(req, res) {
  return res.status(200).json({
    message: "Mini Shop Backend API is running.",
    data: {
      auth: [
        "POST /api/auth/login",
        "POST /api/auth/logout",
        "GET /api/auth/me"
      ],
      products: [
        "GET /api/products",
        "GET /api/products/:productId"
      ],
      cart: [
        "GET /api/cart",
        "POST /api/cart/items",
        "DELETE /api/cart/items/:productId"
      ],
      admin: [
        "GET /api/admin/dashboard"
      ]
    }
  });
}

function getHealth(req, res) {
  return res.status(200).json({
    status: "ok"
  });
}

module.exports = {
  getApiInfo,
  getHealth
};
