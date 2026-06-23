import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const SwayamNptel = () => {
  const [activeTab, setActiveTab] = useState('swayam');

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px]">
      <Helmet>
        <title>SWAYAM-NPTEL | ANITS</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
          <button 
            onClick={() => setActiveTab('swayam')}
            className={`px-12 py-3 text-sm font-medium rounded-sm border ${activeTab === 'swayam' ? 'border-gray-200 shadow-sm bg-white text-gray-800' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            SWAYAM-NPTEL
          </button>
          <button 
            onClick={() => setActiveTab('nptel')}
            className={`px-12 py-3 text-sm font-medium rounded-sm border ${activeTab === 'nptel' ? 'border-gray-200 shadow-sm bg-white text-gray-800' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            NPTEL Local Chapter
          </button>
        </div>

        {/* Content */}
        {activeTab === 'swayam' && (
          <div className="animate-fade-in max-w-5xl">
            <h2 className="text-xl font-bold text-[#333] mb-6 uppercase tracking-wide font-['Oswald',sans-serif]">SWAYAM-NPTEL</h2>
            
            <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
              SWAYAM is a programme initiated by Government of India and designed to achieve the three cardinal principles of Education
              Policy viz., access, equity and quality. The objective of this effort is to take the best teaching learning resources to all, including
              the most disadvantaged.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
              SWAYAM seeks to bridge the digital divide for students who have hitherto remained untouched by the digital revolution and
              have not been able to join the mainstream of the knowledge economy.
            </p>

            <h3 className="text-[#333] font-bold mb-4 text-[15px]">The main benefits of participating in an online course under SWAYAM NPTEL are:</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-8 text-[15px] text-gray-600">
              <li><strong className="text-[#333]">Students:</strong> credit transfer and better resume</li>
              <li><strong className="text-[#333]">Faculty:</strong> Refresher courses, AICTE recognized FDP courses</li>
              <li><strong className="text-[#333]">Working professionals:</strong> For upskilling and reskilling</li>
            </ol>

            <div className="space-y-4 text-[15px]">
              <p className="text-[#333] font-bold">
                For any more clarification / queries, please: <a href="https://nptel.ac.in/noc/noc_faq.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-normal">https://nptel.ac.in/noc/noc_faq.html</a>
              </p>
              <p className="text-[#333] font-bold">
                To Enroll New Courses: <a href="https://swayam.gov.in/NPTEL" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-normal">https://swayam.gov.in/NPTEL</a>
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'nptel' && (
          <div className="animate-fade-in text-center py-12 text-gray-500">
            NPTEL Local Chapter information will be updated soon.
          </div>
        )}

      </div>
    </div>
  );
};

export default SwayamNptel;
