import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage.jsx';
import SignUpPage from './auth/SignUpPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
