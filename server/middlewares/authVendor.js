import jwt from "jsonwebtoken";
import Vendor from "../models/Vendor.js"; // adjust the path if needed

const authVendor = async (req, res, next) => {
  try {
    const { vendorToken } = req.cookies;

    if (!vendorToken) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(vendorToken, process.env.JWT_SECRET);

    // Find vendor in DB
    const vendor = await Vendor.findById(decoded.id).select("-password");
    if (!vendor) {
      return res.status(401).json({ success: false, message: "Vendor not found" });
    }

    // Attach vendor to request
    req.vendor = vendor;
    next();
  } catch (error) {
    console.error("AuthVendor Error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

export default authVendor;
