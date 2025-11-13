import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/Product.js';
import streamifier from 'streamifier';
// Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    // ✅ Parse productData correctly
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    let productData = {};
    if (req.body.productData) {
      try {
        productData = JSON.parse(req.body.productData);
      } catch (e) {
        return res.status(400).json({ success: false, message: "Invalid productData format" });
      }
    } else {
      return res.status(400).json({ success: false, message: "Missing productData" });
    }

    // ✅ Ensure required fields exist
    if (!productData.name || !productData.category || !productData.price) {
      return res.status(400).json({ success: false, message: "Missing required product fields" });
    }

    const images = req.files || [];

    const imagesUrl = await Promise.all(
      images.map(
        (file) =>
          new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
          })
      )
    );

    await Product.create({ ...productData, image: imagesUrl });

    return res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Add Product Error:", error.message);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
/// Get All Products : /api/product/list
export const productList=async(req,res)=>{
    try{
        const products = await Product.find();
        res.json({success:true, data:products});
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message});
    }
}
/// Get Product By ID : /api/product/:id
export const productById=async(req,res)=>{
    try {
        const {id}=req.params;
        const product = await Product.findById(id);
        res.json({success:true, data:product});
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message});
    }
}
/// Change Product in Stock : /api/product/stock
export const changeStock=async(req,res)=>{
    try {
        const {id, stock} = req.params;
        await Product.findByIdAndUpdate(id, {stock});
        res.json({success:true,message:"Stock updated successfully"});
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message});
    }
}
