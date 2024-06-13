import React,{useState} from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const navigate = useNavigate()
    const [data,setData] = useState({
        email:'',
        password:'',
    })
    const loginUser = async (e)=>{
        e.preventDefault();
        const {email,password} = data;

        try {
          const {data} = await axios.post('/login',{
            email,password
          })

          if(data.error){
            toast.error(data.error);
          }
          
          else{
            setData({...data, password: '' });
            toast.success('Login successfully !')
            
            navigate('/browse')
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
    }
  return (
    <div className='loginPage'>
      <div className='loginCard'>
        <h1 style={{textAlign:'center'}}>Login</h1>
        <div className='form'>
          <form onSubmit={loginUser} >
            <label>Email</label>
            <input type='email' placeholder='Enter email' value={data.email} onChange={(e)=> setData({...data,email:e.target.value})}/>
            <label>Password</label>
            <input type='password' placeholder='Enter password' value={data.password} onChange={(e)=> setData({...data,password:e.target.value})}/>
            <button type='submit' >Login</button>
          </form>
        </div>
        <div className='loginBottom'>
          <p><Link to='/forgotPassword' className='link'>Forgot Password</Link></p>
          <p>OR</p>
          <p>New User? <span><Link to='/register' className='link'>Create Account</Link></span></p>
        </div>
      </div>

    </div>
  )
}
