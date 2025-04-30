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
      .then(response => {
        setIncomeData(response.data);
      })
      .catch(error => {
        console.error("Error fetching the income data:", error);
      });
  }, []);

  // handling delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this income record?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/api/income/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setIncomeData(prevIncomeData => prevIncomeData.filter((income) => income.incomeId !== id));
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

  // Filter the data based on the filters
  const filteredData = incomeData.filter(income => 
    (filters.source ? income.source.includes(filters.source) : true) &&
    (filters.category ? income.category.includes(filters.category) : true) &&
    (filters.startDate ? new Date(income.date) >= new Date(filters.startDate) : true) &&
    (filters.endDate ? new Date(income.date) <= new Date(filters.endDate) : true)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-white w-64 shadow-lg fixed h-full transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">FINSYNC</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <Icon icon="ph:x" className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
              <Icon icon={item.icon} className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Income Records</h2>

          {/* Filters */}
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Source" 
              value={filters.source} 
              onChange={(e) => setFilters({ ...filters, source: e.target.value })} 
              className="px-4 py-2 border rounded-md mr-2"
            />
            <input 
              type="text" 
              placeholder="Category" 
              value={filters.category} 
              onChange={(e) => setFilters({ ...filters, category: e.target.value })} 
              className="px-4 py-2 border rounded-md mr-2"
            />
            <input 
              type="date" 
              value={filters.startDate} 
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} 
              className="px-4 py-2 border rounded-md mr-2"
            />
            <input 
              type="date" 
              value={filters.endDate} 
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} 
              className="px-4 py-2 border rounded-md"
            />
          </div>

          <button onClick={() => navigate("/Insertincome")} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mr-2">Insert Income</button>
          <button onClick={handleDownload} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Download Report</button>

          <div className="bg-white shadow rounded-lg overflow-hidden mt-4">
            <table className="min-w-full table-auto">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Income ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Note</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((income) => (
                  <tr key={income.id} className="border-b">
                    <td className="px-6 py-4">{income.incomeId}</td>
                    <td className="px-6 py-4">{income.userId}</td>
                    <td className="px-6 py-4">{income.source}</td>
                    <td className="px-6 py-4">{income.category}</td>
                    <td className="px-6 py-4">Rs {income.amount}</td>
                    <td className="px-6 py-4">{income.note}</td>
                    <td className="px-6 py-4">{income.date}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => navigate(`/Updateincome/${income.incomeId}`)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Edit</button>
                      <button onClick={() => handleDelete(income.incomeId)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
