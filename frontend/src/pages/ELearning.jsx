import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';

const ELearning = () => {
  const otherResources = [
    { name: 'MHRD', img: 'mhrd.png' }, // using generic names, will just use stylized text if image missing
    { name: 'NPTEL', img: 'nptel.png' },
    { name: 'Coursera', img: 'coursera.png' },
    { name: 'EdX', img: 'edx.png' },
    { name: 'Infy Springboard', img: 'infy.png' },
    { name: 'Spoken Tutorial', img: 'spoken.png' },
  ];

  return (
    <div className="font-sans min-h-screen bg-[#f8f9fa] pt-[80px]">
      <Helmet>
        <title>E-Learning | ANITS</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-10">
        
        {/* CampX Resource */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#3b82f6] text-white p-3 text-center font-bold text-lg tracking-wide font-['Oswald',sans-serif]">
            ANITS - E-Learning Resource
          </div>
          <div className="p-8 flex justify-center items-center">
            {/* Logo placeholder */}
            <div className="text-4xl font-extrabold tracking-widest text-[#1e3a8a] italic flex items-center">
              camp<span className="text-pink-600 ml-0.5">X</span>
            </div>
          </div>
        </div>

        {/* Other E-Learning Resources */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#3b82f6] text-white p-3 text-center font-bold tracking-wide font-['Oswald',sans-serif] text-lg">
            Other E-Learning Resources
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherResources.map((res, index) => (
              <div key={index} className="border border-gray-100 rounded-md p-6 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-400 font-bold">
                  LOGO
                </div>
                <h4 className="font-bold text-[#1e3a8a] text-sm">{res.name}</h4>
                <button className="bg-[#3b82f6] hover:bg-blue-600 text-white text-xs px-4 py-2 rounded-sm transition-colors flex items-center gap-1">
                  Visit Website
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* First Year - Study Material */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="bg-[#3b82f6] text-white p-3 text-center font-bold tracking-wide font-['Oswald',sans-serif] text-lg">
            First Year - Study Material
          </div>
          <div className="p-6 flex flex-col">
            
            <div className="mb-6 border-b border-gray-100 pb-6">
              <h4 className="font-bold text-[#1e3a8a] text-sm mb-3">Engineering Chemistry</h4>
              <p className="text-sm text-[#3b82f6] cursor-pointer hover:underline">Unit - 1 | Unit - 2 | Unit - 3 | Unit - 4 | Unit - 5</p>
            </div>

            <div className="mb-6 border-b border-gray-100 pb-6">
              <h4 className="font-bold text-[#1e3a8a] text-sm mb-3">Environmental Sciences</h4>
              <p className="text-sm text-[#3b82f6] cursor-pointer hover:underline">Unit - 1 | Unit - 2 | Unit - 3 | Unit - 4 | Unit - 5</p>
            </div>

            <div className="mb-6 border-b border-gray-100 pb-6">
              <h4 className="font-bold text-[#1e3a8a] text-sm mb-3">Engineering Physics</h4>
              <p className="text-sm text-[#3b82f6] cursor-pointer hover:underline">Unit - 1 | Unit - 2 | Unit - 3 | Unit - 4 | Unit - 5</p>
            </div>

            <div className="mb-6 border-b border-gray-100 pb-6">
              <h4 className="font-bold text-[#1e3a8a] text-sm mb-3">C Programming With 'C' And Lab</h4>
              <p className="text-sm text-[#3b82f6] cursor-pointer hover:underline">Programming With C and Lab</p>
            </div>

            <div className="mb-6 border-b border-gray-100 pb-6">
              <h4 className="font-bold text-[#1e3a8a] text-sm mb-3">Network Analysis And Synthesis</h4>
              <p className="text-sm text-[#3b82f6] cursor-pointer hover:underline">Network Analysis And Synthesis</p>
            </div>

            <div className="mb-6 border-b border-gray-100 pb-6">
              <h4 className="font-bold text-[#1e3a8a] text-sm mb-3">Communicative English Material 2019-20</h4>
              <p className="text-sm text-[#3b82f6] cursor-pointer hover:underline">Communicative English Material 2019-20</p>
            </div>

            <div>
              <h4 className="font-bold text-[#1e3a8a] text-sm mb-3">Mathematics - II</h4>
              <p className="text-sm text-[#3b82f6] cursor-pointer hover:underline flex items-center gap-1">Click here to download <ExternalLink size={14}/></p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ELearning;
