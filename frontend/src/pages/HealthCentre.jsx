import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';

const HealthCentre = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const gallery = [
    '/images/health-gallery-1.jpg',
    '/images/health-gallery-2.jpg',
    '/images/health-gallery-3.jpg',
    '/images/health-gallery-4.jpg',
    '/images/health-gallery-5.jpg',
    '/images/health-gallery-6.jpg'
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Health Centre | ANITS</title>
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[250px] bg-gray-900 overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="/images/campus-banner.jpg" 
            alt="Campus" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#112a46]/90 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
          <div className="bg-white/95 backdrop-blur-sm inline-block px-8 py-4 rounded-r-2xl border-l-8 border-[#f39c12] shadow-lg">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#112a46] uppercase tracking-wider">
              HEALTH CENTRE
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-xl font-bold text-[#112a46] mb-6">Medical Facility</h2>
        
        <img 
          src="/images/health-centre-main.jpg" 
          alt="Health Centre Main" 
          className="mx-auto max-w-2xl w-full rounded-lg shadow-md mb-8"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/800x400/e2e8f0/475569?text=Upload+health-centre-main.jpg";
          }}
        />

        <div className="space-y-4 text-gray-700 max-w-3xl mx-auto mb-12">
          <p>A well-equipped separate medical outpatient facility is available for students and staff...</p>
          <p>Anil Neerukonda Educational Society has been running <strong>Anil Neerukonda Hospital...</strong></p>
          <p>The hospital has been the premier healthcare provider for over 15 years...</p>
          <p className="text-left mt-6">
            Medical Benefit Policy <a href="#" className="text-blue-600 hover:underline">View</a>
          </p>
        </div>

        <h3 className="text-lg font-bold text-[#112a46] mb-2">Image Gallery</h3>
        <p className="text-gray-500 mb-8">Click on the images below and scroll down to view the zoomed image:</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {gallery.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`Gallery ${idx + 1}`}
              onClick={() => setZoomedImage(img)}
              className="w-full h-24 object-cover cursor-pointer rounded border border-gray-200 hover:shadow-lg transition-shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/200x150/e2e8f0/475569?text=Upload+health-gallery-${idx+1}.jpg`;
              }}
            />
          ))}
        </div>

        {zoomedImage && (
          <div className="mt-8 relative inline-block">
            <button 
              onClick={() => setZoomedImage(null)}
              className="absolute -top-4 -left-4 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50"
            >
              <X size={24} />
            </button>
            <img 
              src={zoomedImage} 
              alt="Zoomed Gallery" 
              className="max-w-full rounded-lg shadow-xl"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default HealthCentre;
