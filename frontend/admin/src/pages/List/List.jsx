// List.jsx
import React, { useEffect, useState } from 'react';
import './List.css';
import { url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list1`);
    if (response.data.success) {
      setList(response.data.data);
      setFilteredItems(response.data.data); // Initialize filtered items
    } else {
      toast.error('Error');
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error('Error');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter items based on the search query
    const filtered = list.filter((item) =>
      item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search items..."
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
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p className="cursor" onClick={() => removeFood(item._id)}>
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
