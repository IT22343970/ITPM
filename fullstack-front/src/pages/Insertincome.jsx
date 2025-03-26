import React from "react";
import { useNavigate } from "react-router-dom";

const Insertincome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center items-center w-full max-w-4xl bg-white p-6 border rounded-lg shadow-lg">
        {/* Form */}
        <form className="space-y-4 w-full max-w-md">
          <h2 className="text-xl font-semibold text-center text-gray-800">Insert Income</h2>

          {/* User ID Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="userId" className="font-medium text-gray-700">User ID</label>
            <input type="text" id="userId" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter user ID" />
          </div>

          {/* Source Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="source" className="font-medium text-gray-700">Source</label>
            <input type="text" id="source" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter source of income" />
          </div>

          {/* Category Select */}
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="font-medium text-gray-700">Category</label>
            <select id="category" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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
            <input type="number" id="amount" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter amount" />
          </div>

          {/* Note Textarea */}
          <div className="flex flex-col gap-1">
            <label htmlFor="note" className="font-medium text-gray-700">Note</label>
            <textarea id="note" rows="3" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add a note (optional)"></textarea>
          </div>

          {/* Date Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="font-medium text-gray-700">Date</label>
            <input type="date" id="date" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition">
              Back
            </button>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
              Submit
            </button>
          </div>
        </form>

        {/* Image */}
        <div className="hidden lg:block w-1/2 pl-8">
          <img src="assets\images\insert.png" alt="Income Illustration" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default Insertincome;
