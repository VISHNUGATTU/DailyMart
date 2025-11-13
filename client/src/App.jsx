import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import Contact from './components/Contact';
import ProductCategory from './components/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Profile from './components/Profile';
import EditAddress from './pages/EditAddress';
import Dashboard from './pages/seller/Dashboard';
import AddWorker from './pages/seller/AddWorker';
import WorkerList from './pages/seller/WorkerList';
import AddVendor from './pages/seller/AddVendor';
import VendorList from './pages/seller/VendorList';
import AddDriver from './pages/seller/AddDriver';
import DriverList from './pages/seller/DriverList';

const App = () => {
  const isSellerPath= useLocation().pathname.includes('seller');
  const isVendorPath= useLocation().pathname.includes('vendor');
  const isWorkerPath= useLocation().pathname.includes('worker');
  const isDriverPath= useLocation().pathname.includes('driver');
  const {showUserLogin,isSeller} =useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar />}
      {
        showUserLogin && <Login/> 
      }
      <Toaster/>
      <div className={`${isSellerPath ? '' : 'px-6 md:px-8 lg:px-10 xl:px-14'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:productId' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/edit-address' element={<EditAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path='/seller' element={isSeller? <SellerLayout/>:<SellerLogin />}>
            <Route index element={isSeller? <AddProduct/>:null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='worker/add' element={<AddWorker />} />
            <Route path='worker-list' element={<WorkerList />} />
            <Route path='vendor/add' element={<AddVendor />} />
            <Route path='vendor-list' element={<VendorList />} />
            <Route path='driver/add' element={<AddDriver />} />
            <Route path='driver-list' element={<DriverList />} />
          </Route>
          
        </Routes>
      </div>
      {
        !isSellerPath && <Footer />
      }
    </div>
  )
}

export default App;