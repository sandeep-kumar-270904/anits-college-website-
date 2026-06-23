import React from 'react';
import { Helmet } from 'react-helmet-async';

const Policies = () => {
  const policiesList = [
    "Research and Development Policy",
    "Innovation and Entrepreneurship Policy",
    "Institutional Ethics Policy",
    "IPR Policy",
    "IT Policy",
    "Maintenance Policy",
    "Placement Policy",
    "Non-Teaching Staff Welfare Policy",
    "E- Governance Policy",
    "Recruitment Policy",
    "Promotion Policy",
    "Maternity Leave Policy",
    "E- Waste Management Policy",
    "Waste management Policy",
    "Energy Policy",
    "Environmental Policy",
    "Green Campus Policy",
    "Code of Conduct",
    "Divyangjan Policy",
    "Anti-Ragging Policy",
    "RTI Policy"
  ];

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Policies | ANITS</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-[#112a46] mb-8">List of Policies</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#4CAF50] text-white">
                <th className="py-4 px-6 font-bold w-24">S. NO</th>
                <th className="py-4 px-6 font-bold">NAME OF THE POLICY</th>
                <th className="py-4 px-6 font-bold w-32">DETAILS</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {policiesList.map((policy, index) => {
                const formattedName = policy.toLowerCase().replace(/ /g, '-').replace(/\//g, '-');
                const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
                const fileUrl = `${API_URL}/api/policy_file/${formattedName}.pdf`;
                
                return (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}`}
                  >
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">{policy}</td>
                    <td className="py-3 px-6">
                      <a 
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Policies;
