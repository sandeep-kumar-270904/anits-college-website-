import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Briefcase, GraduationCap, Users, Target, BookOpen, 
  Handshake, LineChart, Award, Building, ChevronRight 
} from 'lucide-react';

const Placements = () => {
  const sidebarLinks = [
    "Objective",
    "Profile",
    "Placement Activities",
    "Placement Statistics",
    "Placement Training Content",
    "Placement Opportunities",
    "Industry Institute Interaction",
    "Contact Us",
    "Feedback"
  ];

  const services = [
    {
      title: "Campus Recruitment",
      icon: <Briefcase size={32} className="text-[#f39c12]" />,
      desc: "We invite corporate leaders to conduct campus recruitments for final year engineering graduates, matching them perfectly with quality job placements."
    },
    {
      title: "Training Programs",
      icon: <BookOpen size={32} className="text-[#f39c12]" />,
      desc: "We organize comprehensive training sessions from first year to final year in aptitude, english language skills and technical subjects to prepare students."
    },
    {
      title: "Industry Interaction",
      icon: <Users size={32} className="text-[#f39c12]" />,
      desc: "We facilitate guest lectures by industry experts and organize interaction programs to keep students updated on industry expectations."
    },
    {
      title: "Entrepreneurship Development",
      icon: <Target size={32} className="text-[#f39c12]" />,
      desc: "We encourage students towards entrepreneurship development by organizing awareness camps, EDC, and TBI activities to nurture start-up mindset."
    },
    {
      title: "Higher Education Guidance",
      icon: <GraduationCap size={32} className="text-[#f39c12]" />,
      desc: "We conduct seminars on various opportunities available for higher education and awareness on GATE, GRE and abroad."
    },
    {
      title: "Industry Collaborations",
      icon: <Handshake size={32} className="text-[#f39c12]" />,
      desc: "We establish MOU's with industries for continual support, live projects, internships, and arrange industrial tours for students."
    }
  ];

  const [dynamicStats, setDynamicStats] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const API_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}`;
      try {
        const response = await fetch(`${API_URL}/api/placements`);
        const data = await response.json();
        
        // Sort descending by year
        const sorted = data.sort((a, b) => b.year.localeCompare(a.year));
        
        // Format for UI
        const formatted = sorted.map(item => ({
          year: item.year,
          stats: [
            { label: "Total Offers", value: item.total_offers, color: "text-blue-600" },
            { label: "Highest Package", value: item.highest_package, color: "text-green-600" },
            { label: "Average Package", value: item.average_package, color: "text-orange-500" },
            { label: "Total Recruiters", value: item.total_recruiters, color: "text-red-500" }
          ]
        }));
        
        setDynamicStats(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch placement stats:", err);
        setLoading(false);
      }
    };
    
    const fetchJobs = async () => {
      const API_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}`;
      try {
        const response = await fetch(`${API_URL}/api/jobs`);
        const data = await response.json();
        setJobs(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        setJobsLoading(false);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setJobsLoading(false);
      }
    };
    
    fetchStats();
    fetchJobs();
  }, []);

  // Placeholder names for the recruiter grid to show boxes
  const recruiters = Array(35).fill("Company Logo");

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Placements | ANITS</title>
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[250px] bg-gray-900 overflow-hidden flex items-center">
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
              Placements
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Left Sidebar Menu */}
        <div className="w-full lg:w-[300px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-[80px]">
            <div className="bg-[#1f3a5f] p-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Briefcase size={20} className="text-[#f39c12]" />
                Placement Cell
              </h3>
            </div>
            <ul className="divide-y divide-gray-100">
              {sidebarLinks.map((link, index) => (
                <li key={index}>
                  <button className="w-full flex items-center justify-between p-4 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium group">
                    {link}
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-16">
          
          {/* About Department */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-[400px] lg:w-[500px] flex-shrink-0">
                <div className="rounded-xl overflow-hidden shadow-md border-4 border-white aspect-[4/3] bg-gray-100 flex items-center justify-center">
                  <img 
                    src="/images/placement-director.png" 
                    alt="Placement Director"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://ui-avatars.com/api/?name=Placement+Director&background=112a46&color=fff&size=400";
                    }}
                  />
                </div>
              </div>
              <div className="w-full md:flex-1">
                <h2 className="text-2xl font-bold text-[#112a46] mb-4 border-b-2 border-[#f39c12] inline-block pb-1">About Our Department</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                  Anil Neerukonda Institute of Technology & Sciences (ANITS) has a dedicated Training & Placement Department led by <span className="font-bold text-[#1f3a5f]">Prof. G. Padmaja</span> and supported by 15 faculty coordinators focused on maximizing student placements in both software and core engineering sectors. The department provides comprehensive Campus Recruitment Training in Quantitative Aptitude, Logical and Verbal Reasoning, English, Group Discussions, and Interview Skills catering to esteemed organizations expectations.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                  Regular feedback and student performance insights are regularly analyzed to refine training strategies. ANITS holds mock interviews, online tests, and career counseling sessions, establishing a well-rounded evaluation mechanism to help the students. We are well-equipped with AC interview rooms, GD rooms, and testing halls.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  Thanks to coordinated efforts and continuous improvement, ANITS has consistently achieved its placement record. Recognized for excellence, ANITS was ranked Top 10 Placements among Private Engineering Colleges in Andhra Pradesh by APSSDC, out of over 200 institutions, making it a top destination for aspiring engineers.
                </p>
              </div>
            </div>
          </section>

          {/* Our Services */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#112a46] mb-3">Our Services</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Comprehensive support for student career development</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center group">
                  <div className="w-16 h-16 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#112a46] mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Placement Statistics */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#112a46] mb-3">Placement Statistics</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Our track record of successful placements</p>
            </div>
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-10 text-gray-500 font-bold">Loading Statistics...</div>
              ) : dynamicStats.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">No statistics available yet.</div>
              ) : (
                dynamicStats.map((yearStat, index) => (
                  <div key={index} className="bg-[#112a46] rounded-2xl overflow-hidden shadow-md">
                    <div className="bg-[#1f3a5f] px-6 py-3 border-b border-[#2a4d7a]">
                      <h3 className="text-white font-bold tracking-wide">{yearStat.year}</h3>
                    </div>
                    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {yearStat.stats.map((stat, statIdx) => (
                        <div key={statIdx} className="bg-white rounded-xl p-4 text-center hover:scale-105 transition-transform">
                          <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-8 text-center">
              <button className="bg-[#112a46] hover:bg-[#1f3a5f] text-white font-bold py-3 px-8 rounded-full transition-colors text-sm tracking-wider shadow-md">
                VIEW DETAILED REPORT
              </button>
            </div>
          </section>

          {/* Job Board / Active Opportunities */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#112a46] mb-3">Active Opportunities</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Latest job and internship postings for our students</p>
            </div>
            
            <div className="space-y-4">
              {jobsLoading ? (
                <div className="text-center py-10 text-gray-500 font-bold">Loading Opportunities...</div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100 border-dashed">
                  <Briefcase className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500 font-medium text-lg">No active opportunities posted right now.</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                        <div className="text-[#f39c12] font-bold text-sm mb-3 uppercase tracking-wider">{job.company}</div>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-800">Role:</span> {job.role}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-800">Salary:</span> {job.salary}
                          </div>
                          <div className="flex items-center gap-2 text-red-600">
                            <span className="font-bold">Deadline:</span> {job.deadline}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center md:justify-end">
                      {job.link ? (
                        <a href={job.link} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm">
                          Apply Now
                        </a>
                      ) : (
                        <div className="w-full md:w-auto text-center bg-gray-100 text-gray-500 font-bold py-3 px-8 rounded-xl">
                          Check Emails
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Our Recruiters */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#112a46] mb-3">Our Recruiters</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Proud to be associated with top companies</p>
            </div>
            <div className="flex justify-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <img 
                src="/images/recruiters-grid.png" 
                alt="Our Recruiters"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/1200x600/f8fafc/94a3b8?text=Upload+recruiters-grid.png";
                }}
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Placements;
