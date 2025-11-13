import express from "express"
import authUser from '../middlewares/authUser.js';
import { addAddress, deleteAddress, editAddress, getAddress } from "../controllers/addressController.js";
const addressRouter = express.Router();

addressRouter.post("/add", authUser, addAddress);
addressRouter.post("/get", authUser, getAddress);
addressRouter.put("/:id", authUser, editAddress);
addressRouter.delete("/:id", authUser, deleteAddress);

export default addressRouter;