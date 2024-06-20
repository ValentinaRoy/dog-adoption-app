import React, { useState } from 'react';

const DogDetailsModal = ({ dog, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % dog.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + dog.images.length) % dog.images.length);
    };

    return (
        <div className="dog-modal">
            <div className="dog-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{dog.name}</h2>
                <p><strong>Breed:</strong> {dog.breed}</p>
                <p><strong>Location:</strong> {dog.location}</p>
                <p><strong>Age:</strong> {dog.age} </p>
                <p><strong>Contact:</strong> {dog.contact}</p>
                <p><strong>Vaccinated:</strong> {dog.vaccinated ? 'Yes' : 'No'}</p>
                <p><strong>About Me:</strong> {dog.description}</p>
                <div className="dog-images">
                    <button className="prev" onClick={prevImage}>&#10094;</button>
                    <img src={dog.images[currentImageIndex]} alt={`${dog.name} ${currentImageIndex}`} />
                    <button className="next" onClick={nextImage}>&#10095;</button>
                </div>
            </div>
        </div>
    );
};

export default DogDetailsModal;
