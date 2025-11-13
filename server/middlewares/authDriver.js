import jwt from "jsonwebtoken";
import Driver from "../models/driverModel.js"; // adjust path if needed

const authDriver = async (req, res, next) => {
  try {
    const { driverToken } = req.cookies;

    if (!driverToken) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(driverToken, process.env.JWT_SECRET);

    // Find driver from DB
    const driver = await Driver.findById(decoded.id).select("-password");
    if (!driver) {
      return res.status(401).json({ success: false, message: "Driver not found" });
    }

    // Attach driver to request
    req.driver = driver;
    next();
  } catch (error) {
    console.error("AuthDriver Error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

export default authDriver;
