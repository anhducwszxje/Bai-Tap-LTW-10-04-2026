const products = require("../data/products.data");

/**
 * Parses a query value into a valid number.
 *
 * @param {unknown} rawValue
 * @returns {number|null}
 */
function parseOptionalNumber(rawValue) {
  if (rawValue === undefined || rawValue === null || rawValue === "") {
    return null;
  }

  const parsed = Number(rawValue);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Returns a list of products with optional filters.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function getProducts(req, res) {
  const search = typeof req.query.search === "string" ? req.query.search.trim().toLowerCase() : "";
  const minPrice = parseOptionalNumber(req.query.minPrice);
  const maxPrice = parseOptionalNumber(req.query.maxPrice);

  let filteredProducts = products;

  if (search) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
    );
  }

  if (minPrice !== null) {
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
  }

  if (maxPrice !== null) {
    filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
  }

  return res.status(200).json({
    count: filteredProducts.length,
    data: filteredProducts
  });
}

/**
 * Returns details for a single product.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function getProductById(req, res) {
  const productId = Number.parseInt(req.params.productId, 10);

  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      message: "productId không hợp lệ."
    });
  }

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm."
    });
  }

  return res.status(200).json({
    data: product
  });
}

module.exports = {
  getProducts,
  getProductById
};
