import React, { useContext, useState, useRef } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url, loadCartData } = useContext(StoreContext);
    const [currState, setCurrState] = useState('Sign Up');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const otpRefs = useRef([]); // Create a ref array for OTP inputs
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Ensure email is always in lowercase
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: name === 'email' ? value.toLowerCase() : value, // Convert email to lowercase
        }));
    };

    // Function to send OTP email
    const sendOtpEmail = () => {
        const otpCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        setOtp(otpCode.toString().split('')); // Store OTP as array of digits for verification

        window.Email.send({


           //sending otp api

           
        }).then((message) => {
            if (message === 'OK') {
                toast.success('OTP sent to your email.');
            } else {
                // toast.error('Failed to send OTP. Please try again.');
                toast.info('Please Verify');
            }
        });
    };

    const onOtpChange = (value, index) => {
        if (/^\d$/.test(value)) { // Only accept single digit
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input if it exists
            if (index < otpRefs.current.length - 1) {
                otpRefs.current[index + 1].focus();
            }
        } else if (value === '') {
            // Allow clearing input and moving back
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
    };

    const onOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const onRegister = async (e) => {
        e.preventDefault();
        sendOtpEmail(); // Only send OTP, do not save to database yet
        setShowOtpInput(true); // Show OTP input after sending OTP
    };

    const onLogin = async (e) => {
        e.preventDefault();
        const new_url = url + '/api/user/login';

        // Handle login
        try {
            const response = await axios.post(new_url, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                loadCartData({ token: response.data.token });
                setShowLogin(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
        }
    };

    const onOtpSubmit = async () => {
        const enteredOtp = otp.join('');
        if (enteredOtp === otp.join('')) { // Verify OTP entered matches
            // Save user details to the database after OTP verification
            try {
                const response = await axios.post(`${url}/api/user/register`, data);
                if (response.data.success) {
                    toast.success('OTP verified successfully!');
                    setShowOtpInput(false);
                    setCurrState('Login'); // Switch to login page after OTP verification
                } else {
                    toast.error('Failed to create account. Please try again.');
                }
            } catch (error) {
                toast.error('Failed to create account. Please try again.');
               
            }
        } else {
            toast.error('Incorrect OTP. Please try again.');
        }
    };

    return (
        <div className='login-popup'>
            {showOtpInput ? (
                <div className='otp-popup'>
                    <img
                        src={assets.cross_icon} /* Use your close icon asset */
                        alt="Close"
                        className="close-icon"
                        onClick={() => setShowOtpInput(false)}
                    />
                    <h2>Enter OTP</h2>
                    <div className='otp-inputs'>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type='text'
                                maxLength='1'
                                value={digit}
                                onChange={(e) => onOtpChange(e.target.value, index)}
                                onKeyDown={(e) => onOtpKeyDown(e, index)}
                                ref={(el) => (otpRefs.current[index] = el)} // Assign ref for each input
                                className='otp-input'
                            />
                        ))}
                    </div>
                    <button onClick={onOtpSubmit}>Verify OTP</button>
                </div>
            ) : (
                <form onSubmit={currState === 'Login' ? onLogin : onRegister} className='login-popup-container'>
                    <div className='login-popup-title'>
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                    </div>
                    <div className='login-popup-inputs'>
                        {currState === 'Sign Up' && (
                            <input
                                name='name'
                                onChange={onChangeHandler}
                                value={data.name}
                                type='text'
                                placeholder='Your name'
                                required
                            />
                        )}
                        <input
                            name='email'
                            onChange={onChangeHandler}
                            value={data.email}
                            type='email'
                            placeholder='Your email'
                            required
                        />
                        <input
                            name='password'
                            onChange={onChangeHandler}
                            value={data.password}
                            type='password'
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button>{currState === 'Login' ? 'Login' : 'Create account'}</button>
                    <div className='login-popup-condition'>
                        <input type='checkbox' required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                    {currState === 'Login' ? (
                        <p>
                            Create a new account?{' '}
                            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => setCurrState('Login')}>Login here</span>
                        </p>
                    )}
                </form>
            )}
        </div>
    );
};

export default LoginPopup;
