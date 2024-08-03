const jwt = require("jsonwebtoken");
const {Account} = require("../database/schemas/");
const hashPassword = require("./sha256");


async function AuthenticateToken(req){
  const token = req.headers.authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const account = await Account.findOne({
          email: decoded.email,
          password: decoded.password,
        }).select("-password -email -finances -tokens");
        

        if (!account) {
          return {
            success: false,
            user: null
          };
        }

        return {
          success: true,
          account: account
        };



    } catch (error) {
      return {
        success: false,
        user: null
      };
    }
}

function signToken(email, password){
    return jwt.sign(
      { email: email.toLowerCase(), password: password },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
};


module.exports = {
    AuthenticateToken,
    signToken
}