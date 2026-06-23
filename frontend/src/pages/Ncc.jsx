import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Users, Target, Image as ImageIcon, BookOpen
} from 'lucide-react';

const Ncc = () => {
  const sidebarLinks = [
    { name: "About NCC", icon: <Users size={16} /> },
    { name: "AIM Of NCC", icon: <Target size={16} /> },
    { name: "Activities & Achievements", icon: <BookOpen size={16} /> },
    { name: "Gallery", icon: <ImageIcon size={16} /> },
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>About NCC | ANITS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-[#112a46] mb-8">About NCC</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="lg:w-3/4 flex flex-col gap-6">
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                <BookOpen size={18} /> About Us
              </div>
              <div className="p-6 text-gray-700 text-sm leading-relaxed">
                <img 
                  src="/images/ncc-director.jpg" 
                  alt="NCC Director" 
                  className="w-full max-w-md rounded shadow-sm mb-6 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400/e2e8f0/475569?text=Upload+ncc-director.jpg";
                  }}
                />
                <p className="mb-4">
                  National Cadet Corps is an organization engaged in conducting constructive activities for lakhs of students under its fold. It has grown with unparalleled contributions in shaping the character and developing the personality of the youth of the nation. NCC, being a nursery for many future leaders in various walks of national life, is also the premier youth organization. It has played an important role in the all-round development of the youth of our country and in grooming future leaders in all fields. It is considered to be the largest youth organization. It inculcates self-confidence and team spirit in cadets, which are the key instruments to make them good citizens.
                </p>
                <p className="mb-6">
                  NCC was instituted in Andhra Pradesh in May 1949, when it was a part of the composite Madras state. In 1956, on reorganization of the state, the existing NCC units were organized into an Independent NCC Circle Headquarters for the new state of Andhra Pradesh, which was designated as HQ 12 Circle Cadet Corps. This was re-designated as a Directorate in the year 1982, with an Air Commodore as Director. The Director's post was re-designated as Deputy Director General in August 1985.
                </p>

                <h3 className="font-bold text-[#112a46] mb-2 uppercase text-sm">ANITS NCC</h3>
                <p className="mb-6">
                  3(A) Naval NCC was launched in the year 2020 in our college. It has played an active role in the social and community services.
                </p>

                <h3 className="font-bold text-[#112a46] mb-2 uppercase text-sm">Contact Person</h3>
                <ul className="space-y-1">
                  <li>Mr. K. VENUGOPAL, NCC Care Taker</li>
                  <li>ANITS Naval NCC Unit</li>
                  <li>Office: 08933-225084</li>
                  <li>Mobile: 9866933193</li>
                  <li>Email: <a href="mailto:anitsnccunit@anits.edu.in" className="text-blue-600 hover:underline">anitsnccunit@anits.edu.in</a></li>
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

export default Ncc;
