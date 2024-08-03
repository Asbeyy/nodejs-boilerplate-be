const crypto = require("crypto");

const hashPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hashedPassword = sha256.update(password).digest("hex");
  return hashedPassword;
};

module.exports = hashPassword;
