const ALLOWED_THEMES = new Set(["light", "dark"]);

/**
 * Resolves a safe redirect destination from request referer.
 *
 * @param {import("express").Request} req
 * @returns {string}
 */
function getSafeRedirectTarget(req) {
  const referer = req.headers.referer;

  if (!referer) {
    return "/";
  }

  try {
    const refererUrl = new URL(referer);

    if (refererUrl.host !== req.get("host")) {
      return "/";
    }

    return `${refererUrl.pathname}${refererUrl.search}` || "/";
  } catch (error) {
    return referer.startsWith("/") ? referer : "/";
  }
}

/**
 * Updates theme cookie with validated values and redirects back.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
function setTheme(req, res) {
  const requestedTheme = req.params ? req.params.theme : "";

  if (!ALLOWED_THEMES.has(requestedTheme)) {
    return res.status(400).send("Bad Request: invalid theme.");
  }

  res.cookie("theme", requestedTheme, {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax"
  });

  return res.redirect(getSafeRedirectTarget(req));
}

module.exports = {
  setTheme
};
