const products = require("../data/products.data");

/**
 * Returns admin dashboard metrics.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function getDashboard(req, res) {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockProducts = products.filter((product) => product.stock < 10);

  return res.status(200).json({
    message: "Admin dashboard data.",
    data: {
      currentUser: req.session && req.session.user ? req.session.user : null,
      totalProducts,
      totalStock,
      lowStockProducts,
      generatedAt: new Date().toISOString()
    }
  });
}

module.exports = {
  getDashboard
};
