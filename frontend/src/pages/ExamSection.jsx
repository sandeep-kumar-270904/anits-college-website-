import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Users, Book, Megaphone, GraduationCap, BookOpen, 
  Award, UserCheck, Gavel, ClipboardCheck, ClipboardList, 
  Calendar, FileCheck, TrendingUp, FileText, Scale,
  Monitor
} from 'lucide-react';

const ExamSection = () => {
  const sidebarLinks = [
    { name: 'Team', icon: <Users size={16} /> },
    { name: 'Syllabus', icon: <Book size={16} /> },
    { name: 'Circulars', icon: <Megaphone size={16} /> },
    { name: 'Exam Portal', icon: <GraduationCap size={16} /> },
    { name: 'Instructions to Students', icon: <BookOpen size={16} /> },
    { name: 'Conversion Certificate', icon: <Award size={16} /> },
    { name: 'Instructions to Invigilators', icon: <UserCheck size={16} /> },
    { name: 'Disciplinary Action for Malpractice', icon: <Gavel size={16} /> },
    { name: 'Guidelines to Moderators', icon: <ClipboardCheck size={16} /> },
    { name: 'Invigilation adjustment form', icon: <ClipboardList size={16} /> },
    { name: 'Time Tables', icon: <Calendar size={16} /> },
    { name: 'Results', icon: <FileCheck size={16} /> },
    { name: 'Results Analysis', icon: <TrendingUp size={16} /> },
    { name: 'Model Question Papers', icon: <FileText size={16} /> },
    { name: 'Exam Regulations', icon: <Scale size={16} /> },
  ];

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px] pb-20">
      <Helmet>
        <title>Examination Section | ANITS</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-[26px] font-bold text-[#222] mb-6 font-['Oswald',sans-serif] tracking-wide">About Autonomous Status</h2>
          
          <p className="text-gray-600 leading-relaxed mb-6 text-[14px]">
            ANITS is affiliated to Andhra University and follows its Academic rules and regulations to honor B.Tech/ M.Tech degrees. 
            The Institute was granted <strong>"Autonomous Status"</strong> by UGC during May 2015, applicable from the admitted batch of 2015-16 academic year.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10 text-[14px]">
            As an autonomous institution, ANITS enjoys academic freedom in the following areas while maintaining National/International standards:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Cards */}
            <div className="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e4b85] text-white p-3 font-semibold flex items-center gap-2 text-[15px]">
                <BookOpen size={18} /> Curriculum Design
              </div>
              <div className="p-6 text-gray-600 text-[14px] leading-relaxed bg-white flex-grow">
                ANITS has the freedom to design its own curriculum to meet the needs of industry and academia.
              </div>
            </div>

            <div className="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e4b85] text-white p-3 font-semibold flex items-center gap-2 text-[15px]">
                <FileText size={18} /> Syllabus Framework
              </div>
              <div className="p-6 text-gray-600 text-[14px] leading-relaxed bg-white flex-grow">
                The institution frames its own syllabus, ensuring relevance and industry alignment.
              </div>
            </div>

            <div className="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e4b85] text-white p-3 font-semibold flex items-center gap-2 text-[15px]">
                <ClipboardList size={18} /> Exam Conduction
              </div>
              <div className="p-6 text-gray-600 text-[14px] leading-relaxed bg-white flex-grow">
                ANITS conducts its own Sessional and Semester-end examinations.
              </div>
            </div>

            <div className="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e4b85] text-white p-3 font-semibold flex items-center gap-2 text-[15px]">
                <UserCheck size={18} /> Attendance Regulations
              </div>
              <div className="p-6 text-gray-600 text-[14px] leading-relaxed bg-white flex-grow">
                The institute maintains strict student attendance and promotional rules.
              </div>
            </div>
          </div>

          <h2 className="text-[26px] font-bold text-[#222] mb-6 font-['Oswald',sans-serif] tracking-wide">Governing Committees</h2>
          <p className="text-gray-600 mb-6 text-[14px]">The autonomous status is governed by the following committees:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e4b85] text-white p-3 font-semibold flex items-center gap-2 text-[14px]">
                <Users size={16} /> Board of Studies
              </div>
              <div className="p-5 text-gray-600 text-[13px] leading-relaxed bg-white flex-grow">
                Operates at department level to ensure curriculum and syllabus relevance.
              </div>
            </div>

            <div className="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e4b85] text-white p-3 font-semibold flex items-center gap-2 text-[14px]">
                <Monitor size={16} /> Academic Council
              </div>
              <div className="p-5 text-gray-600 text-[13px] leading-relaxed bg-white flex-grow">
                Functions at institution level to approve academic policies and procedures.
              </div>
            </div>

            <div className="border border-gray-200 rounded overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e4b85] text-white p-3 font-semibold flex items-center gap-2 text-[14px]">
                <Book size={16} /> Governing Body
              </div>
              <div className="p-5 text-gray-600 text-[13px] leading-relaxed bg-white flex-grow">
                Autonomous governing body that provides strategic direction and oversight.
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-gray-200 shadow-sm rounded overflow-hidden sticky top-[100px]">
            <div className="p-4 border-b border-gray-100 bg-[#fbfcfd]">
              <h3 className="font-bold text-[#333] text-[15px]">Examination Section</h3>
            </div>
            <div className="flex flex-col">
              {sidebarLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to="#" 
                  className={`px-4 py-3 text-[13px] text-gray-600 hover:text-[#1e4b85] hover:bg-[#f4f7fb] transition-colors flex items-center gap-3 ${index !== sidebarLinks.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <span className="text-[#666]">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExamSection;
