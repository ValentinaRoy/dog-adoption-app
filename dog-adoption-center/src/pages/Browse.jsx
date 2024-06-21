import React,{useContext,useState,useEffect} from 'react'
import { UserContext } from '../../context/userContext'
import PostDog from './DogAdoptionForm';
import DogDetailsModal from './DogDetailsModal';
import './Browse.css'
import axios from 'axios'
import {FaPaw} from 'react-icons/fa';
import {toast} from 'react-hot-toast'
import Select from 'react-select'

export default function Browse() {
    const {user} = useContext(UserContext);
    const [showForm,setShowForm] = useState(false);
    const [dog,setDog] = useState([]);
    const [selectedDog,setSelectedDog] = useState(null);
    const [breedOptions, setBreedOptions] = useState([]);
    const [filters,setFilters] = useState({
      breed:[],
      location:''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    

    useEffect(() => {
      fetchDogs();
     },[dog.length,currentPage]);

    const fetchDogs = async () => {
      try {
        const response = await axios.get(`/dogs?page=${currentPage}`);
        let filteredDogs = response.data.dogs;

        if(filters.breed.length > 0){
          filteredDogs = filteredDogs.filter(dog => filters.breed.includes(dog.breed));
        }

        if(filters.location) {
          filteredDogs = filteredDogs.filter(dog => dog.location.toLocaleLowerCase().includes(filters.location.toLocaleLowerCase()));
        }
        setDog(filteredDogs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
          console.error('Error fetching dogs:', error);
        }
    };

    useEffect(() => {
      const fetchBreeds = async () => {
        try {
          const response = await axios.get('/breeds');
          setBreedOptions(response.data);
        } catch (error) {
          console.error('Error fetching breeds:', error);
        }
      };
        fetchBreeds();
    }, []);
    

    const handleBreedChange = (selectedOptions) => {
      const selectedBreeds = selectedOptions.map(option => option.value);
        setFilters({ ...filters, breed: selectedBreeds });
    };

    const handleLocationChange = (e) => {
        setFilters({ ...filters, location: e.target.value });
    };


    const handlePreviousPage = () => {
      
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

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
          <Select
          className='react-select'
            options={breedOptions} 
            onChange={handleBreedChange}
            isMulti
            placeholder="Select breed(s)"
          />
          <input type="text" value={filters.location} onChange={handleLocationChange} placeholder="Enter location" />
          <button onClick={fetchDogs}>Apply Filters</button>
         
        </div>
        <div >
          <button className='post-dog-btn' onClick={onClick}>{!showForm ? 'Post for adoption' : <FaPaw/>}</button>
          {showForm && <PostDog onClose={onClick} />}
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
      <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>&#10094;</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>&#10095;</button>
      </div>
    </div>
  )
}
