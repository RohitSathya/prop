import React from 'react';

const PropertyExplorer = () => {
  const properties = [
    {
      type: "Villa",
      count: 9,
      image: "https://beyot.g5plus.net/main/wp-content/uploads/2017/01/property-50-570x570.jpg",
      size: "lg"
    },
    {
      type: "Apartment",
      count: 5,
      image: "https://beyot.g5plus.net/main/wp-content/uploads/2017/01/property-43-570x570.jpg",
      size: "lg"
    },
    {
      type: "House",
      count: 15,
      image: "https://beyot.g5plus.net/main/wp-content/uploads/2017/01/property-29-570x570.jpg",
      size: "sm"
    },
    {
      type: "Farm",
      count: 1,
      image: "https://beyot.g5plus.net/main/wp-content/uploads/2017/01/property-29-570x570.jpg",
      size: "sm"
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <p className="text-gray-500 text-sm tracking-wide mb-3">FIND PROPERTY IN YOUR CITY</p>
        <h2 className="text-3xl font-bold tracking-wide mb-4">EXPLORE PROPERTY</h2>
        <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {properties.map((property, index) => (
          <div 
            key={property.type}
            className={`relative overflow-hidden ${
              property.size === 'lg' 
                ? 'lg:col-span-6 h-[400px]' 
                : 'lg:col-span-3 h-[300px]'
            }`}
          >
            <div className="relative h-full group">
              <img
                src={property.image}
                alt={property.type}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{property.type}</h3>
                <p className="flex items-center text-base">
                  <span className="text-orange-500 mr-2">{property.count}</span>
                  {property.count === 1 ? 'Property' : 'Properties'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyExplorer;