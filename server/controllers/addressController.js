import Address from "../models/Address.js";

// Add Address : POST /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!req.userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    // Check if same address already exists
    const existing = await Address.findOne({
      userId: req.userId,
      email: address.email,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone,
    });

    if (existing) {
      return res.json({ success: false, message: "This address already exists" });
    }

    const newAddress = await Address.create({ ...address, userId: req.userId });

    res.json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Add Address Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all addresses : GET /api/address
export const getAddress = async (req, res) => {
  try {
    if (!req.userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const addresses = await Address.find({ userId: req.userId });
    res.json({ success: true, addresses });
  } catch (error) {
    console.error("Get Address Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Edit Address : PUT /api/address/:id
export const editAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body.address;

    if (!req.userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const address = await Address.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { $set: updatedData },
      { new: true }
    );

    if (!address) {
      return res.json({ success: false, message: "Address not found" });
    }

    res.json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Edit Address Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Delete Address : DELETE /api/address/:id
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const deleted = await Address.findOneAndDelete({ _id: id, userId: req.userId });

    if (!deleted) {
      return res.json({ success: false, message: "Address not found" });
    }

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete Address Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
