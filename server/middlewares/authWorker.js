import jwt from "jsonwebtoken";
import Worker from "../models/Worker.js"; // adjust the path if needed

const authWorker = async (req, res, next) => {
  try {
    const { workerToken } = req.cookies;

    if (!workerToken) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(workerToken, process.env.JWT_SECRET);

    // Find worker in DB
    const worker = await Worker.findById(decoded.id).select("-password");
    if (!worker) {
      return res.status(401).json({ success: false, message: "Worker not found" });
    }

    // Attach worker to request
    req.worker = worker;
    next();
  } catch (error) {
    console.error("AuthWorker Error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

export default authWorker;
