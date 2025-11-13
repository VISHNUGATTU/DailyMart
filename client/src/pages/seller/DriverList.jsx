import { useEffect, useState } from "react";
import axios from "axios";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/drivers/list");
        setDrivers(data.data);
      } catch (err) {
        setError("Failed to fetch drivers");
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Drivers List</h2>

      {loading && <p>Loading drivers...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3">License</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d._id} className="border-t">
                  <td className="p-3">{d.name}</td>
                  <td className="p-3">{d.licenseNumber}</td>
                  <td className="p-3">
                    {d.vehicleDetails?.vehicleType} - {d.vehicleDetails?.vehicleNumber}
                  </td>
                  <td className="p-3">{d.email}</td>
                  <td className="p-3">{d.phone}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        d.status === "available"
                          ? "bg-green-500"
                          : d.status === "on-delivery"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {d.status}
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

export default DriverList;
