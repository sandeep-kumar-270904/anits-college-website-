import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-widget">
            <h3>ANITS College</h3>
            <p>Anil Neerukonda Institute of Technology and Sciences</p>
            <p>Shaping Future Engineers Since 2001</p>
          </div>
          <div className="footer-widget">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/departments">Departments</Link></li>
              <li><Link to="/circulars">Circulars</Link></li>
            </ul>
          </div>
          <div className="footer-widget">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: info@anits.edu.in</li>
              <li>Phone: +91-891-2841111</li>
              <li>Sangivalasa, Visakhapatnam</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ANITS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
