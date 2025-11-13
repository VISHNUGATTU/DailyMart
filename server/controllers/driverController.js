import Driver from "../models/Driver.js";

// 🚗 Add Driver : /api/drivers/add
export const addDriver = async (req, res) => {
  try {
    const {
      name,
      licenseNumber,
      vehicleDetails,
      email,
      phone,
      password,
    } = req.body;

    // Create driver with only allowed fields
    const driver = await Driver.create({
      name,
      licenseNumber,
      vehicleDetails,
      email,
      phone,
      password,
    });

    res.json({
      success: true,
      message: "Driver added successfully",
      data: driver,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🚗 Get All Drivers : /api/drivers/list
export const driverList = async (req, res) => {
  try {
    const drivers = await Driver.find().select("-password");
    res.json({ success: true, data: drivers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🚗 Get Driver By ID : /api/drivers/:id
export const driverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).select("-password");

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.json({ success: true, data: driver });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🚗 Change Driver Status : /api/drivers/status/:id
export const changeDriverStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // If Driver is logged in, restrict them to only update their own status
    if (req.driver && req.driver._id.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: "Drivers can only update their own status",
      });
    }

    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("-password");

    if (!updatedDriver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.json({
      success: true,
      message: "Driver status updated successfully",
      data: updatedDriver,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🚗 Delete Driver : /api/drivers/delete/:id
export const deleteDriver = async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);

    if (!deletedDriver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
