const users = require("../data/users.data");

function normalizeText(rawValue) {
  return typeof rawValue === "string" ? rawValue.trim() : "";
}

function getCurrentUser(req, res) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      message: "Authentication required."
    });
  }

  return res.status(200).json({
    message: "Current session user.",
    data: {
      user: req.session.user,
      loginTime: req.session.loginTime || null
    }
  });
}

function login(req, res) {
  const username = normalizeText(req.body ? req.body.username : "");
  const password = normalizeText(req.body ? req.body.password : "");

  if (!username || !password) {
    return res.status(400).json({
      message: "Username và password là bắt buộc."
    });
  }

  if (!req.session) {
    return res.status(500).json({
      message: "Session is not available."
    });
  }

  const matchedUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!matchedUser) {
    return res.status(401).json({
      message: "Sai thông tin đăng nhập."
    });
  }

  return req.session.regenerate((error) => {
    if (error) {
      return res.status(500).json({
        message: "Không thể tạo session đăng nhập."
      });
    }

    req.session.user = {
      username: matchedUser.username,
      role: matchedUser.role
    };
    req.session.loginTime = new Date().toISOString();
    req.session.cart = [];

    return res.status(200).json({
      message: "Đăng nhập thành công.",
      data: {
        user: req.session.user,
        loginTime: req.session.loginTime
      }
    });
  });
}

function logout(req, res) {
  if (!req.session) {
    return res.status(200).json({
      message: "Đăng xuất thành công."
    });
  }

  return req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        message: "Không thể đăng xuất lúc này."
      });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({
      message: "Đăng xuất thành công."
    });
  });
}

module.exports = {
  getCurrentUser,
  login,
  logout
};
