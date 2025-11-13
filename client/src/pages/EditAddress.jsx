import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

const InputField = ({ type, placeholder, name, handleChange, address, readOnly }) => (
  <input
    className={`w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
    readOnly={readOnly}
  />
);

const EditAddress = () => {
  const { axios, user, navigate } = useAppContext();
  const location = useLocation();
  const existingAddress = location.state?.address;

  const [address, setAddress] = useState(existingAddress || {
    firstName: "",
    lastName: "",
    email: user?.email || "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...address, zipCode: Number(address.zipCode) };
      const { data } = await axios.put(`/api/address/${address._id}`, { address: payload });
      if (data.success) {
        toast.success("Address updated successfully");
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update address. Please try again.");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="mt-16 pb-16 ml-14">
      <p className="text-2xl md:text-3xl text-gray-500">
        Edit Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        {/* Address Form */}
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField name="firstName" type="text" placeholder="First Name" handleChange={handleChange} address={address} />
              <InputField name="lastName" type="text" placeholder="Last Name" handleChange={handleChange} address={address} />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <InputField name="email" type="email" placeholder="Email address" handleChange={handleChange} address={address} readOnly />
              <InputField name="street" type="text" placeholder="Street" handleChange={handleChange} address={address} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField name="city" type="text" placeholder="City" handleChange={handleChange} address={address} />
              <InputField name="state" type="text" placeholder="State" handleChange={handleChange} address={address} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField name="zipCode" type="text" placeholder="Zipcode" handleChange={handleChange} address={address} />
              <InputField name="country" type="text" placeholder="Country" handleChange={handleChange} address={address} />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <InputField name="phone" type="text" placeholder="Phone" handleChange={handleChange} address={address} />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase"
            >
              Update Address
            </button>
          </form>
        </div>

        {/* Right Image */}
        <img className="md:mr-16 mb-16 md:mt-0" src={assets.add_address_iamge} alt="address" />
      </div>
    </div>
  );
};

export default EditAddress;
