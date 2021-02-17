const jwt = require("jwt-then"),
  resUtil = require("../middlewares/response"),
  Messages = require("../config/messages"),
  config = require("config-yml");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send(resUtil.sendError(Messages.responses.invalidToken));
    }
    const token = req.headers.authorization;
    //console.log('Token===>', token);
    const payload = await jwt.verify(token, config.SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    return res
      .status(401)
      .send(resUtil.sendError(Messages.responses.invalidToken));
  }
};
