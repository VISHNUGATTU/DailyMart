import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const { orders, currency,axios,user} = useAppContext();
  const [myOrders, setMyOrders] = useState([]);

  const fetchMyOrders = async () => {
    try {
        const {data}=await axios.get('/api/order/user');
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(user){
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16 px-4 md:px-8">
      {/* Title */}
      <div className="flex flex-col items-start w-max group">
        <p className="text-2xl font-medium uppercase relative cursor-pointer">
          My Orders
          <span className="absolute left-0 -bottom-1 h-0.5 bg-green rounded-full transition-all duration-500 ease-in-out w-6 group-hover:w-full"></span>
        </p>
      </div>

      {/* Orders List */}
      <div className="mt-10 space-y-10">
        {myOrders.map((order, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-5 max-w-5xl w-full bg-white shadow-md">
            {/* Order Top Info */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-500 font-medium text-sm md:text-base mb-4 gap-1">
              <span>OrderId: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total Amount: {currency} {order.amount}</span>
            </div>

            {/* Items List */}
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className={`relative bg-white text-gray-500/70 ${order.items.length !== index + 1 ? 'border-b' : ''} border-gray-300 flex flex-col md:flex-row md:items-center justify-between gap-4 py-4`}
                >
                  {/* Image & Name */}
                  <div className="flex items-center gap-6">
                    <div className="bg-green-100 p-4 rounded-lg">
                      <img src={item.product.image[0]} alt="" className="w-16 h-16 object-cover" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-black">{item.product.name}</h2>
                      <p className="text-sm text-gray-400">Category: {item.product.category}</p>
                    </div>
                  </div>

                  {/* Quantity, Status, Date */}
                  <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                    <p>Quantity: {item.quantity || "1"}</p>
                    <p>Status: {order.status}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Amount */}
                  <p className="text-primary text-sm font-medium">
                    Amount: {currency} {item.product.offerPrice * (item.quantity || 1)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
