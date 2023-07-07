const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async(req, res, next) => {
  
try {
 
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      const user = await User.findOne({_id: decode.id}).exec();
      if(err){
        req.user = undefined;
      }
     
      req.user = user;
      next();

    });
  } else {
    req.user = undefined;
    next();
  }
}catch(error){
  console.log(error.message);
}
};
module.exports = verifyToken;