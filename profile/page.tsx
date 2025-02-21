/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { MdWork, MdEmail, MdPhone, MdLocationOn, MdLanguage, MdStar } from "react-icons/md";

// Define ProfileData type
interface ProfileData {
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  languages: string[];
  skills: string[];
  projects: { name: string; description: string }[];
}

const ProfilePage = ({ profileData }: { profileData: ProfileData }) => {
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode

  const handleEditToggle = () => setIsEditing(!isEditing);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-6">
        <div className="flex justify-center items-center gap-4">
          <img
            src="/default-profile-pic.jpg" // Replace with dynamic URL or an image from the backend
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div>
            <h1 className="text-2xl font-semibold">{profileData.firstName} {profileData.lastName}</h1>
            <p className="text-sm text-gray-400">{profileData.bio}</p>
          </div>
        </div>
      </header>

      <main className="p-8">
        <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <button
              onClick={handleEditToggle}
              className="text-blue-500 hover:underline"
            >
              {isEditing ? "Save Changes" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{isEditing ? <input type="email" defaultValue={profileData.email} className="border p-2 rounded" /> : profileData.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{isEditing ? <input type="tel" defaultValue={profileData.phone} className="border p-2 rounded" /> : profileData.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p>{isEditing ? <input type="text" defaultValue={profileData.location} className="border p-2 rounded" /> : profileData.location}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Languages</p>
              <p>{isEditing ? (
                <input
                  type="text"
                  defaultValue={profileData.languages.join(", ")}
                  className="border p-2 rounded"
                />
              ) : (
                profileData.languages.join(", ")
              )}</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profileData.skills.map((skill, index) => (
              <li key={index} className="bg-gray-200 p-2 rounded-md text-center text-gray-700">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <div className="space-y-4">
            {profileData.projects.map((project, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <h3 className="text-lg font-semibold text-blue-600">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <div className="flex justify-center items-center gap-6">
          <div className="flex items-center gap-2">
            <MdWork className="text-2xl" />
            <span>Over 20 years of experience</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLanguage className="text-2xl" />
            <span>Multiple languages</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
