import React, { useEffect, useState } from 'react';
import API from './api';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await API.get('/users');
    setUsers(res.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/users/${editId}`, formData);
      } else {
        await API.post('/users', formData);
      }
      setFormData({ name: '', email: '', password: '' });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      alert('Error saving user');
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, password: user.password });
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await API.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div>
      <h2>Users Management</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">{editId ? 'Update' : 'Add'} User</button>
      </form>

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Password</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
