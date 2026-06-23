import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';

const RainwaterHarvesting = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const gallery = [
    '/images/rainwater-gallery-1.jpg',
    '/images/rainwater-gallery-2.jpg',
    '/images/rainwater-gallery-3.jpg',
    '/images/rainwater-gallery-4.jpg'
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Rainwater Harvesting | ANITS</title>
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
              RAIN WATER HARVESTING
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-xl font-bold text-[#112a46] mb-6 text-left">Rain water Harvesting</h2>
        
        <div className="text-gray-700 text-left mb-12">
          <p>Water conservation has become the need of the hour. To this end 10 rainwater harvesting pits have been dug in strategic places to collect the rainwater.</p>
        </div>

        <h3 className="text-lg font-bold text-[#112a46] mb-2">Image Gallery</h3>
        <p className="text-gray-500 mb-8">Click on the images below and scroll down to view the zoomed image:</p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {gallery.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`Rainwater Harvesting Gallery ${idx + 1}`}
              onClick={() => setZoomedImage(img)}
              className="w-64 h-48 object-cover cursor-pointer rounded border border-gray-200 hover:shadow-lg transition-shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x300/e2e8f0/475569?text=Upload+rainwater-gallery-${idx+1}.jpg`;
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

export default RainwaterHarvesting;
