import React, { useState, useEffect } from "react";
import { X, BedDouble, Bath, Home, MapPin, DollarSign, Clock, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SearchBox = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    type: "",
    title: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    minPrice: "",
    maxPrice: "",
    size: 1000,
    propertyId: "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/property");
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    let filtered = properties;

    if (filters.type) {
      filtered = filtered.filter((property) => property.type.includes(filters.type));
    }
    if (filters.title) {
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }
    if (filters.address) {
      filtered = filtered.filter((property) =>
        property.address.toLowerCase().includes(filters.address.toLowerCase())
      );
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property) => property.bedrooms === parseInt(filters.bedrooms, 10)
      );
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(
        (property) => property.bathrooms === parseInt(filters.bathrooms, 10)
      );
    }
    if (filters.minPrice) {
      filtered = filtered.filter(
        (property) =>
          parseInt(property.price.replace(/[^0-9]/g, ""), 10) >= parseInt(filters.minPrice, 10)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (property) =>
          parseInt(property.price.replace(/[^0-9]/g, ""), 10) <= parseInt(filters.maxPrice, 10)
      );
    }
    if (filters.size) {
      filtered = filtered.filter((property) => parseInt(property.size, 10) <= filters.size);
    }
    if (filters.propertyId) {
      filtered = filtered.filter((property) => property._id === filters.propertyId);
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-2">
            <h2 className="text-lg font-light tracking-wider">DISCOVER YOUR</h2>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
              DREAM
            </h1>
            <h1 className="text-4xl font-bold">HOUSE</h1>
          </div>

          {/* Search Filters */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <select
                name="type"
                value={filters.type}
                onChange={handleInputChange}
                className="bg-gray-800/50 backdrop-blur-sm text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              >
                <option value="">All Types</option>
                <option value="Store">Store</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
              </select>

              <input
                type="text"
                name="title"
                value={filters.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="bg-gray-800/50 backdrop-blur-sm text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />

              <input
                type="text"
                name="address"
                value={filters.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="bg-gray-800/50 backdrop-blur-sm text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />

              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleInputChange}
                className="bg-gray-800/50 backdrop-blur-sm text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              >
                <option value="">Any Bedrooms</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <select
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleInputChange}
                className="bg-gray-800/50 backdrop-blur-sm text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              >
                <option value="">Any Bathrooms</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleInputChange}
                  placeholder="Min Price"
                  className="bg-gray-800/50 backdrop-blur-sm text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all w-full"
                />
              </div>

              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleInputChange}
                  placeholder="Max Price"
                  className="bg-gray-800/50 backdrop-blur-sm text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all w-full"
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm text-gray-400 mb-2">
                  Size: {filters.size} sq ft
                </label>
                <input
                  type="range"
                  name="size"
                  value={filters.size}
                  onChange={handleInputChange}
                  min="0"
                  max="1000"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <button
                onClick={handleSearch}
                className="col-span-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Search Properties
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-lg text-sm">
                    {property.type}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{property.title}</h2>
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <MapPin size={16} />
                    <p className="text-sm">{property.address}</p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-1">
                        <BedDouble size={16} />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath size={16} />
                        <span>{property.bathrooms}</span>
                      </div>
                    </div>
                    <p className="text-orange-500 font-bold">{property.price}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProperty(property)}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Home size={48} className="mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400">No properties found matching your criteria.</p>
          </div>
        )}

        {/* Property Details Modal */}
        <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
          <DialogContent className="max-w-3xl bg-gray-900 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span className="text-2xl font-bold">{selectedProperty?.title}</span>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </DialogTitle>
            </DialogHeader>
            {selectedProperty && (
              <div className="space-y-6">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-72 object-cover rounded-lg"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="text-orange-500" size={20} />
                      <p>{selectedProperty.address}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="text-orange-500" size={20} />
                      <p>{selectedProperty.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Home className="text-orange-500" size={20} />
                      <p>{selectedProperty.type}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <BedDouble className="text-orange-500" size={20} />
                      <p>{selectedProperty.bedrooms} Bedrooms</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath className="text-orange-500" size={20} />
                      <p>{selectedProperty.bathrooms} Bathrooms</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="text-orange-500" size={20} />
                      <p>Agent: {selectedProperty.agent}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="text-orange-500" size={20} />
                      <p>Listed: {selectedProperty.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SearchBox;