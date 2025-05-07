import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  return (
    <>
      <ToastContainer 
        toastClassName="custom-toast" 
        style={{ fontSize: '13px' }} 
      />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path='/' element={<Home searchQuery={searchQuery} />} /> {/* Pass searchQuery here */}
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
