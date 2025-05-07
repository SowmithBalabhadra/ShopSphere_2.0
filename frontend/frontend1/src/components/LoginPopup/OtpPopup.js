// OtpPopup.js
import React, { useState } from 'react';
import './OtpPopup.css';
import { toast } from 'react-toastify';

const OtpPopup = ({ setShowOtp, verifyOtp }) => {
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    // Only allow numeric input and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      verifyOtp(otp); // Call the verify OTP function passed as a prop
    } else {
      toast.error('Please enter a 6-digit OTP');
    }
  };

  return (
    <div className='otp-popup'>
      <form onSubmit={handleSubmit} className='otp-popup-container'>
        <h2>Enter OTP</h2>
        <input
          type='text'
          value={otp}
          onChange={handleChange}
          placeholder='Enter 6-digit OTP'
          maxLength={6}
          required
        />
        <button type='submit'>Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpPopup;
