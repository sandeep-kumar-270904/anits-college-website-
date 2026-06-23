import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, AlertCircle } from 'lucide-react';

const Syllabus = () => {
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Define the ordered years we want to display
  const orderedYears = [
    "Academic Year 2025-26",
    "Academic Year 2024-25",
    "Academic Year 2023-24",
    "Academic Year 2022-23",
    "Academic Year 2021-22",
    "Academic Year 2020-21",
    "Academic Year 2019-20"
  ];

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/syllabus');
        if (response.ok) {
          const data = await response.json();
          setSyllabusData(data);
        } else {
          setError('Failed to fetch syllabus data');
        }
      } catch (err) {
        setError('Error connecting to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, []);

  // Group data by year
  const groupedData = orderedYears.map(year => ({
    year,
    items: syllabusData.filter(item => item.academic_year === year)
  })).filter(group => group.items.length > 0); // Only show years that have items

  return (
    <div className="font-sans pt-[52px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Syllabus & Downloads | ANITS</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-[#112a46] mb-8 text-center">Syllabus & Academic Downloads</h1>

        {error && (
          <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200">
            <AlertCircle size={20} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        ) : groupedData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500 font-medium flex flex-col items-center">
            <Download size={48} className="text-gray-300 mb-4" />
            <p>No syllabus downloads available yet.</p>
            <p className="text-sm mt-2">New downloads will appear here when uploaded by the administration.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1f3a5f] text-white">
                  <th className="py-4 px-6 font-semibold w-1/3">Academic Year</th>
                  <th className="py-4 px-6 font-semibold w-1/3">Program</th>
                  <th className="py-4 px-6 font-semibold w-1/3 text-right">Download</th>
                </tr>
              </thead>
              <tbody>
                {groupedData.map((section, idx) => (
                  <React.Fragment key={idx}>
                    {/* Section Header Row */}
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <td colSpan="3" className="py-3 px-6 font-bold text-gray-800">
                        {section.year}
                      </td>
                    </tr>
                    
                    {/* Items for this year */}
                    {section.items.map((item, itemIdx) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50/50">
                        <td className="py-4 px-6 text-gray-500 text-sm">
                          {itemIdx === 0 ? section.year.split(' ')[2] : ''}
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-700">
                          {item.program}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <a 
                            href={`http://127.0.0.1:5000/api/syllabus_file/${item.filename}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full text-xs tracking-wider transition-colors inline-flex items-center gap-2"
                          >
                            DOWNLOAD
                          </a>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Syllabus;


