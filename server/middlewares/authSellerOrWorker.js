import authSeller from "./authSeller.js";
import authWorker from "./authWorker.js";

const authSellerOrWorker = async (req, res, next) => {
  try {
    // Try Seller authentication first
    await authSeller(req, res, () => {
      return next();
    });
  } catch (err) {
    // If not Seller, try Worker authentication
    try {
      await authWorker(req, res, () => {
        return next();
      });
    } catch (err2) {
      return res.status(401).json({ success: false, message: "Not authorized as Seller or Driver" });
    }
  }
};

export default authSellerOrWorker;
