import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Users, Globe } from 'lucide-react';

const Team = () => {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'PRINCIPAL', 'DIRECTOR', 'DEANS', 'HODS'];

  const teamData = [
    {
      id: 1,
      name: "Dr. V. Rajyalakshmi",
      qualifications: "B.E., M.E., Ph.D., MISTE, FIETE, SMIEEE",
      role: "Professor",
      department: "Department of ECE",
      badge: "PRINCIPAL",
      category: "PRINCIPAL",
      color: "bg-purple-500",
      borderColor: "border-purple-500"
    },
    {
      id: 2,
      name: "Prof. T.V. Hanumantha Rao",
      qualifications: "M.Tech., Ph.D. (AU)",
      role: "Professor",
      department: "Department of Mechanical Engineering",
      badge: "DIRECTOR - IQAC",
      category: "DIRECTOR",
      color: "bg-blue-500",
      borderColor: "border-blue-500"
    },
    {
      id: 3,
      name: "Prof. K. Raja Rao",
      qualifications: "Ph.D., M.Tech., B.Tech.",
      role: "Professor",
      department: "Department of EEE",
      badge: "DEAN - ACADEMICS",
      category: "DEANS",
      color: "bg-teal-500",
      borderColor: "border-teal-500"
    },
    {
      id: 4,
      name: "Dr. G. Srinivas",
      qualifications: "M.Tech., Ph.D.",
      role: "Professor",
      department: "Department of ECE",
      badge: "HEAD - ECE",
      category: "HODS",
      color: "bg-blue-400",
      borderColor: "border-blue-400"
    },
    {
      id: 5,
      name: "Prof. N.V.N. Indra Kiran",
      qualifications: "M.Tech., Ph.D.",
      role: "Professor",
      department: "Department of Mechanical Engineering",
      badge: "DEAN - EXAMS",
      category: "DEANS",
      color: "bg-blue-600",
      borderColor: "border-blue-600"
    },
    {
      id: 6,
      name: "Prof. R. Sivaranjani",
      qualifications: "M.Tech., Ph.D.",
      role: "Professor",
      department: "Department of CSE",
      badge: "DEAN - R & D",
      category: "DEANS",
      color: "bg-purple-600",
      borderColor: "border-purple-600"
    },
    {
      id: 7,
      name: "Prof. B.N.D. Narasinga Rao",
      qualifications: "M.Tech., Ph.D., FIE",
      role: "Professor",
      department: "Department of Civil Engineering",
      badge: "HEAD OF CIVIL DEPT",
      category: "HODS",
      color: "bg-indigo-400",
      borderColor: "border-indigo-400"
    },
    {
      id: 8,
      name: "Prof. P. Padmaja",
      qualifications: "M.Tech., Ph.D., M.I.E.",
      role: "Professor",
      department: "Department of CSE",
      badge: "HEAD - CSE DEPT",
      category: "HODS",
      color: "bg-pink-500",
      borderColor: "border-pink-500"
    },
    {
      id: 9,
      name: "Dr. K. Selvani Deepthi",
      qualifications: "M.Tech., Ph.D.",
      role: "Professor",
      department: "Department of AI & ML",
      badge: "HOD OF AI AND ML",
      category: "HODS",
      color: "bg-blue-500",
      borderColor: "border-blue-500"
    },
    {
      id: 10,
      name: "Prof. Adinarayana Salina",
      qualifications: "M.E., Ph.D.",
      role: "Professor",
      department: "Department of CSE",
      badge: "PROFESSOR",
      category: "HODS",
      color: "bg-purple-500",
      borderColor: "border-purple-500"
    },
    {
      id: 11,
      name: "Dr Mantripragada Rekha Sundari",
      qualifications: "M.Tech., Ph.D.",
      role: "Professor",
      department: "Department of IT",
      badge: "HOD OF IT",
      category: "HODS",
      color: "bg-indigo-500",
      borderColor: "border-indigo-500"
    },
    {
      id: 12,
      name: "Dr. Srikanth Rachakonda",
      qualifications: "M.Tech., Ph.D.",
      role: "Professor",
      department: "Department of Mechanical Engineering",
      badge: "PROFESSOR",
      category: "HODS",
      color: "bg-teal-600",
      borderColor: "border-teal-600"
    },
    {
      id: 13,
      name: "Dr. J. Vikranth",
      qualifications: "B.E., M.E., Ph.D. (Structures)",
      role: "Professor",
      department: "Department of Civil Engineering",
      badge: "ASST HEAD CIVIL ENG",
      category: "HODS",
      color: "bg-blue-500",
      borderColor: "border-blue-500"
    },
    {
      id: 14,
      name: "Dr. G. Jagadeesh",
      qualifications: "B.E., M.E., Ph.D., MISTE, IETE",
      role: "Professor",
      department: "Department of ECE",
      badge: "ASST DEAN",
      category: "DEANS",
      color: "bg-purple-500",
      borderColor: "border-purple-500"
    },
    {
      id: 15,
      name: "Dr. A. Vijaya Kumar",
      qualifications: "B.E., M.Tech., Ph.D. (IT)",
      role: "Professor",
      department: "Department of EEE",
      badge: "ASST DEAN",
      category: "DEANS",
      color: "bg-indigo-600",
      borderColor: "border-indigo-600"
    },
    {
      id: 16,
      name: "Dr. K. Naga Raju",
      qualifications: "B.E., M.Tech., Ph.D., M.I.E., FIETE",
      role: "Professor",
      department: "Department of Mechanical Engineering",
      badge: "ASST HEAD MECH ENG",
      category: "HODS",
      color: "bg-blue-600",
      borderColor: "border-blue-600"
    },
    {
      id: 17,
      name: "Dr. M. Kalyana Chakravarthy",
      qualifications: "M.Sc. (Physics), Ph.D.",
      role: "Associate Professor",
      department: "Department of Chemistry",
      badge: "ASST HEAD",
      category: "HODS",
      color: "bg-purple-600",
      borderColor: "border-purple-600"
    },
    {
      id: 18,
      name: "Dr. V. Bindu Neeharika",
      qualifications: "M.Sc., Ph.D.",
      role: "Associate Professor",
      department: "Department of Mathematics",
      badge: "ASST DEAN",
      category: "DEANS",
      color: "bg-indigo-500",
      borderColor: "border-indigo-500"
    }
  ];

  const filteredTeam = filter === 'ALL' ? teamData : teamData.filter(member => member.category === filter);

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gradient-to-b from-[#2a4565] via-[#356d9d] to-[#188cc5]">
      <Helmet>
        <title>Our Leadership Team | ANITS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header & Filters */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-wide drop-shadow-md">
            Our Leadership Team
          </h1>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-200 text-[#0f4471] shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {filteredTeam.map((member) => (
            <div 
              key={member.id} 
              className={`bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-xl border-t-8 ${member.borderColor} hover:-translate-y-2 transition-transform duration-300`}
            >
              {/* Profile Image */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-50 shadow-md mb-5 bg-white">
                <img 
                  src={`/images/${member.name}.png`}
                  alt={member.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    // Fallback to a generic user silhouette or placeholder if the image is missing
                    e.target.onerror = null; 
                    e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=0D8ABC&color=fff&size=150'; 
                  }}
                />
              </div>

              {/* Badge */}
              <div className={`${member.color} text-white text-xs font-bold px-4 py-1 rounded-full mb-4 uppercase tracking-wider shadow-sm`}>
                {member.badge}
              </div>

              {/* Info */}
              <h3 className="text-xl font-extrabold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-xs text-gray-500 font-bold mb-4">{member.qualifications}</p>
              
              <div className="w-full h-[1px] bg-gray-100 my-4"></div>

              <p className="font-bold text-gray-700">{member.role}</p>
              <p className="text-sm text-gray-500 mt-1">{member.department}</p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-6">
                <button className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                  <Mail size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors">
                  <Users size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                  <Globe size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Team;
