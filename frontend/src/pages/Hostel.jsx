import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Building, UserCheck, ShieldCheck, Utensils, Zap, Tv, 
  BriefcaseMedical, Wifi, Droplets, BookOpen, Trophy, Dumbbell,
  Phone, Mail, User
} from 'lucide-react';

const Hostel = () => {
  const sidebarLinks = [
    { name: "Hostel", icon: <Building size={16} /> },
    { name: "Facilities", icon: <Wifi size={16} /> },
    { name: "Rules and Regulations", icon: <BookOpen size={16} /> },
  ];

  const facilities = [
    { name: "A resident Warden for each hostel.", icon: <UserCheck size={18} /> },
    { name: "Round the clock security.", icon: <ShieldCheck size={18} /> },
    { name: "Hygienically cooked and served food - Vegetarian and Non-Vegetarian.", icon: <Utensils size={18} /> },
    { name: "Power Supply from the stand by generator incase of AP Transco. power failure.", icon: <Zap size={18} /> },
    { name: "Common room facility with T.V and popular magazines.", icon: <Tv size={18} /> },
    { name: "Medical Attendance and first aid.", icon: <BriefcaseMedical size={18} /> },
    { name: "Wi-Fi.", icon: <Wifi size={18} /> },
    { name: "Drinking water(RO/Aqua) in each floors.", icon: <Droplets size={18} /> },
    { name: "Special classes for first year students.", icon: <BookOpen size={18} /> },
    { name: "Sports & Games facilities: Indoor games like caroms, table tennis & chess and outdoor games like volleyball, Kabaddi, tennikoit, etc.", icon: <Trophy size={18} /> },
    { name: "Gymnasium.", icon: <Dumbbell size={18} /> },
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Hostels | ANITS</title>
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
              HOSTEL
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content */}
          <div className="lg:w-3/4 flex flex-col gap-10">
            
            {/* Overview Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#112a46] mb-6 border-b pb-2">Overview</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 text-gray-700 text-sm leading-relaxed">
                  <p>ANITS has placed administration as the key management separate with excellent infrastructure facilities and situated in the college campus. The Boys' Hostel can accommodate 500 inmates and Girls' Hostel with a capacity of accommodating 500 inmates. Air-conditioning facility is also available in both the Hostels.</p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/images/hostel-building.jpg" 
                    alt="Hostel Building" 
                    className="w-full rounded shadow-sm object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x250/e2e8f0/475569?text=Upload+hostel-building.jpg";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Facilities Available in Hostels */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#112a46] mb-6 border-b pb-2">Facilities Available in Hostels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="text-[#1f3a5f] mt-0.5">{fac.icon}</div>
                    <span>{fac.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boys Hostel Details */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
              <h2 className="text-2xl font-bold text-[#112a46] mb-2 border-b pb-2">Boys Hostel Details</h2>
              <p className="text-sm italic text-gray-500 mb-4">A Block for First year students. B Block for Second, Third & Final year students.</p>
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-[#eef2f6] text-[#112a46]">
                  <tr>
                    <th className="px-4 py-3 font-semibold border-b">S.No</th>
                    <th className="px-4 py-3 font-semibold border-b">Details</th>
                    <th className="px-4 py-3 font-semibold border-b text-center">A Block</th>
                    <th className="px-4 py-3 font-semibold border-b text-center">B Block</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3">1</td><td className="px-4 py-3">Number of floors</td><td className="px-4 py-3 text-center font-semibold">4</td><td className="px-4 py-3 text-center font-semibold">4</td></tr>
                  <tr><td className="px-4 py-3">2</td><td className="px-4 py-3">Number of rooms per each floor</td><td className="px-4 py-3 text-center font-semibold text-red-500">11</td><td className="px-4 py-3 text-center font-semibold text-red-500">9</td></tr>
                  <tr><td className="px-4 py-3">3</td><td className="px-4 py-3">Total number of rooms</td><td className="px-4 py-3 text-center font-semibold">44</td><td className="px-4 py-3 text-center font-semibold">76</td></tr>
                  <tr><td className="px-4 py-3">4</td><td className="px-4 py-3">Maximum capacity in each room</td><td className="px-4 py-3 text-center font-semibold">4</td><td className="px-4 py-3 text-center font-semibold">4</td></tr>
                  <tr><td className="px-4 py-3">5</td><td className="px-4 py-3">Available capacity for occupancy</td><td className="px-4 py-3 text-center font-semibold text-red-500">176</td><td className="px-4 py-3 text-center font-semibold text-red-500">304</td></tr>
                  <tr><td className="px-4 py-3">6</td><td className="px-4 py-3">Number of students occupied</td><td className="px-4 py-3 text-center font-semibold">169</td><td className="px-4 py-3 text-center font-semibold">99</td></tr>
                  <tr><td className="px-4 py-3">7</td><td className="px-4 py-3">Number of in-house wardens (Teaching)</td><td className="px-4 py-3 text-center font-semibold text-green-500">1</td><td className="px-4 py-3 text-center font-semibold text-green-500">1</td></tr>
                  <tr><td className="px-4 py-3">8</td><td className="px-4 py-3">Number of in-house wardens (Non-Teaching)</td><td className="px-4 py-3 text-center font-semibold text-green-500">1</td><td className="px-4 py-3 text-center font-semibold text-green-500">1</td></tr>
                </tbody>
              </table>
            </div>

            {/* Girls Hostel Details */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
              <h2 className="text-2xl font-bold text-[#112a46] mb-2 border-b pb-2">Girls Hostel Details</h2>
              <p className="text-sm italic text-gray-500 mb-4">Juniors Block for First year students. Seniors Block for Second, Third & Final year students.</p>
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-[#fdf2f2] text-[#112a46]">
                  <tr>
                    <th className="px-4 py-3 font-semibold border-b">S.No</th>
                    <th className="px-4 py-3 font-semibold border-b">Details</th>
                    <th className="px-4 py-3 font-semibold border-b text-center">Juniors Block</th>
                    <th className="px-4 py-3 font-semibold border-b text-center">Seniors Block</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3">1</td><td className="px-4 py-3">Number of floors</td><td className="px-4 py-3 text-center font-semibold">3</td><td className="px-4 py-3 text-center font-semibold">4</td></tr>
                  <tr><td className="px-4 py-3">2</td><td className="px-4 py-3">Number of rooms per each floor</td><td className="px-4 py-3 text-center font-semibold text-red-500">6</td><td className="px-4 py-3 text-center font-semibold text-red-500">13</td></tr>
                  <tr><td className="px-4 py-3">3</td><td className="px-4 py-3">Total number of rooms</td><td className="px-4 py-3 text-center font-semibold">18</td><td className="px-4 py-3 text-center font-semibold">50</td></tr>
                  <tr><td className="px-4 py-3">4</td><td className="px-4 py-3">Maximum capacity in each room</td><td className="px-4 py-3 text-center font-semibold">4</td><td className="px-4 py-3 text-center font-semibold">3</td></tr>
                  <tr><td className="px-4 py-3">5</td><td className="px-4 py-3">Available capacity for occupancy</td><td className="px-4 py-3 text-center font-semibold text-red-500">112</td><td className="px-4 py-3 text-center font-semibold text-red-500">150</td></tr>
                  <tr><td className="px-4 py-3">6</td><td className="px-4 py-3">Number of students occupied</td><td className="px-4 py-3 text-center font-semibold">104</td><td className="px-4 py-3 text-center font-semibold">114</td></tr>
                  <tr><td className="px-4 py-3">7</td><td className="px-4 py-3">Number of in-house wardens (Non-Teaching)</td><td className="px-4 py-3 text-center font-semibold text-green-500">1</td><td className="px-4 py-3 text-center font-semibold text-green-500">1</td></tr>
                  <tr><td className="px-4 py-3">8</td><td className="px-4 py-3">Number of Caretakers</td><td className="px-4 py-3 text-center font-semibold text-green-500">1</td><td className="px-4 py-3 text-center font-semibold text-green-500">1</td></tr>
                </tbody>
              </table>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#112a46] mb-6 border-b pb-2">Photo Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((idx) => (
                  <img 
                    key={idx}
                    src={`/images/hostel-gallery-${idx}.jpg`} 
                    alt={`Hostel Gallery ${idx}`}
                    className="w-full h-32 object-cover rounded shadow-sm border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/300x200/e2e8f0/475569?text=Upload+hostel-gallery-${idx}.jpg`;
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-[#112a46] mb-6 border-b pb-2">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Boys Hostel</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p className="flex items-center gap-3"><User size={16} className="text-[#1f3a5f]" /> Warden: Chief Warden</p>
                    <p className="flex items-center gap-3"><Phone size={16} className="text-[#1f3a5f]" /> Phone: +91-7036946621</p>
                    <p className="flex items-center gap-3"><Mail size={16} className="text-[#1f3a5f]" /> Email: <a href="mailto:boyshostel@anits.edu.in" className="text-blue-600 hover:underline">boyshostel@anits.edu.in</a></p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Girls Hostel</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p className="flex items-center gap-3"><User size={16} className="text-[#1f3a5f]" /> Warden: Chief Warden</p>
                    <p className="flex items-center gap-3"><Phone size={16} className="text-[#1f3a5f]" /> Phone: +91-9959672633</p>
                    <p className="flex items-center gap-3"><Mail size={16} className="text-[#1f3a5f]" /> Email: <a href="mailto:girlshostel@anits.edu.in" className="text-blue-600 hover:underline">girlshostel@anits.edu.in</a></p>
                  </div>
                </div>
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

export default Hostel;
