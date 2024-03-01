const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");

  console.log("Token", token);

  if (!token) {
    return res
      .status(403)
      .json({
        message:
          "Access Forbidden: You do not have permission to access this resource.",
        statusCode: 403,
      });
  }

  jwt.verify(token, "malakfarmankhan786", (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Your has been expired!", statusCode: 401 });
    }
    req.userId = user.userId;
    next();
  });
}

module.exports = authenticateToken;
