/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";





// Add this spinner component at the top of your file
const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizes[size]} inline-block`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const ProfilePage = () => {
  const [accountData, setAccountData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [pendingLoans, setPendingLoans] = useState<any[]>([]);
  
  

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    if (!storedUsername) return;
    const fetchPendingLoans = async () => {
        try {
          // Simulated API call
          const response = await fetch(`/api/loans/pending/${storedUsername}`);
          const data = await response.json();
          setPendingLoans(data);
        } catch (error) {
          console.error("Error fetching pending loans:", error);
        }
      };
    
    

    const fetchAccountData = async () => {
      try {
        const response = await fetch(
          `https://ymcq30o8c7.execute-api.us-east-1.amazonaws.com/profile/${storedUsername}`
        );
        const data = await response.json();
        setAccountData(data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setLoading(false);
      }
    };
   
    fetchAccountData();
    fetchPendingLoans();
    
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Enhanced Sidebar */}
      <aside className="w-full md:w-64 bg-green-700 text-white p-6 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-green-700 font-bold">G</span>
          </div>
          <h2 className="text-xl font-bold">GreenDot Bank</h2>
        </div>
        
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center space-x-3 p-3 hover:bg-green-600 rounded-lg">
                <span>🏠</span>
                <span>Dashboard</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Enhanced Header */}
        <header className="bg-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {username}!</h1>
            <p className="text-gray-500 text-sm mt-1">
              Last login: {new Date().toLocaleDateString()}
            </p>
          </div>

          
          <div className="flex items-center space-x-4">
            {!accountData?.verified && (
              <button
              className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-200 flex items-center"
              onClick={() => (window.location.href = '/idme')} // ✅ Correct placement
            >
              <span className="mr-2">🛡️</span>
              Verify Identity
            </button>
            )}
            <div className="relative group">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white cursor-pointer">
                {username?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg p-4 mt-2 min-w-[200px]">
                <div className="text-sm font-medium text-gray-700">{username}</div>
                <div className="text-xs text-gray-500 mt-1">{accountData?.email}</div>
                <hr className="my-2" />
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Pending Loans Section */}
        {pendingLoans.length > 0 && (
          <section className="mb-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Pending Loan Applications
                </h2>
                <span className="text-sm text-gray-500">
                  {pendingLoans.length} active applications
                </span>
              </div>

              <div className="space-y-4">
                {pendingLoans.map((loan) => (
                  <div key={loan.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="mb-4 sm:mb-0">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${loan.status === 'processing' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                        <div>
                          <p className="font-medium text-gray-800">${loan.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{loan.purpose}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 w-full sm:w-auto">
                      <div className="text-sm space-y-1">
                        <p className="text-gray-500">Application Date</p>
                        <p className="text-gray-800">{new Date(loan.applicationDate).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <p className="text-gray-500">Expected Decision</p>
                        <p className="text-gray-800">{new Date(loan.expectedDecisionDate).toLocaleDateString()}</p>
                      </div>

                      
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
                  View All Loan Applications
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Account Overview Section */}
        <section className="mb-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
                Account Summary
              </h2>
              <div className="flex space-x-4">
              <button
  onClick={() => (window.location.href = '/registercard')}
  className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 flex items-center justify-center text-sm md:text-base"
>
  
  Register Card
</button>

<button
  onClick={() => (window.location.href = '/registercard')}
  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 flex items-center justify-center text-sm md:text-base"
>

  Apply for Loan
</button>


              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Balance Cards */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                      <p className="text-3xl font-bold text-gray-800">
                        ${accountData?.availableBalance?.toLocaleString() ?? "0.00"}
                      </p>
                    </div>
                    <div className="bg-green-600 p-3 rounded-lg">💰</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Active Loan</p>
                      <p className="text-3xl font-bold text-gray-800">
                        ${accountData?.loanAmount?.toLocaleString() ?? "0.00"}
                      </p>
                      <p className="text-xs text-red-500 mt-1">
                        Disbursed {accountData?.disbursedDays ?? "N/A"} days ago
                      </p>
                    </div>
                    <div className="bg-red-600 p-3 rounded-lg">📈</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Card Balance</p>
                      <p className="text-3xl font-bold text-gray-800">
                        ${accountData?.cardBalance?.toLocaleString() ?? "0.00"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        VISA •••• {accountData?.cardLast4 ?? "****"}
                      </p>
                    </div>
                    <div className="bg-blue-600 p-3 rounded-lg">💳</div>
                  </div>
                </div>

                
              </div>
            )}
          </div>
        </section>

        {/* New Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {[/* Add transaction data here */].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">🛒</div>
                    <div>
                      <p className="font-medium">Merchant Name</p>
                      <p className="text-sm text-gray-500">2023-09-15</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">-$250.00</p>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                </div>
              ))}
              <button className="w-full text-center text-green-600 py-3 hover:bg-gray-50 rounded-lg">
                View All Transactions
              </button>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Wire Transfer", icon: "🌐", color: "bg-blue-100" },
                { title: "Pay Bills", icon: "📅", color: "bg-green-100" },
                { title: "Investment", icon: "📈", color: "bg-purple-100" },
                { title: "Tax Services", icon: "🏛️", color: "bg-yellow-100" },
              ].map((action, index) => (
                <button
                  key={index}
                  className={`p-6 rounded-xl ${action.color} hover:opacity-90 transition-opacity`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="font-medium text-gray-700">{action.title}</div>
                </button>
              ))}
            </div>
          </section>
        </div>

       

        {/* Loan Application Modal */}
        {showLoanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-xl font-bold mb-6">Apply for a New Loan</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Amount</label>
                  <input
                    type="number"
                    className="w-full p-3 border rounded-lg"
                    placeholder="$5,000 - $100,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Purpose</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Home Improvement</option>
                    <option>Debt Consolidation</option>
                    <option>Business Investment</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowLoanModal(false)}
                    className="flex-1 px-6 py-3 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;