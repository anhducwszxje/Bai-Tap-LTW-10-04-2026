function authMiddleware(req, res, next) {
  if (req.session && req.session.user && req.session.user.username) {
    return next();
  }

  return res.status(401).json({
    message: "Authentication required."
  });
}

module.exports = authMiddleware;
