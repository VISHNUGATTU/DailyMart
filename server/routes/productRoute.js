import express from "express";
import { upload } from "../configs/multer.js";
import {addProduct,productList,productById,changeStock,} from "../controllers/productController.js";
import authSeller from "../middlewares/authSeller.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array("images"),authSeller, addProduct);
productRouter.get("/list", productList);
productRouter.post("/stock", authSeller, changeStock);
productRouter.get("/:id", productById);

export default productRouter;
