import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Pencil, Plus, MapPin, Trash2 } from 'lucide-react';

const Profile = () => {
  const { axios, user } = useAppContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/api/user/profile', { withCredentials: true });
      if (data.success) {
        setProfile(data.user);
        setAddresses(data.addresses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch profile");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }
    try {
      const { data } = await axios.delete(`/api/address/${id}`);
      if (data.success) {
        toast.success("Address deleted");
        fetchProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchProfile();
  }, [user]);

  if (!profile) {
    return <div className="p-6 text-center text-gray-500 text-lg">Loading profile...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

      {/* User Info */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          👤 Profile Information
        </h2>
        <div className="space-y-2 text-lg text-gray-700">
          <p><span className="font-semibold">Name:</span> {profile.name}</p>
          <p><span className="font-semibold">Email:</span> {profile.email}</p>
        </div>
      </div>

      {/* Addresses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" /> Your Addresses
          </h2>
          <button
            onClick={() => navigate('/add-address', { state: { email: profile.email } })}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl shadow-md hover:bg-primary/90 transition"
          >
            <Plus className="w-5 h-5" /> Add Address
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {addresses.length === 0 ? (
            <p className="text-gray-500 col-span-2">No addresses found. Please add one.</p>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr._id}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {addr.firstName} {addr.lastName}
                </h3>
                <div className="space-y-1 text-gray-700 text-sm">
                  <p><span className="font-semibold">Email:</span> {addr.email}</p>
                  <p><span className="font-semibold">Street:</span> {addr.street}</p>
                  <p><span className="font-semibold">City:</span> {addr.city}</p>
                  <p><span className="font-semibold">State:</span> {addr.state}</p>
                  <p><span className="font-semibold">Zip:</span> {addr.zipCode}</p>
                  <p><span className="font-semibold">Country:</span> {addr.country}</p>
                  <p><span className="font-semibold">Phone:</span> {addr.phone}</p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate('/edit-address', { state: { address: addr } })}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
