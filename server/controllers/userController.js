import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Address from "../models/Address.js";

//Register the user: /api/user/register

export const registerUser = async (req, res) => {
    try{
        const {name,email,password} = req.body;
        if (!name || !email || !password) {
            return res.json({success:false,message:"Missing Details"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) 
        {
            return res.json({success:false,message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token',token,{httpOnly:true,secure: process.env.NODE_ENV === "production",sameSite:process.env.NODE_ENV === "production" ? "none" : "strict", maxAge: 7 * 24 * 60 * 60 * 1000}); // 7 days
        return res.json({success:true,message:"User registered successfully",user:{email:user.email,name:user.name}});
    }catch(error){
        console.error(error.message);
        res.json({success:false,message:error.message});
    }
}

//Login User : /api/user/login

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if (!email || !password) {
            return res.json({success:false,message:"Email and password are required"});
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.json({success:false,message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({success:false,message:"Invalid password"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token',token,{httpOnly:true,secure: process.env.NODE_ENV === "production",sameSite:process.env.NODE_ENV === "production" ? "none" : "strict", maxAge: 7 * 24 * 60 * 60 * 1000}); // 7 days
        return res.json({success:true,message:"Login successful",user:{email:user.email,name:user.name}});
    }catch(error){
        console.error(error.message);
        res.json({success:false,message:error.message});
    }
}


//Check Auth : /api/user/is-auth

export const isAuth=async(req,res)=>{
    try{
        const userId = req.userId;
        const user=await User.findById(userId).select("-password");
        return res.json({success:true,message:user});
    }catch(error)
    {
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }
}


//Login User : /api/user/logout

export const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? "none" : "strict"  
        });
        return res.json({success:true,message:"Logout successful"});
    }catch(error){
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }
}



export const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // from your authUser middleware
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    // Fetch user info
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Fetch addresses linked to this user's email
    const addresses = await Address.find({ email: user.email });

    return res.json({
      success: true,
      user,
      addresses
    });

  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
