const passport = require("passport");

exports.protect = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
