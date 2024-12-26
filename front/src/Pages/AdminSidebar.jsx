import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen fixed w-64 shadow-lg flex flex-col">
      {/* Sidebar Header */}
      <div className="text-center py-6 text-3xl font-bold tracking-wider uppercase bg-gray-800 border-b border-gray-700">
        Dashboard
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-4">
       
        <NavLink
          to="/admin/property"
          className={({ isActive }) =>
            `block py-4 px-6 text-lg font-medium hover:bg-gray-700 hover:text-orange-400 transition ${
              isActive ? "bg-gray-700 text-orange-400" : ""
            }`
          }
        >
          Property
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `block py-4 px-6 text-lg font-medium hover:bg-gray-700 hover:text-orange-400 transition ${
              isActive ? "bg-gray-700 text-orange-400" : ""
            }`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/imlink"
          className={({ isActive }) =>
            `block py-4 px-6 text-lg font-medium hover:bg-gray-700 hover:text-orange-400 transition ${
              isActive ? "bg-gray-700 text-orange-400" : ""
            }`
          }
        >
          Get ImageLink
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="text-center py-4 text-sm text-gray-400 bg-gray-800">
        © {new Date().getFullYear()} Admin Panel
      </div>
    </div>
  );
};

export default AdminSidebar;
