import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { assets } from '../../assets/assets'; // Make sure seller_bg and home_logo are defined
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate,axios} = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const {data} = await axios.post('/api/seller/login',{email,password})
      if (data.success) {
        setIsSeller(true);
        navigate('/seller');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate('/seller');
    }
  }, [isSeller]);



  return (
    !isSeller && (
      <div
  className="no-scrollbar min-h-full bg-cover bg-center bg-fixed relative"
  style={{ backgroundImage: `url(${assets.selllogin})` }}
>


        <img src={assets.home_logo} alt="logo" className="absolute top-5 right-5 w-24 sm:w-28" />


        <form
  onSubmit={onSubmitHandler}
  className="min-h-screen flex items-center text-sm text-gray-600"
>
  <div className="flex flex-col gap-5 m-auto items-start p-8 py-10 min-w-80 sm:min-w-88 
    rounded-xl border bg-white">
    
    <img src={assets.home_logo} alt="Daily Mart Logo" className="w-37 h-10 mx-auto mb-1" />

    <p className="text-xl font-medium m-auto text-gray-800">
      <span className="text-black">Seller</span> Login
    </p>

    <div className="w-full">
      <p className="text-black">Email</p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="enter your email"
        className="border border-black rounded w-full p-2 mt-1 outline-green"
        required
      />
    </div>

    <div className="w-full">
      <p className="text-black">Password</p>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="enter your password"
        className="border border-black rounded w-full p-2 mt-1 outline-green"
        required
      />
    </div>

    <button className="bg-green-600 text-white w-full py-2 rounded-md cursor-pointer">
      Login
    </button>
  </div>
</form>

      </div>
    )
  );
};

export default SellerLogin;
