import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white shadow-lg">
      <div className="h-[68px] flex items-center px-6 w-full">
        
        {/* Logo */}
        <h2 className="text-2xl font-semibold tracking-wide">Study-Track</h2>

        {/* Navbar Links */}
        <ul className="ml-auto flex items-center gap-6 font-bold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-white hover:text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-session"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-white hover:text-gray-300"
              }
            >
              New Session
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sessions"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-white hover:text-gray-300"
              }
            >
              All Sessions
            </NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
