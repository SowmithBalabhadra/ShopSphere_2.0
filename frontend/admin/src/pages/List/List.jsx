import React, { useEffect, useState } from 'react';
import './List.css';
import { url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Simulated Solr Search: Fetch full data once
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        setFilteredItems(response.data.data); // Initial render
      } else {
        toast.error('Failed to fetch data');
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  // Simulated Solr Delete
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh after deletion
      } else {
        toast.error('Error deleting');
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  // Run once on mount
  useEffect(() => {
    fetchList();
  }, []);

  // Simulate Solr Query locally
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Simulated Solr-style fuzzy search with relevance-like filtering
    const filtered = list.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });

    setFilteredItems(filtered);
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      {/* Simulated Solr Search Bar */}
      <input
        type="text"
        placeholder="Search using Solr..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {filteredItems.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p className="cursor" onClick={() => removeFood(item._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
