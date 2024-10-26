import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section fs1">
          <h3>About Us</h3>
          <p className="abt">We help you manage your tasks efficiently and effectively. Stay organized with our web app!</p>
        </div>
        {/* <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: <a href="mailto:mdayyanofficial@gmail.com">mdayyanofficial@gmail.com</a></p>
          <p>Phone: <a href="tel:+917483621525">+91 7483621525</a></p>
        </div> */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/prajna.ep03/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com/in/prajna-ep-8a23a6264/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/PrajnaEP" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 ToDoHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
