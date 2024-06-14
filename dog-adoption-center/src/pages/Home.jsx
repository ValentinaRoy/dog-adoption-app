import React,{ useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import pug from '../assets/pug.png';
import womanWithDog from '../assets/womanWithDog.jpg'
import { FaSearch, FaAddressCard, FaPhone, FaHome  } from 'react-icons/fa';

export default function Home() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const onClick=()=>{
    navigate(!!user ? '/browse' : '/login');
  }
  return (
    <div className='home-container'>
      <div className='adopt-me-card'>
        <img src='https://c4.wallpaperflare.com/wallpaper/24/683/587/panorama-a-lot-of-dogs-a-different-breed-wallpaper-thumb.jpg' alt='dog' />
        <div className='button-card'>
          <h2>Find your fur-ever friend </h2> 
          <h3>Adopt, don't shop!</h3>
          <button type='submit' onClick={onClick}>Adopt Me</button>
        </div>
        
      </div>
      <div className='how-it-works'>
        <h1>HOW IT WORKS</h1>
        <div className='list'>
        <img src={pug} alt='work' style={{maxHeight:"400px"}}/>
        <div className='points'>
          <div className='step'>
            <FaSearch className="icon" />
            <div className='text'>
              STEP 1:<br/>
              <b>Find Your Perfect Match:</b> 
              Use our search tool to find dogs available for adoption by city, age, and breed. Discover your new best friend today!
            </div>
          </div>
          <div className='step'>
            <FaAddressCard className="icon" />
            <div className='text'>
              STEP 2:<br/>
              <b>Connect with the Owner:</b> 
              Reach out directly to the current owner to learn more about the dog and arrange a meet-and-greet.
            </div>
          </div>
          <div className='step'>
            <FaHome  className="icon" />
            <div className='text'>
              STEP 3:<br/>
              <b>Prepare Your Home:</b> 
              Create a welcoming space for your new furry friend. Ensure you have all the essentials, including a cozy bed, food, and toys.
            </div>
          </div>
          <div className='step'>
            <FaPhone className="icon" />
            <div className='text'>
              STEP 4:<br/>
              <b>Ongoing Support:</b> 
              For aftercare assistance, contact us. We can help you find nearby pet clinics and provide advice to ensure a smooth transition for your dog.
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className='advertisement'>
        <img src={womanWithDog} alt='quote' style={{maxWidth:"100%"}}/>
        <div className="overlay">
          <h1>Bring Joy Home: Adopt a Dog Today!</h1>
          <h3>Experience the unconditional love and loyalty that only a furry friend can offer. Start your journey towards a happier home with a new best friend.</h3>
        </div>
      </div>
      
    </div>
  )
}

