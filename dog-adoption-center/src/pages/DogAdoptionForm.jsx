import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './DogAdoptionForm.css';
import { toast } from 'react-hot-toast';

const PostDog = ({ onClose  }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    breed: '',
    vaccinated: false,
    location: '',
    contact: '',
    description: '',
    images: []
  });

  const [breedOptions, setBreedOptions] = useState([]);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : ''
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        Array.from(formData.images).forEach((file) => {
          data.append('images', file);
        });
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('/postDog', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.data.error){
        toast.error(response.data.error);
      } else {
        toast.success('Dog posted successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Error posting dog:', error);
      toast.error('Error posting dog');
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className='dog-adoption-modal'>
          <div className='dog-adoption-card'>
            <form onSubmit={handleSubmit} className='dog-adoption-form'>
              <div className='input'>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter the name of the dog' required />
              </div>
              <div className='input'>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email' required />
              </div>
              <div className='input'>
                <label>Age:</label>
                <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Enter the dog's age" required />
              </div>
              <div className='input'>
                <label>Breed:</label>
                <Select
                  name="breed"
                  options={breedOptions}
                  onChange={handleSelectChange}
                  placeholder="Select the breed"
                  isSearchable
                />
              </div>
              <div className='input'>
                <label>Vaccinated:</label>
                <input type="checkbox" name="vaccinated" checked={formData.vaccinated} onChange={handleChange} />
              </div>
              <div className='input'>
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder='Enter your city' required />
              </div>
              <div className='input'>
                <label>Contact:</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder='Enter your contact no.' required />
              </div>
              <div className='input'>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder='Tell us more about them' required></textarea>
              </div>
              <div className='input'>
                <label>Images:</label>
                <input type="file" name="images" multiple onChange={handleImageChange} required />
              </div>
              <button type="submit">Post Dog</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDog;
