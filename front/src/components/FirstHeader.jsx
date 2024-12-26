import React from "react";
import { useNavigate } from "react-router-dom";
const FirstHeader = () => {
  const nav=useNavigate()
  return (
    <header className="bg-black w-full flex justify-between items-center px-4 py-2">
      {/* Left Side Logo */}
      <div className="flex items-center">
       
        <span className="text-white text-lg font-semibold ml-2">
          market
        </span>
      </div>

      {/* Right Side Button */}
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Buy now
      </button>
    </header>
  );
};

export default FirstHeader;
