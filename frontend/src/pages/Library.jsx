import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Info, Users, BookOpen, Fingerprint, Globe, CheckCircle, 
  Book, FileText, LayoutGrid, Search, Link, Users2, Calendar, 
  Download, Image as ImageIcon, Mail, Award, ChevronLeft, ChevronRight
} from 'lucide-react';

const Library = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { image: "/images/library-hero.jpg", text: "Chief Librarian - Dr. S. Suresh, M.L.I.Sc, M.Phil, Ph.D" },
    { image: "/images/library-hero-2.jpg", text: "Central Library Reading Hall" },
    { image: "/images/library-hero-3.jpg", text: "Digital Library & E-Resources" }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const sidebarLinks = [
    { name: "About Library", icon: <Info size={16} /> },
    { name: "Library Committee", icon: <Users size={16} /> },
    { name: "e-Shodh Sindhu", icon: <GraduationCap size={16} /> },
    { name: "IRINS", icon: <Fingerprint size={16} /> },
    { name: "Online E-Journals", icon: <Globe size={16} /> },
    { name: "Turnitin Online Plagiarism Tool", icon: <CheckCircle size={16} /> },
    { name: "NPTEL Local Chapter Statistics", icon: <BookOpen size={16} /> },
    { name: "Print Journals", icon: <Book size={16} /> },
    { name: "News Papers", icon: <FileText size={16} /> },
    { name: "LISYS", icon: <LayoutGrid size={16} /> },
    { name: "OPAC (Book Search)", icon: <Search size={16} /> },
    { name: "Open Access Journals / Useful Links", icon: <Link size={16} /> },
    { name: "Library Staff", icon: <Users2 size={16} /> },
    { name: "Library Events", icon: <Calendar size={16} /> },
    { name: "Download Forms", icon: <Download size={16} /> },
    { name: "Photo Gallery", icon: <ImageIcon size={16} /> },
    { name: "Contact Us", icon: <Mail size={16} /> },
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Central Library | ANITS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-[#112a46] mb-8">Central Library</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left Column) */}
          <div className="lg:w-3/4 flex flex-col gap-6">
            
            {/* Hero Image Carousel */}
            <div className="w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden relative shadow-md border border-gray-200 group">
              <img 
                src={slides[currentSlide].image} 
                alt="Library Banner" 
                className="w-full h-full object-cover transition-opacity duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              
              {/* Carousel Controls */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={prevSlide}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                <h2 className="text-white text-xl font-bold">{slides[currentSlide].text}</h2>
              </div>
            </div>

            {/* Information Cards Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vision */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
                <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                  <BookOpen size={18} /> Vision of Library
                </div>
                <div className="p-5 text-gray-700 text-sm leading-relaxed flex-grow">
                  The vision of the ANITS Library is to provide users seamless access to onsite and world-wide information services and to support the delivery of the information with a creative internal network of human and material resources.
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
                <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                  <FileText size={18} /> Mission of Library
                </div>
                <div className="p-5 text-gray-700 text-sm leading-relaxed flex-grow">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Developing, organizing, and maintaining a collection that attempts to meet the needs of users.</li>
                    <li>Developing and strengthening working relationships with faculty, students, and staff.</li>
                    <li>Providing instruction that enables users to access and evaluate information resources.</li>
                    <li>Participating in or responding quickly and creatively to the development of relevant technologies and standards.</li>
                    <li>Encouraging and supporting the professional growth, individual growth, and job satisfaction of staff members.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Cards Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Values */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
                <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                  <LayoutGrid size={18} /> Values
                </div>
                <div className="p-5 text-gray-700 text-sm leading-relaxed flex-grow">
                  <p className="mb-2 font-medium">The Engineering Library is dedicated to:</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Recognize users as our primary focus.</li>
                    <li>Providing efficient and user-friendly access to library services and resources.</li>
                    <li>Inviting and responding to communication from our primary users.</li>
                    <li>Foster cooperation by sharing resources via local, national, and international networks.</li>
                    <li>Promote equity of access to information.</li>
                    <li>Valuing and developing library staff.</li>
                  </ul>
                </div>
              </div>

              {/* Goals */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
                <div className="bg-[#1f3a5f] text-white p-3 font-bold flex items-center gap-2">
                  <Award size={18} /> Goals
                </div>
                <div className="p-5 text-gray-700 text-sm leading-relaxed flex-grow">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Optimize the efficiency and effectiveness of library services to our users.</li>
                    <li>Develop and effectively utilize two-way communication to inform and gather input from faculty as appropriate.</li>
                    <li>Provide instruction, online resources and facilities for our primary users.</li>
                    <li>Explore new technology and utilize as appropriate to provide user-friendly access or service and/or improve staff efficiency.</li>
                    <li>Develop, manage, and maintain the engineering collection — both virtual and real.</li>
                    <li>Develop and maintain collection development policies that reflect the current research and instruction interests of our faculty and students and the current financial situation of the library.</li>
                    <li>Hire, develop and retain highly skilled staff.</li>
                  </ul>
                </div>
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

export default Library;

// Helper GraduationCap since it was missing in imports above
function GraduationCap(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a2 2 0 0 1-.01 2.83l-7.18 7.18a2 2 0 0 1-2.83 0l-7.18-7.18a2 2 0 0 1-.01-2.83l7.18-7.18a2 2 0 0 1 2.84 0l7.18 7.18z" />
      <path d="m12 12-3-3" />
      <path d="m15 9-3 3" />
    </svg>
  );
}
