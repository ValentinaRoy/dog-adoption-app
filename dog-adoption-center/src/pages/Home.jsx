import React,{ useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const onClick=()=>{
    navigate(!!user ? '/browse' : '/login');
  }
  return (
    <div className='home-container'>
      <div className='adopt-me-card'>
        <img src='' alt='dog'/>
        <div className='button-card'>
          <h3>Find your fur-ever friend </h3> 
          <h4>Adopt, don't shop! {!!user && user.name}</h4>
        </div>
        <button type='submit' onClick={onClick}>Adopt Me</button>
      </div>
      <div className='how-it-works'>

      </div>
      <div className='advertisement'>

      </div>
      
    </div>
  )
}

