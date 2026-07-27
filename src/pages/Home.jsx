import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [approvedProjects, setApprovedProjects] = useState([]);

  // جلب المشاريع المقبولة من قاعدة البيانات
  useEffect(() => {
    fetch('investmentcompassapi-production-8571.up.railway.app')
      .then(response => response.json())
      .then(data => setApprovedProjects(data))
      .catch(error => console.error('Error fetching approved projects:', error));
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 pb-20" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4" style={{ color: '#1D3050' }}>
          Discover Investment Opportunities
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore promising projects verified by our experts. Find your next big investment today.
        </p>
      </div>

      {approvedProjects.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-lg">No active projects available for investment at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-700">
                    {project.sector}
                  </span>
                  <span className="text-sm font-semibold text-green-600">Verified </span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#1D3050' }}>
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Funding Goal</p>
                  <p className="text-2xl font-bold" style={{ color: '#1D3050' }}>
                    ${project.fundingGoal.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
                <p className="text-sm text-gray-600 mb-4">
                  By: <span className="font-semibold text-gray-800">{project.owner?.fullName || 'Unknown'}</span>
                </p>
                <button className="w-full py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90 shadow-md" style={{ backgroundColor: '#1D3050' }}>
                  Invest Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;