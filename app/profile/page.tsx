/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from 'react';
import { MdLock, MdVerified, MdHelp, MdNotifications } from 'react-icons/md';

interface UserData {
  firstName: string;
  lastName: string;
  dob: string;
  nationalId: string;
  loanStatus: 'review' | 'approved' | 'pending';
  // ... other types
}

const GreenDotProfilePage = ({ }: { userData?: UserData }) => {
  const [profileCompletion] = useState(85);
  
  

  // Security data masking utility
  const maskSensitiveData = (value: string, visibleChars = 4) => {
    return '*'.repeat(value.length - visibleChars) + value.slice(-visibleChars);
  };

  return (
    <div className="min-h-screen bg-greenDot-light">
      {/* Header Section */}
      <header className="bg-greenDot-primary text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <img src="/logogreen.svg" alt="GreenDot Bank" className="h-12" />
          <h1 className="text-xl font-semibold">Loan Application Portal</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-greenDot-secondary"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="44"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-white"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - profileCompletion / 100)}`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="44"
                  cx="50"
                  cy="50"
                />
              </svg>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm">
                {profileCompletion}%
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button aria-label="Notifications" className="hover:text-greenDot-secondary">
              <MdNotifications className="text-2xl" />
            </button>
            <button aria-label="Help" className="hover:text-greenDot-secondary">
              <MdHelp className="text-2xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-8">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Personal Info Card */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MdLock className="text-greenDot-primary" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <p className="font-medium">John</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <p className="font-medium">Doe</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Date of Birth</label>
                <p className="font-medium">01/01/1990</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">National ID</label>
                <p className="font-medium flex items-center gap-1">
                  {maskSensitiveData('123456789')}
                  <MdVerified className="text-greenDot-primary" />
                </p>
              </div>
            </div>
          </section>

          {/* Loan Status Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
  <h2 className="text-xl font-semibold mb-6">Application Status</h2>
  
  {/* Progress Bar with Status Stages */}
  <div className="flex items-center gap-6 mb-6">
    {['received', 'review', 'approved'].map((stage, index) => (
      <div key={stage} className="flex-1 flex items-center justify-center">
        {/* Circle indicating status */}
        <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${index === 0 ? 'border-gray-200' : index === 1 ? 'border-yellow-500' : 'border-green-500'} bg-white`}>
          <div className={`w-6 h-6 rounded-full ${index <= 1 ? 'bg-yellow-500' : 'bg-green-500'}`} />
        </div>
        <p className="text-sm text-center mt-2 capitalize">{stage}</p>
      </div>
    ))}
  </div>

  {/* Loan Details */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="text-sm text-gray-600">Loan Amount</label>
      <p className="font-medium text-lg">$25,000</p>
    </div>
    <div>
      <label className="text-sm text-gray-600">Interest Rate</label>
      <p className="font-medium text-lg">6.8% APR</p>
    </div>
  </div>

</section>

        </div>

        {/* Right Column - Security */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Security Status</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MdVerified className="text-greenDot-primary" />
                <span>2FA Enabled</span>
              </div>
              <div>
                <p className="text-sm">Last Login: 12:30 PM</p>
                   <p className="text-xs text-gray-600">IP: {maskSensitiveData('192.168.1.1', 3)}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GreenDotProfilePage;
