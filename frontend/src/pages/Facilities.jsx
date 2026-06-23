import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Flag, 
  Shield, 
  Bus, 
  Coffee, 
  Bed, 
  Trophy, 
  Dumbbell, 
  Flower2, 
  BriefcaseMedical, 
  CreditCard, 
  Monitor, 
  CloudRain 
} from 'lucide-react';

const Facilities = () => {
  const facilities = [
    { name: "NSS", icon: <Flag size={20} />, path: "/facilities/nss" },
    { name: "NCC", icon: <Shield size={20} />, path: "/facilities/ncc" },
    { name: "TRANSPORT", icon: <Bus size={20} />, path: "/facilities/transport" },
    { name: "CANTEEN", icon: <Coffee size={20} />, path: "/facilities/canteen" },
    { name: "HOSTEL", icon: <Bed size={20} />, path: "/facilities/hostel" },
    { name: "SPORTS & GAMES", icon: <Trophy size={20} /> },
    { name: "GYMNASIUM", icon: <Dumbbell size={20} />, path: "/facilities/gymnasium" },
    { name: "YOGA CENTRE", icon: <Flower2 size={20} />, path: "/facilities/yoga" },
    { name: "HEALTH CENTRE", icon: <BriefcaseMedical size={20} />, path: "/facilities/health-centre" },
    { name: "ATM", icon: <CreditCard size={20} />, path: "/facilities/atm" },
    { name: "COMPUTER CENTRE", icon: <Monitor size={20} />, path: "/facilities/computer-centre" },
    { name: "RAINWATER HARVESTING", icon: <CloudRain size={20} />, path: "/facilities/rainwater-harvesting" }
  ];

  return (
    <div className="min-h-[70vh] bg-gray-50 pt-[100px] pb-20 px-6 flex items-center justify-center">
      <Helmet>
        <title>Facilities | ANITS</title>
      </Helmet>

      <div className="bg-[#cbd5e1] w-full max-w-6xl rounded-3xl p-10 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-black text-[#1f2937] text-center mb-12 uppercase tracking-wide">
          Facilities @ ANITS
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {facilities.map((facility, index) => {
            if (facility.path) {
              return (
                <Link 
                  key={index}
                  to={facility.path}
                  className="bg-gradient-to-r from-[#3b82f6] to-[#22c55e] text-white py-4 px-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200 w-full"
                >
                  <span className="opacity-90">{facility.icon}</span>
                  <span className="font-bold text-sm tracking-wider">{facility.name}</span>
                </Link>
              );
            }

            return (
              <button 
                key={index}
                className="bg-gradient-to-r from-[#3b82f6] to-[#22c55e] text-white py-4 px-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200 w-full"
              >
                <span className="opacity-90">{facility.icon}</span>
                <span className="font-bold text-sm tracking-wider">{facility.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
