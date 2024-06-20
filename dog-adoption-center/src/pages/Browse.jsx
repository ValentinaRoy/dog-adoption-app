import React,{useContext,useState,useEffect} from 'react'
import { UserContext } from '../../context/userContext'
import PostDog from './DogAdoptionForm';
import DogDetailsModal from './DogDetailsModal';
import './Browse.css'
import axios from 'axios'
import {FaPaw, FaTrash} from 'react-icons/fa';
import {toast} from 'react-hot-toast'

export default function Browse() {
    const {user} = useContext(UserContext);
    const [showForm,setShowForm] = useState(false);
    const [dog,setDog] = useState([]);
    const [selectedDog,setSelectedDog] = useState(null);

    
    const fetchDogs = async () => {
      try {
        const response = await axios.get('/dogs');
        setDog(response.data);
      } catch (error) {
          console.error('Error fetching dogs:', error);
        }
    };


    useEffect(() => {
     fetchDogs();
    },[dog.length]);

    const handleDelete = async(dogId) => {
     
      try {
          await axios.delete(`/dogs/${dogId}`);
          setDog(dog.filter(dog => dog._id !== dogId));
          toast.success('Dog post deleted successfully');
      } catch (error) {
          console.error('Error deleting dog post:', error);
          toast.error('Failed to delete dog post');
      }
    };

    const onClick = () =>{
      setShowForm(!showForm);
    }

    const handleCardClick = (dog) => {
      setSelectedDog(dog);
    };

    const closeModal = () => {
        setSelectedDog(null);
    };
  return (
    <div className='main-container'>
      <div className='options'>
        <div className='filter-options'>
          <p>container</p>
        </div>
        <div >
          <button className='post-dog-btn' onClick={onClick}>{!showForm ? 'Post for adoption' : <FaPaw/>}</button>
          {showForm && <PostDog onClose={onClick} fetchDogs={fetchDogs()}/>}
        </div>

      </div>
      
      <div className="dog-cards-container">
        {dog.map((dog) => (
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
            <button className='contact-btn' onClick={() => handleCardClick(dog)}>Contact</button>
          </div>
        ))}
      </div>

      {selectedDog && <DogDetailsModal dog={selectedDog} onClose={closeModal}/>}
    </div>
  )
}
