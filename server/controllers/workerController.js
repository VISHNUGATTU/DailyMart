import Worker from "../models/Worker.js";

// 👷 Add Worker : /api/workers/add
export const addWorker = async (req, res) => {
  try {
    const { name, skill, phone, email, password } = req.body;

    // Create worker with only allowed fields
    const worker = await Worker.create({
      name,
      skill,
      phone,
      email,
      password,
    });

    res.json({
      success: true,
      message: "Worker added successfully",
      data: worker,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 👷 Get All Workers : /api/workers/list
export const workerList = async (req, res) => {
  try {
    const workers = await Worker.find().select("-password");
    res.json({ success: true, data: workers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👷 Get Worker By ID : /api/workers/:id
export const workerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).select("-password");

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.json({ success: true, data: worker });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👷 Change Worker Status : /api/workers/status/:id
export const changeWorkerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // If Worker is logged in, restrict them to only update their own account
    if (req.worker && req.worker._id.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: "Workers can only update their own status",
      });
    }

    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("-password");

    if (!updatedWorker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.json({
      success: true,
      message: "Worker status updated successfully",
      data: updatedWorker,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 👷 Delete Worker : /api/workers/delete/:id
export const deleteWorker = async (req, res) => {
  try {
    const deletedWorker = await Worker.findByIdAndDelete(req.params.id);

    if (!deletedWorker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.json({
      success: true,
      message: "Worker deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
