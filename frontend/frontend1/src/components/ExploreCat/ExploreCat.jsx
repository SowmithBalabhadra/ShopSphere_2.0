import React, { useContext } from 'react'
import './ExploreCat.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({category,setCategory}) => {

  const {ord_list} = useContext(StoreContext);
  
  return (
    <div className='explore-menu' id='explore-menu'>




      
<h1 className="heading" style={{ paddingBottom: '30px' }}>
        Shop by <span>Category</span>
      </h1>
      <div className="explore-menu-list">
        {ord_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
<h3 style={{ fontFamily: "Nunito, sans-serif", fontSize: "2.5rem", color: "var(--black)" }}>
  {item.menu_name}
</h3>

<img 
  style={{ height: "250px", width: "220px" }} 
  src={item.menu_image} 
  className={category === item.menu_name ? "active" : ""} 
  alt="" 
/>                    
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
