import express from "express";
import { addDriver, driverList, driverById, changeDriverStatus, deleteDriver } from "../controllers/driverController.js";
import authSeller from "../middlewares/authSeller.js";

const driverRouter = express.Router();

driverRouter.post("/add",authSeller, addDriver);
driverRouter.get("/list",authSeller, driverList);
driverRouter.get("/:id",authSeller, driverById);
driverRouter.put("/status/:id", changeDriverStatus);
driverRouter.delete("/delete/:id", deleteDriver);

export default driverRouter;
