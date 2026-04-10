const ALLOWED_THEMES = new Set(["light", "dark"]);

function themeMiddleware(req, res, next) {
  const cookieTheme = req.cookies ? req.cookies.theme : undefined;

  res.locals.theme = ALLOWED_THEMES.has(cookieTheme) ? cookieTheme : "light";
  next();
}

module.exports = themeMiddleware;
