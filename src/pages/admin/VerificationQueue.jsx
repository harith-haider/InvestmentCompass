import React, { useState, useEffect } from 'react';

function VerificationQueue() {
  const [pendingProjects, setPendingProjects] = useState([]);

  // جلب المشاريع المعلقة عند تحميل الصفحة
  useEffect(() => {
    fetch('https://investmentcompassapi-production-8571.up.railway.app/')
      .then(response => response.json())
      .then(data => setPendingProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  // دالة تغيير حالة المشروع بالرابط الجديد المتوافق مع الـ Backend
  const updateProjectStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`investmentcompassapi-production-8571.up.railway.app`, {
        method: 'PUT' // حذفنا الـ body لأنه لم يعد مطلوباً
      });

      if (response.ok) {
        // إزالة المشروع من الجدول فوراً بعد نجاح العملية
        setPendingProjects(pendingProjects.filter(project => project.id !== id));
        alert(`Project successfully ${newStatus}!`);
      } else {
        alert('Failed to update project status. Server rejected the request.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Cannot connect to the server.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h2 className="text-3xl font-bold mb-2" style={{ color: '#1D3050' }}>Verification Queue</h2>
      <p className="text-gray-600 mb-8">Review and verify projects before they are published.</p>

      {pendingProjects.length === 0 ? (
        <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
          No pending projects at the moment.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr style={{ backgroundColor: '#1D3050', color: 'white' }}>
                <th className="p-4 rounded-tl-lg font-semibold">Title</th>
                <th className="p-4 font-semibold">Sector</th>
                <th className="p-4 font-semibold">Goal</th>
                <th className="p-4 font-semibold">Owner</th>
                <th className="p-4 rounded-tr-lg font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingProjects.map((project, index) => (
                <tr key={project.id} className={`border-b transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="p-4 font-bold" style={{ color: '#1D3050' }}>{project.title}</td>
                  <td className="p-4 text-gray-700">{project.sector}</td>
                  <td className="p-4 text-gray-700">${project.fundingGoal}</td>
                  <td className="p-4 text-gray-700">{project.owner?.fullName || 'Unknown'}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button 
                      onClick={() => updateProjectStatus(project.id, 'Approved')} 
                      className="px-4 py-2 text-sm font-bold rounded-lg transition shadow hover:opacity-90" 
                      style={{ backgroundColor: '#98BBF5', color: '#1D3050' }}
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateProjectStatus(project.id, 'Rejected')} 
                      className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 text-sm font-bold rounded-lg transition shadow-sm hover:bg-red-100"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VerificationQueue;