const caract = require('crypto');

function randomToken(size = 16) {
  return caract
    .randomBytes(size)
    .toString('base64')
    .slice(0, size);
}

module.exports = randomToken;