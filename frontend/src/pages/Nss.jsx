import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Users, Info, Target, Flag, Calendar, Award, BookOpen, 
  MapPin, CheckSquare, Image as ImageIcon, Briefcase, FileText
} from 'lucide-react';

const Nss = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    '/images/nss-carousel-1.jpg',
    '/images/nss-carousel-2.jpg',
    '/images/nss-carousel-3.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const sidebarLinks = [
    { name: "About NSS", icon: <Users size={16} /> },
    { name: "NSS Members", icon: <Info size={16} /> },
    { name: "Activities", icon: <Target size={16} /> },
    { name: "Student Participation", icon: <Users size={16} /> },
    { name: "Awards Recognition", icon: <Award size={16} /> },
    { name: "Unnath Bharat Abhiyan", icon: <MapPin size={16} /> },
    { name: "Electoral Literacy Club(ELC)", icon: <CheckSquare size={16} /> },
    { name: "Gallery", icon: <ImageIcon size={16} /> },
    { name: "Events", icon: <Calendar size={16} /> },
    { name: "Santion Letters", icon: <FileText size={16} /> },
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>About NSS | ANITS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Carousel */}
        <div className="w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg mb-12 relative bg-gray-200">
          {carouselImages.map((src, index) => (
            <img 
              key={index}
              src={src} 
              alt={`NSS Activity ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/1200x500/112a46/ffffff?text=Upload+${src.split('/').pop()}`;
              }}
            />
          ))}
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {carouselImages.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#112a46] mb-8">About NSS</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left Column) */}
          <div className="lg:w-3/4 flex flex-col gap-6">
            
            {/* About Us */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                <BookOpen size={18} /> About Us
              </div>
              <div className="p-6 text-gray-700 text-sm leading-relaxed">
                Popularly known as NSS, the scheme was launched in Gandhiji's Centenary year, 1969. Aimed at developing student's personality through community service. NSS, is a voluntary association of young people in Colleges, Universities and at +2 level working for a campus-community linkage. The cardinal principle of the NSS programme is that it is organised by the students themselves, and both students and teachers through their combined participation in community service, get a sense of involvement in the tasks of nation building.
              </div>
            </div>

            {/* Objectives */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                <Target size={18} /> Objectives behind the NSS
              </div>
              <div className="p-6 text-gray-700 text-sm leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>To enable the students to understand the community in which they work.</li>
                  <li>To understand themselves in relation to their community.</li>
                  <li>To identify the needs and problems in the community and work on solutions.</li>
                  <li>To develop a sense of social and civic responsibility.</li>
                  <li>To apply education to find practical solutions to individual and community problems.</li>
                  <li>To develop competence required for group living and sharing responsibilities.</li>
                  <li>To gain skills in mobilising community participation.</li>
                  <li>To acquire leadership qualities and a democratic attitude.</li>
                  <li>To develop capacity to meet emergencies and national disasters.</li>
                  <li>To practice national integration.</li>
                </ul>
              </div>
            </div>

            {/* Motto */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                <Flag size={18} /> NSS Motto
              </div>
              <div className="p-6 text-gray-700 text-sm leading-relaxed">
                The motto or watchword of the National Service Scheme Togel Online is 'NOT ME BUT YOU'. This reflects the essence of democratic living and upholds the need for selfless service and appreciation of the other person's point of view and also to show consideration for fellow human beings. It underlines that the welfare of an individual is ultimately dependent on the welfare of society on the whole. Therefore, it should be the aim of the NSS to demonstrate this motto in its day-to-day programme.
              </div>
            </div>

            {/* NSS Day */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                <Calendar size={18} /> NSS Day
              </div>
              <div className="p-6 text-gray-700 text-sm leading-relaxed">
                NSS was formally launched on 24th September, 1969, the birth centenary year of the Father of the Nation. Therefore, 24 September is celebrated every year as NSS Day with appropriate programmes and activities.
              </div>
            </div>

          </div>

          {/* Sidebar (Right Column) */}
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

export default Nss;
