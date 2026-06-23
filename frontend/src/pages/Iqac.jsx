import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Iqac = () => {
  const [activeTab, setActiveTab] = useState('HOME');

  const tabs = [
    'HOME',
    'IQAC MEMBERS',
    'Quality Initiatives',
    'Strategic Plan',
    'IQAC MoM',
    'BEST PRACTICES',
    'AQAR REPORTS',
    'IQAC AAA REPORTS'
  ];

  return (
    <div className="font-sans pt-[80px] min-h-screen bg-white">
      <Helmet>
        <title>IQAC | ANITS</title>
      </Helmet>

      {/* Hero Banner Area */}
      <div className="relative w-full h-[250px] bg-gray-200">
        <img 
          src="/images/campus/campus-gate.jpg" 
          alt="ANITS Campus" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 bg-black/20 hidden items-center justify-center">
          {/* Fallback pattern if image is missing */}
          <div className="text-white/50 font-bold text-2xl tracking-widest">ANITS CAMPUS</div>
        </div>
        
        <div className="absolute top-1/2 left-10 md:left-20 -translate-y-1/2 bg-white px-10 py-4 shadow-lg border-l-4 border-[#2a5682]">
          <h1 className="text-3xl font-bold text-[#2a5682]">IQAC</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row mt-8">
        
        {/* Left Sidebar Menu */}
        <div className="w-full md:w-1/4 flex-shrink-0 px-4 md:px-0">
          <div className="flex flex-col bg-gray-100 rounded-sm overflow-hidden mb-8 shadow-sm border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-5 py-3 text-xs sm:text-sm font-semibold transition-all border-b border-white last:border-0 uppercase ${
                  activeTab === tab 
                    ? 'bg-gray-200 text-[#2a5682] border-l-4 border-l-[#2a5682]' 
                    : 'bg-[#f1f1f1] text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 md:pl-8 flex flex-col">
          {activeTab === 'HOME' ? (
            <div className="flex flex-col gap-6">
              
              {/* Vision & Mission Cards */}
              <div className="flex flex-col md:flex-row gap-6 px-4 md:px-0">
                <div className="flex-1 bg-white border border-gray-200 shadow-sm p-8 flex flex-col items-center text-center">
                  <h2 className="text-[#3a86ff] text-2xl font-bold mb-4">Vision</h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    To inculcate a quality culture for enhancing the standards aimed at all round excellence of the Institute.
                  </p>
                </div>
                <div className="flex-1 bg-white border border-gray-200 shadow-sm p-8 flex flex-col items-center text-center">
                  <h2 className="text-[#3a86ff] text-2xl font-bold mb-4">Mission</h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    To train, assess, enhance and habitat the quality culture encompassing academic, research and administrative practices of the Institute.
                  </p>
                </div>
              </div>

              {/* Functions Section */}
              <div className="bg-[#e4efff] py-10 px-4 md:px-8 mt-4">
                <h2 className="text-[#333] text-2xl font-bold text-center mb-8">Functions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Quality Benchmarks</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Development and application of quality benchmarks/parameters for various academic and administrative activities.
                    </p>
                  </div>
                  <div className="bg-white p-6 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Learning Environment</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Facilitating learner-centric environment conducive for quality education and faculty maturation.
                    </p>
                  </div>
                  <div className="bg-white p-6 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Feedback System</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Arrangement for feedback responses from students, parents and other stakeholders.
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-[#e0fbff] py-10 px-4 md:px-8">
                <h2 className="text-[#333] text-2xl font-bold text-center mb-8">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Quality Enhancement</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Ensure heightened level of clarity and focus in institutional functioning towards quality enhancement.
                    </p>
                  </div>
                  <div className="bg-white p-6 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Quality Culture</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Ensure internalization of the quality culture and integration among various activities.
                    </p>
                  </div>
                  <div className="bg-white p-6 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Documentation</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Build an organized methodology of documentation and internal communication.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white p-8 border border-gray-200 shadow-sm mx-4 md:mx-0">
              <h2 className="text-[#2a5682] text-xl font-bold mb-4">{activeTab}</h2>
              <p className="text-gray-600">Update in Progress.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Iqac;
