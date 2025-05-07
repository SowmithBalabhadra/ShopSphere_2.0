import React, { useEffect, useState } from 'react';
import API from './api';

const ItemsTable = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const res = await API.get('/items');
    setItems(res.data.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/items/${editId}`, formData);
      } else {
        await API.post('/items', formData);
      }
      setFormData({ name: '', price: '', description: '' });
      setEditId(null);
      fetchItems();
    } catch (err) {
      alert('Error saving item');
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, price: item.price, description: item.description || '' });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await API.delete(`/items/${id}`);
      fetchItems();
    }
  };

  return (
    <div>
      <h2>Items Management</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <button type="submit">{editId ? 'Update' : 'Add'} Item</button>
      </form>

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
