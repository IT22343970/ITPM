import React from 'react';

const Over80PercentBudgets = ({ budgets }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Budgets Over 80%</h2>
      <ul className="space-y-4">
        {budgets.length > 0 ? (
          budgets.map((budget) => (
            <li key={budget.budgetId} className="p-4 bg-red-100 rounded-lg">
              <h3 className="font-bold">{budget.category}</h3>
              <p>Limit: LKR -{budget.limitAmount.toFixed(2)}</p>
              <p>Spent: LKR -{budget.spentOver.toFixed(2)}</p>
            </li>
          ))
        ) : (
          <p>No budgets exceed 80% spending.</p>
        )}
      </ul>
    </div>
  );
};

export default Over80PercentBudgets;