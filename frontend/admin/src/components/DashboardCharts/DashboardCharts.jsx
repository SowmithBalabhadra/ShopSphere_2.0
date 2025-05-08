import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer
} from 'recharts';
import './DashboardCharts.css';

const DashboardCharts = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [newUsersData, setNewUsersData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    // Set Axios to send cookies with every request
    axios.defaults.withCredentials = true;

    // Simulate user growth
    const generateRandomNewUserData = () => {
      const months = ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024', 'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024'];
      const randomData = months.map(month => ({
        month: month,
        newUsers: Math.floor(Math.random() * 5) + 1,
      }));
      setNewUsersData(randomData);
    };

    // Fetch order status data
    const fetchOrderStatusData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/order/list');
        if (response.data.success) {
          const orders = response.data.data;
          const statusCounts = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
          }, {});
          const formattedData = Object.entries(statusCounts).map(([status, count]) => ({
            name: status,
            value: count,
          }));
          setOrderStatusData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching order status data:', error);
      }
    };

    // Fetch product category data
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/food/list');
        if (response.data.success) {
          const products = response.data.data;
          const categoryCounts = products.reduce((acc, product) => {
            acc[product.category] = acc[product.category] || { count: 0, totalPrice: 0 };
            acc[product.category].count += 1;
            acc[product.category].totalPrice += product.price;
            return acc;
          }, {});
          const formattedData = Object.entries(categoryCounts).map(([category, data]) => ({
            category,
            count: data.count,
            averagePrice: data.totalPrice / data.count,
          }));
          setCategoryData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    generateRandomNewUserData();
    fetchOrderStatusData();
    fetchCategoryData();
  }, []);

  return (
    <div className="dashboard-charts">
      <div className="chart-card">
        <h3>Total Users</h3>
        <div className="total-users">15</div> {/* You can connect this to backend if needed */}
      </div>

      <div className="chart-card">
        <h3>Order Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {orderStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card full-width">
        <h3>Category Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="count" fill="#82ca9d" />
            <Line yAxisId="right" type="monotone" dataKey="averagePrice" stroke="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card full-width">
        <h3>New Users per Month</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={newUsersData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="newUsers" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
