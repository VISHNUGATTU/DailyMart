import jwt from 'jsonwebtoken';
import Product from "../models/Product.js   "; 



//Login Seller : /api/seller/login

export const sellerLogin=async(req,res)=>{
    try{
        const {email,password} = req.body;
    if(email===process.env.SELLER_EMAIL && password===process.env.SELLER_PASSWORD){
        const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('sellerToken',token,{httpOnly:true,secure: process.env.NODE_ENV === "production",sameSite:process.env.NODE_ENV === "production" ? "none" : "strict", maxAge: 7 * 24 * 60 * 60 * 1000}); // 7 days
        res.json({success:true,message:"Login successful"});
    }
    return res.json({success:false,message:"Invalid credentials"});
    }catch(error){
        console.error(error.message);
        res.json({success:false,message:error.message});
    }
}

//Seller isAuth : /api/seller/isAuth

export const isSellerAuth=async(req,res)=>{
    try{
        return res.json({success:true,message:"Seller is authorized"});
    }catch(error){
        console.error(error.message);
        res.json({success:false,message:error.message});
    }
}


//Seller Logout : /api/seller/logout

export const sellerLogout=async(req,res)=>{
    try{
        res.clearCookie('sellerToken',{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? "none" : "strict"
        });
        return res.json({success:true,message:"Logout successful"});
    }catch(error){
        console.error(error.message);
        res.json({success:false,message:error.message});
    }
}


// Toggle stock availability : /api/seller/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body; // accept `id` instead of productId

    const product = await Product.findById(id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // If inStock is passed, use it; otherwise toggle
    product.inStock = typeof inStock === "boolean" ? inStock : !product.inStock;
    await product.save();

    return res.json({
      success: true,
      message: `Product stock updated to ${product.inStock ? "In Stock" : "Out of Stock"}`,
      product,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

