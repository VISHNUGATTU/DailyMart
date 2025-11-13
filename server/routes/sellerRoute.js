import express from 'express';
import { changeStock, isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

// Use actual controller function
sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth',authSeller, isSellerAuth);
sellerRouter.post('/logout',authSeller, sellerLogout);
sellerRouter.post('/stock', authSeller, changeStock);

export default sellerRouter;
