import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/budgets', 
});

export const getAllBudgets = () => api.get(`/all/${JSON.parse(localStorage.getItem('user')).id}`);
export const createBudget = (budget) => api.post('/create', budget);
export const updateBudget = (id, updatedData) => api.put(`/update/${id}`, updatedData);
export const deleteBudget = (id) => api.delete(`/delete/${id}`);
export const markExpense = (id, amount, note) =>
  api.post(`/mark/${id}`, null, { params: { amount, note } });
export const getOver80PercentBudgets = () => api.get(`/over-80-percent/${JSON.parse(localStorage.getItem('user')).id}`);