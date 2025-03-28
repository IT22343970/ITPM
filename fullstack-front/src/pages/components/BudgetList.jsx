import React, { useState } from 'react';
import UpdateBudgetForm from './UpdateForm';

const BudgetList = ({ budgets, onMarkExpense, onDeleteBudget, fetchBudgets, onUpdate }) => {
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [expenseData, setExpenseData] = useState({ amount: '', note: '' });
  const [errors, setErrors] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 

  const openMarkModal = (id) => {
    setSelectedBudgetId(id);
    setIsMarkModalOpen(true);
    setErrors({}); 
  };

  const closeMarkModal = () => {
    setIsMarkModalOpen(false);
    setExpenseData({ amount: '', note: '' });
    setErrors({}); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
  };

  const validateMarkExpense = () => {
    const newErrors = {};
    if (!expenseData.amount || parseFloat(expenseData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number.';
    }
    if (!expenseData.note.trim()) {
      newErrors.note = 'Note is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const markExpenseHandler = async () => {
    if (!validateMarkExpense()) return;

    try {
      if (!selectedBudgetId) {
        console.error('Selected budget ID is undefined');
        return;
      }

      await onMarkExpense(selectedBudgetId, expenseData.amount, expenseData.note);
      closeMarkModal();
      fetchBudgets(); 
    } catch (error) {
      console.error('Error marking expense:', error);
    }
  };

  const deleteBudgetHandler = async (id) => {
    try {
      await onDeleteBudget(id);
      fetchBudgets(); 
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

    const openEditModal = (budget) => {
        setSelectedBudget(budget);
        setIsEditModalOpen(true);
      };
    
      const closeEditModal = () => {
        setSelectedBudget(null);
        setIsEditModalOpen(false);
      };
    
      const handleUpdateBudget = async (id, updatedData) => {
        try {
          await onUpdate(id, updatedData); 
          closeEditModal();
        } catch (error) {
          console.error('Error updating budget:', error);
        }
      };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">All Budgets</h2>
      <ul className="space-y-4">
        {budgets.map((budget) => (
          <li key={budget.budgetId} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold">{budget.category}</h3>
            <p>Limit: LKR - {budget.limitAmount.toFixed(2)}</p>
            <p>Spent: LKR - {budget.spentOver.toFixed(2)}</p>
            <p>Start Date: {budget.startDate}</p>
            <p>End Date: {budget.endDate}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => openMarkModal(budget.budgetId)}
                className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600"
              >
                Mark Expense
              </button>
              <button
                onClick={() => deleteBudgetHandler(budget.budgetId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => openEditModal(budget)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isMarkModalOpen && (
        <div className="fixed inset-0 bg-[#0000002a] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Mark Expense</h2>
            <div className="space-y-4">
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={expenseData.amount}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
              <input
                type="text"
                name="note"
                placeholder="Note"
                value={expenseData.note}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.note && <p className="text-red-500 text-sm">{errors.note}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeMarkModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={markExpenseHandler}
                  className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-[#00000071] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Budget</h2>
            <UpdateBudgetForm
              onUpdate={handleUpdateBudget} 
              budgetId={selectedBudget?.budgetId}
              initialBudget={selectedBudget}
            />
            <button
              onClick={closeEditModal}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetList;