import { useState } from "react";
import axios from "axios";

const AddVendor = () => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    gstNumber: "",
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
      const response = await axios.post("http://localhost:5000/api/vendors/add", {
        name: formData.name,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
        },
        gstNumber: formData.gstNumber,
      });

      setMessage(response.data.message);
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        password: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
        gstNumber: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add Vendor</h2>

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
        <input name="name" placeholder="Owner Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full border p-2 rounded" />

        {/* Address Fields */}
        <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="pinCode" placeholder="Pin Code" value={formData.pinCode} onChange={handleChange} className="w-full border p-2 rounded" />

        <input name="gstNumber" placeholder="GST Number" value={formData.gstNumber} onChange={handleChange} className="w-full border p-2 rounded" />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Vendor"}
        </button>
      </form>
    </div>
  );
};

export default AddVendor;
