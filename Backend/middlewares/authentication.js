const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log("Came in middleware");
  const token = req.header("token");
  console.log("token", token);
  if (!token) {
    res.status(401).json({ status: 0, debug_msg: "token not found" });
  }
  try {
    console.log("Came in try");
    const decodedToken = jwt.verify(token, "secret_string", (err, payload) => {
      if (err) {
        console.log("call back error", err);
      } else {
        console.log(payload);
      }
    });
    console.log(decodedToken);
    next();
  } catch (error) {
    console.log(error);
    console.log("error in catch");
    res.status(500).json({ status: 0, debug_msg: "Token sent is not valid" });
  }
};
