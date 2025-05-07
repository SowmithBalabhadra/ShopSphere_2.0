import React, { useEffect, useState } from 'react';
import './ContactUs.css';
// import { assets } from '../../assets/assets';

const AppDownload = () => {
    const [countdown, setCountdown] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const countDate = new Date('May 10, 2025 00:00:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const gap = countDate - now;

            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const d = formatTime(Math.floor(gap / day));
            const h = formatTime(Math.floor((gap % day) / hour));
            const m = formatTime(Math.floor((gap % hour) / minute));
            const s = formatTime(Math.floor((gap % minute) / second));

            setCountdown({ days: d, hours: h, minutes: m, seconds: s });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Helper function to format time
    const formatTime = num => num < 10 ? `0${num}` : num.toString();

    return (
        <div>
            <section className="deal" id="deal"style={{ marginTop: '40px',marginBottom: '20px' }}>
                <div className="content">
                    <h3 className="title">Deal of the day</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto reiciendis quisquam reprehenderit
                        officiis eligendi esse explicabo repellendus ab obcaecati. Nemo?</p>
                    <div className="count-down">
                        <div className="box">
                            <h3 id="day">{countdown.days}</h3>
                            <span>day</span>
                        </div>
                        <div className="box">
                            <h3 id="hour">{countdown.hours}</h3>
                            <span>hour</span>
                        </div>
                        <div className="box">
                            <h3 id="minute">{countdown.minutes}</h3>
                            <span>minute</span>
                        </div>
                        <div className="box">
                            <h3 id="second">{countdown.seconds}</h3>
                            <span>second</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact" id="contact" style={{ marginTop: '40px',marginBottom: '20px' }}>
                <h1 className="heading"><span>contact</span> us</h1>
                <form action="">
                    <div className="inputbox">
                        <input type="text" placeholder="name" />
                        <input type="email" placeholder="email" />
                    </div>
                    <div className="inputbox">
                        <input type="number" placeholder="number" />
                        <input type="text" placeholder="subject" />
                    </div>
                    <textarea placeholder="message" cols="30" rows="10"></textarea>
                    <input type="submit" value="send message" className="btn" />
                </form>
            </section>
        </div>
    );
};

export default AppDownload;
