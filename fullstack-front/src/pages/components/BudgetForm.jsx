import React, { useState } from 'react';

const BudgetForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    userId: JSON.parse(localStorage.getItem('user')).id,
    category: '',
    limitAmount: '',
    startDate: '',
    endDate: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required.';
    }

    if (!formData.limitAmount || parseFloat(formData.limitAmount) <= 0) {
      newErrors.limitAmount = 'Limit Amount must be a positive number.';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const selectedStartDate = new Date(formData.startDate);
    if (!formData.startDate || selectedStartDate < today) {
      newErrors.startDate = 'Start Date cannot be in the past.';
    }

    const selectedEndDate = new Date(formData.endDate);
    if (!formData.endDate) {
      newErrors.endDate = 'End Date is required.';
    } else if (selectedEndDate <= selectedStartDate) {
      newErrors.endDate = 'End Date must be after Start Date.';
    } else {
      const diffInDays = (selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24); 
      if (diffInDays < 30) {
        newErrors.endDate = 'End Date must be at least 30 days after Start Date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onCreate(formData);

    setFormData({
      userId: JSON.parse(localStorage.getItem('user')).id,
      category: '',
      limitAmount: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 max-h-[400px] rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Budget</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

        <input
          type="number"
          name="limitAmount"
          placeholder="Limit Amount"
          value={formData.limitAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.limitAmount && <p className="text-red-500 text-sm">{errors.limitAmount}</p>}

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Budget
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;