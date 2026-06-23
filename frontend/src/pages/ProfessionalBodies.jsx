import React from 'react';
import { Helmet } from 'react-helmet-async';

const ProfessionalBodies = () => {
  const bodies = [
    { sno: 1, dept: 'CSE', name: 'Computer Society of India (CSI)' },
    { sno: 2, dept: 'CSE', name: 'Association for Computing Machinery (ACM)' },
    { sno: 3, dept: 'CSE', name: 'CODECHEF' },
    { sno: 4, dept: 'CIVIL', name: 'Institution of Engineers India (IEI)' },
    { sno: 5, dept: 'MECH', name: 'Indian Society for Heating, Refrigeration and air-conditioning (ISHRAE)' },
    { sno: 6, dept: 'MECH', name: 'Society of Automotive Engineers (SAE)' },
    { sno: 7, dept: 'CHEM', name: 'Indian Institute of Chemical Engineers (IICHE)' },
    { sno: 8, dept: 'CIVIL', name: 'American Society for Civil Engineers (ASCE)' },
    { sno: 9, dept: 'CIVIL', name: 'Indian Geotechnical Society (IGS)' },
    { sno: 10, dept: 'ECE', name: 'Institution of Electronics and Telecommunication Engineers (IETE)' },
  ];

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px]">
      <Helmet>
        <title>Professional Bodies | ANITS</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-16">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-200 shadow-sm">
            <thead>
              <tr className="bg-[#003366] text-white">
                <th className="p-3 font-semibold text-sm border-r border-gray-300 w-16 text-center">S.No</th>
                <th className="p-3 font-semibold text-sm border-r border-gray-300 w-32">Department</th>
                <th className="p-3 font-semibold text-sm">Name of the Professional Body / Students Chapter</th>
              </tr>
            </thead>
            <tbody>
              {bodies.map((body, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-100 transition-colors">
                  <td className="p-3 text-sm text-gray-700 border-r border-gray-300 text-center">{body.sno}</td>
                  <td className="p-3 text-sm text-gray-700 border-r border-gray-300">{body.dept}</td>
                  <td className="p-3 text-sm text-gray-700">{body.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ProfessionalBodies;
