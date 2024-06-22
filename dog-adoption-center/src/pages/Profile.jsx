import React, { useEffect, useState, useContext} from 'react'
import axios from 'axios'
import './Profile.css'
import { UserContext } from '../../context/userContext'
import { FaEdit,FaPaw } from 'react-icons/fa';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import PostDog from './DogAdoptionForm';

export default function Profile() {

  const {user,setUser} = useContext(UserContext);
  const [dogSrc,setDogSrc] = useState('');
  const [userName,setUserName] = useState("")
  const [editName,setEditName] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [dogs,setDogs] = useState([])
  const [showForm,setShowForm] = useState(false);
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
    fetchDogs();
    if(!!user && !userName){
      setUserName(user.name)
    }
  },[dogs.length,user])

  const onSave = async () => {
    try {
      const response = await axios.post('/saveName', { userName });
      setUser({ ...user, userName }); 
      setEditName(true);
      toast.success("Name updated successfully")
      toast.success("Please login again")
      await axios.post('/logout')
      navigate('/login')

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

  const fetchDogs = async() =>{
    try{
      const response = await axios.get('/userDogs',{ params: { userId: user.id } })
      setDogs(response.data.dogs);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  };

  const handleDelete = async(dogId) => {
     
    try {
        await axios.delete(`/dogs/${dogId}`);
        setDogs(dogs.filter(dog => dog._id !== dogId));
        toast.success('Dog post deleted successfully');
    } catch (error) {
        console.error('Error deleting dog post:', error);
        toast.error('Failed to delete dog post');
    }
  };

  const onClick = () =>{
    setShowForm(!showForm);
  }

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
              <input type='email' value={!!user && user.email}  disabled={true} />
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
        {dogs.map((dog) => (
          <div key={dog._id} className="dog-card" >
            
            <div className='dog-img'>
              <img src={dog.images[0]} alt={dog.name} />
            </div>
            <div className='dog-info'>
              <h3>{dog.name}</h3>
              <p>breed: <b>{dog.breed}</b></p>
              <p>location: <b>{dog.location}</b></p>
              {user?.id === dog.userId && (
                <button className='delete-dog-btn' onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(dog._id);
                }}>DELETE</button>
              )}
            </div>
          </div>
         ))}
        </div>

        <div className='post-dog'>
          <button className='post-dog-btn' onClick={onClick}>{!showForm ? 'Post for adoption' : <FaPaw/>}</button>
          {showForm && <PostDog onClose={onClick} />}
        </div>
    </div>
  )
}
