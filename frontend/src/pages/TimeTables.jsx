import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const TimeTables = () => {
  const [tables, setTables] = useState([
    { dept: "Chemical Engineering", url: "#" },
    { dept: "Civil Engineering", url: "#" },
    { dept: "Computer Science Engineering", url: "#" },
    { dept: "Electrical and Electronics Engineering", url: "#" },
    { dept: "Electronics and Communications Engineering", url: "#" },
    { dept: "Information Technology", url: "#" },
    { dept: "Mechanical Engineering", url: "#" }
  ]);

  useEffect(() => {
    // Fetch dynamic time tables from backend
    const fetchTimeTables = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}`;
        const response = await fetch(`${API_URL}/api/time_tables`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Map the data. We expect { id, department, filename }
            const formatted = data.map(t => ({
              dept: t.department,
              url: `${API_URL}/api/time_table_file/${t.filename}`
            }));
            
            // For departments that have an upload, update the list, or just replace the list entirely.
            // Replacing entirely makes it fully dynamic!
            setTables(formatted);
          }
        }
      } catch (err) {
        console.error("Failed to fetch time tables:", err);
      }
    };

    fetchTimeTables();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px]">
      <Helmet>
        <title>Time Tables | ANITS</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[#333] mb-8 text-center tracking-wide font-['Oswald',sans-serif]">Time Tables</h1>
        
        <div className="overflow-x-auto shadow-sm border border-gray-200">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#1e61ea] text-white">
                <th className="p-4 font-bold text-[17px] border-r border-white/20 w-3/4">Department</th>
                <th className="p-4 font-bold text-[17px] w-1/4">View</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr key={index} className="border-b border-gray-200 even:bg-[#f8f9fa] odd:bg-white transition-colors">
                  <td className="p-4 text-[15px] text-gray-700 border-r border-gray-200 font-medium">
                    {table.dept}
                  </td>
                  <td className="p-4 text-[15px]">
                    <a 
                      href={table.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1e61ea] hover:text-blue-800 hover:underline font-medium"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeTables;
