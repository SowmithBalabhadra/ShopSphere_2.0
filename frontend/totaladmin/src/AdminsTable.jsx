import React, { useEffect, useState } from 'react';
import API from './api';

const AdminsTable = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const fetchAdmins = async () => {
    try {
      const res = await API.get('/admins');
      setAdmins(res.data.data);
    } catch (err) {
      alert('Failed to fetch admins');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admins', formData);
      setFormData({ name: '', email: '', password: '' });
      fetchAdmins();
    } catch (err) {
      alert('Failed to add admin');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await API.delete(`/admins/${id}`);
        fetchAdmins();
      } catch (err) {
        alert('Failed to delete admin');
      }
    }
  };

  return (
    <div>
      <h2>Admins Management</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Add Admin</button>
      </form>

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Password</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
              <td>
                <button onClick={() => handleDelete(admin._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsTable;
