//  to put Authorization

const userModel = require("../../database/models/user.model");
const { resHandler } = require("../helper");
const { verify } = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    //   bearer - ey..... is type of authorization
    const token = req.header("Authorization").replace("bearer ", "");
    const decodedToken = verify(token, process.env.JWTKEY);
    // res.send({token,decodedToken})
    const userData = await userModel.findOne({
      _id: decodedToken._id,
      // search inside tokens
      "tokens.token": token,
      isAdmin: true,
    });
    if (!userData) throw new Error("unauthorized data");
    req.user = userData;
    req.token = token;
    
    next();
  } catch (e) {
    resHandler(res, 500, false, e.message, "unauthorized");
  }
};
// **************************************
const authuser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const decodedToken = verify(token, process.env.JWTKEY);
    const userData = await userModel.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });
    if (!userData) throw new Error("unauthorized data");
    req.user = userData;
    req.token = token;
    next();
  } catch (e) {
    resHandler(res, 500, false, e.message, "unauthorized");
  }
};
module.exports = { auth, authuser };
