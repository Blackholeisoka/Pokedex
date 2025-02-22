const crypto = require('crypto');

// Random strings
module.exports = crypto.randomBytes(8).toString('base64');