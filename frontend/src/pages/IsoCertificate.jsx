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
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-center w-full" style={{ height: '800px' }}>
          {/* We are using an iframe to embed the PDF. You can place the PDF file in the public/assets directory */}
          <iframe 
            src="/assets/iso-certificate.pdf" 
            title="ISO 9001:2015 Certificate"
            className="w-full h-full rounded border border-gray-100 shadow-sm"
          >
            <p>Your browser does not support PDFs. <a href="/assets/iso-certificate.pdf">Download the PDF</a>.</p>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default IsoCertificate;
