import React, { useState } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const [image, setImage] = useState(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log('✅ onSubmitHandler called');
    console.log('Form Data:', data);
    console.log('Selected Image:', image);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('📦 Server Response:', response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.success("Item added successfully");
    
      setTimeout(() => {
        window.location.reload(); // Refresh the page after 3 seconds
      }, 3000);
    
      console.error("❌ Axios Error:", error);
    }
    
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log('📝 onChangeHandler called');
    console.log('Field:', name, 'Value:', value);
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    console.log('🖼️ Image Selected:', e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="Upload preview"
            />
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="image"
            accept="image/*"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Grocery">Grocery</option>
              <option value="Bread">Bread</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Eggs">Eggs</option>
              <option value="Dairy">Dairy</option>
              <option value="Chocolates">Chocolates</option>
              <option value="Biscuits">Biscuits</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="250 ₹"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
