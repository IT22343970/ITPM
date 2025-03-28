import React, { useState, useEffect } from 'react';

const UpdateBudgetForm = ({ onUpdate, budgetId, initialBudget }) => {
  const [formData, setFormData] = useState({
    category: '',
    limitAmount: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialBudget) {
      setFormData({
        category: initialBudget.category || '',
        limitAmount: initialBudget.limitAmount?.toString() || '',
        startDate: initialBudget.startDate || '',
        endDate: initialBudget.endDate || '',
      });
    }
  }, [initialBudget]);

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

    const updatedBudget = {
      category: formData.category,
      limitAmount: parseFloat(formData.limitAmount),
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    onUpdate(budgetId, updatedBudget);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Budget</h2>
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-green-600"
        >
          Update Budget
        </button>
      </div>
    </form>
  );
};

export default UpdateBudgetForm;