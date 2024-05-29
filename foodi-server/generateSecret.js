const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
const jwt_secret_token= secret;

module.exports = jwt_secret_token;
