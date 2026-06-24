import React from 'react';
import { Helmet } from 'react-helmet-async';

const AcademicCalendar = () => {
  const calendarData = [
    {
      yearHeader: "Academic Year 2025-26",
      items: [
        { year: "2025-26", program: "First Year UG Courses" },
        { year: "2025-26", program: "UG Courses" },
        { year: "2025-26", program: "PG(M.Tech) Courses" },
        { year: "2025-26", program: "PG(MBA) Courses" }
      ]
    },
    {
      yearHeader: "Academic Year 2024-25",
      items: [
        { year: "2024-25", program: "First Year UG Courses" },
        { year: "2024-25", program: "UG Courses" },
        { year: "2024-25", program: "Working Professionals" },
        { year: "2024-25", program: "MBA" }
      ]
    },
    {
      yearHeader: "Academic Year 2023-24",
      items: [
        { year: "2023-24", program: "MBA" },
        { year: "2023-24", program: "M.Tech Programme" },
        { year: "2023-24", program: "1st year B.Tech" },
        { year: "2023-24", program: "UG Courses" }
      ]
    },
    {
      yearHeader: "Academic Year 2022-23",
      items: [
        { year: "2022-23", program: "Revised PG" },
        { year: "2022-23", program: "1st year B.Tech" },
        { year: "2022-23", program: "UG Courses" },
        { year: "2022-23", program: "PG Courses" }
      ]
    },
    {
      yearHeader: "Academic Year 2021-22",
      items: [
        { year: "2021-22", program: "PG Courses" },
        { year: "2021-22", program: "1st year B.Tech" },
        { year: "2021-22", program: "UG Courses" }
      ]
    },
    {
      yearHeader: "Academic Year 2020-21",
      items: [
        { year: "2020-21", program: "(IV B.Tech (Even Semester)" },
        { year: "2020-21", program: "UG Courses" },
        { year: "2020-21", program: "First Year" },
        { year: "2020-21", program: "PG Courses" }
      ]
    },
    {
      yearHeader: "Academic Year 2019-20",
      items: [
        { year: "2019-20", program: "UG Courses" }
      ]
    }
  ];

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px]">
      <Helmet>
        <title>Academic Calendar | ANITS</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-[#003366] text-white">
                <th className="p-4 font-semibold text-[15px] w-1/4">Academic Year</th>
                <th className="p-4 font-semibold text-[15px] w-1/2">Program</th>
                <th className="p-4 font-semibold text-[15px] w-1/4">Download</th>
              </tr>
            </thead>
            <tbody>
              {calendarData.map((section, idx) => (
                <React.Fragment key={idx}>
                  {/* Subheader Row */}
                  <tr className="bg-[#f0f4f8]">
                    <td colSpan="3" className="p-3 font-bold text-gray-700 text-[15px]">
                      {section.yearHeader}
                    </td>
                  </tr>
                  
                  {/* Data Rows */}
                  {section.items.map((item, itemIdx) => (
                    <tr key={itemIdx} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-gray-600 text-[14px]">
                        {item.year}
                      </td>
                      <td className="p-4 text-gray-600 text-[14px]">
                        {item.program}
                      </td>
                      <td className="p-3">
                        <button className="w-[180px] py-2 px-4 rounded-full text-white font-bold text-[13px] tracking-wide bg-gradient-to-r from-[#8b6dc1] to-[#7254a3] hover:opacity-90 transition-opacity shadow-sm">
                          DOWNLOAD
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
