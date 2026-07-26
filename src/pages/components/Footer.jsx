import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#1D3050] text-white pt-12 pb-8 mt-20" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">Investment Compass</h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-md">
            The ultimate bridge between visionary entrepreneurs and smart investors. We verify and showcase the best innovative projects to secure sustainable growth.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#98BBF5]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/submit-project" className="hover:text-white transition">Submit Project</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#98BBF5]">Contact Us</h4>
          <p className="text-sm text-gray-300 mb-2">Support: support@investmentcompass.com</p>
          <p className="text-sm text-gray-300">Locatoin :Babylon, Iraq</p> 
          <p className="text-sm text-gray-300">Phone: +964 780 123 456</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 border-t border-gray-700 pt-6 textcenter text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Investment Compass. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;