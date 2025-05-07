import React, { useEffect, useState } from 'react';
import API from './api';

const ShopTakersTable = () => {
  const [takers, setTakers] = useState([]);

  const fetchTakers = async () => {
    try {
      const res = await API.get('/shop-takers');
      setTakers(res.data.data);
    } catch (err) {
      alert('Failed to fetch shop takers');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shop taker?')) {
      try {
        await API.delete(`/shop-takers/${id}`);
        fetchTakers();
      } catch (err) {
        alert('Failed to delete shop taker');
      }
    }
  };

  useEffect(() => {
    fetchTakers();
  }, []);

  return (
    <div>
      <h2>Shop Takers Management</h2>
      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {takers.map(taker => (
            <tr key={taker._id}>
              <td>{taker.name}</td>
              <td>{taker.email}</td>
              <td>{taker.phone}</td>
              <td>
                <button onClick={() => handleDelete(taker._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopTakersTable;
