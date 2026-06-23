import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AdmissionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);

  useEffect(() => {
    // Show popup immediately for preview purposes, or adjust timing as needed.
    // I am setting it to show up quickly so the user can see it right away.
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleBranch = (branch) => {
    if (selectedBranches.includes(branch)) {
      setSelectedBranches(selectedBranches.filter(b => b !== branch));
    } else {
      setSelectedBranches([...selectedBranches, branch]);
    }
  };

  const branches = [
    "CSE", "CSE-AIML", "CSE-Data Science", "CSE-Cyber Security",
    "IT", "ECE", "EEE", "Mechanical", "Civil", "Chemical",
    "Bio-Tech", "BBA", "BMS", "MBA", "M.Tech"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl relative shadow-2xl animate-fade-in flex flex-col md:flex-row overflow-hidden">
        
        {/* Close Button (Floating outside the right column slightly, or inside) */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur text-gray-600 hover:text-gray-900 shadow-sm p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Side: Information */}
        <div className="md:w-[40%] bg-[#1a2f53] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] opacity-20">
             <div className="w-full border-t-[4px] border-dotted border-white/50 -rotate-12 transform origin-left"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4 tracking-tight">
              Build Your Career at <br/>
              <span className="text-[#facc15]">ANITS</span>
            </h2>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-8">
              Join one of Andhra Pradesh's premier engineering institutions with excellent placements, experienced faculty, modern infrastructure and industry-focused learning.
            </p>

            {/* Stats */}
            <div className="flex gap-3 mb-10">
              <div className="bg-[#263e68] rounded-xl p-4 flex-1 text-center border border-white/10">
                <div className="text-xl font-bold text-yellow-400 mb-1">1200+</div>
                <div className="text-xs text-gray-300">Placements</div>
              </div>
              <div className="bg-[#263e68] rounded-xl p-4 flex-1 text-center border border-white/10">
                <div className="text-xl font-bold text-yellow-400 mb-1">110+</div>
                <div className="text-xs text-gray-300">Recruiters</div>
              </div>
              <div className="bg-[#263e68] rounded-xl p-4 flex-1 text-center border border-white/10">
                <div className="text-xl font-bold text-yellow-400 mb-1">20K+</div>
                <div className="text-xs text-gray-300">Alumni</div>
              </div>
            </div>
          </div>

          {/* Placeholder for Posters */}
          <div className="relative z-10 grid grid-cols-2 gap-3 mt-auto h-48 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-lg p-3 flex flex-col justify-between border border-white/20 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
               <div className="text-[10px] font-bold tracking-widest text-white/70 uppercase">Congratulations</div>
               <div className="mt-auto">
                 <div className="text-2xl font-black text-white leading-none">64<span className="text-sm">LPA</span></div>
                 <div className="text-[10px] text-gray-300">Amazon SDE-1</div>
               </div>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-200 rounded-lg p-3 flex flex-col justify-between border border-white/20 relative overflow-hidden">
               <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
               <div className="text-[10px] font-bold tracking-widest text-blue-900 uppercase">Congratulations</div>
               <div className="mt-auto">
                 <div className="text-2xl font-black text-orange-500 leading-none">17<span className="text-sm">LPA</span></div>
                 <div className="text-[10px] text-gray-600">Text Anything</div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-[60%] p-8 lg:p-10 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#0f2142] mb-2">Admission Enquiry Form</h2>
            <p className="text-gray-500 text-sm">Fill your details and our admissions team will contact you shortly.</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); alert("Enquiry Submitted!"); }}>
            
            {/* 2-Column Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <input 
                type="text" 
                required 
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-600 transition-colors text-gray-900 placeholder-gray-500 text-sm" 
                placeholder="Student Full Name" 
              />
              <input 
                type="tel" 
                required 
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-600 transition-colors text-gray-900 placeholder-gray-500 text-sm" 
                placeholder="Phone Number" 
              />
              <input 
                type="text" 
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-600 transition-colors text-gray-900 placeholder-gray-500 text-sm" 
                placeholder="Intermediate Percentage" 
              />
              <input 
                type="text" 
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-600 transition-colors text-gray-900 placeholder-gray-500 text-sm" 
                placeholder="EAPCET Rank" 
              />
              <input 
                type="text" 
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-600 transition-colors text-gray-900 placeholder-gray-500 text-sm" 
                placeholder="JEE Percentile" 
              />
              <input 
                type="text" 
                required
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-600 transition-colors text-gray-900 placeholder-gray-500 text-sm" 
                placeholder="Area / City" 
              />
            </div>
            
            {/* Branch Selection */}
            <div className="pt-2">
              <label className="block text-sm font-bold text-gray-900 mb-3">Preferred Branches</label>
              <div className="flex flex-wrap gap-2.5">
                {branches.map(branch => (
                  <button
                    type="button"
                    key={branch}
                    onClick={() => toggleBranch(branch)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                      selectedBranches.includes(branch) 
                        ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {branch}
                  </button>
                ))}
              </div>
            </div>

            {/* Query */}
            <div className="pt-2">
              <input 
                type="text" 
                className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-600 transition-colors text-gray-900 placeholder-gray-500 text-sm" 
                placeholder="Write your query..." 
              />
            </div>
            
            {/* Submit */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Submit Enquiry
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPopup;
