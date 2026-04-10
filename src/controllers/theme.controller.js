const ALLOWED_THEMES = new Set(["light", "dark"]);

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
