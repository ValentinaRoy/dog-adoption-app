import React, { useEffect, useState, useContext} from 'react'
import axios from 'axios'
import './Profile.css'
import { UserContext } from '../../context/userContext'
import { FaEdit } from 'react-icons/fa';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const {user,setUser} = useContext(UserContext);
  console.log(user,"user")
  const [dogSrc,setDogSrc] = useState('');
  const [userName,setUserName] = useState(user.name)
  const email = user.email 
  const [editName,setEditName] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate()
  const onEdit = () =>{
    setEditName(!editName)
  }

  const fetchImage = async () =>{
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random',{
        withCredentials: false 
      });
      setDogSrc(response.data.message);

    } catch (error) {
      console.error('Error fetching the dog image:', error);
    }
  }

  useEffect(()=>{
    fetchImage();
  },[])

  const onSave = async () => {
    try {
      const response = await axios.post('/saveName', { userName });
      setUser({ ...user, userName }); 
      setEditName(true);
      toast.success("Name updated successfully")

    } catch (error) {
      console.error('Error saving the user name:', error);
    }
  };


  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const handleChange = (e) => {
    if (e.target.name === 'oldPassword') {
      setOldPassword(e.target.value);
    } else if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
    }
  };

  const changePassword = async () => {
    try {
      const res = await axios.post('/changePassword', { oldPassword, newPassword });
     
      toast.success('Password changed successfully');
     
      setOldPassword('');
      setNewPassword('');
      setShowPasswordForm(false);
      const response = await axios.post('/logout', {}, { withCredentials: true });
      if (response.data.message) {
        toast.success('Logged out successfully!');
        navigate('/login'); 
        window.location.reload();
      } else {
        toast.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password. Please try again.');
    }
  };

  return (
    <div className='profile-container'>
        <div className='profile-card'>
          <div className='profile-img'>
            <img src={dogSrc} alt='profile-image'/>
          </div>
          <div className='profile-details-card'>
            <div className='fields'>
              <label>
                Name:
              </label>

              <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} disabled={editName} />
              <button onClick={onEdit}>{editName ? <FaEdit/> : 'X'}</button>

              {!editName && <button onClick={onSave}><u>Save</u></button>}
            </div>
            <div className='fields'>
              <label>Email: </label>
              <input type='email' value={email}  disabled={true} />
            </div>

            <div className='fields'>
              {!showPasswordForm ? (
                <div className='changePassword'>
                <button onClick={togglePasswordForm}>Change Password</button></div>
              ) : (
                <div className='passwordForm'>
                  <label>Old Password:</label>
                  <input type='password' name='oldPassword' value={oldPassword} onChange={handleChange} />
                  <label>New Password:</label>
                  <input type='password' name='newPassword' value={newPassword} onChange={handleChange} />
                  <button onClick={changePassword}>Save Password</button>
                  <button onClick={togglePasswordForm}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='profile-dogs'>
          
        </div>
    </div>
  )
}
