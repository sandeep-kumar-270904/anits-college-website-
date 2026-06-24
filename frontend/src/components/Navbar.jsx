import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavItem = ({ title, to, children }) => {
    return (
      <div className="relative group">
        <Link to={to} className={`flex items-center text-white font-medium text-[14px] py-3 px-3 hover:text-blue-200 transition-colors ${location.pathname === to ? 'bg-white/10' : ''}`}>
          {title} {children && <ChevronDown size={14} className="ml-1 opacity-70" />}
        </Link>
        {children && (
          <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-white shadow-xl border-t-2 border-[#1c3e6b] z-[60]">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="w-full bg-white font-sans relative z-50 shadow-md border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-[#0f172a] text-gray-300 text-[11px] py-1.5 px-4 hidden md:flex justify-center items-center gap-6 font-medium">
        <div>College Code: <span className="font-bold text-white">ANIL</span></div>
        <div>Email: <a href="mailto:principal@anits.edu.in" className="text-white hover:underline">principal@anits.edu.in</a></div>
        <div>8712005999, 7330789893, 8712008222 <span className="text-white">(Admissions)</span></div>
        <Link to="#" className="hover:text-white">IIC</Link>
        <Link to="#" className="hover:text-white">E-Learning</Link>
      </div>

      {/* Middle Logo Bar */}
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center bg-white">
        {/* Left side logos/text */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-gray-800 flex items-center justify-center font-serif font-black text-xl text-gray-800">A</div>
            <span className="font-serif font-bold text-[12px] mt-0.5 tracking-widest text-gray-800">ANITS</span>
          </div>
          <div className="text-[#e85c2b] font-bold text-[22px] tracking-wide leading-tight flex flex-col ml-2">
            <span>ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY & SCIENCES <span className="text-[14px] font-medium text-[#e85c2b]">(AUTONOMOUS)</span></span>
          </div>
        </div>

        {/* Right side badges & button */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="bg-gray-100 rounded-md px-3 py-1 border border-gray-300 font-bold text-[10px] text-[#2c3e50] text-center leading-tight shadow-sm">
            <span className="text-[14px] block mb-0.5">UGC</span>
            AUTONOMOUS
          </div>
          <div className="bg-red-50 rounded-md px-3 py-1 border border-red-200 font-bold text-[10px] text-[#c0392b] text-center flex flex-col items-center leading-tight shadow-sm">
            <span className="text-[16px] block mb-0.5">A+</span>
            <span>NAAC</span>
          </div>
          <a href="tel:8712005999" className="bg-[#317ab3] hover:bg-[#256294] transition-colors text-white rounded px-4 py-2 flex items-center gap-3 shadow-md ml-2">
            <Phone size={24} />
            <div className="flex flex-col text-left">
              <span className="text-[11px] leading-none mb-1 font-medium">Admissions Contact</span>
              <span className="text-[20px] leading-none font-bold">8712005999</span>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bg-gradient-to-r from-[#173e6b] to-[#3a96d5]">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center w-full">
            <NavItem title="About Us" to="/about">
              <Link to="/about/glance" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">ANITS at a glance</Link>
              <Link to="/about/principal" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Principal</Link>
              <Link to="/about/team" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Our team</Link>
              <Link to="/about/committees" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Committees</Link>
              <Link to="/about/academic-council" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Academic council</Link>
              <Link to="/about/organization-chart" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium">Organization chart</Link>
            </NavItem>
            
            <Link to="/admissions" className="flex items-center text-white font-medium text-[14px] py-3 px-3 hover:text-blue-200 transition-colors">Admissions</Link>
            
            <NavItem title="Academics" to="/academics">
              <Link to="/academics/calendar" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Academic Calendar</Link>
              <Link to="/academics/timetable" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Time Table</Link>
              <Link to="/academics/syllabus" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Syllabus</Link>
              <Link to="/academics/e-learning" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">E-Learning</Link>
              <Link to="/academics/exams" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Exam Section</Link>
              <Link to="/academics/iso-certificate" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">ISO Certificate</Link>
              <Link to="/academics/apssdc" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">APSSDC</Link>
              <Link to="/academics/swayam-nptel" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">SWAYAM-NPTEL</Link>
              <Link to="/academics/professional-bodies" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Professional Bodies</Link>
              <Link to="/facilities/nss" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">NSS</Link>
              <Link to="/facilities/ncc" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium">NCC</Link>
            </NavItem>
            
            <NavItem title="Departments" to="/departments">
              <Link to="/departments/chemical" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Chemical Engineering</Link>
              <Link to="/departments/civil" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Civil Engineering</Link>
              <Link to="/departments/cse" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Computer Science and Engineering</Link>
              <Link to="/departments/cse-aiml" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Computer Science and Engineering (AI&ML)</Link>
              <Link to="/departments/cse-ds" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Computer Science and Engineering (DS)</Link>
              <Link to="/departments/eee" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Electrical & Electronics Eng.</Link>
              <Link to="/departments/ece" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Electronics & Communication Eng.</Link>
              <Link to="/departments/it" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Information Technology</Link>
              <Link to="/departments/mech" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Mechanical Engineering</Link>
              <Link to="/departments/mba" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">MBA (Hospital Administration)</Link>
              
              {/* Nested Dropdown */}
              <div className="relative group/bsh">
                <div className="flex justify-between items-center px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium cursor-pointer">
                  Basic Sciences & Humanities <ChevronRight size={14}/>
                </div>
                <div className="absolute left-full top-0 hidden group-hover/bsh:block w-56 bg-white shadow-xl border-l border-gray-100 z-50">
                  <Link to="/departments/bsh-hod" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">BS&H-HOD</Link>
                  <Link to="/departments/bsh-chemistry" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Chemistry</Link>
                  <Link to="/departments/bsh-english" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">English and Humanities</Link>
                  <Link to="/departments/bsh-maths" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Mathematics</Link>
                  <Link to="/departments/bsh-physics" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium">Physics</Link>
                </div>
              </div>
            </NavItem>
            
            <Link to="/rd" className="flex items-center text-white font-medium text-[14px] py-3 px-3 hover:text-blue-200 transition-colors">R&D</Link>
            <Link to="/iqac" className="flex items-center text-white font-medium text-[14px] py-3 px-3 hover:text-blue-200 transition-colors">IQAC</Link>
            
            <NavItem title="Woman Cell" to="/women-cell">
              <Link to="/women-cell/empowerment" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium border-b border-gray-50">Women Empowerment</Link>
              <Link to="/women-cell/grievance" className="block px-4 py-2.5 text-[13px] text-gray-700 hover:bg-[#f1f5f9] hover:text-[#173e6b] font-medium">Women Grievance & Redressal Committee</Link>
            </NavItem>
            
            <Link to="/policies" className="flex items-center text-white font-medium text-[14px] py-3 px-3 hover:text-blue-200 transition-colors">Policies</Link>
            <Link to="/library" className="flex items-center text-white font-medium text-[14px] py-3 px-3 hover:text-blue-200 transition-colors">Library</Link>
            <Link to="/training" className="flex items-center text-white font-medium text-[14px] py-3 px-3 hover:text-blue-200 transition-colors">Training</Link>
            <Link to="/placements" className="flex items-center text-white font-medium text-[14px] py-3 px-3 hover:text-blue-200 transition-colors">Placements</Link>
            <Link to="/facilities" className="flex items-center text-white font-medium text-[14px] py-3 px-3 hover:text-blue-200 transition-colors">Facilities</Link>

            <div className="ml-auto">
              {localStorage.getItem('adminToken') ? (
                <Link to="/admin/dashboard" className="text-white text-[12px] bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">Admin Panel</Link>
              ) : (
                <Link to="/admin/login" className="text-white text-[12px] bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">Admin Login</Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex justify-end w-full py-2">
            <button className="text-white" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#173e6b] border-t border-white/10 px-4 py-4 flex flex-col gap-2">
            <Link to="/about" className="text-white py-2 border-b border-white/10 font-medium">About Us</Link>
            <Link to="/admissions" className="text-white py-2 border-b border-white/10 font-medium">Admissions</Link>
            <Link to="/academics" className="text-white py-2 border-b border-white/10 font-medium">Academics</Link>
            <Link to="/departments" className="text-white py-2 border-b border-white/10 font-medium">Departments</Link>
            <Link to="/rd" className="text-white py-2 border-b border-white/10 font-medium">R&D</Link>
            <Link to="/iqac" className="text-white py-2 border-b border-white/10 font-medium">IQAC</Link>
            <Link to="/placements" className="text-white py-2 border-b border-white/10 font-medium">Placements</Link>
            <Link to="/facilities" className="text-white py-2 font-medium">Facilities</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
