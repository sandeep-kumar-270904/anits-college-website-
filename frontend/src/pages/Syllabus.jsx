import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Book } from 'lucide-react';

const Syllabus = () => {
  const undergraduateData = [
    { dept: "Chemical Engineering", link: "#" },
    { dept: "Civil Engineering", link: "#" },
    { dept: "Computer Science & Engineering", link: "#" },
    { dept: "Electrical & Electronics Engineering", link: "#" },
    { dept: "Electronics and Communication Engineering", link: "#" },
    { dept: "Information Technology", link: "#" },
    { dept: "Mechanical Engineering", link: "#" },
    { dept: "Computer Science AI & ML", link: "#" },
    { dept: "Computer Science DS", link: "#" }
  ];

  const postgraduateData = [
    { dept: "Computer Science & Engineering", link: "#" },
    { dept: "Electronics & Communication Engineering", link: "#" },
    { dept: "Electrical & Electronics Engineering", link: "#" },
    { dept: "Mechanical Engineering", link: "#" }
  ];

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px] pb-20">
      <Helmet>
        <title>Syllabus | ANITS</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-[#333] mb-8 font-['Oswald',sans-serif] tracking-wide">Syllabus</h1>
        
        <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#1f4e8c] text-white py-3 flex justify-center items-center">
            <Book size={18} />
          </div>

          <div className="p-8">
            {/* Undergraduate Section */}
            <h2 className="text-[22px] font-bold text-[#333] mb-6 font-['Oswald',sans-serif] tracking-wide">Undergraduate - B.Tech</h2>
            
            <div className="space-y-5 mb-10">
              {undergraduateData.map((item, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <p className="text-[13px] text-gray-500 mb-1">{item.dept}</p>
                  <a href={item.link} className="text-[15px] text-[#3b82f6] hover:text-blue-800 hover:underline">
                    Academic Regulations & Syllabus
                  </a>
                </div>
              ))}
            </div>

            {/* Postgraduate Section */}
            <h2 className="text-[22px] font-bold text-[#333] mb-6 font-['Oswald',sans-serif] tracking-wide">Postgraduate - M.Tech</h2>
            
            <div className="space-y-5">
              {postgraduateData.map((item, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <p className="text-[13px] text-gray-500 mb-1">{item.dept}</p>
                  <a href={item.link} className="text-[15px] text-[#3b82f6] hover:text-blue-800 hover:underline">
                    Academic Regulations & Syllabus
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;


