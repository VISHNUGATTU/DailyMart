import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address, timeSlot } = req.body;
    const userId = req.userId;

    if (!address || !items || items.length === 0 || !timeSlot) {
      return res.json({ success: false, message: "Invalid order" });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      amount += product.offerPrice * item.quantity;
    }

    const order = await Order.create({
      userId,
      items: items.map(i => ({
        product: i.productId,
        quantity: i.quantity
      })),
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
      status: "Order Placed",
      time: new Date(),
      timeSlot   // ✅ save in DB
    });

    return res.json({ success: true, message: "Order Placed Successfully", order });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from token middleware
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Orders (for seller/admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
