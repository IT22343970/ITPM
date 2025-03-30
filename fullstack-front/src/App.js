import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage.jsx';
import SignUpPage from './auth/SignUpPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './App.css';
import Income from './pages/income.jsx';
import Insertincome from './pages/Insertincome.jsx';
import UpdateIncome from './pages/Updateincome.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/income" element={<Income />} />
      <Route path="/insertincome" element={<Insertincome />} />
      <Route path="/updateincome/:id" element={<UpdateIncome />} />
      
    </Routes>
  );
}

export default App;
