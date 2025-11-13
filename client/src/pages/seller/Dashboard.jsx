import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    paidOrders: 0,
    pendingOrders: 0,
  });

  // 📌 pagination states
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewAll, setViewAll] = useState(false);

  // 📌 filter states
  const [searchProduct, setSearchProduct] = useState("");
  const [searchStreet, setSearchStreet] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("all");

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);

        // 📊 Calculate stats
        const totalOrders = data.orders.length;
        const totalRevenue = data.orders.reduce((acc, o) => acc + o.amount, 0);
        const paidOrders = data.orders.filter((o) => o.isPaid).length;
        const pendingOrders = totalOrders - paidOrders;

        setStats({ totalOrders, totalRevenue, paidOrders, pendingOrders });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔍 Filtering logic
  const filteredOrders = orders.filter((order) => {
    // ✅ filter by product name
    const matchesProduct = searchProduct
        ? order.products?.some((p) =>
            p.productName.toLowerCase().includes(searchProduct.toLowerCase())
            )
        : true;


    // ✅ filter by street
    const matchesStreet = searchStreet
      ? order.address.street.toLowerCase().includes(searchStreet.toLowerCase())
      : true;

    // ✅ filter by amount range
    const matchesAmount =
      (minAmount === "" || order.amount >= Number(minAmount)) &&
      (maxAmount === "" || order.amount <= Number(maxAmount));

    // ✅ filter by payment status
    const matchesPayment =
      paymentStatus === "all"
        ? true
        : paymentStatus === "paid"
        ? order.isPaid
        : !order.isPaid;

    return matchesProduct && matchesStreet && matchesAmount && matchesPayment;
  });

  // 📊 Stats for filtered orders
  const filteredStats = {
    totalOrders: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((acc, o) => acc + o.amount, 0),
    paidOrders: filteredOrders.filter((o) => o.isPaid).length,
    pendingOrders:
      filteredOrders.length - filteredOrders.filter((o) => o.isPaid).length,
  };

  // 🔍 Orders to show (filtered + paginated)
  const displayedOrders = viewAll
    ? filteredOrders
    : filteredOrders.slice(0, itemsPerPage);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gray-50">
      <div className="md:p-10 p-4 space-y-8">
        <h2 className="text-2xl font-semibold">Dashboard</h2>

        {/* 📊 Overall Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
          </div>
          <div className="p-5 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-sm text-gray-500">Revenue</p>
            <h3 className="text-2xl font-bold text-green-600">
              {currency}{stats.totalRevenue}
            </h3>
          </div>
          <div className="p-5 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-sm text-gray-500">Paid Orders</p>
            <h3 className="text-2xl font-bold text-blue-600">{stats.paidOrders}</h3>
          </div>
          <div className="p-5 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h3 className="text-2xl font-bold text-red-600">{stats.pendingOrders}</h3>
          </div>
        </div>

        {/* 🔍 Filters */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-3">
          <h3 className="text-md font-medium">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Search by product"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
            <input
              type="text"
              placeholder="Search by street"
              value={searchStreet}
              onChange={(e) => setSearchStreet(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
            <input
              type="number"
              placeholder="Min amount"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
            <input
              type="number"
              placeholder="Max amount"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* 📊 Filtered Stats */}
        {(searchProduct || searchStreet || minAmount || maxAmount || paymentStatus !== "all") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-white rounded-lg shadow border border-gray-200">
              <p className="text-sm text-gray-500">Filtered Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">{filteredStats.totalOrders}</h3>
            </div>
            <div className="p-5 bg-white rounded-lg shadow border border-gray-200">
              <p className="text-sm text-gray-500">Filtered Revenue</p>
              <h3 className="text-2xl font-bold text-green-600">
                {currency}{filteredStats.totalRevenue}
              </h3>
            </div>
            <div className="p-5 bg-white rounded-lg shadow border border-gray-200">
              <p className="text-sm text-gray-500">Paid Orders</p>
              <h3 className="text-2xl font-bold text-blue-600">{filteredStats.paidOrders}</h3>
            </div>
            <div className="p-5 bg-white rounded-lg shadow border border-gray-200">
              <p className="text-sm text-gray-500">Pending Orders</p>
              <h3 className="text-2xl font-bold text-red-600">{filteredStats.pendingOrders}</h3>
            </div>
          </div>
        )}

        {/* 📋 Recent Orders */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <div className="flex flex-wrap justify-between items-center p-4 border-b border-gray-200 gap-3">
            <h3 className="text-lg font-medium">Recent Orders</h3>

            <div className="flex items-center gap-4">
              {!viewAll && (
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value={10}>10 / page</option>
                  <option value={50}>50 / page</option>
                  <option value={100}>100 / page</option>
                </select>
              )}
              <button
                onClick={() => setViewAll(!viewAll)}
                className="text-sm text-blue-600 hover:underline"
              >
                {viewAll ? "Show Paginated" : "View All"}
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">City</th>
                <th className="px-6 py-3">Street</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.address.firstName} {order.address.lastName}
                  </td>
                  <td className="px-6 py-4">{order.address.city}</td>
                  <td className="px-6 py-4">{order.address.street}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {currency}{order.amount}
                  </td>
                  <td className="px-6 py-4">
                    {order.isPaid ? (
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No matching orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {!viewAll && filteredOrders.length > 0 && (
            <div className="p-4 text-sm text-gray-500">
              Showing {displayedOrders.length} of {filteredOrders.length} filtered orders
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
