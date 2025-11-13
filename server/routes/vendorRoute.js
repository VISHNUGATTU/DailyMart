import express from "express";
import {addVendor,vendorList,vendorById,changeVendorStatus,deleteVendor,} from "../controllers/vendorController.js";
import authSeller from '../middlewares/authSeller.js';
import authSellerOrVendor from "../middlewares/authSellerOrVendor.js";

const vendorRouter = express.Router();

vendorRouter.post("/add",authSeller, addVendor);
vendorRouter.get("/list",authSeller, vendorList);
vendorRouter.get("/:id",authSeller, vendorById);
vendorRouter.put("/status/:id",authSellerOrVendor, changeVendorStatus);
vendorRouter.delete("/delete/:id",authSeller, deleteVendor);

export default vendorRouter;
