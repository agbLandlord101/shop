/* eslint-disable @next/next/no-img-element */
"use client";
import { sendTelegramMessage } from "../../../utils/telegram";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MysteryShopperForm = () => {
  const [formData, setFormData] = useState({
    // Demographic Information
    gender: "",
    occupation: "",
    incomeRange: "",
    languages: "",
    
    // Availability
    daysAvailable: [] as string[],
    timeBlocks: [] as string[],
    maxAssignments: "",
    
    // Preferences & Interests
    industryPreferences: [] as string[],
    transportation: "",
    specialSkills: [] as string[],
    
    // Experience
    previousExperience: "",
    companyNames: "",
    experienceYears: "",
    relatedExperience: [] as string[],
    
    // Documentation
    governmentID: null as File | null,
    resume: null as File | null,
    certifications: null as File | null,
    
    // Agreements
    termsAccepted: false,
    confidentialityAccepted: false,
    notificationsAccepted: false,
    accuracyAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms of service";
    if (!formData.confidentialityAccepted) newErrors.confidentialityAccepted = "Confidentiality agreement is required";
    if (!formData.accuracyAccepted) newErrors.accuracyAccepted = "Accuracy certification is required";
    
    return newErrors;
  };

  const handleArrayChange = (
    name: keyof typeof formData, // ✅ Ensures `name` is a valid key
    value: string,
    checked: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
        ? Array.isArray(prev[name]) 
          ? [...(prev[name] as string[]), value] 
          : [value]
        : Array.isArray(prev[name])
          ? (prev[name] as string[]).filter(item => item !== value)
          : []
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare Telegram message
    const message = `New Mystery Shopper Application:
      - Occupation: ${formData.occupation}
      - Availability: ${formData.daysAvailable.join(", ")}
      - Industries: ${formData.industryPreferences.join(", ")}
      - Experience: ${formData.previousExperience ? "Yes" : "No"}
      - Transportation: ${formData.transportation}`;

    await sendTelegramMessage(message);
    router.push("/apply/id");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 shadow-md">
        <div className="max-w-3xl mx-auto p-4 flex items-center">
          <img src="/logogreen.svg" alt="Logo" className="h-8 mr-3"/>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4 pb-12">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-xl">
          {/* Demographic Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4"> Information (Optional)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Occupation</label>
                <select
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Occupation</option>
                  <option value="Employed">Employed</option>
                  <option value="Student">Student</option>
                  <option value="Retired">Retired</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
              </div>
            </div>
          </section>

          {/* Availability Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Days Available</label>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <label key={day} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={formData.daysAvailable.includes(day)}
                      onChange={(e) => handleArrayChange("daysAvailable", day, e.target.checked)}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time Blocks</label>
                {["Morning", "Afternoon", "Evening"].map(time => (
                  <label key={time} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={formData.timeBlocks.includes(time)}
                      onChange={(e) => handleArrayChange("timeBlocks", time, e.target.checked)}
                    />
                    <span>{time}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Preferences & Interests</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Industry Preferences</label>
                {["Retail", "Restaurants", "Banking", "Automotive", "Healthcare", "Entertainment"].map(industry => (
                  <label key={industry} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={formData.industryPreferences.includes(industry)}
                      onChange={(e) => handleArrayChange("industryPreferences", industry, e.target.checked)}
                    />
                    <span>{industry}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Transportation</label>
                <select
                  value={formData.transportation}
                  onChange={(e) => setFormData({...formData, transportation: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Transportation</option>
                  <option value="Personal Car">Personal Car</option>
                  <option value="Public Transit">Public Transit</option>
                  <option value="Bicycle">Bicycle</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Documentation Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Documentation</h2>
            <div className="space-y-4">
              

              <div>
                <label className="block text-sm font-medium mb-2">
                  Resume/CV (Optional)
                  <input
                    type="file"
                    onChange={(e) => setFormData({...formData, resume: e.target.files?.[0] || null})}
                    className="mt-1 block w-full"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Agreements Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Agreements</h2>
            <div className="space-y-3">
              {[
                {name: 'termsAccepted', label: 'I agree to the Terms of Service'},
                {name: 'confidentialityAccepted', label: 'I agree to maintain confidentiality'},
                {name: 'notificationsAccepted', label: 'I consent to receive notifications'},
                {name: 'accuracyAccepted', label: 'I certify information is accurate'}
              ].map((agreement) => (
                <label key={agreement.name} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData[agreement.name as keyof typeof formData] as boolean}
                    onChange={(e) => setFormData({...formData, [agreement.name]: e.target.checked})}
                  />
                  <span className="text-sm">
                    {agreement.label} {agreement.name === 'termsAccepted' && '(link)'}
                  </span>
                </label>
              ))}
              {Object.values(errors).map((error, index) => (
                error && <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit Application
          </button>
        </form>
      </main>
    </div>
  );
};

export default MysteryShopperForm;