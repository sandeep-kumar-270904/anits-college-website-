import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, GraduationCap, BookOpen, Award, CheckCircle } from 'lucide-react';

const Admissions = () => {
  const ugPrograms = [
    { sno: 1, dept: "Chemical Engineering", programs: "B.Tech Chemical Engineering" },
    { sno: 2, dept: "Civil Engineering", programs: "B.Tech Civil Engineering" },
    { sno: 3, dept: "Computer Science & Engineering", programs: "B.Tech Computer Science & Engineering" },
    { sno: 4, dept: "CSE (Data Science)", programs: "B.Tech Computer Science & Engineering (Data Science)" },
    { sno: 5, dept: "CSE (Artificial Intelligence & Machine Learning)", programs: "B.Tech Computer Science & Engineering (AI & ML)" },
    { sno: 6, dept: "Electrical & Electronics Engineering", programs: "B.Tech Electrical & Electronics Engineering" },
    { sno: 7, dept: "Electronics & Communication Engineering", programs: "B.Tech Electronics & Communication Engineering" },
    { sno: 8, dept: "Information Technology", programs: "B.Tech Information Technology" },
    { sno: 9, dept: "Mechanical Engineering", programs: "B.Tech Mechanical Engineering" },
    { sno: 10, dept: "Basic Sciences & Humanities", programs: "BS&H" }
  ];

  const pgPrograms = [
    { sno: 1, dept: "Chemical Engineering", programs: "M.Tech Biotechnology" },
    { sno: 2, dept: "Civil Engineering", programs: "M.Tech Soil Mechanics & Foundation Engineering" },
    { sno: 3, dept: "Computer Science & Engineering", programs: "M.Tech Computer Science & Technology" },
    { sno: 4, dept: "CSE (Artificial Intelligence & Machine Learning)", programs: "M.Tech Computer Science & Engineering (AI & ML)" },
    { sno: 5, dept: "Electrical & Electronics Engineering", programs: "M.Tech Control Systems" },
    { sno: 6, dept: "Electronics & Communication Engineering", programs: "M.Tech Communication Systems" },
    { sno: 7, dept: "Mechanical Engineering", programs: "M.Tech Machine Design" }
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Admissions | ANITS</title>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1f3a5f] to-[#0f4471] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">Excellence in Engineering Education</h1>
          <p className="text-xl text-blue-100 mb-8 font-medium max-w-2xl mx-auto">Providing quality education and shaping future engineers for tomorrow's challenges.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white/10 hover:bg-white/20 border border-white/30 px-6 py-2.5 rounded shadow transition-all font-bold flex items-center gap-2">
              <BookOpen size={18} /> Explore Programs
            </button>
            <button className="bg-transparent hover:bg-white/10 border border-white/30 px-6 py-2.5 rounded shadow transition-all font-bold flex items-center gap-2">
              <GraduationCap size={18} /> Admission Process
            </button>
          </div>
        </div>
      </div>

      {/* Diagonal swoosh effect */}
      <div className="w-full h-12 bg-gradient-to-br from-[#1f3a5f] to-[#0f4471]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 10%, 0 100%)' }}></div>

      <div className="max-w-6xl mx-auto px-6 -mt-10">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 relative z-20">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center flex flex-col items-center">
            <Users size={32} className="text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">6000+</h3>
            <p className="text-sm text-gray-500 font-medium">Students</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center flex flex-col items-center">
            <GraduationCap size={32} className="text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">390</h3>
            <p className="text-sm text-gray-500 font-medium">Faculty</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center flex flex-col items-center">
            <BookOpen size={32} className="text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">20+</h3>
            <p className="text-sm text-gray-500 font-medium">Programs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center flex flex-col items-center">
            <Award size={32} className="text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">90%</h3>
            <p className="text-sm text-gray-500 font-medium">Placement Rate</p>
          </div>
        </div>

        {/* Undergraduate Programs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1f3a5f] mb-2">Undergraduate Programs</h2>
          <div className="w-16 h-1 bg-red-400 mb-4"></div>
          <p className="text-gray-600 text-sm mb-6">Our UG programs offer comprehensive education in various engineering and management disciplines with a focus on practical skills and theoretical knowledge.</p>
          
          <div className="overflow-x-auto bg-white rounded shadow-sm border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#1f3a5f] text-white">
                  <th className="py-3 px-4 w-16 text-center">S.No</th>
                  <th className="py-3 px-4">Name of the Department</th>
                  <th className="py-3 px-4">Programs Offered</th>
                </tr>
              </thead>
              <tbody>
                {ugPrograms.map((prog, index) => (
                  <tr key={prog.sno} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-3 px-4 text-center text-gray-500">{prog.sno}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{prog.dept}</td>
                    <td className="py-3 px-4 text-gray-600">{prog.programs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Postgraduate Programs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1f3a5f] mb-2">Postgraduate Programs</h2>
          <div className="w-16 h-1 bg-red-400 mb-4"></div>
          <p className="text-gray-600 text-sm mb-6">Our PG programs offer advanced specialization in various engineering and management disciplines to prepare students for research and specialized industry roles.</p>
          
          <div className="overflow-x-auto bg-white rounded shadow-sm border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#1f3a5f] text-white">
                  <th className="py-3 px-4 w-16 text-center">S.No</th>
                  <th className="py-3 px-4">Name of the Department</th>
                  <th className="py-3 px-4">Programs Offered</th>
                </tr>
              </thead>
              <tbody>
                {pgPrograms.map((prog, index) => (
                  <tr key={prog.sno} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-3 px-4 text-center text-gray-500">{prog.sno}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{prog.dept}</td>
                    <td className="py-3 px-4 text-gray-600">{prog.programs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admission Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1f3a5f] mb-2">Admission Process</h2>
          <div className="w-16 h-1 bg-red-400 mb-6"></div>

          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">B.Tech Admission Procedure</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900">EAMCET Category A (70% Seats)</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">The Engineering, Agriculture and Pharmacy Common Entrance Test (EAPCET) accounts for up to 70% of the seats based on state rank, choice, and the reservation policy of the Govt. of Andhra Pradesh.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Management/NRI Quota Category B (30% Seats)</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">The remaining 30% of seats are filled by the institute under the Management/NRI quota as per APSCHE and Government of Andhra Pradesh guidelines.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Lateral Entry (10% Additional)</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">The ECET convener admits 10% of the sanctioned intake directly into the second year of the 4-year B.Tech program from among Diploma holders, based on their ECET rank and reservation policy.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">M.Tech Eligibility Requirements</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Bachelor's degree in Engineering/Technology from a recognized university in the concerned discipline.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">APPGECET/GATE score must be valid with valid GATE score.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Sponsored candidates are accepted (not more than two per specialization and five per Department).</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">Candidates must satisfy local/non-local status requirements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tuition Fees */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#1f3a5f] mb-2">Tuition Fees</h2>
          <div className="w-16 h-1 bg-red-400 mb-4"></div>
          <p className="text-gray-600 text-sm mb-6">Our fee structure is designed to provide quality education at an affordable cost.</p>
          
          <div className="overflow-x-auto bg-white rounded shadow-sm border border-gray-200 mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#1f3a5f] text-white">
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Annual Fee (INR)</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="py-3 px-4 font-medium text-gray-800">Undergraduate (B.Tech)</td>
                  <td className="py-3 px-4 text-gray-600">76,300</td>
                  <td className="py-3 px-4 text-gray-600">All B.Tech Programs</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">Postgraduate (M.Tech)</td>
                  <td className="py-3 px-4 text-gray-600">70,000</td>
                  <td className="py-3 px-4 text-gray-600">All M.Tech Programs</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-4 font-medium text-gray-800">Management / NRI Quota</td>
                  <td className="py-3 px-4 text-gray-600">Contact</td>
                  <td className="py-3 px-4 text-gray-600">Contact the Admission Office for details</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-cyan-50 border border-cyan-100 text-cyan-800 p-4 rounded text-sm flex gap-3">
            <div className="w-5 h-5 rounded-full bg-cyan-200 text-cyan-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">i</div>
            <p>Additional fees may apply for hostel accommodation, transportation, and other services. Please contact the admission office for detailed fee structure.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admissions;
