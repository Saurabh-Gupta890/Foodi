// middlewares
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require('crypto');

// Generate a random secret key
const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret);

// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const verifyToken = (req, res, next) => {
  // console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
