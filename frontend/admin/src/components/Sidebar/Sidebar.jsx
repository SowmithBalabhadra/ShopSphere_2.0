// C:\Users\sowmi\Desktop\shopsphere\admin\src\components\Sidebar\Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/dashboard' className="sidebar-option">
        <img src={assets.add_icon} alt="Add Items" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.order_icon} alt="List Items" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
