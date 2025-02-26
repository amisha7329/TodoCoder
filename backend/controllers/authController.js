const jwt = require("jsonwebtoken");
const passport = require("passport");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
};

// google login
exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// google-callbacl
exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err) {
      return res.redirect("http://localhost:5173/?error=true");
    }
    const token = generateToken(user);
    const userString = encodeURIComponent(JSON.stringify({
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    }));
    res.redirect(`http://localhost:5173/dashboard?token=${token}&user=${userString}`);
  })(req, res, next);
};

// logout
exports.logout = (req, res) => {
  res.json({ message: "Logout successful. Clear token on frontend." });
};
