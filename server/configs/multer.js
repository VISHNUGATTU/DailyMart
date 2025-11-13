import multer from "multer";

// Use memory storage for Cloudinary
export const upload = multer({ storage: multer.memoryStorage() });
