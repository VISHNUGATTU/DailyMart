import authSeller from "./authSeller.js";
import authDriver from "./authVendor.js";

const authSellerOrDriver = async (req, res, next) => {
  try {
    // Try Seller authentication first
    await authSeller(req, res, () => {
      return next();
    });
  } catch (err) {
    // If not Seller, try Driver authentication
    try {
      await authDriver(req, res, () => {
        return next();
      });
    } catch (err2) {
      return res.status(401).json({ success: false, message: "Not authorized as Seller or Driver" });
    }
  }
};

export default authSellerOrDriver;
