import React, { useState, useEffect } from "react";
import axios from "axios";

const PropertySlider = () => {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/property");
        console.log("Fetched properties:", res.data);
        setProperties(res.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (properties.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % properties.length);
    }
  };

  const handlePrev = () => {
    if (properties.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? properties.length - 1 : prevIndex - 1
      );
    }
  };

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-gray-200">
        <p>Loading properties...</p>
      </div>
    );
  }

  const currentProperty = properties[currentIndex];
  const imageUrl =
    currentProperty?.image ||
    "https://via.placeholder.com/1200x600?text=No+Image+Available";

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Property Image */}
      <img
        src={imageUrl}
        alt={currentProperty?.title || "Property Image"}
        className="absolute w-full h-full object-cover transition-all duration-500"
      />

      {/* Overlay for content */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="absolute bottom-10 left-10 text-white space-y-4 max-w-lg">
        {/* Property Title */}
        <h2 className="text-3xl font-bold">{currentProperty?.title}</h2>
        {/* Price and Type */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold">{currentProperty?.price}</span>
          <span className="bg-blue-500 px-3 py-1 rounded">{currentProperty?.type}</span>
        </div>
        {/* Address */}
        <p className="text-sm flex items-center">
          <span className="material-icons mr-2">place</span>
          {currentProperty?.address}
        </p>
        {/* Details */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="material-icons">straighten</span>
            <span>{currentProperty?.size}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="material-icons">hotel</span>
            <span>{currentProperty?.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="material-icons">bathtub</span>
            <span>{currentProperty?.bathrooms} Bathrooms</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-300"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default PropertySlider;
