import React from 'react';
import { Helmet } from 'react-helmet-async';
import { User } from 'lucide-react';

const WomenEmpowerment = () => {
  // Array of 35 members based on the provided layout
  // 1 top, 2 second row, then 8 rows of 4.
  const members = [
    // Top Row (1)
    { id: 1, name: "Smt. P. Laya Lakshmi", role: "Patron", filename: "p-laya-lakshmi.jpg", rowSize: "w-full md:w-1/3" },
    
    // Second Row (2)
    { id: 2, name: "Dr. T. Swarupa Rani", role: "Dean - R&D", filename: "t-swarupa-rani.jpg", rowSize: "w-full md:w-5/12" },
    { id: 3, name: "Prof. G. V. Padma", role: "Dean - Training", filename: "g-v-padma.jpg", rowSize: "w-full md:w-5/12" },
    
    // Third Row (4)
    { id: 4, name: "Dr. P. Radha Kumari", role: "HoD - ECE", filename: "p-radha-kumari.jpg" },
    { id: 5, name: "Dr. L. Swathi", role: "HoD - CSE", filename: "l-swathi.jpg" },
    { id: 6, name: "Dr. Bindu Madhavi", role: "HoD - EEE", filename: "bindu-madhavi.jpg" },
    { id: 7, name: "Dr. B. Naga Mani", role: "HoD - English", filename: "b-naga-mani.jpg" },

    // Fourth Row (4)
    { id: 8, name: "Prof. M. Padmaja", role: "Coordinator", filename: "m-padmaja.jpg" },
    { id: 9, name: "Dr. K. Swathi", role: "Co-Coordinator", filename: "k-swathi.jpg" },
    { id: 10, name: "Dr. S. Harika", role: "Member", filename: "s-harika.jpg" },
    { id: 11, name: "Dr. G. Jyothi", role: "Member", filename: "g-jyothi.jpg" },

    // Fifth Row (4)
    { id: 12, name: "Smt. B. Nirmala", role: "Member", filename: "b-nirmala.jpg" },
    { id: 13, name: "Smt. T. Deepa", role: "Member", filename: "t-deepa.jpg" },
    { id: 14, name: "Smt. D. Uma", role: "Member", filename: "d-uma.jpg" },
    { id: 15, name: "Dr. C. Swathi", role: "Member", filename: "c-swathi.jpg" },

    // Sixth Row (4)
    { id: 16, name: "Smt. Ch. Swathi", role: "Member", filename: "ch-swathi.jpg" },
    { id: 17, name: "Dr. G. Lakshmi", role: "Member", filename: "g-lakshmi.jpg" },
    { id: 18, name: "Dr. P. Lalitha", role: "Member", filename: "p-lalitha.jpg" },
    { id: 19, name: "Smt. P. S. S. Gayathri", role: "Member", filename: "p-s-s-gayathri.jpg" },

    // Seventh Row (4)
    { id: 20, name: "Dr. Niharika", role: "Member", filename: "niharika.jpg" },
    { id: 21, name: "Smt. K. N. Sravya", role: "Member", filename: "k-n-sravya.jpg" },
    { id: 22, name: "Dr. N. Anjali", role: "Member", filename: "n-anjali.jpg" },
    { id: 23, name: "Smt. K. Pavithra", role: "Member", filename: "k-pavithra.jpg" },

    // Eighth Row (4)
    { id: 24, name: "Ms. Karuna Lavanya", role: "Member", filename: "karuna-lavanya.jpg" },
    { id: 25, name: "Dr. P. Sree Sudha", role: "Member", filename: "p-sree-sudha.jpg" },
    { id: 26, name: "Smt. P. S. Ramya", role: "Member", filename: "p-s-ramya.jpg" },
    { id: 27, name: "Dr. Kumari", role: "Member", filename: "kumari.jpg" },

    // Ninth Row (4)
    { id: 28, name: "Dr. P. Madhavi Latha", role: "Member", filename: "p-madhavi-latha.jpg" },
    { id: 29, name: "Dr. Padmaja", role: "Member", filename: "padmaja.jpg" },
    { id: 30, name: "Dr. C. Vijaya Lakshmi", role: "c-vijaya-lakshmi.jpg" },
    { id: 31, name: "Dr. Shalini", role: "Member", filename: "shalini.jpg" },

    // Tenth Row (4)
    { id: 32, name: "Dr. U. Padma", role: "Member", filename: "u-padma.jpg" },
    { id: 33, name: "Dr. T. Sailaja", role: "Member", filename: "t-sailaja.jpg" },
    { id: 34, name: "Dr. K. Gowri", role: "Member", filename: "k-gowri.jpg" },
    { id: 35, name: "Ms. M. Sravya", role: "Member", filename: "m-sravya.jpg" }
  ];

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
  };

  return (
    <div className="font-sans pt-[52px] min-h-screen pb-20 bg-gradient-to-b from-[#5c72d6] to-[#805eb3]">
      <Helmet>
        <title>Women Empowerment | ANITS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12 uppercase tracking-wider">
          Women Empowerment @ ANITS
          <div className="w-24 h-1 bg-white mx-auto mt-4 rounded-full opacity-50"></div>
        </h1>

        {/* Row 1 */}
        <div className="flex justify-center mb-8">
          <MemberCard member={members[0]} />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
          <MemberCard member={members[1]} />
          <MemberCard member={members[2]} />
        </div>

        {/* Rows 3 to 10 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {members.slice(3).map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

      </div>
    </div>
  );
};

const MemberCard = ({ member }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow ${member.rowSize || ''}`}>
      <div className="relative w-28 h-28 mb-4">
        <div className="w-full h-full rounded-full border-4 border-pink-100 overflow-hidden bg-gray-50 flex items-center justify-center p-1">
          <img 
            src={`/images/women-cell/${member.filename}`} 
            alt={member.name}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full rounded-full bg-gray-100 items-center justify-center hidden">
            <User size={40} className="text-gray-300" />
          </div>
        </div>
      </div>
      
      <div className="text-center mt-2 w-full">
        {member.role && (
          <div className="inline-block px-4 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-500 text-[10px] font-bold uppercase tracking-wider mb-3">
            {member.role}
          </div>
        )}
        <h3 className="text-gray-900 font-bold text-sm leading-snug">{member.name}</h3>
      </div>
    </div>
  );
};

export default WomenEmpowerment;
