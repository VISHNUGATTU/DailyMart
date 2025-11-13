import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      return res.json({ success: false, message: "Not authorized" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;
