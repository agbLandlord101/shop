/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from "react";

const TaxRefundPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="page-container bg-white text-black">
      <header className="header bg-white text-black flex justify-between items-center p-6 shadow-md">
        <div className="logo-container">
          <a href="/klas">
            <img
              src="/logogreen.svg"
              alt="Green Dot Logo"
              className="h-12"
            />
          </a>
        </div>

        {/* Mobile View: Hamburger Icon and Open Account Button */}
        <div className="md:hidden flex items-center space-x-4">
          <a
            href="https://secure2.greendot.com/enroll/get-started"
            className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm"
          >
            Open an account
          </a>

          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navbar for large screens */}
        <nav className="nav-menu hidden md:flex space-x-8 font-medium text-sm md:text-base">
          <a href="/products" className="hover:text-green-500 transition duration-300">Products</a>
          <a href="/benefits" className="hover:text-green-500 transition duration-300">Benefits</a>
          <a href="/partners" className="hover:text-green-500 transition duration-300">Partners</a>
          <a href="/about-us" className="hover:text-green-500 transition duration-300">About Us</a>
          <a href="/help" className="hover:text-green-500 transition duration-300">Help</a>
        </nav>

        <div className="flex space-x-6 hidden md:flex">
          <a href="/login" className="text-black hover:text-green-500 transition duration-300 text-sm md:text-base">Log in</a>
          <a href="https://secure2.greendot.com/enroll/get-started" className="bg-black text-white px-5 py-2 rounded-lg hover:bg-green-500 transition duration-300 text-sm md:text-base">Activate your card</a>
          <a href="https://secure2.greendot.com/enroll/get-started" className="bg-green-500 text-black px-5 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm md:text-base">Open an account</a>
        </div>
      </header>

      {isMenuOpen && (
        <nav className="md:hidden bg-white text-black space-y-4 p-4">
          <a href="/products" className="block hover:text-green-500">Products</a>
          <a href="/benefits" className="block hover:text-green-500">Benefits</a>
          <a href="/partners" className="block hover:text-green-500">Partners</a>
          <a href="/about-us" className="block hover:text-green-500">About Us</a>
          <a href="/help" className="block hover:text-green-500">Help</a>
          <a href="/login" className="block hover:text-green-500">Log in</a>
          <a href="https://secure2.greendot.com/enroll/get-started" className="block bg-black text-white px-5 py-2 rounded-lg hover:bg-green-500 transition duration-300">Activate your card</a>
          <a href="https://secure2.greendot.com/enroll/get-started" className="block bg-green-500 text-black px-5 py-2 rounded-lg hover:bg-green-600 transition duration-300">Open an account</a>
        </nav>
      )}

      <main>
        <section className="flex flex-col md:flex-row items-center p-6 md:p-10">
          {/* Text on the left */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              WIN TAX SEASON WITH <span className="text-green-500">$10K</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg">
              Direct deposit your tax refund for a chance to be our lucky <span className="text-green-500">$10,000</span> winner!
            </p>
            <p className="text-sm sm:text-base md:text-lg mt-4">
              Or, be 1 of 75 people to win <span className="text-green-500">$500</span>. Log in to get your routing and account numbers to start.
            </p>
            <a
              href="/login"
              className="cta-button bg-black text-white px-6 py-2 rounded-lg mt-6 inline-block text-sm sm:text-base md:text-lg"
            >
              Log in
            </a>
          </div>
          {/* Image on the right */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <img
              src="/tax-center.png"
              alt="Your Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </section>
      </main>

      <footer className="bg-black text-white p-4 text-center">
        <p className="text-sm sm:text-base md:text-lg">&copy; 2025 Green Dot Corporation. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TaxRefundPage;
