"use client";

import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isFormValid = userID.trim() !== "" && password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please enter a valid User ID and password.");
      return;
    }
    setError("");

    const apiUrl = "https://ymcq30o8c7.execute-api.us-east-1.amazonaws.com/signin"; 

    const requestBody = {
      userID,
      password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.status === 200) {
        // Store username in localStorage
        localStorage.setItem("username", userID);

        // Redirect to profile page
        window.location.href = "/profile"; // Or use your preferred navigation method
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Failed to log in. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-left border border-gray-300">
        <h1 className="text-2xl font-bold uppercase">
          <span className="text-green-600">Account</span>
          <span className="text-gray-700"> Login</span>
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              * User ID
            </label>
            <input
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              * Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              isFormValid ? "bg-gradient-to-b from-purple-600 to-purple-800" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            LOGIN
          </button>
        </form>

        <p className="text-[10px] text-gray-500 mt-6 leading-tight">
          This Card is issued by Green Dot Bank, Member FDIC, pursuant to a license from Visa U.S.A., Inc.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
