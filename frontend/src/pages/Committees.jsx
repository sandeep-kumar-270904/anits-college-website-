import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight, ChevronDown } from 'lucide-react';

const Committees = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const committeesData = [
    { id: 'iqac', name: 'IQAC Committee', category: 'ADMINISTRATIVE', member: 'Prof. T.V. Hanumantha Rao', role: 'Director, IQAC', imageId: 'prof-tv-hanumantha-rao' },
    { id: 'rd', name: 'R & D Committee', category: 'ACADEMIC', member: 'Prof. R. Sivaranjani', role: 'Dean, Research & Development', imageId: 'prof-r-sivaranjani' },
    { id: 'anti-ragging', name: 'Anti-Ragging Committee', category: 'ADMINISTRATIVE', member: 'Prof. B.N.D. Narasinga Rao', role: 'Convener, Anti-ragging Committee', imageId: 'prof-bnd-narasinga-rao' },
    { id: 'grievance', name: 'Grievance and Redressal Committee', category: 'ADMINISTRATIVE', member: 'Prof. G. Nagaraju', role: 'Convener, Grievance and Redressal Committee', imageId: 'prof-g-nagaraju' },
    { id: 'placement', name: 'Placement Committee', category: 'STUDENT AFFAIRS', member: 'Prof. G. Manmadha Rao', role: 'Dean - Placements & Corporate Relations', imageId: 'prof-g-manmadha-rao' },
    { id: 'women-grievance', name: 'Women Grievance & Redressal Committee', category: 'ADMINISTRATIVE', member: 'Dr. V. Sri Devi', role: 'Chairperson, Women Grievance & Redressal Committee', imageId: 'dr-v-sri-devi' },
    { id: 'library', name: 'Library Committee', category: 'ACADEMIC', member: 'Dr. S. Suresh', role: 'Convener, Library Committee', imageId: 'dr-s-suresh' },
    { id: 'iic', name: 'Institution Innovation Council', category: 'ACADEMIC', member: 'Dr. P. Murugapandiyan', role: 'Convener, Institution Innovation Council', imageId: 'dr-p-murugapandiyan' },
    { id: 'exam', name: 'Examination Committee', category: 'ADMINISTRATIVE', member: 'Prof. N.V.N. Indra Kiran', role: 'Dean Exams', imageId: 'prof-nvn-indra-kiran' },
    { id: 'scst', name: 'SC / ST Committee', category: 'ADMINISTRATIVE', member: 'Dr. Srikanth Rachakonda', role: 'Convener, SC / ST Committee', imageId: 'dr-srikanth-rachakonda' },
    { id: 'alumni', name: 'Alumni Committee', category: 'STUDENT AFFAIRS', member: 'Mr. Baddi Prasad', role: 'Convener, Alumni Committee', imageId: 'mr-baddi-prasad' },
    { id: 'publication', name: 'Publication Committee', category: 'ACADEMIC', member: 'Dr. M.V. Chakravarthy', role: 'Chairman, Publication Committee', imageId: 'dr-mv-chakravarthy' },
    { id: 'amenities', name: 'Amenities Committee', category: 'ADMINISTRATIVE', member: 'Dr. A. Ramesh Babu', role: 'Convener, Amenities Committee', imageId: 'dr-a-ramesh-babu' },
    { id: 'attendance', name: 'Attendance Committee', category: 'ACADEMIC', member: 'Mrs. M. Nirmala', role: 'Convener, Attendance Committee', imageId: 'mrs-m-nirmala' },
    { id: 'icc', name: 'Internal Complaint Committee', category: 'ADMINISTRATIVE', member: 'Dr. V. Sri Devi', role: 'Chairperson, Internal Complaint Committee', imageId: 'dr-v-sri-devi' },
    { id: 'transport', name: 'Transport Committee', category: 'ADMINISTRATIVE', member: 'Dr. K. Siva Prasad', role: 'Convener, Transport Committee', imageId: 'dr-k-siva-prasad' },
    { id: 'nba', name: 'NBA Committee', category: 'ACADEMIC', member: 'Dr. T. Vidyavathi', role: 'Central Coordinator, NBA Committee', imageId: 'dr-t-vidyavathi' },
    { id: 'industry', name: 'Institution-Industry Cell', category: 'ACADEMIC', member: 'Dr. P. Satish', role: 'Coordinator, Institution - Industry Cell', imageId: 'dr-p-satish' },
    { id: 'editorial', name: 'Editorial Committee', category: 'ACADEMIC', member: 'Dr. P. Suresh Kumar', role: 'Convener, Editorial Committee', imageId: 'dr-p-suresh-kumar' },
    { id: 'sports', name: 'Sports Committee', category: 'STUDENT AFFAIRS', member: 'Dr. N. V. Subba Rao', role: 'Convener, Sports Committee', imageId: 'dr-nv-subba-rao' },
    { id: 'elearning', name: 'E-Learning Committee', category: 'ACADEMIC', member: 'Dr. Jana Bhaskaranada', role: 'Convener, E-Learning Committee', imageId: 'dr-jana-bhaskaranada' },
    { id: 'hostel-boys', name: 'Hostel & Mess Committee (Boys)', category: 'ADMINISTRATIVE', member: 'Dr. Ramesh Babu Bajjuri', role: 'Convener, Hostel & Mess Committee (Boys)', imageId: 'dr-ramesh-babu-bajjuri' },
    { id: 'hostel-girls', name: 'Hostel & Mess Committee (Girls)', category: 'ADMINISTRATIVE', member: 'Dr. V. Jyothi', role: 'Convener, Hostel & Mess Committee (Girls)', imageId: 'dr-v-jyothi' }
  ];

  const filteredCommittees = committeesData.filter(committee => 
    committee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    committee.member.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50/50">
      <Helmet>
        <title>Our Committees | ANITS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#112a46] relative inline-block">
              Our Committees
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#facc15] rounded-full"></span>
            </h1>
          </div>
          
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search committee..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredCommittees.map((committee) => (
            <div 
              key={committee.id} 
              className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden hover:shadow-[0_8px_20px_-6px_rgba(6,81,237,0.15)] transition-all duration-300 flex flex-col h-full group"
            >
              {/* Card Header */}
              <div className="bg-[#1f3a5f] text-white px-5 py-3 flex justify-between items-center">
                <h3 className="font-bold text-sm tracking-wide">{committee.name}</h3>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-white/10 rounded border border-white/20 tracking-wider">
                  {committee.category}
                </span>
              </div>
              
              {/* Card Body */}
              <div className="p-6 flex flex-col items-center text-center flex-grow">
                {/* Profile Picture */}
                <div className="w-16 h-16 bg-gray-100 rounded mb-4 overflow-hidden shadow-sm border border-gray-200">
                  <img 
                    src={`/images/${committee.member}.png`}
                    alt={committee.member} 
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(committee.member) + '&background=0D8ABC&color=fff&size=100'; 
                    }}
                  />
                </div>
                
                {/* Member Info */}
                <p className="font-bold text-gray-900 text-sm">{committee.member}</p>
                <p className="text-xs text-blue-600/80 font-medium mt-1 mb-6 px-4">{committee.role}</p>
                
                {/* View Details Button */}
                <button className="mt-auto flex items-center justify-center gap-1.5 w-full md:w-auto px-5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold rounded transition-colors border border-blue-100/50">
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCommittees.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Search size={40} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No committees found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Committees;
