import React from 'react';
import { Helmet } from 'react-helmet-async';

const IsoCertificate = () => {
  return (
    <div className="font-sans min-h-screen bg-white pt-[80px] pb-20">
      <Helmet>
        <title>ISO Certificate | ANITS</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-[#222] mb-10 font-['Oswald',sans-serif] tracking-wide">
          ISO 9001:2015 Certificate
        </h1>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-center">
          {/* We are using a placeholder image path. You can replace this file in the public/assets directory */}
          <img 
            src="/assets/iso-certificate.jpg" 
            alt="ISO 9001:2015 Certificate" 
            className="max-w-full h-auto rounded border border-gray-100 shadow-sm"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://via.placeholder.com/800x1100?text=Please+Upload+ISO+Certificate+to+/assets/iso-certificate.jpg";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IsoCertificate;
