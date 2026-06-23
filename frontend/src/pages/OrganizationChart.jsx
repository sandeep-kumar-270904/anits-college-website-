import React from 'react';
import { Helmet } from 'react-helmet-async';

const OrganizationChart = () => {
  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50">
      <Helmet>
        <title>Organization Chart | ANITS</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-[#112a46] mb-8 relative inline-block">
          Organization Chart
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#facc15] rounded-full"></span>
        </h1>

        <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-8 flex justify-center">
          <img 
            src="/images/org-chart.png" 
            alt="ANITS Organization Chart" 
            className="max-w-full h-auto rounded shadow-sm border border-gray-100"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/1200x800.png?text=Please+Upload+org-chart.png+to+public/images/';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganizationChart;
