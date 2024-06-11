import React,{ useContext } from 'react'
import { UserContext } from '../../context/userContext';

export default function Home() {
  const {user} = useContext(UserContext);
  const onClick=()=>{
    console.log(user.name);
    
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

//the main page thatll open, 
//first check if logged in then in nvbar show hi name and rest of options , or if they click on adopt a dog it checks 
//if logged in then search page opens else ask to login if not logged in crete account then after registering redirect to search page
//in search page , lists of dogs listed for adoption , enablle pagination, filters and a button to post a dog for adoption.
//on positing fields of dog require = name,age,breed,city,vaccinated,little descrition. on clickking any dog image a modal opens giving more pics and pura detals 
//on card show only first pic,name,age,breed,city ,and owner details = name,contact,email
//on navbar ull have : name of logged in person or login option , rest in hamburger menu : home, profile, search,contact us, logout
//for profile , itll show your details and option to edit the password or the dogs you have posted for adoption ,delete a post ,delete your account , if account is deleted dogs posted should also be deleted .
//login page should also have forgot password option.

//no need to check if loggeed in in navbar and adopt page, always ask to login 