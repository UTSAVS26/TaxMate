// src/Header.js
import React from 'react';
import logo from './logo.png';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="text-xl font-bold">GovtHackers</div>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mr-4">TaxMate</h1>
        <img src={logo} alt="TaxMate Logo" className="h-10 w-10" />
      </div>
    </header>
  );
};

export default Header;