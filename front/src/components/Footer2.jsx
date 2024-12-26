import React from "react";
import { FaAngleUp } from "react-icons/fa";

const Footer2 = () => {
  return (
    <div className="bg-white py-4 text-gray-400 text-sm">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-6">
        {/* Left Section */}
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          &copy; 2017 – BEYOT REAL ESTATES DESIGNED BY
          <span className="text-orange-500 ml-1">G5THEME</span>
        </div>

        {/* Center Section */}
        <div className="flex space-x-6 text-center">
          <a href="#" className="hover:text-orange-500 transition">
            HOME
          </a>
          <a href="#" className="hover:text-orange-500 transition">
            CONTACT
          </a>
          <a href="#" className="hover:text-orange-500 transition">
            PROPERTIES
          </a>
          <a href="#" className="hover:text-orange-500 transition">
            AGENTS
          </a>
          <a href="#" className="hover:text-orange-500 transition">
            TERMS OF USE
          </a>
        </div>

        {/* Right Section */}
        <div className="fixed bottom-6 right-6">
          <button
            className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-orange-500 transition duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FaAngleUp size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer2;
