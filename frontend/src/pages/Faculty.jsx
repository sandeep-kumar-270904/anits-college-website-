import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Mail, Award, BookOpen } from 'lucide-react';

const Faculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      const API_URL = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}`;
      try {
        const response = await fetch(`${API_URL}/api/faculty`);
        const data = await response.json();
        setFacultyList(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch faculty:", err);
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const departments = ['All', ...new Set(facultyList.map(f => f.department))].sort();

  const filteredFaculty = selectedDept === 'All' 
    ? facultyList 
    : facultyList.filter(f => f.department === selectedDept);

  return (
    <div className="font-sans bg-gray-50 min-h-screen pb-16">
      <Helmet>
        <title>Faculty Directory | ANITS</title>
        <meta name="description" content="Meet the distinguished faculty at ANITS." />
      </Helmet>
      
      <div className="bg-gray-900 text-white py-16 px-6 shadow-md mb-12">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Faculty Directory</h1>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto text-lg">Learn from the Best in the Industry. Our distinguished faculty members are dedicated to academic excellence.</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6">
        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in delay-100">
          {departments.map((dept, i) => (
            <button
              key={i}
              onClick={() => setSelectedDept(dept)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                selectedDept === dept 
                ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Faculty Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-500 font-bold">
            Loading Faculty Directory...
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="text-center bg-white p-16 rounded-3xl border border-gray-100 shadow-sm animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 text-gray-400 rounded-full mb-4">
              <User size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Profiles Found</h3>
            <p className="text-gray-500">There are currently no faculty profiles available in this department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in delay-200">
            {filteredFaculty.map((f, i) => (
              <div key={f.id || i} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
                {/* Header Banner */}
                <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative"></div>
                
                {/* Profile Details */}
                <div className="px-6 pb-6 pt-0 flex-1 flex flex-col relative">
                  {/* Avatar Avatar */}
                  <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center absolute -top-10 left-6 text-blue-600">
                    <User size={36} />
                  </div>
                  
                  <div className="mt-14 mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{f.name}</h3>
                    <p className="text-blue-600 font-bold text-sm tracking-wide uppercase">{f.designation}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <BookOpen size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                      <span className="font-medium">{f.department}</span>
                    </div>
                    
                    {f.qualification && (
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <Award size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                        <span className="font-medium">{f.qualification}</span>
                      </div>
                    )}
                    
                    {f.email && (
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <Mail size={16} className="mt-0.5 text-gray-400 flex-shrink-0" />
                        <a href={`mailto:${f.email}`} className="font-medium hover:text-blue-600 break-all">{f.email}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Faculty;
