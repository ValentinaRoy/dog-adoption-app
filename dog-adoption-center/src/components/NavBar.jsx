import React, { useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css'; 
import logo from '../assets/logo.png'
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function NavBar() {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  const onClick = async() =>{
    
    try {
      const response = await axios.post('/logout', {}, { withCredentials: true });
      if (response.data.message) {
        toast.success('Logged out successfully!');
        navigate('/login'); 
        window.location.reload();
      } else {
        toast.error('Failed to log out');
      }
    } catch (error) {
      toast.error('Error logging out');
      console.error('Error logging out:', error);
    }
  }
  return (
    <>
      <div className="navbar">
        <div className='logo'>
          <img src={logo} alt='logo' style={{maxHeight:'50px',marginLeft:'5px'}} />
          <h1 style={{color:'#3d405b'}}>Forever Paws</h1>
        </div>
        <span style={{color:'#3d405b'}} className='welcome'>{!!user && ( <h2>Welcome&nbsp;{user.name} &nbsp;</h2>)}
          <Link to="#" className="menu-bars">
            {dropdown ? <FaTimes onClick={() => setDropdown(!dropdown)} /> : <FaBars onClick={() => setDropdown(!dropdown)} />}
          </Link>
        </span>
      </div>
      <nav className={dropdown ? 'nav-menu active' : 'nav-menu'}>
        
        <ul className="nav-menu-items" >

          <li>
            <Link to="/" onClick={() => setDropdown(false)} >About Us</Link>
          </li>
          <li>
            <Link to="/browse" onClick={() => setDropdown(false)} >Adopt a Dog</Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setDropdown(false)} >Login</Link>
          </li>
          
          <li>
            <Link to="/register" onClick={() => setDropdown(false)} >Register</Link>
          </li>
          {user &&

          ( <><li>
            <Link to="/myProfile" onClick={() => setDropdown(false)} >Profile</Link>
          </li>
          
          <li>
              <button className="logout-btn" onClick={onClick}>Logout</button>
          </li></>)
          }
        </ul>
      </nav>
    </>
  );
}
