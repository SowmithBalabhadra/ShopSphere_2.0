import React, { useEffect, useState } from 'react';
import API from './api';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data.data);
    } catch (err) {
      alert('Failed to fetch orders');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await API.delete(`/orders/${id}`);
        fetchOrders();
      } catch (err) {
        alert('Failed to delete order');
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders Management</h2>

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.userId || 'N/A'}</td>
              <td>
                {order.items && order.items.length > 0
                  ? order.items.map(i => `${i.name} (${i.quantity})`).join(', ')
                  : 'No items'}
              </td>
              <td>{order.amount}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
