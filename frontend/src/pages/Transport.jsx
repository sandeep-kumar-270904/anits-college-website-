import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Home, Users, Target, Activity, FileText, List, Map, Calendar, Image as ImageIcon, Bus
} from 'lucide-react';

const Transport = () => {
  const sidebarLinks = [
    { name: "Home", icon: <Home size={16} /> },
    { name: "Members", icon: <Users size={16} /> },
    { name: "Roles & Responsibilities", icon: <Target size={16} /> },
    { name: "Activities", icon: <Activity size={16} /> },
    { name: "Instructions to Students", icon: <FileText size={16} /> },
    { name: "Bus Incharges List", icon: <List size={16} /> },
    { name: "Bus Routes & Timings", icon: <Map size={16} /> },
    { name: "MOM", icon: <Calendar size={16} /> },
    { name: "Photo Gallery", icon: <ImageIcon size={16} /> },
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Transport | ANITS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="lg:w-3/4 flex flex-col gap-6">
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                <Bus size={18} /> Transport
              </div>
              <div className="p-6 text-gray-700 text-sm leading-relaxed">
                <img 
                  src="/images/transport-main.jpg" 
                  alt="Transport Buses" 
                  className="w-full rounded shadow-sm mb-6 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/800x400/e2e8f0/475569?text=Upload+transport-main.jpg";
                  }}
                />
                <p className="mb-4">
                  Considering the need to provide comfortable and safe transport to the students & staff, ANITS is running a fleet of 20 AC buses (TATA & Ashok Leyland) from various areas of Visakhapatnam, Vizianagaram. These buses originate at different places like Kothavalasa, Steel plant town ship, MVP colony, Seetammadhara, Dwarakanagar, Pendurthy junction, Simhachalam etc in the city and terminate in the institute campus. The buses are filled to exact sitting capacity 55 for TATA Buses and 46 for Ashok Leyland buses only and no standing is allowed. In addition, there are a large number of APSRTC city and route buses which touch Sangivalasa bus stop on the National Highway, which is just 300 meters away from the Institute.
                </p>

                <p className="mb-2">Objectives</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To Provide a comfortable and convenient travel to faculty and students.</li>
                  <li>To facilitate students to visit industries, outreach programs, NSS activities</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-[80px]">
              <div className="divide-y divide-gray-100">
                {sidebarLinks.map((link, index) => (
                  <button 
                    key={index} 
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-3"
                  >
                    <span className="text-gray-400">{link.icon}</span>
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Transport;
