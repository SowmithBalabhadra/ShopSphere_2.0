import React, { useEffect, useState } from 'react';
import API from './api';

const ShopOwnersTable = () => {
  const [owners, setOwners] = useState([]);

  const fetchOwners = async () => {
    try {
      const res = await API.get('/shop-owners');
      setOwners(res.data.data);
    } catch (err) {
      alert('Failed to fetch shop owners');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shop owner?')) {
      try {
        await API.delete(`/shop-owners/${id}`);
        fetchOwners();
      } catch (err) {
        alert('Failed to delete shop owner');
      }
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  return (
    <div>
      <h2>Shop Owners Management</h2>
      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map(owner => (
            <tr key={owner._id}>
              <td>{owner.name}</td>
              <td>{owner.email}</td>
              <td>{owner.phone}</td>
              <td>
                <button onClick={() => handleDelete(owner._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShopOwnersTable;
