import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, AlertTriangle, FileText, GraduationCap, Calendar } from 'lucide-react';

const AcademicCouncil = () => {
  const councilMembers = [
    { sno: 1, name: "Dr. V. Rajya Lakshmi", designation: "Principal", role: "Chairperson" },
    { sno: 2, name: "Prof. B. Jagadeesh", designation: "HoD, ECE", role: "Member" },
    { sno: 3, name: "Prof. J. Vijaya Kumar", designation: "HoD, EEE", role: "Member" },
    { sno: 4, name: "Prof. G. Srinivas", designation: "HoD, CSE", role: "Member" },
    { sno: 5, name: "Prof. K. Selvani Deepthi", designation: "HoD, CSE (AI & ML)", role: "Member" },
    { sno: 6, name: "Prof. Adinarayana Salina", designation: "HoD, CSE (DS)", role: "Member" },
    { sno: 7, name: "Prof. M. Rekha Sundari", designation: "HoD, IT", role: "Member" },
    { sno: 8, name: "Prof. B. Nagaraju", designation: "HoD, Mechanical", role: "Member" },
    { sno: 9, name: "Prof. J. Vikranth", designation: "HoD, Civil", role: "Member" },
    { sno: 10, name: "Prof. R. Srikanth", designation: "HoD, Chemical", role: "Member" },
    { sno: 11, name: "Dr. M. Kalyana Chakravarthy", designation: "HoD, BS&H", role: "Member" },
    { sno: 12, name: "Dr. M. Vinod Kumar", designation: "HoD, Mathematics", role: "Member" },
    { sno: 13, name: "Dr. P. Viswarupachary", designation: "HoD, Physics", role: "Member" },
    { sno: 14, name: "Dr. A. Satya Phani Kumari", designation: "HoD, English & Humanities", role: "Member" },
    { sno: 15, name: "Dr. V. Jaganadha Rao", designation: "HoD, Chemistry", role: "Member" },
    { sno: 16, name: "Dr. S. Ram Prasad Reddy", designation: "Professor, IT", role: "Member (College Nominee)" },
    { sno: 17, name: "Dr. D. Ravi Kumar", designation: "Professor, Dept. of Mechanical Engineering, IIT Delhi", role: "Member (Governing Body Nominee)" },
    { sno: 18, name: "Dr. S. Anuradha", designation: "Professor, Dept. of ECE, NIT Warangal", role: "Member (Governing Body Nominee)" },
    { sno: 19, name: "Dr. H. N. Das", designation: "Scientist - G, NSTL, DRDO, Visakhapatnam", role: "Member (Governing Body Nominee)" },
    { sno: 20, name: "Sri. N. Hanuma Prasad", designation: "Senior Manager, ERP-SAP Consulting, Infosys Ltd, Hyderabad", role: "Member (Governing Body Nominee)" },
    { sno: 21, name: "Dr. Kunjam Nageswara Rao", designation: "Professor, Dept. of CS & SE, AU", role: "Member (University Nominee)" },
    { sno: 22, name: "Dr. P. Srinivasa Kishore", designation: "Professor, Dept. of Mechanical Engineering, AUCE (A), VSP", role: "Member (University Nominee)" },
    { sno: 23, name: "Dr. K. Rama Sudha", designation: "Professor, Dept. of Electrical Engineering, AUCE (A), VSP", role: "Member (University Nominee)" },
    { sno: 24, name: "Dr. V. Murali", designation: "Professor, EEE", role: "Member Secretary" }
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Academic Council | ANITS</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-center items-center gap-3 mb-8 border-b-2 border-blue-800 pb-4">
          <Users size={28} className="text-blue-800" />
          <h1 className="text-2xl font-bold text-blue-900 uppercase tracking-wide">
            Academic Council Members
          </h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2d3748] text-white">
                  <th className="py-3 px-4 font-semibold text-sm w-16">S.No</th>
                  <th className="py-3 px-4 font-semibold text-sm">Name</th>
                  <th className="py-3 px-4 font-semibold text-sm">Designation</th>
                  <th className="py-3 px-4 font-semibold text-sm">Role</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {councilMembers.map((member, index) => (
                  <tr 
                    key={member.sno} 
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-500">{member.sno}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{member.name}</td>
                    <td className="py-3 px-4 text-gray-600">{member.designation}</td>
                    <td className="py-3 px-4 text-gray-600">{member.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anti-Ragging Banner */}
        <div className="mt-12 bg-red-500 text-white rounded-md py-3 px-4 flex items-center justify-center gap-2 shadow-md">
          <AlertTriangle size={20} />
          <span className="font-bold tracking-wide">Ragging is strictly prohibited in ANITS</span>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Audit Reports */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <FileText size={24} className="text-gray-700 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Audit Reports</h3>
            <div className="flex flex-col gap-1 text-blue-600 font-medium text-sm">
              <a href="#" className="hover:underline">Green Audit</a>
              <a href="#" className="hover:underline">Energy Audit</a>
            </div>
          </div>

          {/* Scholarships */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <GraduationCap size={24} className="text-gray-700 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Scholarships</h3>
            <p className="text-gray-600 text-sm">
              Information about available scholarships and application process.
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <Calendar size={24} className="text-gray-700 mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Upcoming Events</h3>
            <p className="text-gray-600 text-sm">
              Stay updated with the latest campus events and activities.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcademicCouncil;
