import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Book } from 'lucide-react';

const Syllabus = () => {
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}`;
        const response = await fetch(`${API_URL}/api/syllabus`);
        if (response.ok) {
          const data = await response.json();
          // Group by academic_year
          const grouped = data.reduce((acc, curr) => {
            if (!acc[curr.academic_year]) {
              acc[curr.academic_year] = [];
            }
            acc[curr.academic_year].push(curr);
            return acc;
          }, {});
          
          // Convert to array sorted by year (descending)
          const sortedArray = Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
          setSyllabusData(sortedArray);
        }
      } catch (err) {
        console.error("Failed to fetch syllabus:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px] pb-20">
      <Helmet>
        <title>Syllabus | ANITS</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-[#333] mb-8 font-['Oswald',sans-serif] tracking-wide">Syllabus & Academic Regulations</h1>
        
        <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#1f4e8c] text-white py-3 flex justify-center items-center">
            <Book size={18} />
          </div>

          <div className="p-8">
            {loading ? (
              <p className="text-center text-gray-500">Loading syllabus data...</p>
            ) : syllabusData.length === 0 ? (
              <p className="text-center text-gray-500">No syllabus documents available.</p>
            ) : (
              syllabusData.map(([year, items], idx) => (
                <div key={idx} className="mb-10 last:mb-0">
                  <h2 className="text-[22px] font-bold text-[#333] mb-6 font-['Oswald',sans-serif] tracking-wide border-b border-gray-200 pb-2">{year}</h2>
                  
                  <div className="space-y-4">
                    {items.map((item, itemIdx) => {
                      const API_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}`;
                      const fileUrl = `${API_URL}/api/syllabus_file/${item.filename}`;
                      
                      return (
                        <div key={itemIdx} className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <p className="text-[16px] text-gray-700 font-medium mb-2 md:mb-0">{item.program}</p>
                          <a 
                            href={fileUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#eef2f6] text-[#1f4e8c] px-4 py-2 rounded font-medium text-[13px] hover:bg-[#1f4e8c] hover:text-white transition-colors"
                          >
                            View Document
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;


