/**
 * Renders the profile page and tracks profile visit count in session.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function getProfile(req, res) {
  if (!req.session || !req.session.username) {
    return res.redirect("/login");
  }

  req.session.visitCount = (req.session.visitCount || 0) + 1;

  return res.render("layouts/main", {
    pageTitle: "Mini Shop - Trang cá nhân",
    contentView: "../profile",
    username: req.session.username,
    loginTime: req.session.loginTime || null,
    visitCount: req.session.visitCount,
    theme: res.locals.theme || "light"
  });
}

module.exports = {
  getProfile
};
