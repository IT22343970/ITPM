import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';

const Income = () => {
  const navigate = useNavigate();
  const [incomeData, setIncomeData] = useState([
    { id: 1, source: 'Salary', category: 'Job', amount: 3000, note: 'Monthly salary', date: '2025-03-01', createdDate: '2025-03-01' },
    { id: 2, source: 'Freelance', category: 'Side Hustle', amount: 1200, note: 'Web design project', date: '2025-03-05', createdDate: '2025-03-05' },
    { id: 3, source: 'Investments', category: 'Stocks', amount: 500, note: 'Dividends', date: '2025-03-10', createdDate: '2025-03-10' },
  ]);

  const [filters, setFilters] = useState({ source: '', category: '', startDate: '', endDate: '' });

  const handleDelete = (id) => {
    setIncomeData(incomeData.filter((income) => income.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/edit-income/${id}`);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Income Records</h2>
      
      <div className="mb-4 flex space-x-4">
        <input type="text" placeholder="Filter by Source" className="border p-2" onChange={(e) => setFilters({...filters, source: e.target.value})} />
        <input type="text" placeholder="Filter by Category" className="border p-2" onChange={(e) => setFilters({...filters, category: e.target.value})} />
        <input type="date" className="border p-2" onChange={(e) => setFilters({...filters, startDate: e.target.value})} />
        <input type="date" className="border p-2" onChange={(e) => setFilters({...filters, endDate: e.target.value})} />
      </div>
      
      <button onClick={() => navigate("/Insertincome")} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mr-2">Insert Income</button>
      <button onClick={handleDownload} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Download Report</button>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mt-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Income ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Income Note</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Created Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((income) => (
              <tr key={income.id} className="border-b">
                <td className="px-6 py-4 text-gray-900">{income.id}</td>
                <td className="px-6 py-4 text-gray-900">{income.source}</td>
                <td className="px-6 py-4 text-gray-900">{income.category}</td>
                <td className="px-6 py-4 text-gray-900">${income.amount}</td>
                <td className="px-6 py-4 text-gray-900">{income.note}</td>
                <td className="px-6 py-4 text-gray-900">{income.date}</td>
                <td className="px-6 py-4 text-gray-900">{income.createdDate}</td>
                <td className="px-6 py-4 text-gray-900">
                <button onClick={() => navigate("/Updateincome")} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mr-2">Edit</button>
                  <button onClick={() => handleDelete(income.id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Income;
