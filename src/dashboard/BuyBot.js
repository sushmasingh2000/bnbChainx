import React from 'react';
import logo from '../assets/logo.png';
import highlight from '../assets/highligt.svg';
import '../assets/style.css';

// Font Awesome CDN (inserted in index.html or dynamically loaded separately)

const BuyBot = () => {
  return (
    <section>
      <div className="main_pages">
        <div className="icon_img">
          <img src={highlight} alt="" className="highlighted highlight-1" />
          <img src={highlight} alt="" className="highlighted highlight-2" />
          <img src={highlight} alt="" className="highlighted highlight-3" />
          <img src={highlight} alt="" className="highlighted highlight-4" />
        </div>

        <img src={logo} alt="Buy Bot Logo" className="logo" />
        <h2>Welcome to <span>BNB Chainx</span></h2>
        <p>Whether you're in e-commerce, trading, marketing,</p>

        <div className="btn_main">
          <a href="/login">Login Now</a>
        </div>

        <ul>
          <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
        </ul>
      </div>
    </section>
  );
};

export default BuyBot;
