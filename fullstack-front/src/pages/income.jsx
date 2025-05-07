// Income.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Income = () => {
  const navigate = useNavigate();
  const [incomeData, setIncomeData] = useState([]);
  const [filters, setFilters] = useState({ source: '', category: '', startDate: '', endDate: '' });
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', icon: 'ph:grid-four', path: '/dashboard' },
    { label: 'Transactions', icon: 'ph:money', path: '/transactions' },
    { label: 'Income', icon: 'ph:money', path: '/income' },
    { label: 'Budget', icon: 'ph:chart-pie', path: '/budget' },
    { label: 'Goals', icon: 'ph:target', path: '/goals' },
    { label: 'Reports', icon: 'ph:chart-line', path: '/reports' },
    { label: 'Settings', icon: 'ph:gear', path: '/settings' }
  ];

  useEffect(() => {
    axios.get('http://localhost:8080/api/income')
      .then(response => setIncomeData(response.data))
      .catch(error => console.error("Error fetching the income data:", error));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this income record?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`http://localhost:8080/api/income/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setIncomeData(prev => prev.filter(income => income.incomeId !== id));
      } else {
        console.error('Failed to delete the income');
      }
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const handleDownload = () => {
    const csvContent = [
      ['Income ID', 'Source', 'Category', 'Amount', 'Income Note', 'Date', 'Created Date'],
      ...incomeData.map(income => [income.id, income.source, income.category, income.amount, income.note, income.date, income.createdDate])
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'income_report.csv');
  };

  const filteredData = incomeData.filter(income =>
    (filters.source ? income.source.includes(filters.source) : true) &&
    (filters.category ? income.category.includes(filters.category) : true) &&
    (filters.startDate ? new Date(income.date) >= new Date(filters.startDate) : true) &&
    (filters.endDate ? new Date(income.date) <= new Date(filters.endDate) : true)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <div className={`bg-white w-64 shadow-lg fixed h-full transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-extrabold text-indigo-700">FINSYNC</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <Icon icon="ph:x" className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
              <Icon icon={item.icon} className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-100">
                <Icon icon="ph:list" className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">💰 Income Records</h2>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Filter by Source"
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="text"
              placeholder="Filter by Category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={() => navigate("/Insertincome")} className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">+ Add Income</button>
            <button onClick={handleDownload} className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">⬇ Download Report</button>
          </div>

          {/* Stylish Table */}
          <div className="bg-white shadow-xl rounded-xl overflow-x-auto border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-100">
                <tr>
                  {['Income ID', 'User ID', 'Source', 'Category', 'Amount', 'Note', 'Date', 'Actions'].map(header => (
                    <th key={header} className="px-6 py-3 text-left text-sm font-bold text-indigo-800 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-800 font-medium">
                {filteredData.length > 0 ? filteredData.map(income => (
                  <tr key={income.incomeId} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">{income.incomeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{income.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{income.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{income.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-700 font-semibold">Rs {income.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{income.note}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{income.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => navigate(`/Updateincome/${income.incomeId}`)} className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">Edit</button>
                      <button onClick={() => handleDelete(income.incomeId)} className="ml-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500 italic">No income records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
