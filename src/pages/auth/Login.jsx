import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  // حالة تخزين البريد وكلمة المرور
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // إرسال طلب تسجيل الدخول للـ Backend المرفوع
      const response = await fetch('https://investmentcompassapi-production.up.railway.app/api/Users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        
        // جلب الـ Role الحقيقي من استجابة الداتابيس
        const userRole = data.role; 

        console.log(`Login Success. Database returned role: ${userRole}`);

        // نظام التوجيه الذكي يعتمد على استجابة السيرفر الحقيقية
        if (userRole === 'Admin') {
          navigate('/admin/queue');
        } else if (userRole === 'Owner') {
          navigate('/submit-project');
        } else {
          navigate('/'); 
        }
      } else {
        alert('Invalid email or password. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Cannot connect to the server. Make sure the backend is running.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2" style={{ color: '#1D3050' }}>Welcome Back</h2>
          <p className="text-gray-500">Log in to your Investment Compass account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 font-bold text-gray-700">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={credentials.email}
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
              placeholder="e.g. admin@compass.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              value={credentials.password}
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full text-white font-bold p-3 rounded-lg transition duration-200 shadow-lg hover:opacity-90 mt-4" 
            style={{ backgroundColor: '#1D3050' }}
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="font-bold hover:underline" style={{ color: '#98BBF5' }}>Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;