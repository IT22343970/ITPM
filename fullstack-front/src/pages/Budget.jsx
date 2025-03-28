import React, { useState, useEffect } from 'react';
import {
  getAllBudgets,
  createBudget,
  markExpense,
  deleteBudget,
  getOver80PercentBudgets,
  updateBudget,
} from '../api';
import BudgetList from './components/BudgetList';
import BudgetForm from './components/BudgetForm';
import Over80PercentBudgets from './components/Over80PercentBudgets';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function BudgetLayout() {
  const [budgets, setBudgets] = useState([]);
  const [over80Budgets, setOver80Budgets] = useState([]);
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

  useEffect(() => {
    fetchBudgets();
    fetchOver80Budgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await getAllBudgets();
      setBudgets(response.data);
      fetchOver80Budgets();
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const fetchOver80Budgets = async () => {
    try {
      const response = await getOver80PercentBudgets();
      setOver80Budgets(response.data);
    } catch (error) {
      console.error('Error fetching over 80% budgets:', error);
    }
  };

  const handleCreateBudget = async (newBudget) => {
    try {
      await createBudget(newBudget);
      fetchBudgets(); 
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  const handleMarkExpense = async (id, amount, note) => {
    try {
      await markExpense(id, amount, note);
      fetchBudgets(); 
    } catch (error) {
      console.error('Error marking expense:', error);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await deleteBudget(id);
      fetchBudgets(); 
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };


  const handleUpdateBudget = async (id, updatedData) => {
    try {
      await updateBudget(id, updatedData);
      fetchBudgets(); 
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

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
        <div className="min-h-screen bg-gray-100 p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   
        <BudgetForm onCreate={handleCreateBudget} />

        <BudgetList
          budgets={budgets}
          onMarkExpense={handleMarkExpense}
          onDeleteBudget={handleDeleteBudget}
          fetchBudgets={fetchBudgets}
          onUpdate={handleUpdateBudget}
        />
      </div>

      <Over80PercentBudgets budgets={over80Budgets} />
    </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetLayout;