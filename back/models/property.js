const mongoose = require("mongoose");

// Define the schema
const propertySchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true }, // Explicitly defining _id
    image: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    agent: { type: String, required: true },
    time: { type: String, default: "N/A" }, // Added default value for time
    size: { type: String, required: true },
    bedrooms: { type: Number, default: 0 }, // Default set to 0
    bathrooms: { type: Number, default: 0 }, // Default set to 0
    badges: { type: [String], default: [] }, // Default empty array
    carouselImages: { type: [String], default: [] }, // Default empty array
    location: {
      // Added location for latitude and longitude
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
  },
  { 
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    collection: "propertylist" // Explicitly defining the collection name
  }
);

// Create the model
const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
