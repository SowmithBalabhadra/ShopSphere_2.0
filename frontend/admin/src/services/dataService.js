
import axios from 'axios';
import { url } from '../assets/assets';
// import { url } from '../assets/assets'; // Adjust the import path as necessary
export const fetchDashboardData = async () => {
  try {
    const [usersResponse, ordersResponse, foodResponse] = await Promise.all([
      axios.get(`${url}/api/user/list`),    
      axios.get(`${url}/api/order/list`),    
      axios.get(`${url}/api/food/list`),    
    ]);
    //1
    //1
    //1
    //1
    //1
    return {
      users: usersResponse.data.data,
      orders: ordersResponse.data.data,
      foodItems: foodResponse.data.data,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
};
