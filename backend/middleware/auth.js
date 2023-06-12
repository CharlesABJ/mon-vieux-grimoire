const jwt = require("jsonwebtoken");
const jwtSecretKey = "RAPTOR4124_EHEKELF";
// require("dotenv").config();
// const jwtSecretKey = process.env.jwtSecretKey;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtSecretKey);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
  } catch (error) {
    res.status(401).json({ error });
  }
};
