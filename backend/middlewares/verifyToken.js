const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const Authorization = req.header("authorization");

  if (!Authorization) {
    //error Unauthorized
  }

  //Get token
  const token = Authorization.replace("Bearer ", "");

  //verify
  const { userId } = jwt.verify(token, process.env.APP_SECRET);

  //Assign req
  req.user = { userId };
  next();
};
