import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ExploreCat from '../../components/ExploreCat/ExploreCat';
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay';
import AppDownload from '../../components/ContactUs/ContactUs';

const Home = ({ searchQuery }) => { // Accept searchQuery as a prop
  const [category, setCategory] = useState("All");

  return (
    <>
      <Header />
      <ExploreCat setCategory={setCategory} category={category} />
      <ItemDisplay category={category} searchQuery={searchQuery} /> {/* Pass searchQuery to FoodDisplay */}
      <AppDownload />
    </>
  );
}

export default Home;
