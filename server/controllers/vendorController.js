import Vendor from "../models/Vendor.js";

// 🏪 Add Vendor : /api/vendors/add
export const addVendor = async (req, res) => {
  try {
    const { name, businessName, email, phone, password, address, gstNumber } = req.body;

    // Create vendor with only allowed fields
    const vendor = await Vendor.create({
      name,
      businessName,
      email,
      phone,
      password,
      address,
      gstNumber,
    });

    res.json({
      success: true,
      message: "Vendor added successfully",
      data: vendor,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🏪 Get All Vendors : /api/vendors/list
export const vendorList = async (req, res) => {
  try {
    const vendors = await Vendor.find().select("-password");
    res.json({ success: true, data: vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🏪 Get Vendor By ID : /api/vendors/:id
export const vendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select("-password");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🏪 Change Vendor Status : /api/vendors/status/:id
export const changeVendorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // If Vendor is logged in, restrict them to only update their own account
    if (req.vendor && req.vendor._id.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: "Vendors can only update their own status",
      });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("-password");

    if (!updatedVendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.json({
      success: true,
      message: "Vendor status updated successfully",
      data: updatedVendor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🏪 Delete Vendor : /api/vendors/delete/:id
export const deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!deletedVendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.json({
      success: true,
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
