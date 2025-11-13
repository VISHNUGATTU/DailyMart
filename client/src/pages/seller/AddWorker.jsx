import { useState } from "react";
import axios from "axios";

const AddWorker = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "packer",
    email: "",
    phone: "",
    password: "",
    assignedWarehouse: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/workers/add", {
        name: formData.name,
        role: formData.role,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        assignedWarehouse: formData.assignedWarehouse || null,
      });

      setMessage(response.data.message);
      setFormData({
        name: "",
        role: "packer",
        email: "",
        phone: "",
        password: "",
        assignedWarehouse: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add Worker</h2>
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
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="packer">Packer</option>
          <option value="warehouse">Warehouse</option>
          <option value="delivery-support">Delivery Support</option>
          <option value="helper">Helper</option>
        </select>
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
        <input
          type="text"
          name="assignedWarehouse"
          placeholder="Assigned Warehouse ID"
          value={formData.assignedWarehouse}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Worker"}
        </button>
      </form>
    </div>
  );
};

export default AddWorker;
