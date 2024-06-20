import React from 'react';

const DogDetailsModal = ({ dog, onClose }) => {

    return (
        <div className="dog-modal">
            <div className="dog-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{dog.name}</h2>
                <p><strong>Breed:</strong> {dog.breed}</p>
                <p><strong>Location:</strong> {dog.location}</p>
                <p><strong>Age:</strong> {dog.age}</p>
                <p><strong>Contact:</strong> {dog.contact}</p>
                <p><strong>Vaccinated:</strong> {dog.vaccinated ? 'Yes' : 'No'}</p>
                <p><strong>Description:</strong> {dog.description}</p>
                <div className="dog-images">
                    {dog.images.map((image, index) => (
                        <img key={index} src={image} alt={`${dog.name} ${index}`} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DogDetailsModal;