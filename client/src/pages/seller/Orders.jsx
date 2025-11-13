import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'
import toast from 'react-hot-toast'

const Orders = () => {
  const { currency, axios } = useAppContext()
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])

  // Filters
  const [searchCity, setSearchCity] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [paidStatus, setPaidStatus] = useState("")

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller')
      if (data.success) {
        setOrders(data.orders)
        setFilteredOrders(data.orders)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Failed to fetch orders")
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // 🔍 Apply Filters
  useEffect(() => {
    let tempOrders = [...orders]

    // Filter by city
    if (searchCity.trim() !== "") {
      tempOrders = tempOrders.filter(order =>
        order.address.city.toLowerCase().includes(searchCity.toLowerCase())
      )
    }

    // Filter by date
    if (selectedDate) {
      tempOrders = tempOrders.filter(order => {
        const orderDate = new Date(order.createdAt).toISOString().split("T")[0]
        return orderDate === selectedDate
      })
    }

    // Filter by paid status
    if (paidStatus !== "") {
      const isPaidFilter = paidStatus === "true"
      tempOrders = tempOrders.filter(order => order.isPaid === isPaidFilter)
    }

    setFilteredOrders(tempOrders)
  }, [searchCity, selectedDate, paidStatus, orders])

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gray-50">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-xl font-semibold">Orders</h2>

        {/* 🔍 Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <input
            type="text"
            placeholder="Search by city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md w-full md:w-64"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <select
            value={paidStatus}
            onChange={(e) => setPaidStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Payments</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>
          <button
            onClick={() => { setSearchCity(""); setSelectedDate(""); setPaidStatus(""); }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Clear
          </button>
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">City</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      {order.address.firstName} {order.address.lastName}
                    </td>
                    <td className="px-6 py-4">{order.address.city}</td>
                    <td className="px-6 py-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          {item.product.name} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {currency}{order.amount}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders
