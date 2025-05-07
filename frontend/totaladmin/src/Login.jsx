import React, { useState } from 'react';
import API from './api';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', {
        email: email.trim(),
        password: password.trim(),
      });
      if (res.data.success) {
        setLoggedIn(true);
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };
  

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br /><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
