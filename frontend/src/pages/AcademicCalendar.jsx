import React from 'react';
import { Helmet } from 'react-helmet-async';

const AcademicCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        const response = await fetch(`${API_URL}/api/academic_calendar`);
        if (response.ok) {
          const data = await response.json();
          // We can optionally sort or just display as returned by backend.
          setCalendarData(data);
        }
      } catch (err) {
        console.error("Failed to fetch academic calendar:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendar();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white pt-[80px]">
      <Helmet>
        <title>Academic Calendar | ANITS</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="overflow-x-auto shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-[#003366] text-white">
                <th className="p-4 font-semibold text-[15px] w-1/4">Academic Year</th>
                <th className="p-4 font-semibold text-[15px] w-1/2">Program</th>
                <th className="p-4 font-semibold text-[15px] w-1/4">Download</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-500">Loading academic calendar...</td>
                </tr>
              ) : calendarData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-500">No academic calendar items found.</td>
                </tr>
              ) : (
                calendarData.map((section, idx) => (
                  <React.Fragment key={idx}>
                    {/* Subheader Row */}
                    <tr className="bg-[#f0f4f8]">
                      <td colSpan="3" className="p-3 font-bold text-gray-700 text-[15px]">
                        {section.yearHeader}
                      </td>
                    </tr>
                    
                    {/* Data Rows */}
                    {section.items.map((item, itemIdx) => {
                      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
                      const downloadUrl = `${API_URL}/api/academic_calendar_file/${item.filename}`;
                      return (
                        <tr key={itemIdx} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-4 text-gray-600 text-[14px]">
                            {item.year}
                          </td>
                          <td className="p-4 text-gray-600 text-[14px]">
                            {item.program}
                          </td>
                          <td className="p-3">
                            <a 
                              href={downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block w-[180px] text-center py-2 px-4 rounded-full text-white font-bold text-[13px] tracking-wide bg-gradient-to-r from-[#8b6dc1] to-[#7254a3] hover:opacity-90 transition-opacity shadow-sm"
                            >
                              DOWNLOAD
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
