import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, 
  Zap, 
  Laptop, 
  Database, 
  Settings, 
  FlaskConical, 
  HardHat, 
  Calculator, 
  Atom, 
  Beaker, 
  BookOpen 
} from 'lucide-react';

const Research = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'Publications') {
      setLoading(true);
      const fetchPublications = async () => {
        const API_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}`;
        try {
          const response = await fetch(`${API_URL}/api/research`);
          const data = await response.json();
          // Sort descending by year
          setPublications(data.sort((a, b) => b.year.localeCompare(a.year)));
        } catch (err) {
          console.error("Failed to fetch publications:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchPublications();
    }
  }, [activeTab]);

  const tabs = [
    'Profile',
    'Research and Development Policy',
    'Research Committee',
    'Facilities',
    'Research Advisory Board',
    'Faculty Pursuing Ph.D',
    'Faculty Recognized as Ph.D. Guide',
    'Faculty Research Grants',
    'Publications',
    'Seed Money',
    'Institutional Ethics Policy',
    'Patents',
    'IEDC',
    'MoUs',
    'Gallery'
  ];

  const disciplines = [
    { icon: <Cpu size={32} className="text-[#3a86ff] mb-4" />, name: 'Electronics & Communication Engineering' },
    { icon: <Zap size={32} className="text-[#3a86ff] mb-4" />, name: 'Electrical & Electronics Engineering' },
    { icon: <Laptop size={32} className="text-[#3a86ff] mb-4" />, name: 'Computer Science & Engineering' },
    { icon: <Database size={32} className="text-[#3a86ff] mb-4" />, name: 'Information Technology' },
    { icon: <Settings size={32} className="text-[#3a86ff] mb-4" />, name: 'Mechanical Engineering' },
    { icon: <FlaskConical size={32} className="text-[#3a86ff] mb-4" />, name: 'Chemical Engineering' },
    { icon: <HardHat size={32} className="text-[#3a86ff] mb-4" />, name: 'Civil Engineering' },
    { icon: <Calculator size={32} className="text-[#3a86ff] mb-4" />, name: 'Mathematics' },
    { icon: <Atom size={32} className="text-[#3a86ff] mb-4" />, name: 'Physics' },
    { icon: <Beaker size={32} className="text-[#3a86ff] mb-4" />, name: 'Chemistry' },
    { icon: <BookOpen size={32} className="text-[#3a86ff] mb-4" />, name: 'English' }
  ];

  return (
    <div className="font-sans pt-[80px] min-h-screen bg-white pb-12">
      <Helmet>
        <title>Research & Development | ANITS</title>
      </Helmet>

      {/* Hero Banner Area */}
      <div className="relative w-full h-[250px] bg-gray-200">
        <img 
          src="/images/campus/campus-gate.jpg" 
          alt="ANITS Campus" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 bg-black/20 hidden items-center justify-center">
          <div className="text-white/50 font-bold text-2xl tracking-widest">ANITS CAMPUS</div>
        </div>
        
        <div className="absolute top-1/2 left-10 md:left-20 -translate-y-1/2 bg-white px-8 py-4 shadow-lg border-l-4 border-[#2a5682]">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2a5682] uppercase">Research and Development Cell</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row mt-8 px-4 md:px-0">
        
        {/* Left Sidebar Menu */}
        <div className="w-full md:w-1/4 flex-shrink-0 mb-8 md:mb-0">
          <div className="flex flex-col bg-gray-100 rounded-sm overflow-hidden shadow-sm border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-5 py-3 text-xs sm:text-sm transition-all border-b border-white last:border-0 ${
                  activeTab === tab 
                    ? 'bg-gray-200 text-[#2a5682] font-bold border-l-4 border-l-[#2a5682]' 
                    : 'bg-[#f1f1f1] text-gray-700 hover:bg-gray-200 font-medium'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4 md:pl-8 flex flex-col text-sm md:text-base text-gray-700 leading-relaxed">
          {activeTab === 'Profile' ? (
            <div className="flex flex-col gap-6">
              
              <p>
                Research is the backbone of academics. It simplifies concept building and transforms new ideas into innovations in pursuance of a new era of passion for researches. Each finding gives immense pleasure and multiplies enthusiasm towards achieving target.
              </p>

              <p>
                The Research and Development Cell aims to nurture research culture in the College by promoting research in newly emerging and challenging areas of Engineering, Technology, Science and Humanities. It encourages the students and faculty to undertake the research in newly emerging frontier areas of Engineering, Technology, Science and Humanities fields including multidisciplinary fields. This enhances the general research capability of budding technocrats by way of participating in conferences, seminars, workshops, project competition, etc.
              </p>

              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-base md:text-lg">The Research and Development Cell is functioning with the following objectives:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To create awareness and opportunities in Research and Development among the students & faculty and to create Research and Development atmosphere in every department;</li>
                  <li>To create interest and atmosphere among the staff members to take up Research projects and improve their knowledge, skills and qualifications by registering Ph.D's;</li>
                  <li>To motivate the faculty members of the group for R&D activities in the area of their specialization;</li>
                  <li>To encourage staff members and students to publish technical papers for publishing in National and reputed International Conferences/Journals;</li>
                  <li>To encourage faculty members of all the disciplines in Engineering/Science/Humanities in R&D activities for their professional growth;</li>
                  <li>To undertake research activities and development projects offered by agencies such as ISRO, DRDO, CSIR, DST, AICTE, UGC, DBT, INFOSYS etc.</li>
                  <li>To assist the students to apply funding for conducting research under student project scheme to various funding agencies like TNSCST, IE(I), DRDO, TCS, Infosys etc.;</li>
                  <li>To assist for applying and getting funds for conducting Seminar/Workshop/FDP from various available funding agencies;</li>
                  <li>To facilitate the growth of research activity among the academic community, including developing mechanisms and targets to achieve this;</li>
                  <li>To develop and coordinate strategies for maximizing the faculty's success in gaining external research funding;</li>
                  <li>To maintain and disseminate current information about relevant research policy areas and initiatives in government, in the professions and in relevant industries, including external funding opportunities;</li>
                  <li>To develop strategies to foster research collaborations within the faculty, across faculty and institutes, and with agencies outside the college;</li>
                  <li>To work with various departments to establish and develop faculty research priorities on interdisciplinary areas;</li>
                  <li>To interact with industry, government, professions and the wider community on all research matters, promote faculty research activities to external stakeholders;</li>
                  <li>To coordinate faculty level workshops and staff development activities on research related issues;</li>
                  <li>To encourage development of activities to attract the best research oriented higher degree students;</li>
                  <li>To maintain effective links with government departments, authorities, business, and commerce and industry organizations relevant to the college research activities.</li>
                </ul>
              </div>

              <p>
                In order to promote research and development activities, the college extends its full support to student/faculty/staff. Full/Partial financial support is given to all innovative research & development works taken up by the students, faculty and staff members. The college encourages students, faculty and staff to participate in National/International Conferences, Training programmes, Tech-Festivals organized by reputed institutes (IITs/NITs/State Engg. Colleges etc.) by giving full/partial financial support viz. course/registration fee, TA/DA etc.
              </p>

              <p className="font-bold text-gray-900 text-base md:text-lg mt-4">
                The Research and Development cell of the College is working on the following research disciplines.
              </p>

              <div className="mt-8">
                <h2 className="text-[#333] text-2xl font-bold text-center mb-10">Research Disciplines</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 text-center">
                  {disciplines.map((discipline, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-pointer">
                      <div className="transform transition-transform group-hover:scale-110 duration-300">
                        {discipline.icon}
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 mb-2 max-w-[200px]">{discipline.name}</h4>
                      <button 
                        onClick={() => setActiveTab('Publications')}
                        className="text-xs text-gray-500 hover:text-[#3a86ff] transition-colors border-b border-transparent hover:border-[#3a86ff]"
                      >
                        View Publications
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : activeTab === 'Publications' ? (
            <div className="bg-white p-8 border border-gray-200 shadow-sm mx-4 md:mx-0">
              <h2 className="text-[#2a5682] text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen size={24} /> Publications
              </h2>
              {loading ? (
                <div className="text-center py-10 text-gray-500 font-medium">Loading publications...</div>
              ) : publications.length === 0 ? (
                <div className="text-center py-10 text-gray-500 font-medium border border-dashed border-gray-300 rounded-xl">No publications available yet.</div>
              ) : (
                <div className="space-y-6">
                  {publications.map((pub, idx) => (
                    <div key={pub.id || idx} className="border border-gray-100 p-5 rounded-xl hover:shadow-md transition-shadow bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[#112a46] text-lg leading-tight pr-4">{pub.title}</h3>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">{pub.year}</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-3"><span className="font-semibold">Authors:</span> {pub.authors}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                        <p className="text-gray-600 mb-2 sm:mb-0"><span className="font-semibold">Journal/Conference:</span> {pub.journal}</p>
                        {pub.link && (
                          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium underline">
                            View Paper
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 border border-gray-200 shadow-sm mx-4 md:mx-0">
              <h2 className="text-[#2a5682] text-xl font-bold mb-4">{activeTab}</h2>
              <p className="text-gray-600">Update in Progress.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Research;
