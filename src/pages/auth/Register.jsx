import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', // تم تعديلها من name إلى fullName لتوحيدها مع الـ C# Backend
    email: '',
    password: '',
    role: 'investor' // القيمة الافتراضية
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      // إرسال البيانات فعلياً إلى الـ Backend API المرفوع
      const response = await fetch('investmentcompassapi-production-8571.up.railway.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Account created successfully! Please login.');
        navigate('/login'); // توجيه المستخدم لصفحة الدخول بعد نجاح التسجيل
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Cannot connect to the server. Make sure the backend is running.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2" style={{ color: '#1D3050' }}>Create Account</h2>
          <p className="text-gray-500">Join Investment Compass today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-2 font-bold text-gray-700">Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName}
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none" 
              placeholder="Harith Ali"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none" 
              placeholder="harith@gmail.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none" 
              placeholder="••••••••"
            />
          </div>

          {/* تحديد نوع الحساب (الرول) */}
          <div className="pt-2">
            <label className="block mb-3 font-bold text-gray-700">I want to join as:</label>
            <div className="flex gap-4">
              <label className={`flex-1 p-3 text-center border rounded-lg cursor-pointer transition ${formData.role === 'investor' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200'}`}>
                <input type="radio" name="role" value="investor" checked={formData.role === 'investor'} onChange={handleChange} className="hidden" />
                <span className="font-bold">Investor</span>
              </label>
              <label className={`flex-1 p-3 text-center border rounded-lg cursor-pointer transition ${formData.role === 'owner' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200'}`}>
                <input type="radio" name="role" value="owner" checked={formData.role === 'owner'} onChange={handleChange} className="hidden" />
                <span className="font-bold">Project Owner</span>
              </label>
            </div>
          </div>

          <button type="submit" className="w-full text-white font-bold p-3 rounded-lg transition mt-4" style={{ backgroundColor: '#1D3050' }}>
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="font-bold hover:underline" style={{ color: '#1D3050' }}>Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;