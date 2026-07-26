import React, { useState } from 'react';

function SubmitProject() {
  const [formData, setFormData] = useState({
    title: '',
    sector: 'Technology',
    fundingGoal: '',
    description: ''
  });

  // حالة (State) للتحكم في ظهور رسالة النجاح
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تجهيز البيانات لإرسالها للـ Backend
    const projectPayload = {
      title: formData.title,
      sector: formData.sector,
      fundingGoal: parseFloat(formData.fundingGoal),
      description: formData.description,
      status: "Pending",
      // بيانات مؤقتة لحين تفعيل نظام الدخول الحقيقي
      owner: {
        fullName: "Harith",
        email: "harith@compass.com",
        passwordHash: "SecurePass123!",
        role: "owner"
      }
    };

    try {
      // إرسال البيانات إلى السيرفر المرفوع على Railway
      const response = await fetch('https://investmentcompassapi-production.up.railway.app/api/Projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectPayload)
      });

      if (response.ok) {
        setSubmitted(true); // إظهار رسالة النجاح الخضراء
      } else {
        alert('Failed to submit project. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Cannot connect to the server. Is the backend running?');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#1D3050' }}>
        Submit a New Project
      </h2>
      
      {submitted ? (
        <div className="p-4 mb-6 text-green-800 bg-green-50 border border-green-200 rounded-lg text-center font-medium">
          Your project has been submitted successfully! It is currently pending admin review and verification before appearing to investors.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#1D3050' }}>Project Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g., Solar Energy Power Plant"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#1D3050' }}>Sector</label>
            <select 
              name="sector" 
              value={formData.sector} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="Technology">Technology & Software</option>
              <option value="Real Estate">Real Estate & Construction</option>
              <option value="Agriculture">Smart Agriculture</option>
              <option value="Energy">Energy</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#1D3050' }}>Funding Goal ($)</label>
            <input 
              type="number" 
              name="fundingGoal" 
              value={formData.fundingGoal} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. 50000"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold" style={{ color: '#1D3050' }}>Project Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Provide a brief summary and feasibility details of your project..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full text-white font-bold p-3 rounded-lg transition duration-200 shadow-md hover:opacity-90"
            style={{ backgroundColor: '#1D3050' }}
          >
            Submit for Review & Verification
          </button>
        </form>
      )}
    </div>
  );
}

export default SubmitProject;