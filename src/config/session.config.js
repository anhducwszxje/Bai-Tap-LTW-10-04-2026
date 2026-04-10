const sessionConfig = {
  secret: process.env.SESSION_SECRET || "mini-shop-session-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 60 * 1000
  }
};

module.exports = sessionConfig;
