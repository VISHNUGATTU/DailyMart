import authSeller from "./authSeller.js";
import authVendor from "./authVendor.js";

const authSellerOrVendor = async (req, res, next) => {
  try {
    // Try Seller authentication first
    await authSeller(req, res, () => {
      return next();
    });
  } catch (err) {
    // If not Seller, try Vendor authentication
    try {
      await authVendor(req, res, () => {
        return next();
      });
    } catch (err2) {
      return res.status(401).json({ success: false, message: "Not authorized as Seller or Vendor" });
    }
  }
};

export default authSellerOrVendor;
