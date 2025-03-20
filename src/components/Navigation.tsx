import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="logo">
        <NavLink to="/">Baltzar Test</NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 