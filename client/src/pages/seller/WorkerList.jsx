import { useEffect, useState } from "react";
import axios from "axios";

const WorkerList = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/workers/list")
      .then((res) => {
        setWorkers(res.data.data);
        setFilteredWorkers(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let data = workers;

    if (search) {
      data = data.filter(
        (w) =>
          w.name.toLowerCase().includes(search.toLowerCase()) ||
          w.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter) {
      data = data.filter((w) => w.role === roleFilter);
    }

    if (statusFilter) {
      data = data.filter((w) => w.status === statusFilter);
    }

    setFilteredWorkers(data);
  }, [search, roleFilter, statusFilter, workers]);

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* Workers Table */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Workers List</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.map((worker) => (
              <tr key={worker._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{worker.name}</td>
                <td className="p-2 capitalize">{worker.role}</td>
                <td className="p-2">{worker.email}</td>
                <td className="p-2">{worker.phone}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      worker.status === "active"
                        ? "bg-green-100 text-green-700"
                        : worker.status === "inactive"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {worker.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filters Sidebar */}
      <div className="w-full md:w-72 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Search & Filters</h3>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">All Roles</option>
            <option value="packer">Packer</option>
            <option value="warehouse">Warehouse</option>
            <option value="delivery-support">Delivery Support</option>
            <option value="helper">Helper</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default WorkerList;