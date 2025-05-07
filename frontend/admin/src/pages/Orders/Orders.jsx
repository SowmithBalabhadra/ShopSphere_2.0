
import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    } else {
      toast.error('Error');
    }
  };

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Out for delivery':
      case 'Ready to pickup':
        return 'status-out-for-delivery';
      case 'Delivered':
        return 'status-delivered';
      default:
        return 'status-processing';
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className={`order-item ${getStatusClass(order.status)}`}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  `${item.name} x ${item.quantity}${index < order.items.length - 1 ? ', ' : ''}`
                ))}
              </p>
              <p className="order-item-name">
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div className="order-item-address">
                <p>{`${order.address.street},`}</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              name="status"
              id={`status-${order._id}`}
            >
              <option value="Processing order">Processing order</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Ready to pickup">Ready to pickup</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
