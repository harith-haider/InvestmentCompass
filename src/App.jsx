import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SubmitProject from './pages/SubmitProject';
import VerificationQueue from './pages/admin/VerificationQueue';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Footer from './pages/components/Footer.jsx';

function App() {
  return (
    <Router>
      <nav className="p-4 shadow-sm bg-white border-b flex justify-between items-center px-8 sticky top-0 z-50">
        <Link to="/" className="text-2xl font-black tracking-tight" style={{ color: '#1D3050' }}>
          Investment Compass
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-gray-600 hover:text-black font-medium transition">Home</Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition">Login</Link>
          
          <Link 
            to="/submit-project" 
            className="px-5 py-2.5 rounded-lg font-bold inline-block shadow-sm transition hover:opacity-90 ml-4"
            style={{ backgroundColor: '#98BBF5', color: '#1D3050' }}
          >
            Add Project
          </Link>
        </div>
      </nav>

      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit-project" element={<SubmitProject />} />
          <Route path="/admin/queue" element={<VerificationQueue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;