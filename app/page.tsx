/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from "react";

const steps = [
  {
    title: "Sign Up Free",
    content: "Create your account in minutes - no fees or commitments. Start browsing opportunities immediately.",
  },
  {
    title: "Receive Assignments",
    content: "Get matched with local mystery shopping opportunities that fit your interests and schedule.",
  },
  {
    title: "Shop & Experience",
    content: "Visit assigned businesses, make purchases if required, and carefully observe your experience.",
  },
  {
    title: "Submit Report",
    content: "Provide detailed feedback through our secure platform about your shopping experience.",
  },
  {
    title: "Get Paid",
    content: "Receive payment within 48 hours of report approval. Earnings vary by assignment complexity.",
  },
];

const MysteryShopperPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(steps[0].title);
  const [isMobile, setIsMobile] = useState(false);
  const [openTabs, setOpenTabs] = useState<boolean[]>(new Array(steps.length).fill(false));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccordion = (index: number) => {
    setOpenTabs(prev => {
      const newTabs = [...prev];
      newTabs[index] = !newTabs[index];
      return newTabs;
    });
  };

  return (
    <div className="page-container bg-white text-black">
      <header className="header bg-white text-black flex justify-between items-center p-6 shadow-md sticky top-0 z-50">
        <div className="logo-container">
          <a>
            <img src="/logogreen.svg" alt="ShopCheck Logo" className="h-8 mr-3" />
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <a
            href="/info"
            className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm"
          >
          Apply
          </a>
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-menu hidden md:flex space-x-8 font-medium text-sm md:text-base">
          <a href="/info" className="hover:text-green-500 transition duration-300">Opportunities</a>
          <a href="/info" className="hover:text-green-500 transition duration-300">How It Works</a>
          <a href="/info" className="hover:text-green-500 transition duration-300">Earnings</a>
          <a href="/info" className="hover:text-green-500 transition duration-300">About Us</a>
          <a href="/info" className="hover:text-green-500 transition duration-300">FAQ</a>
        </nav>

        <div className="hidden md:flex space-x-4">
          <a href="/login" className="text-black hover:text-green-500 transition duration-300">Shopper Login</a>
          <a href="/login" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-300">
            Business Solutions
          </a>
          <a href="/info" className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            Sign Up
          </a>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white text-black space-y-4 p-4">
          {["Opportunities", "How It Works", "Earnings", "About Us", "FAQ", "Login"].map((item) => (
            <a key={item} href="/login" className="block hover:text-green-500">
              {item}
            </a>
          ))}
          <a href="/donate" className="block bg-black text-white px-5 py-2 rounded-lg hover:bg-green-500 transition duration-300">
            For Businesses
          </a>
          <a href="/info" className="block bg-green-500 text-black px-5 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            Get Started
          </a>
        </nav>
      )}

      <main>
        <section className="p-6 md:p-10 bg-gray-50">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Get Paid to Shop, Eat, Play
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center md:space-x-10 space-y-6 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img src="/submit.png" alt="Sign Up" className="w-12 h-12" />
              <div>
                <h3 className="font-bold">1. Sign Up Free</h3>
                <p className="text-sm text-gray-600">Create your profile in minutes and access local opportunities</p>
              </div>
              <span className="hidden md:inline-block text-xl text-green-500">➡</span>
            </div>

            <div className="flex items-center space-x-4">
              <img src="/stopwatch.png" alt="Complete Tasks" className="w-12 h-12" />
              <div>
                <h3 className="font-bold">2. Complete Assignments</h3>
                <p className="text-sm text-gray-600">Shop, dine, or evaluate services while getting paid</p>
              </div>
              <span className="hidden md:inline-block text-xl text-green-500">➡</span>
            </div>

            <div className="flex items-center space-x-4">
              <img src="/moneyhand.png" alt="Get Paid" className="w-12 h-12" />
              <div>
                <h3 className="font-bold">3. Earn Rewards</h3>
                <p className="text-sm text-gray-600">Get paid quickly through multiple payment options</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center p-6 md:p-10 gap-8">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Make an Impact While You Earn
            </h2>
            <p className="text-lg md:text-xl mb-4">
              Your secret shopping experiences help businesses improve customer service, product quality, 
              and overall experience. Earn money while helping shape better consumer experiences for everyone.
            </p>
            <a
              href="/info"
              className="inline-block bg-green-500 text-black px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300 text-lg font-semibold"
            >
              Apply Now 
            </a>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/tax-center.png"
              alt="Mystery Shopping"
              className="w-full max-w-xl mx-auto rounded-xl shadow-lg"
            />
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse items-center p-6 md:p-10 gap-8">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Flexible Opportunities Around You
            </h2>
            <div className="text-lg md:text-xl mb-4">
  <p>Choose from various assignments that fit your lifestyle:</p>
  <ul className="list-disc pl-6 mt-2">
    <li>Retail evaluations</li>
    <li>Dining experiences</li>
    <li>Service quality assessments</li>
    <li>Product testing</li>
  </ul>
</div>

            <a
              href="/info"
              className="inline-block bg-green-500 text-black px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300 text-lg font-semibold"
            >
              View Available Jobs
            </a>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/tax-refund-win10k-desktop.svg"
              alt="Shopping Opportunities"
              className="w-full max-w-xl mx-auto rounded-xl shadow-lg"
            />
          </div>
        </section>

        <section className="p-6 md:p-10 bg-gray-50">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            How Mystery Shopping Works
          </h2>

          {!isMobile ? (
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {steps.map((step) => (
                  <button
                    key={step.title}
                    onClick={() => setActiveTab(step.title)}
                    className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                      activeTab === step.title
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                {steps.find((step) => step.title === activeTab)?.content}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center px-6 py-4 font-semibold"
                  >
                    <span>{step.title}</span>
                    <span className={`text-green-500 text-xl transition-transform ${openTabs[index] ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {openTabs[index] && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      {step.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-black text-white p-6 text-center">
        <p className="text-sm md:text-base">
          © 2025 ShopCheck Mystery Shopping Network. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MysteryShopperPage;