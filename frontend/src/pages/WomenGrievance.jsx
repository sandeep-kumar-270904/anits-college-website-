import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WomenGrievance = () => {
  const [activeTab, setActiveTab] = useState('HOME');

  const tabs = [
    'HOME',
    'COMMITTEE MEMBERS',
    'ROLES & RESPONSIBILITIES',
    'ACTIVITIES',
    'WEBSITE MOM',
    'PHOTO GALLERY'
  ];

  return (
    <div className="font-sans pt-[80px] min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Women Grievance & Redressal Committee | ANITS</title>
      </Helmet>

      {/* Header Banner */}
      <div className="bg-[#2a6b85] py-12 px-4 shadow-inner">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white text-center uppercase tracking-wide drop-shadow-md">
          Women Grievance & Redressal Committee
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4 flex-shrink-0">
          <div className="bg-[#2a6b85] rounded-md overflow-hidden shadow-md flex flex-col">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-6 py-4 font-bold text-sm transition-colors border-b border-teal-700/30 last:border-0 ${
                  activeTab === tab 
                    ? 'bg-[#1e5268] text-white border-l-4 border-l-teal-400' 
                    : 'bg-[#2a6b85] text-teal-50 hover:bg-[#235e76]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Box */}
        <div className="w-full md:w-3/4 flex flex-col gap-6">
          {/* Breadcrumb */}
          <div className="bg-white px-6 py-3 rounded-md shadow-sm text-sm text-gray-500 font-medium flex items-center gap-2">
            <Link to="/" className="text-[#2a6b85] hover:text-[#1e5268] flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-700">Women Grievance & Redressal Committee</span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-400">{activeTab === 'HOME' ? 'Profile' : activeTab}</span>
          </div>

          {/* Actual Content */}
          <div className="bg-white rounded-md shadow-sm p-8 min-h-[300px] flex items-start border-t-4 border-t-[#2a6b85]">
            <h2 className="text-xl font-bold text-emerald-600">
              Update in Progress
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WomenGrievance;
