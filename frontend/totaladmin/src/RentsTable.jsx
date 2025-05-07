import React, { useEffect, useState } from 'react';
import API from './api';

const RentsTable = () => {
  const [rents, setRents] = useState([]);

  const fetchRents = async () => {
    try {
      const res = await API.get('/rents');
      setRents(res.data.data);
    } catch (err) {
      alert('Failed to fetch rents');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rent entry?')) {
      try {
        await API.delete(`/rents/${id}`);
        fetchRents();
      } catch (err) {
        alert('Failed to delete rent entry');
      }
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  return (
    <div>
      <h2>Rent Entries Management</h2>
      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Shop</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rents.map(rent => (
            <tr key={rent._id}>
              <td>{rent.shopName || 'N/A'}</td>
              <td>{rent.amount}</td>
              <td>{rent.fromDate ? new Date(rent.fromDate).toLocaleDateString() : 'N/A'}</td>
              <td>{rent.toDate ? new Date(rent.toDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button onClick={() => handleDelete(rent._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentsTable;
