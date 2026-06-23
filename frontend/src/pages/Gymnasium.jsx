import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';

const Gymnasium = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const gallery = [
    '/images/gymnasium-gallery-1.jpg',
    '/images/gymnasium-gallery-2.jpg',
    '/images/gymnasium-gallery-3.jpg',
    '/images/gymnasium-gallery-4.jpg',
    '/images/gymnasium-gallery-5.jpg',
    '/images/gymnasium-gallery-6.jpg',
    '/images/gymnasium-gallery-7.jpg'
  ];

  const equipments = [
    "4 Station Multi Gym",
    "Treadmill",
    "Cycle",
    "GAB 60AB Boards (Body Solid brand)",
    "GDIB 46I Power Centre combo",
    "GHD 71 Heavy Duty incline/decline bench",
    "GPCB 329 Preacher Curl bench",
    "SIB 359 Olympic Incline bench",
    "SDB 351 Decline Bench",
    "IPCR Calf Raiser",
    "SFB 349 Olympic Flat Bench",
    "Push Up Bars in Color Box",
    "Hand Grips",
    "Weight Lifting Set (Plates & Rods)",
    "Wall Push Up Bars",
    "IFHCS Smith Attachment",
    "Hip Twister",
    "Horizontal Bar",
    "Parallel Bar",
    "Gym Ball"
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Gymnasium | ANITS</title>
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[250px] bg-gray-900 overflow-hidden flex items-center mb-12">
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
              GYMNASIUM
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-4">
        <h2 className="text-2xl font-bold text-[#112a46] mb-6 text-center">Gymnasium Facilities</h2>
        
        <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
          We have a well-equipped & well-maintained gym with great infrastructure for fitness enthusiasts.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-12">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 list-disc pl-5 text-sm text-gray-700">
            {equipments.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <h3 className="text-xl font-bold text-[#112a46] mb-2 text-center">Image Gallery</h3>
        <p className="text-gray-500 mb-8 text-center">Click on the images below to view zoomed images:</p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {gallery.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`Gymnasium Gallery ${idx + 1}`}
              onClick={() => setZoomedImage(img)}
              className="h-48 object-cover cursor-pointer rounded border border-gray-200 hover:shadow-lg transition-shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/300x400/e2e8f0/475569?text=Upload+gymnasium-gallery-${idx+1}.jpg`;
              }}
            />
          ))}
        </div>

        {zoomedImage && (
          <div className="mt-8 relative inline-block text-center w-full">
            <div className="relative inline-block">
              <button 
                onClick={() => setZoomedImage(null)}
                className="absolute -top-4 -right-4 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50 z-10"
              >
                <X size={24} />
              </button>
              <img 
                src={zoomedImage} 
                alt="Zoomed Gallery" 
                className="max-w-full rounded-lg shadow-xl relative z-0"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gymnasium;
