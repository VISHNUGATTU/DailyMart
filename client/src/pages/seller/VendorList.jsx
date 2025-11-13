import { useEffect, useState } from "react";
import axios from "axios";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/vendors/list");
        setVendors(data.data);
      } catch (err) {
        setError("Failed to fetch vendors");
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Vendors List</h2>

      {loading && <p>Loading vendors...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3">Business</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v._id} className="border-t">
                  <td className="p-3">{v.name}</td>
                  <td className="p-3">{v.businessName}</td>
                  <td className="p-3">{v.email}</td>
                  <td className="p-3">{v.phone}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        v.status === "active"
                          ? "bg-green-500"
                          : v.status === "inactive"
                          ? "bg-gray-500"
                          : "bg-red-500"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorList;
