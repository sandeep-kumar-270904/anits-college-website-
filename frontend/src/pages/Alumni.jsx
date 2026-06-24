import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Globe, Briefcase, GraduationCap, MapPin, Search, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    try {
      const response = await fetch(`${API_URL}/api/alumni`);
      const data = await response.json();
      setAlumniList(data);
      setFilteredAlumni(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch alumni:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const lowercased = searchTerm.toLowerCase();
      const filtered = alumniList.filter(a => 
        a.name.toLowerCase().includes(lowercased) || 
        a.company.toLowerCase().includes(lowercased) ||
        a.role.toLowerCase().includes(lowercased) ||
        a.department.toLowerCase().includes(lowercased) ||
        a.batch.includes(searchTerm)
      );
      setFilteredAlumni(filtered);
    } else {
      setFilteredAlumni(alumniList);
    }
  }, [searchTerm, alumniList]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !batch || !department) {
      setStatus('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setStatus('Registering...');
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
    try {
      const response = await fetch(`${API_URL}/api/alumni`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, batch, department, company, role, linkedin })
      });
      const data = await response.json();
      
      if (response.ok) {
        setStatus('Successfully registered! Welcome to the ANITS Alumni Network.');
        setName('');
        setBatch('');
        setCompany('');
        setRole('');
        setLinkedin('');
        fetchAlumni(); // Refresh list
      } else {
        setStatus(data.error || 'Registration failed');
      }
    } catch (err) {
      setStatus('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans pt-[80px] min-h-screen bg-gray-50 pb-16">
      <Helmet>
        <title>Alumni Network | ANITS</title>
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[250px] bg-[#112a46] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            Alumni Network
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Connect, Collaborate, and Grow with the global ANITS community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Left Side: Directory */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#112a46] mb-6 flex items-center gap-2">
              <Users size={28} className="text-[#f39c12]" />
              Alumni Directory
            </h2>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search alumni by name, company, role, or batch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-gray-700"
              />
            </div>
            
            {/* Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : filteredAlumni.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <Users className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-medium">No alumni found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAlumni.map((alumnus) => (
                  <div key={alumnus.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl uppercase">
                          {alumnus.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{alumnus.name}</h3>
                          <p className="text-sm text-gray-500 font-medium">Class of {alumnus.batch} • {alumnus.department}</p>
                        </div>
                      </div>
                      {alumnus.linkedin && (
                        <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors p-2 bg-gray-50 rounded-full">
                          <Globe size={20} />
                        </a>
                      )}
                    </div>
                    
                    {(alumnus.company || alumnus.role) && (
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2 mt-4">
                        {alumnus.role && (
                          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                            <Briefcase size={16} className="text-gray-400" />
                            {alumnus.role}
                          </div>
                        )}
                        {alumnus.company && (
                          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                            <MapPin size={16} className="text-gray-400" />
                            {alumnus.company}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Side: Registration */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-[#112a46] rounded-2xl shadow-lg overflow-hidden sticky top-[100px]">
            <div className="p-8 text-white text-center border-b border-white/10">
              <GraduationCap size={48} className="mx-auto text-[#f39c12] mb-4" />
              <h2 className="text-2xl font-bold mb-2">Join the Directory</h2>
              <p className="text-blue-200 text-sm">Register to let your juniors and batchmates find you.</p>
            </div>
            
            <div className="p-8 bg-white">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#112a46] focus:border-transparent outline-none" placeholder="John Doe" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Batch <span className="text-red-500">*</span></label>
                    <input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#112a46] focus:border-transparent outline-none" placeholder="e.g. 2024" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Department <span className="text-red-500">*</span></label>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#112a46] focus:border-transparent outline-none">
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="IT">IT</option>
                      <option value="MECH">MECH</option>
                      <option value="CIVIL">CIVIL</option>
                      <option value="CHEM">CHEM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Current Role</label>
                  <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#112a46] focus:border-transparent outline-none" placeholder="e.g. Software Engineer" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
                  <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#112a46] focus:border-transparent outline-none" placeholder="e.g. Google" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn URL</label>
                  <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#112a46] focus:border-transparent outline-none" placeholder="https://linkedin.com/in/..." />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Registering...' : <><Send size={18} /> Register Profile</>}
                </button>
              </form>
              
              {status && (
                <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 font-medium text-sm ${status.includes('Successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                  {status.includes('Successfully') ? <CheckCircle size={18} className="flex-shrink-0 mt-0.5" /> : <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />}
                  <p>{status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alumni;
