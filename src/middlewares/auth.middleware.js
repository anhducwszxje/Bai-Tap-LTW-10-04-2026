/**
 * Guards protected routes and blocks unauthenticated requests.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function authMiddleware(req, res, next) {
  if (req.session && req.session.user && req.session.user.username) {
    return next();
  }

  return res.status(401).json({
    message: "Authentication required."
  });
}

module.exports = authMiddleware;
