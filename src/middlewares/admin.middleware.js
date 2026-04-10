/**
 * Allows only admin users to access protected resources.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function adminMiddleware(req, res, next) {
  const role = req.session && req.session.user ? req.session.user.role : null;

  if (role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Admin access required."
  });
}

module.exports = adminMiddleware;
