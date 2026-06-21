import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

const AdmissionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has already been shown in this session
    const hasSeenPopup = sessionStorage.getItem('admissionPopupShown');
    
    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('admissionPopupShown', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-fade-in border border-gray-100">
        
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
            Admissions 2025-26
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Join ANITS!</h2>
          <p className="text-gray-500 font-medium text-sm">Fill out the form below to get a priority callback from our admission counselors.</p>
        </div>
        
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); alert("Inquiry Submitted Successfully!"); }}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium" 
              placeholder="Enter your name" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium" 
              placeholder="Enter your email" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
            <input 
              type="tel" 
              required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium" 
              placeholder="Enter your phone number" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Interested Department</label>
            <select 
              required 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium"
            >
              <option value="">Select a Department</option>
              <option value="CSE">Computer Science (CSE)</option>
              <option value="CSE-AIML">CSE (AI & ML)</option>
              <option value="CSE-DS">CSE (Data Science)</option>
              <option value="ECE">Electronics (ECE)</option>
              <option value="MECH">Mechanical (MECH)</option>
              <option value="IT">Information Tech (IT)</option>
              <option value="EEE">Electrical (EEE)</option>
              <option value="CIVIL">Civil Engineering</option>
              <option value="CHEM">Chemical Engineering</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-2"
          >
            Submit Inquiry <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdmissionPopup;
