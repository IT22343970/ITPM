import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { label: 'Total Balance', value: '$5,240', icon: 'ph:wallet-bold', trend: '+14%' },
    { label: 'Total Expenses', value: '$1,500', icon: 'ph:trend-down-bold', trend: '-2.5%' },
    { label: 'Total Income', value: '$3,740', icon: 'ph:trend-up-bold', trend: '+8.1%' },
    { label: 'Total Savings', value: '$2,140', icon: 'ph:piggy-bank-bold', trend: '+5.3%' }
  ];

  const menuItems = [
    { label: 'Dashboard', icon: 'ph:grid-four', path: '/dashboard' },
    { label: 'Transactions', icon: 'ph:money', path: '/transactions' },
    { label: 'Budget', icon: 'ph:chart-pie', path: '/budget' },
    { label: 'Goals', icon: 'ph:target', path: '/goals' },
    { label: 'Reports', icon: 'ph:chart-line', path: '/reports' },
    { label: 'Settings', icon: 'ph:gear', path: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-white w-64 shadow-lg fixed h-full transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">MY Manager</h1>
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
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
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
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, User!</h2>
            <p className="text-gray-600">Here's your financial overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Icon icon={stat.icon} className="h-6 w-6 text-indigo-600" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              {/* Add your recent activity content here */}
              <p className="text-gray-600">No recent activities to show.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;