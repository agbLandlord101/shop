"use client";

import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = userID.trim() !== "" && password.length >= 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please enter a valid User ID and password.");
      return;
    }
    setError("");
    console.log("Logging in with:", { userID, password, remember });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-left border border-gray-300">
        {/* Account Login Title */}
        <h1 className="text-2xl font-bold uppercase">
          <span className="text-green-600">Account</span>
          <span className="text-gray-700"> Login</span>
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* User ID Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              * User ID
              <span className="ml-1 text-blue-500 cursor-pointer">ⓘ</span>
            </label>
            <input
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              * Password
              <span className="ml-1 text-blue-500 cursor-pointer">ⓘ</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="h-4 w-4 border border-gray-400 rounded cursor-pointer"
            />
            <label className="text-sm text-gray-700">
              Remember User ID <span className="ml-1 text-blue-500 cursor-pointer">ⓘ</span>
            </label>
          </div>

          {/* Links for Forgot Password & Create Account */}
          <div className="text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Create Online User ID
            </a>
            <br />
            <a href="#" className="text-blue-600 hover:underline">
              Forgot User ID/Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 text-sm ${
              isFormValid ? "bg-gradient-to-b from-purple-600 to-purple-800 hover:from-purple-700" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            LOGIN
          </button>
        </form>

        {/* Disclaimer Text */}
        <p className="text-[10px] text-gray-500 mt-6 leading-tight">
          This Card is issued by Green Dot Bank, Member FDIC, pursuant to a license from Visa U.S.A., Inc.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
