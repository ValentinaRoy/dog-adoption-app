import React,{useContext,useState,useEffect} from 'react'
import { UserContext } from '../../context/userContext'
import PostDog from './DogAdoptionForm';
import DogDetailsModal from './DogDetailsModal';
import './Browse.css'
import axios from 'axios'
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
    }, []);

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
    <div>
      {/* 1.filters
       2. the cards displaying the dogs but with only one image, name , breed, location and on clicking it gets the rest of the details
        3. the button to post for adoption  */}
      {!!user && <button onClick={onClick}>{!showForm && 'Post for adoption'}</button>}
      {showForm && <PostDog onClose={onClick}/>}

      <div className="dog-cards-container">
        {dog.map((dog) => (
          <div key={dog._id} className="dog-card" onClick={() => handleCardClick(dog)}>
            <img src={dog.images[0]} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p>{dog.breed}</p>
            <p>{dog.location}</p>
          </div>
        ))}
      </div>

      {selectedDog && <DogDetailsModal dog={selectedDog} onClose={closeModal} />}
    </div>
  )
}
