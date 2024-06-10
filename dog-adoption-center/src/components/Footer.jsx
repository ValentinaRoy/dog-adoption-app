import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faPinterest, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'

export default function Footer() {
  return (
    <footer>
    <div className='footer-section'>
      <div className="contact-us">
        <h4>Contact Us</h4>
        <ul>
          <li>Email: contact@dogadoption.com</li>
          <li>Phone: (123) 456-7890</li>
          <li>Address: 123 Dog Street, Pet City, PC 12345</li>
        </ul>
    </div>
    <div className="quick-links">
      <h4>Quick Links</h4>
      <ul>
        <li><Link to="/home">About Us</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/terms">Terms of Service</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </div>
    <div className="subscribe">
      <h4>Stay Connected</h4>
      <form>
        <input type="email" placeholder="Subscribe to our newsletter" />
        <button type="submit">Subscribe</button>
      </form>
      <div className="social-media-links">
        <h4>Follow Us</h4>
        <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="https://pinterest.com"><FontAwesomeIcon icon={faPinterest} /></a>
        <a href="https://facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
      </div>
    </div>
    <div className="support">
      <h4>Support Us</h4>
      <ul>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/volunteer">Volunteer</Link></li>
        
      </ul>
      
    </div>
    <div className="mission" style={{width:'300px',textWrap:'wrap'}}>
      <h4>Our Mission</h4>
      <p>Helping dogs find loving homes and supporting pet owners in providing the best care.</p>
    </div>
  </div>
  </footer>
  )
}
