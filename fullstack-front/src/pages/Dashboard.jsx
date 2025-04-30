import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');

  const stats = [
    { label: 'Total Balance', value: '$5,240', icon: 'ph:wallet-bold', trend: '+14%' },
    { label: 'Total Expenses', value: '$1,500', icon: 'ph:trend-down-bold', trend: '-2.5%' },
    { label: 'Total Income', value: '$3,740', icon: 'ph:trend-up-bold', trend: '+8.1%' },
    { label: 'Total Savings', value: '$2,140', icon: 'ph:piggy-bank-bold', trend: '+5.3%' }
  ];

  const menuItems = [
    { label: 'Dashboard', icon: 'ph:grid-four', path: '/dashboard' },
    { label: 'Incomes', icon: 'ph:chart-pie', path: '/transactions' },
    { label: 'Expense', icon: 'ph:money', path: '/budget' },
    { label: 'Budget', icon: 'ph:target', path: '/goals' },
    { label: 'Settings', icon: 'ph:gear', path: '/user-settings' },
    { label: 'Help', icon: 'ph:info', path: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar */}
      <div
        className={`bg-white w-64 shadow-lg fixed h-full transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1>
            <img
              src="/fullstack-front/public/assets/images/Bold_professional_Finance_Company_Logo-removebg-preview.png"
              alt="FinSync Logo"
              className="h-10 w-auto"
            />
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <Icon icon="ph:x" className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
            >
              <Icon icon={item.icon} className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <button
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Icon icon="ph:list" className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Icon icon="ph:bell" className="h-6 w-6 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Icon icon="ph:user-circle" className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Smart Dashboard</h2>
            <p className="text-gray-600">Track and manage your budget</p>
          </div>

          {/* Expense & Income Trends Graph */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Expense & Income Trends</h3>
            {/* Replace with actual chart component */}
            <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
          </div>

          
          {/* Budget Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {['Entertainment', 'Transportation', 'Groceries', 'Rent'].map((label) => (
              <div key={label} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-600">Monthly</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-900">$200</span>
                    <span className="ml-2 text-sm text-gray-600">of $250</span>
                  </div>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2" style={{ width: '80%' }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Alert for exceeding budget */}
          <div className="bg-red-100 rounded-lg p-4 mb-8">
            <p className="text-red-600 text-sm">Attention! You have exceeded 80% of your Rent budget this month.</p>
          </div>

          {/* Current Savings and Target */}
          <div className="flex justify-between mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex-1 mr-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Savings</h3>
              <p className="text-xl font-bold text-gray-900 mt-4">$1,000</p>
            </div>
            <div className="bg-green-100 rounded-lg shadow p-6 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">This Month Target</h3>
              <p className="text-xl font-bold text-gray-900 mt-4">$1,500</p>
            </div>
          </div>

          {/* Send Monthly Summary via SMS */}
          <div
            style={{
              marginTop: '20px',
              backgroundColor: '#FFFFFF',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <h4>Send Monthly Summary via SMS</h4>
            <div style={{ marginBottom: '10px' }}>
              <p>
                <strong>Total Budget:</strong> $2500.00
              </p>
              <p>
                <strong>Total Spent:</strong> $1500.00
              </p>
              <p>
                <strong>Total Saving Amount:</strong> $1000.00
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <p>
                  <strong>Entertainment:</strong> $200/$250
                </p>
                <p>
                  <strong>Transportation:</strong> $200/$300
                </p>
                <p>
                  <strong>Groceries:</strong> $300/$500
                </p>
                <p>
                  <strong>Rent:</strong> $1000/$1000
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                style={{ padding: '10px', borderRadius: '5px', width: '60%' }}
              />
              <button
                style={{
                  backgroundColor: '#32D6B7',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Send Summary SMS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;