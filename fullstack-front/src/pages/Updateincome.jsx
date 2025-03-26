import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateIncome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    source: "",
    category: "Salary",
    amount: "",
    note: "",
    date: "",
    isEditing: true, // Always in editing mode
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Income updated successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg shadow-lg bg-white w-full max-w-4xl flex flex-col lg:flex-row items-center">
        {/* Form Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-center text-gray-800">Update Income</h2>

          {/* User ID Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="userId" className="font-medium text-gray-700">User ID</label>
            <input
              type="text"
              id="userId"
              value={formData.userId}
              onChange={handleChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user ID"
              disabled
            />
          </div>

          {/* Source Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="source" className="font-medium text-gray-700">Source</label>
            <input
              type="text"
              id="source"
              value={formData.source}
              onChange={handleChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Update source of income"
            />
          </div>

          {/* Category Select */}
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="font-medium text-gray-700">Category</label>
            <select id="category" value={formData.category} onChange={handleChange} className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Salary</option>
              <option>Freelancing</option>
              <option>Investments</option>
              <option>Business</option>
              <option>Other</option>
            </select>
          </div>

          {/* Amount Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="amount" className="font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Update amount"
            />
          </div>

          {/* Note Textarea */}
          <div className="flex flex-col gap-1">
            <label htmlFor="note" className="font-medium text-gray-700">Note</label>
            <textarea
              id="note"
              rows="3"
              value={formData.note}
              onChange={handleChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Update a note (optional)"
            ></textarea>
          </div>

          {/* Date Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">
              Back
            </button>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
              Update
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block w-1/2 pl-8 mt-6 lg:mt-0">
          <img src="assets/images/update.png" alt="Income Illustration" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </form>
    </div>
  );
};

export default UpdateIncome;
