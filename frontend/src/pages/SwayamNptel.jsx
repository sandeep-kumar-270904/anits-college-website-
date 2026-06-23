import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const SwayamNptel = () => {
  const [activeTab, setActiveTab] = useState('swayam');

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px]">
      <Helmet>
        <title>SWAYAM-NPTEL | ANITS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-10 border-b border-gray-200 pb-1 justify-center md:justify-start">
          <button 
            onClick={() => setActiveTab('swayam')}
            className={`px-12 py-3 text-sm font-bold transition-colors border ${activeTab === 'swayam' ? 'border-gray-200 border-b-white bg-white text-[#1e3a8a] -mb-[1px]' : 'border-transparent text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded'}`}
          >
            SWAYAM-NPTEL
          </button>
          <button 
            onClick={() => setActiveTab('nptel')}
            className={`px-12 py-3 text-sm font-bold transition-colors border ${activeTab === 'nptel' ? 'border-gray-200 border-b-white bg-white text-[#1e3a8a] -mb-[1px]' : 'border-transparent text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded'}`}
          >
            NPTEL Local Chapter
          </button>
        </div>

        {/* Content */}
        {activeTab === 'swayam' && (
          <div className="animate-fade-in max-w-5xl">
            <h2 className="text-2xl font-extrabold text-[#1e3a8a] mb-6 uppercase tracking-wider">SWAYAM-NPTEL</h2>
            
            <p className="text-gray-600 leading-loose mb-6">
              SWAYAM is a programme initiated by Government of India and designed to achieve the three cardinal principles of Education
              Policy viz., access, equity and quality. The objective of this effort is to take the best teaching learning resources to all, including
              the most disadvantaged.
            </p>
            <p className="text-gray-600 leading-loose mb-8">
              SWAYAM seeks to bridge the digital divide for students who have hitherto remained untouched by the digital revolution and
              have not been able to join the mainstream of the knowledge economy.
            </p>

            <h3 className="text-gray-800 font-bold mb-4">The main benefits of participating in an online course under SWAYAM NPTEL are:</h3>
            <ol className="list-decimal pl-5 space-y-3 mb-8 text-gray-600">
              <li><strong className="text-gray-800">Students:</strong> credit transfer and better resume</li>
              <li><strong className="text-gray-800">Faculty:</strong> Refresher courses, AICTE recognized FDP courses</li>
              <li><strong className="text-gray-800">Working professionals:</strong> For upskilling and reskilling</li>
            </ol>

            <div className="space-y-4">
              <p className="text-gray-800 font-bold">
                For any more clarification / queries, please: <a href="https://nptel.ac.in/noc/noc_faq.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-normal">https://nptel.ac.in/noc/noc_faq.html</a>
              </p>
              <p className="text-gray-800 font-bold">
                To Enroll New Courses: <a href="https://swayam.gov.in/NPTEL" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-normal">https://swayam.gov.in/NPTEL</a>
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
