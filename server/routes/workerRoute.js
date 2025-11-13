import express from "express";
import {addWorker,workerList,workerById,changeWorkerStatus,deleteWorker,} from "../controllers/workerController.js";
import authSeller from "../middlewares/authSeller.js";
import authSellerOrWorker from "../middlewares/authSellerOrWorker.js";

const workerRouter = express.Router();

workerRouter.post("/add",authSeller, addWorker);
workerRouter.get("/list",authSeller, workerList);
workerRouter.get("/:id",authSeller, workerById);
workerRouter.put("/status/:id",authSellerOrWorker, changeWorkerStatus);
workerRouter.delete("/delete/:id",authSeller, deleteWorker);

export default workerRouter;
