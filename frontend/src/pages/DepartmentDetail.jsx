import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Plus, Minus, ChevronLeft } from 'lucide-react';
import { departmentData, standardPOs } from '../data/departmentData';

const DepartmentDetail = () => {
  const { id } = useParams();
  const dept = departmentData[id] || departmentData['it']; // fallback to IT
  const [expandedMenus, setExpandedMenus] = useState(['Department Profile']);

  // Sidebar Menu Structure
  const sidebarMenus = [
    { 
      name: 'Department Profile', 
      hasSubs: true,
      subs: ['About Us', 'Vision & Mission', 'Message from HOD', 'PEOs, PSOs & POs', 'Board of Studies'] 
    },
    { name: 'Academics', hasSubs: true, subs: ['Syllabus', 'Timetable'] },
    { name: 'R&D', hasSubs: true, subs: ['Publications', 'Patents'] },
    { name: 'Student Activities', hasSubs: true, subs: ['Clubs', 'Events'] },
    { name: 'Placements', hasSubs: true, subs: ['Statistics', 'Recruiters'] },
    { name: 'Infrastructure & Facilities', hasSubs: true, subs: ['Labs', 'Classrooms'] },
    { name: 'Student Welfare', hasSubs: true, subs: ['Counseling', 'Grievance'] },
    { name: 'Self Learning', hasSubs: false },
    { name: 'Career Guidance', hasSubs: false },
    { name: 'Alumni', hasSubs: true, subs: ['Alumni Directory', 'Events'] },
    { name: 'Faculty', hasSubs: false },
    { name: 'Feedback', hasSubs: false },
    { name: 'Best Practices & Innovations', hasSubs: false },
    { name: 'Photo Gallery', hasSubs: false },
    { name: 'Contact', hasSubs: false },
  ];

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(item => item !== menuName)
        : [...prev, menuName]
    );
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -150; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <div className="font-sans min-h-screen bg-[#f8f9fa] pt-[80px]">
      <Helmet>
        <title>{dept.name} | ANITS</title>
      </Helmet>

      {/* Blue Top Nav Bar */}
      <div className="w-full bg-[#e6f0fa] border-b border-[#c4d9f2] py-3 px-4 md:px-12 flex justify-between items-center sticky top-[80px] z-30 shadow-sm">
        <h2 className="text-[#1e3a8a] font-bold text-lg md:text-xl uppercase">{dept.name}</h2>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
          Explore {dept.shortName} <ChevronDown size={16} />
        </button>
      </div>

      {/* Main Banner / Carousel */}
      {dept.topBanner ? (
        <div className="w-full h-[200px] md:h-[300px] bg-[#1e3a8a] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <div className="z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-widest text-[#fdb813] drop-shadow-md mb-2">{dept.topBanner}</h1>
            <p className="text-lg md:text-xl font-medium tracking-wide">ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY & SCIENCES</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-[250px] md:h-[450px] bg-gray-300 relative group overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/30">
            <span className="text-white font-bold text-xl md:text-3xl tracking-wider">[ CAROUSEL PLACEHOLDER ]</span>
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/40 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/60"><ChevronLeft /></div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/40 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/60"><ChevronRight /></div>
        </div>
      )}

      {/* Horizontal Quick Links Pill Menu */}
      <div className="w-full bg-white shadow-sm border-b border-gray-100 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-4 px-4 py-4 min-w-max">
          <button onClick={() => scrollToSection('hod')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Message from HoD</button>
          <button onClick={() => scrollToSection('overview')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Overview</button>
          {dept.peos !== null && <button onClick={() => scrollToSection('peos')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">PEOs, PSOs & POs</button>}
          {dept.programs?.length > 0 && <button onClick={() => scrollToSection('programs')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Programs Offered</button>}
          <button onClick={() => scrollToSection('history')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">History</button>
          <button onClick={() => scrollToSection('highlights')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Highlights</button>
          {dept.hasGallery !== false && <button onClick={() => scrollToSection('gallery')} className="px-5 py-2 rounded-full border border-blue-200 text-blue-800 bg-blue-50 text-sm font-semibold hover:bg-blue-100 transition-colors">Gallery</button>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row mt-8 px-4 pb-16 gap-8">
        
        {/* Left Sidebar (Accordion) */}
        <div className="w-full md:w-1/4 flex-shrink-0">
          <div className="bg-[#f1f5f9] rounded-sm overflow-hidden border border-gray-200 shadow-sm md:sticky md:top-[160px]">
            {sidebarMenus.map((menu, idx) => {
              const isExpanded = expandedMenus.includes(menu.name);
              return (
                <div key={idx} className="border-b border-white last:border-b-0">
                  <button 
                    onClick={() => menu.hasSubs && toggleMenu(menu.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${isExpanded && menu.hasSubs ? 'bg-[#1e3a8a] text-white' : 'bg-[#e2e8f0] text-gray-800 hover:bg-[#cbd5e1]'}`}
                  >
                    <span>{menu.name}</span>
                    {menu.hasSubs && (
                      <span className={`p-1 rounded ${isExpanded ? 'bg-white/20' : 'bg-white'}`}>
                        {isExpanded ? <Minus size={14} className={isExpanded ? 'text-white' : 'text-[#1e3a8a]'} /> : <Plus size={14} className="text-[#1e3a8a]" />}
                      </span>
                    )}
                  </button>
                  
                  {isExpanded && menu.hasSubs && menu.subs && (
                    <div className="bg-white px-4 py-2 flex flex-col">
                      {menu.subs.map((subItem, sIdx) => (
                        <Link key={sIdx} to="#" className={`text-sm text-gray-600 py-2 border-b border-gray-100 hover:text-blue-600 transition-colors pl-2 flex items-center gap-2 ${sIdx === menu.subs.length - 1 ? 'border-b-0' : ''}`}>
                          <ChevronRight size={14}/> {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="w-full md:w-3/4 flex flex-col gap-12">
          
          {/* HOD Section */}
          <section id="hod">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Message from Head of Department</h2>
            <div className="bg-white p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4 flex flex-col items-center flex-shrink-0">
                <div className="w-40 h-48 bg-gray-200 mb-4 object-cover overflow-hidden border border-gray-300">
                   <img 
                    src={`/images/${dept.hodName.replace(/[^a-zA-Z0-9]/g, '_')}.png`} 
                    alt={dept.hodName} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                   />
                </div>
                <h4 className="font-bold text-gray-900 text-center text-sm">{dept.hodName}</h4>
                <p className="text-gray-500 text-xs text-center mt-1 font-medium">{dept.hodTitle}</p>
                <p className="text-gray-500 text-xs text-center">{dept.hodRole}</p>
              </div>
              <div className="w-full md:w-3/4 flex flex-col justify-center">
                <p className="text-gray-600 text-sm leading-relaxed text-justify mb-4">
                  {dept.hodMessage}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed text-justify font-medium italic text-[#1e3a8a]">
                  "Wishing you all a successful and rewarding journey ahead!"
                </p>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section id="overview">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Department Overview</h2>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3 bg-white shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-3 border-l-4 border-yellow-400 pl-3">Vision</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{dept.vision}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-3 border-l-4 border-yellow-400 pl-3">Mission</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {dept.mission.map((m, i) => (
                      <li key={i} className="text-gray-600 text-sm leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <div className="bg-white shadow-sm border border-gray-100 p-5 border-l-4 border-l-blue-600">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm">Quick Facts / Admissions</h4>
                  <ul className="space-y-2">
                    <li className="text-xs text-gray-600 flex items-center gap-2"><ChevronRight size={12} className="text-blue-500"/> Intake: {dept.admissions.btech}</li>
                    <li className="text-xs text-gray-600 flex items-center gap-2"><ChevronRight size={12} className="text-blue-500"/> Faculty Strength: {dept.admissions.facultyStrength}</li>
                  </ul>
                </div>
                <div className="bg-white shadow-sm border border-gray-100 p-5 border-l-4 border-l-blue-600">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm">Accreditations</h4>
                  <ul className="space-y-2">
                    <li className="text-xs text-gray-600 flex items-center gap-2"><ChevronRight size={12} className="text-blue-500"/> NBA Accredited</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conditional PEOs Section */}
          {dept.peos !== null && (
            <section id="peos">
              <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Department PEOs, PSOs and POs</h2>
              
              {typeof dept.peos === 'string' ? (
                <div className="bg-white shadow-sm border border-gray-100 p-6 border-l-4 border-l-yellow-400">
                  <p className="text-gray-600 font-medium">{dept.peos}</p>
                </div>
              ) : (
                <div className="bg-white shadow-sm border border-gray-100 p-6 border-l-4 border-l-yellow-400 overflow-x-auto">
                  
                  {dept.peos.type === 'table' ? (
                    <div className="flex flex-col gap-8">
                      {/* PEOs Table format */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4 bg-gray-100 p-2 text-sm">PROGRAM EDUCATIONAL OBJECTIVES (PEOs)</h3>
                        <table className="w-full border-collapse text-sm text-gray-600">
                          <tbody>
                            {['PEO 1', 'PEO 2', 'PEO 3'].map((peo, i) => (
                              <tr key={i} className="border-b border-gray-100 last:border-b-0">
                                <td className="p-3 font-bold text-gray-800 align-top w-20 bg-gray-50">{peo}</td>
                                <td className="p-3">To produce graduates with a strong foundation and equip them with the skills to design and solve complex problems.</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* POs Table format */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4 bg-gray-100 p-2 text-sm">PROGRAM OUTCOMES (POs)</h3>
                        <table className="w-full border-collapse text-sm text-gray-600">
                          <tbody>
                            {standardPOs.map((po) => (
                              <tr key={po.id} className="border-b border-gray-100 last:border-b-0">
                                <td className="p-3 font-bold text-gray-800 align-top w-20 bg-gray-50">{po.id}</td>
                                <td className="p-3">{po.text}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* PSOs Table format */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4 bg-gray-100 p-2 text-sm">PROGRAM SPECIFIC OUTCOMES (PSOs)</h3>
                        <table className="w-full border-collapse text-sm text-gray-600">
                          <tbody>
                            {['PSO 1', 'PSO 2'].map((pso, i) => (
                              <tr key={i} className="border-b border-gray-100 last:border-b-0">
                                <td className="p-3 font-bold text-gray-800 align-top w-20 bg-gray-50">{pso}</td>
                                <td className="p-3">Apply modern tools, programming languages, and frameworks to develop efficient solutions for real-world applications.</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8">
                      {/* List Format (Civil) */}
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3 text-sm">Program Educational Objectives (PEOs)</h3>
                        <ul className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                          <li>To produce graduates with a strong foundation in basic sciences and engineering.</li>
                          <li>To equip students with the skills to design, develop, and solve complex problems in their respective fields.</li>
                          <li>To instill professional ethics, teamwork, and leadership qualities for successful careers and continuous learning.</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3 text-sm">Program Outcomes (POs)</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                          {standardPOs.map((po, idx) => (
                            <li key={po.id}><strong>{idx + 1}. {po.title}:</strong> {po.text}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3 text-sm">Program Specific Outcomes (PSOs)</h3>
                        <ul className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                          <li>Apply modern tools, programming languages, and frameworks to develop efficient solutions.</li>
                          <li>Design and implement scalable architectures that meet industry standards.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Conditional Programs Section */}
          {dept.programs?.length > 0 && (
            <section id="programs">
              <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Programs Offered</h2>
              <div className="bg-white shadow-sm border border-gray-100 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fa] border-b border-gray-200">
                      <th className="p-4 text-sm font-bold text-[#1e3a8a]">S.No</th>
                      <th className="p-4 text-sm font-bold text-[#1e3a8a]">Level</th>
                      <th className="p-4 text-sm font-bold text-[#1e3a8a]">Program Name</th>
                      <th className="p-4 text-sm font-bold text-[#1e3a8a]">Duration</th>
                      <th className="p-4 text-sm font-bold text-[#1e3a8a]">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dept.programs.map((prog, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm text-gray-700">{i + 1}</td>
                        <td className="p-4 text-sm text-gray-700 font-medium">{prog.level}</td>
                        <td className="p-4 text-sm text-gray-700">{prog.name}</td>
                        <td className="p-4 text-sm text-gray-700">{prog.duration}</td>
                        <td className="p-4 text-sm text-gray-700">{prog.intake}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Department History Section */}
          <section id="history">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Department History</h2>
            <div className="bg-white shadow-sm border border-gray-100 p-8">
              <div className="relative border-l-2 border-[#1e3a8a] ml-3">
                {dept.history.map((event, i) => (
                  <div key={i} className="mb-8 ml-6 relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#fdb813] border-4 border-white shadow-sm"></div>
                    <h4 className="text-[#1e3a8a] font-bold text-sm mb-1">{event.year}</h4>
                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded border border-gray-100">{event.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Department Highlights */}
          <section id="highlights" className="scroll-mt-[150px]">
            <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200">Department Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dept.highlights.map((highlight, i) => (
                <div key={i} className="bg-white shadow-sm border border-gray-100 p-6 border-t-4 border-t-[#fdb813] hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-[#1e3a8a] mb-2 text-sm">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {highlight.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Conditional Gallery Section */}
          {dept.hasGallery !== false && (
            <section id="gallery">
              <h2 className="text-[#1e3a8a] text-2xl font-bold mb-6 pb-2 border-b border-gray-200 text-center">Department Gallery</h2>
              <div className="w-full bg-[#f8f9fa] py-8 border border-gray-100 shadow-sm flex items-center justify-center relative group overflow-hidden">
                <div className="w-4/5 h-[300px] md:h-[400px] bg-gray-200 relative flex items-center justify-center border border-gray-300">
                   <span className="text-gray-500 font-bold tracking-widest text-lg">[ GALLERY PLACEHOLDER ]</span>
                </div>
                <div className="absolute left-6 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/40"><ChevronLeft /></div>
                <div className="absolute right-6 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/40"><ChevronRight /></div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
