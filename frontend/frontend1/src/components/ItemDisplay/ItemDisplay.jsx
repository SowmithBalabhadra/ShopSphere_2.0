import React, { useContext } from 'react';
import './ItemDisplay.css';
import ItemsView from '../ItemsView/ItemsView';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category, searchQuery }) => {
  const { food_list } = useContext(StoreContext);

  // Filter food list based on search query and category
  const filteredFoodList = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div className='food-display' id='food-display'>
      <div className='food-display-list'>
        {filteredFoodList.map((item) => (
          <ItemsView key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
