import { useState } from "react";
import axios from "axios";

const AddDriver = () => {
  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
    vehicleType: "bike",
    vehicleNumber: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/drivers/add", {
        name: formData.name,
        licenseNumber: formData.licenseNumber,
        vehicleDetails: {
          vehicleType: formData.vehicleType,
          vehicleNumber: formData.vehicleNumber,
        },
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      setMessage(response.data.message);
      setFormData({
        name: "",
        licenseNumber: "",
        vehicleType: "bike",
        vehicleNumber: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add New Driver</h2>

      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={formData.licenseNumber}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="bike">Bike</option>
          <option value="truck">Truck</option>
        </select>

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Driver"}
        </button>
      </form>
    </div>
  );
};

export default AddDriver;
