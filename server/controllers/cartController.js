import User from "../models/User.js";



// Update User CartData : /api/cart/update
// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.userId;  // ✅ get from authUser middleware

    await User.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
