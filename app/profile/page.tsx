import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-green-700 text-white p-6">
        <h2 className="text-2xl font-bold">GreenDot</h2>
        <nav className="mt-6">
          <ul>
            <li className="mb-4">
              <a href="#" className="block p-2 hover:bg-green-600 rounded">Home</a>
            </li>
            
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="bg-white p-4 rounded shadow flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Profile</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-2 rounded-md"
            />
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Account Overview */}
        <section className="mb-6">
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Account Overview</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Add Funds
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Total Balance */}
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Available Balance</p>
                <p className="text-2xl font-bold text-green-700 mt-2">$5.82</p>
              </div>

              {/* Loan Pending */}
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Approved Loan Amount</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-2xl font-bold text-red-600">$2,500.00</p>
                  <span className="text-sm text-red-500">Disbursed 15</span>
                </div>
              </div>

              {/* Card Balance */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Card Balance</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-2xl font-bold text-blue-700">$1,234.56</p>
                  <span className="text-sm text-gray-500">VISA •••• </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[ 
            { title: "Pay Bills", icon: "💰" },
            { title: "Loan Details", icon: "🏦" },
            { title: "Transfer Funds", icon: "↔️" },
            
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-medium text-gray-700">{item.title}</h3>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
