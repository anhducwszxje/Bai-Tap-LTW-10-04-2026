const ALLOWED_THEMES = new Set(["light", "dark"]);

/**
 * Reads theme cookie and injects a safe theme value into res.locals.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function themeMiddleware(req, res, next) {
  const cookieTheme = req.cookies ? req.cookies.theme : undefined;

  res.locals.theme = ALLOWED_THEMES.has(cookieTheme) ? cookieTheme : "light";
  next();
}

module.exports = themeMiddleware;
