import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { X, Utensils, ShieldCheck, Tag } from 'lucide-react';

const Canteen = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const gallery = [
    '/images/canteen-gallery-1.jpg',
    '/images/canteen-gallery-2.jpg',
    '/images/canteen-gallery-3.jpg'
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Canteen | ANITS</title>
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
              CANTEEN
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-[#112a46] mb-8">About Our Cafeteria</h2>
        
        <div className="text-gray-700 text-sm md:text-base leading-relaxed mb-16 max-w-4xl mx-auto text-left space-y-4">
          <p>The institute has a hygienically maintained canteen which supplies breakfast, coffee, tea, beverages, snacks, Tandoori items, Continental and lunch to the students and staff at subsidized prices.</p>
          <p>The canteen has an area of 3,410 sq.ft. It is kept open from 9 A.M. to 5.30 P.M. on all working days.</p>
        </div>

        {/* Hours of Operation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-16 max-w-2xl mx-auto text-left">
          <h3 className="text-xl font-bold text-[#112a46] mb-6 text-center">Hours of Operation</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Monday - Saturday:</span>
              <span>9:00 AM - 5:30 PM</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Breakfast:</span>
              <span>9:00 AM - 11:00 AM</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Lunch:</span>
              <span>12:00 PM - 2:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Snacks:</span>
              <span>3:00 PM - 5:30 PM</span>
            </div>
          </div>
        </div>

        {/* Why Choose Our Cafeteria */}
        <div className="bg-gray-100 rounded-lg p-10 mb-16">
          <h3 className="text-2xl font-bold text-[#112a46] mb-10">Why Choose Our Cafeteria?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Utensils size={40} className="text-[#112a46] mb-4" />
              <h4 className="font-bold text-lg mb-2">Quality Food</h4>
              <p className="text-sm text-gray-600 text-center">All meals are prepared with fresh ingredients by our trained chefs.</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={40} className="text-[#112a46] mb-4" />
              <h4 className="font-bold text-lg mb-2">Hygienic Environment</h4>
              <p className="text-sm text-gray-600 text-center">We maintain the highest standards of cleanliness and hygiene.</p>
            </div>
            <div className="flex flex-col items-center">
              <Tag size={40} className="text-[#112a46] mb-4" />
              <h4 className="font-bold text-lg mb-2">Subsidized Prices</h4>
              <p className="text-sm text-gray-600 text-center">Enjoy quality food at affordable prices for students and staff.</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-[#112a46] mb-2">Image Gallery</h3>
        <p className="text-gray-500 mb-8">Click on the images below to view larger versions</p>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {gallery.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`Canteen Gallery ${idx + 1}`}
              onClick={() => setZoomedImage(img)}
              className="w-64 h-40 object-cover cursor-pointer rounded border border-gray-200 hover:shadow-lg transition-shadow"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/400x300/e2e8f0/475569?text=Upload+canteen-gallery-${idx+1}.jpg`;
              }}
            />
          ))}
        </div>

        {zoomedImage && (
          <div className="mt-8 relative inline-block">
            <button 
              onClick={() => setZoomedImage(null)}
              className="absolute -top-4 -left-4 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50 z-10"
            >
              <X size={24} />
            </button>
            <img 
              src={zoomedImage} 
              alt="Zoomed Gallery" 
              className="max-w-full rounded-lg shadow-xl relative z-0"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Canteen;
